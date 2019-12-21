import { normalizeProduct } from '../normalizeProduct';
import backendProductMock from './product.mock.json';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { Product } from '../../types/Product';

describe('normalizeProduct', () => {
  let product: Product;
  beforeEach(() => {
    product = normalizeProduct((backendProductMock as unknown) as BapiProduct);
  });

  it('should transform a backend product entity into a view model containing id', () => {
    expect(product.id).toBe(4299563);
  });

  it('should transform a backend product entity into a view model containing name', () => {
    expect(product.name).toBe('ADIDAS ORIGINALS');
  });

  it('should transform a backend product entity into a view model containing image', () => {
    expect(product.image).toBe(
      '//cdn.aboutstatic.com/file/a3b91294fc6c999c6dc59af95c5d9a30?quality=70&progressive=true&width=800&height=800&brightness=0.95',
    );
  });

  it('should transform a backend product entity into a view model containing price', () => {
    expect(product.price).toContain('from 29,95');
    expect(product.price).toContain('$');
  });
});
