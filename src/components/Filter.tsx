import React, { FC } from 'react';

import { Filter } from '../types/Filter';
import ProductTile from './ProductTile';
import styled from 'styled-components';

interface Props {
  filters: any[];
  appliedFilterValues: any[];
  updateAppliedFilters: any;
}

const AttributesFilterView: FC<Props> = ({ handleChange, values, filterValues }) => {
  const isChecked = (name) => filterValues.filter(i => i.name === name) && filterValues.filter(i => i.name === name).value

  return <Wrapper>
    {values.map(item => (
      <div key={item.name}>
        <label>
          {item.name}
          <input type='checkbox' name={item.name} checked={isChecked(name)} onChange={handleChange} />
        </label>
      </div>
    ))}
  </Wrapper>
}

const RangeFilterView: FC<Props> = ({ handleChange, name, values, filterValue }) => {
  const { min, max } = values[0]
  return <Wrapper>
    <label>
      {name}
      <input type='range' value={filterValue} min={min} max={max} onChange={handleChange} />
    </label>
  </Wrapper>
}

const BooleanFilterView: FC<Props> = ({ handleChange, name, filterValue }) => {
  return <Wrapper>
    <label>
      {name}
      <input type='checkbox' name={name} checked={filterValue} onChange={handleChange} />
    </label>
  </Wrapper>
}

const FilterView: FC<Props> = ({ filters, appliedFilterValues, updateAppliedFilters }) => {

  const handleFiltersChange = (slug, type) => (e) => {
    const { name, value } = e.target

    updateAppliedFilters(slug, type, name, value)
  }

  const getFilterAreaByTheType = ({ filter, appliedFilterValues }) => {
    const type = filter.type;
    const filterValues = appliedFilterValues;
    const values = filter.values;

    switch (type) {
      case 'attributes': {
        return <AttributesFilterView {...{ values, filterValues }} handleChange={handleFiltersChange(filter.slug, type)} />
      }
      case 'range':
        return <RangeFilterView name={filter.name} {...{ values, filterValues }} handleChange={handleFiltersChange(filter.slug, type)} />
      case 'boolean':
        return <BooleanFilterView name={filter.name} {...{ values, filterValues }} handleChange={handleFiltersChange(filter.slug, type)} />
    }
  }

  return (
    <Wrapper>
      {filters.map(filter => <div key={filter.slug}>{getFilterAreaByTheType({ filter, appliedFilterValues })}</div>)}
    </Wrapper>
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
