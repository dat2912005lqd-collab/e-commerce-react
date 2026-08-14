export const DEFAULT_IMAGE_FALLBACK = "/images/product-placeholder.png";
export function getSafeImage(image?:string)
:string {
    return image || DEFAULT_IMAGE_FALLBACK;
}