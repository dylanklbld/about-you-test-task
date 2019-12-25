import React, { FC } from 'react';

import { Filter } from '../../types/Filter';
import Foldable from './Foldable'
import ProductTile from '../ProductTile';
import { RangeSlider } from './RangeSlider'
import { debounce } from 'lodash'
import styled from 'styled-components';

interface Props {
  filters: any[];
  appliedFilterValues: any;
  updateAppliedFilters: any;
}

const FilterAreaWrapper = styled.div`
width: 100%;
height: 100%;
overflow-y:auto`

const AttributesFilterView: FC<Props> = ({ handleChange, handleReset, slug, values, filterValues }) => {
  const isChecked = (id) => {
    return filterValues.includes(id)
  }

  return <FilterAreaWrapper>
    {values.map(item => (
      <div key={item.name} className="filter-cb">
        <label>
          <input type='checkbox' name={item.name} checked={isChecked(item.id)} onChange={(e) => {
            const { checked } = e.target
            handleChange(checked, item)
          }} />
          {item.name}
        </label>
      </div>
    ))}
  </FilterAreaWrapper>
}

const RangeFilterView: FC<Props> = ({ handleChange, name, slug, values, filterValues }) => {
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
      }} />
      <div>{max}</div>
    </label>
  </FilterAreaWrapper>
}

const BooleanFilterView: FC<Props> = ({ handleChange, name, slug, filterValue }) => {
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

const FilterView: FC<Props> = ({ filters, appliedFilterValues, updateAppliedFilters, resetAppliedFilter }) => {

  const handleFiltersChange = (slug, type) => (value, item) => {
    updateAppliedFilters(slug, type, value, item || { slug: item.slug })
  }

  const handleReset = (slug, type) => {
    resetAppliedFilter(slug, type)
  }

  const getFilterAreaByTheType = ({ filter, appliedFilterValues }) => {
    const { name, type, values, slug } = filter;
    const filterValues = appliedFilterValues[type] || {};

    switch (type) {
      case 'attributes': {
        return <AttributesFilterView {...{ values, slug }} filterValues={filterValues[`${filter.slug}`] || []} handleChange={handleFiltersChange(slug, type)} />
      }
      case 'range':
        return (values[0].min !== values[0].max) ?
          <RangeFilterView name={name} filterValues={filterValues[`${filter.slug}`] || null} {...{ values, slug }} handleChange={handleFiltersChange(slug, type)} />
          : null
      case 'boolean': {
        return <BooleanFilterView name={name}
          filterValues={filterValues[`${filter.slug}`] || false}
          {...{ values, slug }} handleChange={handleFiltersChange(slug, type)} />
      }
    }
  }

  const renderFilterSection = (filter) => {
    const filterAreaComponent = getFilterAreaByTheType({ filter, appliedFilterValues })

    if (!filterAreaComponent) return null

    const { slug, name, type } = filter
    const isFilterApplied = appliedFilterValues[`${type}`] && appliedFilterValues[`${type}`][`${slug}`]

    return <div key={slug}>
      <Foldable name={name}>
        <button disabled={!isFilterApplied} onClick={() => handleReset(slug, type)}>Reset</button>
        {filterAreaComponent}
      </Foldable>
    </div>
  }

  return (
    <React.Fragment>
      <Wrapper>
        {filters.map(renderFilterSection)}
      </Wrapper>
      <button type='button'>
        Submit
      </button>
    </React.Fragment>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: rgb(242, 242, 242);
  height: 0px;
  padding-top: 133%;
  border-radius: 2px;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  height: auto;
  top: 5%;
  left: 5%;
  right: 5%;
  bottom: 5%;
  max-height: 90%;
  max-width: 90%;
  margin: auto;
  object-position: center center;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 12px;
`;

const Content = styled.div`
  line-height: 1.4em;
  padding: 15px;
`;

export default FilterView;
