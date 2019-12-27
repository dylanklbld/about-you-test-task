import React, { FC } from 'react';
import { debounce, isEmpty, omit } from 'lodash'

import { AttributesFilterView } from './FilterTypes/AttributesFilterView'
import { BooleanFilterView } from './FilterTypes/BooleanFilterView'
import Foldable from './Foldable'
import { RangeFilterView } from './FilterTypes/RangeFilterView'
import styled from 'styled-components';

interface Props {
  filters: any[];
  appliedFilterValues: any;
  updateAppliedFilters: any;
  resetAppliedFilters: any;
}

interface SalesHintProps {
  min: number;
  max: number;
}

const FilterAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y:auto`

const ResetButton = styled.button`
  &:disabled {
    opacity: 0.5;
  }
`

const Hint = styled.div`
  background: #4679BD;
  flex: auto;
  align-items: center;
  display: flex;
  min-height: 50px;
  border-radius: 4px;
  opacity:${props => props.disabled ? 0.5 : 1};
`

const SalesHint: FC<SalesHintProps> = ({ min, max, disabled }) => {
  const [minSaving, setMinSaving] = React.useState(min)
  const [maxSaving, setMaxSaving] = React.useState(max)

  const minSavinPart = minSaving !== 0 && minSaving !== maxSaving && <React.Fragment>{` from`}<strong>{`${minSaving}%`}</strong>`</React.Fragment>

  React.useEffect(() => {
    if (min !== max && max !== 0) {
      setMinSaving(min)
      setMaxSaving(max)
    }
  }, [min, max])

  return <Hint disabled={disabled}>
    {`You can save up`}{minSavinPart}{` to ${maxSaving}% upon this SALE!`}
  </Hint>
}

const FilterView: FC<Props> = ({ filters, appliedFilterValues, updateAppliedFilters, resetAppliedFilters }) => {

  const handleFiltersChange = (slug, type) => (value, item) => {
    updateAppliedFilters(slug, type, value, item || { slug: item.slug })
  }

  const handleReset = (slug, type) => resetAppliedFilters([{ slug, type }])


  const getFilterAreaByTheType = ({ filter, appliedFilterValues }) => {
    const { name, type, values, slug } = filter;
    const filterValues = appliedFilterValues[type] || {};

    switch (type) {
      case 'attributes': {
        return <AttributesFilterView {...{ values, slug }} filterValues={filterValues[`${filter.slug}`] || []} handleChange={handleFiltersChange(slug, type)} />
      }
      case 'range':
        return (values[0] && (values[0].min !== values[0].max)) ?
          <RangeFilterView name={name}
            filterValues={filterValues[`${filter.slug}`] || null}
            {...{ values, slug }} handleChange={handleFiltersChange(slug, type)} />
          : null
      case 'boolean': {
        return <BooleanFilterView name={name}
          filterValues={filterValues[`${filter.slug}`] || false}
          {...{ slug }} handleChange={handleFiltersChange(slug, type)} />
      }
    }
  }

  const renderFilterSection = (filter) => {
    const filterAreaComponent = getFilterAreaByTheType({ filter, appliedFilterValues })

    if (!filterAreaComponent) return null

    const { slug, name, type } = filter;
    const isFilterApplied = appliedFilterValues[`${type}`] && appliedFilterValues[`${type}`][`${slug}`] && !isEmpty(appliedFilterValues[`${type}`][`${slug}`])

    return <div key={slug}>
      <Foldable title={name} renderExtraButton={
        () => <ResetButton disabled={!isFilterApplied} onClick={() => handleReset(slug, type)}>Reset</ResetButton>
      }>
        {filterAreaComponent}
      </Foldable>
    </div>
  }

  const renderPriceAndSalesSection = () => {
    const priceRangeFilterData = filters.find(v => v.slug === 'prices')
    const saleFilterData = filters.find(v => v.slug === 'sale')
    const savingsPercentage = filters.find(v => v.slug === 'max_savings_percentage')

    const priceRangeFilterComponent = getFilterAreaByTheType({ filter: priceRangeFilterData, appliedFilterValues })
    const saleFilterComponent = getFilterAreaByTheType({ filter: saleFilterData, appliedFilterValues })

    const isFilterApplied = (type, slug) => appliedFilterValues[`${type}`] && appliedFilterValues[`${type}`][`${slug}`] && !isEmpty(appliedFilterValues[`${type}`][`${slug}`])
    const disableResetButton = !isFilterApplied('range', 'prices') && !isFilterApplied('boolean', 'sale')

    return <Foldable title={"Prices & Sale"} renderExtraButton={
      () => <ResetButton disabled={disableResetButton} onClick={() => {
        resetAppliedFilters([{ slug: 'prices', type: 'range' }, { slug: 'sale', type: 'boolean' }])
      }}>Reset</ResetButton>
    }>
      <div>
        {priceRangeFilterComponent}
        {saleFilterComponent}
        <SalesHint disabled={savingsPercentage.values[0].max === 0} min={savingsPercentage.values[0].min} max={savingsPercentage.values[0].max} />
      </div>
    </Foldable>
  }

  const omitSlugs = ['prices', 'sale', 'max_savings_percentage']

  // NB: here I will omit filters with slugs: 'prices', 'sale' and 'max_savings_percentage' to not render it by "renderFilterSection"
  // explanation: 
  // 1) since prices ranges are changing depends on if 'sale' filter is on
  // 2) I couldn't find how to use 'max_savings_percentage' parameter in product api request, 
  // but will to use it as a notification 
  return (
    <React.Fragment>
      <Wrapper>
        {filters.filter(f => !omitSlugs.includes(f.slug)).map(renderFilterSection)}
        {filters.length && renderPriceAndSalesSection()}
      </Wrapper>
      <button type='button'>
        Submit
      </button>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FilterView;
