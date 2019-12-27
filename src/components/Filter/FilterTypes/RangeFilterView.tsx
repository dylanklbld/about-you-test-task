import React, { FC } from 'react';

import { FilterAreaWrapper } from './AttributesFilterView'
import { RangeSlider } from './RangeSlider'
import { debounce } from 'lodash'

export const RangeFilterView: FC<Props> = ({ handleChange, name, slug, values, filterValues }) => {
  const { min, max } = values[0]

  const debouncedChange = debounce((value) => {
    handleChange(value, { slug })
  }, 200)

  return <FilterAreaWrapper>
    <label>
      {name}
      <div>{min}</div>
      <RangeSlider value={filterValues || { min, max }} min={min} max={max} onChange={(value) => {
        debouncedChange(value)
      }} step={name === 'prices' ? 100 : 1} />
      <div>{max}</div>
    </label>
  </FilterAreaWrapper>
}
