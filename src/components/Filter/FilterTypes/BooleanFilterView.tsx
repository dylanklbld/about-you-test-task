import React, { FC } from 'react';

import { FilterAreaWrapper } from './AttributesFilterView'
import { RangeSlider } from './RangeSlider'
import { debounce } from 'lodash'

export const BooleanFilterView: FC<Props> = ({ handleChange, name, slug, filterValue }) => {
  return <FilterAreaWrapper>
    <label>
      {name}
      <input type='checkbox' name={name} checked={filterValue} value={filterValue} onChange={(e) => {
        const { checked } = e.target
        handleChange(checked, { slug })
      }} />
    </label>
  </FilterAreaWrapper>
}
