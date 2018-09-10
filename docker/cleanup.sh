#!/usr/bin/env sh

set -ex

docker image rm \
    $BUILD_IMAGE \
    $DEPLOY_IMAGE
