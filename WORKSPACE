workspace(name = "nguniversal")

# This commit matches the version of buildifier in angular/ngcontainer
# If you change this, also check if it matches the version in the angular/ngcontainer
# version in /.circleci/config.yml
BAZEL_BUILDTOOLS_VERSION = "70bc7843bb9950fece2bc014ed16de03419e36e2"

http_archive(
    name = "com_github_bazelbuild_buildtools",
    url = "https://github.com/bazelbuild/buildtools/archive/%s.zip" % BAZEL_BUILDTOOLS_VERSION,
    strip_prefix = "buildtools-%s" % BAZEL_BUILDTOOLS_VERSION,
    sha256 = "367c23a5fe7fc2a7cb57863d3718b4149f0e57426c48c8ad54c45348a0b53cc1",
)

# Fetch the webtesting rules
http_archive(
    name = "io_bazel_rules_webtesting",
    url = "https://github.com/bazelbuild/rules_webtesting/archive/ca7b8062d9cf4ef2fde9193c7d37a0764c4262d7.zip",
    strip_prefix = "rules_webtesting-ca7b8062d9cf4ef2fde9193c7d37a0764c4262d7",
    sha256 = "28c73cf9d310fa6dba30e66bdb98071341c99c3feb8662f2d3883a632de97d72",
)

# Fetch the NodeJS rules
http_archive(
    name = "build_bazel_rules_nodejs",
    url = "https://github.com/bazelbuild/rules_nodejs/archive/0.9.1.zip",
    strip_prefix = "rules_nodejs-0.9.1",
    sha256 = "6139762b62b37c1fd171d7f22aa39566cb7dc2916f0f801d505a9aaf118c117f",
)


load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories", "yarn_install")

check_bazel_version("0.11.1")
node_repositories(package_json = ["//:package.json"])


http_archive(
    name = "build_bazel_rules_typescript",
    url = "https://github.com/bazelbuild/rules_typescript/archive/0.15.0.zip",
    strip_prefix = "rules_typescript-0.15.0",
    sha256 = "1aa75917330b820cb239b3c10a936a10f0a46fe215063d4492dd76dc6e1616f4",
)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")
ts_setup_workspace()

# Some of the TypeScript is written in Go.
# Bazel doesn't support transitive WORKSPACE deps, so we must repeat them here.
http_archive(
    name = "io_bazel_rules_go",
    url = "https://github.com/bazelbuild/rules_go/releases/download/0.11.0/rules_go-0.11.0.tar.gz",
    sha256 = "f70c35a8c779bb92f7521ecb5a1c6604e9c3edd431e50b6376d7497abc8ad3c1",
)

load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")
go_rules_dependencies()
go_register_toolchains()


####################################
# Tell Bazel about some workspaces that were installed from npm.

local_repository(
    name = "angular",
    path = "node_modules/@angular/bazel",
)


local_repository(
    name = "rxjs",
    path = "node_modules/rxjs/src",
)
