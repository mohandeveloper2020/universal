/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵCommonEngine as CommonEngine,
   ɵRenderOptions as RenderOptions } from '@nguniversal/common';
import { NgModuleFactory, Type } from '@angular/core';
import * as grpc from 'grpc';

export interface GRPCEngineServer {
  close: () => void;
}

export interface GRPCEngineRenderOptions extends RenderOptions {
}

export interface GRPCEngineResponse {
  id: number;
  html: string;
}

export function startGRPCEngine(
  moduleOrFactory: Type<{}> | NgModuleFactory<{}>,
  host = 'localhost',
  port = 9090
): Promise<GRPCEngineServer> {
  // TODO: how will this work with deployment?
  const protoDescriptor = grpc.load('../interface.proto');
  return new Promise((resolve, _reject) => {
    const engine = new CommonEngine(moduleOrFactory);

    const server = new grpc.Server();
    server.addProtoService(protoDescriptor.GRPCEngine.service, {
      render: async (call: any, callback: any) => {
        const renderOptions = call.request as GRPCEngineRenderOptions;
        const html = await engine.render(renderOptions);
        // TODO: how to send errors?
        callback(null, html);
      }
    });
    // TODO: how to take credentials as input?
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();

    resolve({
      close: () => new Promise((res, _rej) => server.tryShutdown(() => res()))
    });
  });
}

