import '../styles/ColoredCheckbox.css'

import React, { FC } from 'react';
import { debounce, isEmpty } from 'lodash'

import { colorSetEng } from '../../../utils/colorSet.js'
import styled from 'styled-components';

export const FilterAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y:auto`

const MixedColorCbSpan = styled.div`
backgroundColor: red;
    background: -webkit-linear-gradient(left, orange , yellow, green, cyan, blue, violet);
    background: -o-linear-gradient(right, orange, yellow, green, cyan, blue, violet);
    background: -moz-linear-gradient(right, orange, yellow, green, cyan, blue, violet);
    background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);
`
const QuickSearchInput = styled.input`
width: 100%;
margin: 6px;
`

const toTitleCase = (str) => {
  return str.replace(/(^|\s)\S/g, function (t) { return t.toUpperCase() });
}

const sortByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

const DefaultFilterPropertyView: FC<Props> = ({ item, checked, onChange }) => (
  <div key={item.name} className="filter-cb">
    <label className="container">
      <input type='checkbox' name={item.name} {...{ checked, onChange }} />
      {item.name}
      <span className="checkmark"></span>
    </label>
  </div>
)

const ColorFilterPropertyView: FC<Props> = ({ item, checked, onChange }) => (
  <div key={item.name} className="filter-cb">
    <label className="container">
      <input type='checkbox' name={item.name} {...{ checked, onChange }} />
      {toTitleCase(item.name)}
      {colorSetEng[item.name] !== 'mixedColor' ? <span className="checkmark" style={{ backgroundColor: colorSetEng[item.name] }} />
        : <MixedColorCbSpan />}
    </label>
  </div>
)

export const AttributesFilterView: FC<Props> = ({ handleChange, handleReset, slug, values, filterValues }) => {
  const [simpleSearchQuery, setSimpleSearchQuery] = React.useState('')

  const isChecked = (id) => {
    return filterValues.includes(id)
  }

  const debouncedChange = debounce((value) => {
    setSimpleSearchQuery(value)
  }, 200)

  const getDefaultFilterPropertyView = (item) => <DefaultFilterPropertyView key={item.id} item={item} checked={isChecked(item.id)} onChange={(e) => {
    const { checked } = e.target
    handleChange(checked, item)
  }} />

  const getColorFilterPropertyView = (item) => <ColorFilterPropertyView key={item.id} item={item} checked={isChecked(item.id)} onChange={(e) => {
    const { checked } = e.target
    handleChange(checked, item)
  }} />

  return <FilterAreaWrapper>
    {slug === 'color' ?
      values.sort(sortByName).map(getColorFilterPropertyView)
      :
      <React.Fragment>
        <QuickSearchInput type='text' value={simpleSearchQuery} placeholder={"Quick search for paramteres you need"} onChange={(e) => debouncedChange(e.target.value)} />
        {values.filter(v => {
          if (simpleSearchQuery) return v.name.toLowerCase().startsWith(simpleSearchQuery.toLowerCase())
          return true
        }).sort(sortByName).map(getDefaultFilterPropertyView)}
      </React.Fragment>

    }
  </FilterAreaWrapper>
}

export default AttributesFilterView
