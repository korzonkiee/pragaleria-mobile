export default function getSmallestImageSize(obj: any) {
    return obj.image_big_thumbnail || obj.image_medium || obj.image_large || obj.image_original;
}