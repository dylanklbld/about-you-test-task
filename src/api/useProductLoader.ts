import {
  APISortOrder,
  createProductsSearchEndpointRequest,
} from '@aboutyou/backbone/endpoints/products/products';

import { execute } from '@aboutyou/backbone/helpers/execute';
import { normalizeFilterParameters } from './utils'
import { normalizeProduct } from './normalizeProduct';
import { useAsyncLoader } from './useAsyncLoader';
import { useCallback } from 'react';

const SHOP_ID = 139;
export const useProductLoader = ({ appliedFilters }) => {

  const { attrs, bools, maxPrice, minPrice } = normalizeFilterParameters(appliedFilters);

  const getPriceRange = ({ min, max }) => ({
    "min": {
      "currencyCode": "EUR",
      "appliedReductions": [
        {
          "category": "sale",
          "type": "relative",
          "amount": {
            "relative": min,
          }
        }
      ],
    },
    "max": {
      "currencyCode": "EUR",
      "appliedReductions": [
        {
          "category": "sale",
          "type": "relative",
          "amount": {
            "relative": max,
          }
        }
      ],
    }
  })

  const priceRange = appliedFilters.range && appliedFilters.range["max_savings_percentage"]
    ? getPriceRange(appliedFilters.range["max_savings_percentage"]) : true


  const products = useAsyncLoader(
    useCallback(
      () =>
        execute(
          'http://127.0.0.1:9459/v1/',
          SHOP_ID,
          createProductsSearchEndpointRequest({
            where: {
              categoryId: 20290,
              attributes: [...attrs, ...bools],
              maxPrice,
              minPrice,
            },
            pagination: {
              page: 1,
              perPage: 50,
            },
            sort: {
              channel: 'etkp',
              direction: APISortOrder.Descending,
              score: 'category_scores',
            },
            with: {
              attributes: {
                withKey: ['brand'],
              },
              priceRange: true
            },
          },
          ),
        ).then(({ data }) => data.entities.map(normalizeProduct)),
      [appliedFilters],
    ),
  );

  return Array.isArray(products) ? products : [];
};
