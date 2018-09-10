#!/usr/bin/env sh

set -ex

docker build \
    -t $BUILD_IMAGE \
    --build-arg VERSION_CODE=$TRAVIS_BUILD_NUMBER \
    -f Build.Dockerfile \
    ..

docker build \
    -t $DEPLOY_IMAGE \
    --build-arg VERSION_CODE=$TRAVIS_BUILD_NUMBER \
    -f Deploy.Dockerfile \
    .
