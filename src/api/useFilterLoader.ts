import {
  createFiltersEndpointRequest,
} from '@aboutyou/backbone/endpoints/filters/filters';
import { execute } from '@aboutyou/backbone/helpers/execute';
import { useAsyncLoader } from './useAsyncLoader';
import { useCallback } from 'react';

const SHOP_ID = 139;

export const useFilterLoader = () => {
  const filters = useAsyncLoader(
    useCallback(
      () =>
        execute(
          'https://api-cloud.aboutyou.de/v1/',
          SHOP_ID,
          createFiltersEndpointRequest({
            where: {
              categoryId: 20290,
            },
          }),
        ).then(({ data }) => console.log(data) || data.entries),
      [],
    ),
  );

  return Array.isArray(filters) ? filters : [];
};


// export const useSimpleFilterLoader = async (options = {}) => {
//   try {
//     return await fetch(
//       `'https://api-cloud.aboutyou.de/v1/filters`,
//       {
//         method: "GET",

//       }
//     ).then(response => {
//       if (response.status >= 400 && response.status < 600) {
//         throw new Error("Bad response from server");
//       }

//       return response.json()
//     })
//       .then(response => {

//         return response
//       })
//       .catch(error => {
//         console.log("ERROR")
//         throw error
//       })
//   } catch (err) {
//     throw err
//   }
// }
