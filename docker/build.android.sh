#!/usr/bin/env bash

# -e    When this option is on, if a simple command returns an exit status value >0,
#       then the shell shall immediately exit.
set -e

SCRIPT_NAME=$0

registry=korzonkiee
base_image_tag=8-jdk
img_name=android
img_tag=8-27
android_version=27
build_tools_version=27.0.3

display_help() {
    echo "Usage: $SCRIPT_NAME [options]"
    echo '  --help -h        Display this help'
    echo "  --registry -r    Image registry (default $registry)"
    echo "  --image-name -n  Image name (default $img_name)"
    echo "  --image-tag -t   Image tag (default $img_tag)"
    echo "  --base-image -b  Base image tag (default $base_image_tag)"
    echo "  --android        Android version (default $android_version)"
    echo "  --build-tools    Build tools version (default $build_tools_version)"
    echo '  --keystore -k    Keystore file (required)'
    echo "  --password -p    Keystore and 'test' alias password (required)"
    echo ''
    exit 1
}

# $#    number of parameters
# -gt   greater than
while [[ $# -gt 0 ]]; do
    case "$1" in
    -r|--registry)
        registry=$2
        shift 2
        ;;

    -n|--image-name)
        img_name=$2
        shift 2
        ;;

    -t|--image-tag)
        img_tag=$2
        shift 2
        ;;

    -b|--base-image)
        base_image_tag=$2
        shift 2
        ;;

    --android)
        android_version=$2
        shift 2
        ;;

    --build-tools)
        build_tools=$2
        shift 2
        ;;

    -k|--keystore)
        test_keystore_file=$2
        shift 2
        ;;

    -p|--password)
        test_keystore_password=$2
        shift 2
        ;;

    -h|--help)
        display_help
        ;;

    *)
        echo "Unrecognized option $1" >&2
        exit 1
        ;;
    esac
done

if [[ -z "$test_keystore_file" || -z "$test_keystore_password" ||\
      ! -f "$test_keystore_file" ]]; then
    echo "Missing keystore configuration or keystore file does not exist"
    exit 1
fi

docker build \
    --file Android.Dockerfile \
    --pull \
    -t $registry/$img_name:$img_tag \
    --build-arg BASE_IMAGE_TAG=$base_image_tag \
    --build-arg ANDROID_VERSION=$android_version \
    --build-arg ANDROID_BUILD_TOOLS_VERSION=$build_tools_version \
    --build-arg TEST_KEYSTORE_SOURCE_FILE=$test_keystore_file \
    --build-arg TEST_KEYSTORE_PASSWORD=$test_keystore_password \
    .

# docker push $registry/$img_name:$img_tag
