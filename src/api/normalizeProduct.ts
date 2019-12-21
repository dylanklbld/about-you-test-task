import {
  ProductImage,
  BapiProduct,
} from '@aboutyou/backbone/types/BapiProduct';
import { Product } from '../types/Product';

const getImageUrl = (hash: string) =>
  `//cdn.aboutstatic.com/file/${hash}?quality=70&progressive=true&width=800&height=800&brightness=0.95`;

const getProductDefaultImage = (
  productImages: ProductImage[],
): string | null => {
  const bustImage = productImages.find(
    p => p.attributes.imageType.values.value === 'bust',
  );

  if (!bustImage) {
    return null;
  }

  return getImageUrl(bustImage.hash);
};

const formatPrice = (centPrice: number, currency: string) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(
    centPrice / 100,
  );

export const normalizeProduct = (product: BapiProduct): Product => ({
  id: product.id,
  image: getProductDefaultImage(product.images),
  name: product.attributes.brand.values.label,
  price: product.priceRange
    ? `from ${formatPrice(
        product.priceRange.min.withTax,
        product.priceRange.min.currencyCode,
      )}`
    : undefined,
});
