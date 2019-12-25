import styled, { createGlobalStyle } from 'styled-components';

import Filter from './Filter/Filter';
import Header from './Filter/Header';
import ProductStream from './ProductStream';
import React from 'react';
import { filtersMock } from '../mock'
import { useFilterLoader } from '../api/useFilterLoader';
import { useProductLoader } from '../api/useProductLoader';

const getUpdatedAttributeFilters = ({ appliedFilters, category, parameterId, isActive }) => {
  const attributeFilters = appliedFilters.attributes || {}

  const updatedAttributeFilters = attributeFilters[`${category}`] ?
    Object.assign({}, attributeFilters, {
      [`${category}`]:
        isActive ? attributeFilters[`${category}`].concat([parameterId]) :
          attributeFilters[`${category}`].filter(i => i !== parameterId)
    }) :
    Object.assign({}, attributeFilters, { [`${category}`]: [parameterId] })

  const updatedFilters = Object.assign({}, attributeFilters,
    { 'attributes': updatedAttributeFilters })

  return updatedFilters
}

const App: React.FunctionComponent = () => {
  const [filtersOpen, setFiltersOpen] = React.useState(false)
  const [appliedFilters, setAppliedFilters] = React.useState({})

  const filterPanelRef = React.useRef(null)

  const products = useProductLoader({ appliedFilters });
  const filters = useFilterLoader({ appliedFilters });

  React.useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleClick = React.useCallback((e) => {
    const { name } = e.target

    if (name !== 'openFilters')
      if (filterPanelRef.current && !filterPanelRef.current.contains(e.target)) {
        setFiltersOpen(false);
      }
  }, [])



  const updateAppliedFilters = (slug, type, value, item) => {
    console.log(slug, type, value, item)
    // apply this change to the filters data
    switch (type) {
      case 'attributes': {
        const updatedFilters = getUpdatedAttributeFilters({
          appliedFilters,
          category: slug,
          parameterId: item.id,
          isActive: value
        })

        return setAppliedFilters(updatedFilters)
      }
      default: {
        const { slug } = item
        const updatedFilters = Object.assign({}, appliedFilters, {
          [`${type}`]: {
            [`${slug}`]: value
          }
        })

        setAppliedFilters(updatedFilters)
      }
    }
  }

  const resetAppliedFilter = (slug, type) => {
    if (appliedFilters[`${type}`] && appliedFilters[`${type}`][`${slug}`]) {
      const updatedFilters = JSON.parse(JSON.stringify(appliedFilters))
      delete updatedFilters[`${type}`][`${slug}`]

      setAppliedFilters(updatedFilters)
    }
  }

  return (
    <>
      <GlobalStyle />
      <UpperPanel>
        <Header />
        <button name="openFilters" onClick={() => setFiltersOpen(!filtersOpen)}>Filter</button>
      </UpperPanel>
      <FilterSidebar isOpen={filtersOpen} ref={filterPanelRef}>
        <Filter filters={filters} appliedFilterValues={appliedFilters} {...{ updateAppliedFilters, resetAppliedFilter }} />
      </FilterSidebar>
      <Layout>
        <ProductStream products={products} />
      </Layout>
    </>
  );
};

const UpperPanel = styled.div`
  display: flex;
  flex-direction: row; 
`

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Layout = styled.article`
  padding: 0 20px;
`;

const FilterSidebar = styled.div`
  padding: ${props => props.isOpen ? "0 10px" : "none"};
  height: 100vh; /* 100% Full-height */
  width: ${props => props.isOpen ? "30vw" : "0"}; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: gray; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
`

export default App;
