
import { ServerModule } from '@angular/platform-server';
import { NgModule, Component } from '@angular/core';
import 'zone.js';

import { BrowserModule } from '@angular/platform-browser';
import { startSocketEngine, SocketEngineResponse } from '@nguniversal/socket-engine';
import * as WebSocket from 'ws';

export function makeTestingModule(template: string, component?: any): any {
  @Component({
    selector: 'root',
    template: template
  })
  class MockComponent {}
  @NgModule({
    imports: [ServerModule, BrowserModule.withServerTransition({appId: 'mock'})],
    declarations: [component || MockComponent],
    bootstrap: [component || MockComponent]
  })
  class MockServerModule {}
  return MockServerModule;
}

describe('test runner', () => {
  it('should render a basic template', async (done) => {
    const template = `some template: ${new Date()}`;
    const appModule = makeTestingModule(template);
    const server = await startSocketEngine(appModule);

    const ws = new WebSocket('ws://localhost:9090');

    ws.on('open', () => ws.send(JSON.stringify({id: 1, url: '/path', document: '<root></root>'})));
    ws.on('message', (res: SocketEngineResponse) => {
      expect(res.id).toEqual(1);
      expect(res.html).toEqual(template);
      server.close();
      done();
    });
  });
});
