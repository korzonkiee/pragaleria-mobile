#!/usr/bin/env bash
set -e

SCRIPT_NAME=$0

registry=korzonkiee
base_image_tag=8-27
img_name=react-native
img_tag=10-27
node_version=10.4.1
yarn_version=1.7.0
npmrc_file=./.npmrc

display_help() {
    echo "Usage: $SCRIPT_NAME [options]"
    echo '  --help -h        Display this help'
    echo "  --registry -r    Image registry (default $registry)"
    echo "  --image-name -n  Image name (default $img_name)"
    echo "  --image-tag -t   Image tag (default $img_tag)"
    echo "  --base-image -b  Base image tag (default $base_image_tag)"
    echo "  --node           Node version (default $node_version)"
    echo "  --yarn           Yarn version (default $yarn_version)"
    echo "  --npmrc          .npmrc file with local config (default $npmrc_file)"
    echo ''
    echo ' Dockerfile has more configurations, add params if it will be needed ;)'
    exit 1
}

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

    --node)
        node_version=$2
        shift 2
        ;;

    --yarn)
        yarn_version=$2
        shift 2
        ;;

    --npmrc)
        npmrc_file=$2
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

if [ ! -f $npmrc_file ]; then
    echo "Specify correct path to existing .npmrc file ($npmrc_file specified)"
    exit 1
fi

docker build \
    --pull \
    --file ReactNative.Dockerfile \
    -t $registry/$img_name:$img_tag \
    --build-arg BASE_IMAGE_TAG=$base_image_tag \
    --build-arg NODE_VERSION=$node_version \
    --build-arg YARN_VERSION=$yarn_version \
    --build-arg NPMRC_SOURCE=$npmrc_file \
    .
# docker push $registry/$img_name:$img_tag
