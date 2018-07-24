#!/usr/bin/env bash

set -ex

docker run --rm \
    -e status=2 \
    -e COMMIT_SHA=$TRAVIS_COMMIT \
    -e HOCKEY_APP_TOKEN=$HOCKEY_APP_TOKEN \
    -e HOCKEY_APP_ID=$HOCKEY_APP_ID \
    $TEST_IMAGE
