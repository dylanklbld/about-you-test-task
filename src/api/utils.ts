export const normalizeFilterParameters = ({ attributes, boolean, range }) => {

  const { min: minPrice, max: maxPrice } = range && range.prices || {
    minPrice: null,
    maxPrice: null
  }

  const attrs = attributes ? Object.keys(attributes).map(key => ({
    values: attributes[key],
    key,
    type: 'attributes'
  })) : []


  const bools = boolean ? Object.keys(boolean).map(key => ({
    value: boolean[key],
    key,
    type: 'boolean'
  })) : []


  return { bools, attrs, minPrice, maxPrice }
}
