import styled, { createGlobalStyle } from 'styled-components';

import Filter from './Filter/Filter';
import Header from './Header';
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
    const updatedFilters = JSON.parse(JSON.stringify(appliedFilters))

    if (appliedFilters[`${type}`] && appliedFilters[`${type}`][`${slug}`]) {
      delete updatedFilters[`${type}`][`${slug}`]

      setAppliedFilters(updatedFilters)
    }
  }

  const resetAppliedFilters = (resetFilters) => {
    const updatedFilters = JSON.parse(JSON.stringify(appliedFilters))

    resetFilters.map(rf => {
      if (appliedFilters[`${rf.type}`] && appliedFilters[`${rf.type}`][`${rf.slug}`]) {
        delete updatedFilters[`${rf.type}`][`${rf.slug}`]
      }
    })

    setAppliedFilters(updatedFilters)
  }

  return (
    <>
      <GlobalStyle />
      <UpperPanel>
        <Header />
        <FilterButton name="openFilters" onClick={() => setFiltersOpen(!filtersOpen)}>Filter</FilterButton>
      </UpperPanel>
      <FilterSidebar isOpen={filtersOpen} ref={filterPanelRef}>
        <Filter filters={filters} appliedFilterValues={appliedFilters} {...{ updateAppliedFilters, resetAppliedFilters }} />
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
  justify-content: space-between;
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
  background-color: #8a8888;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
`
const FilterButton = styled.button`
font-family: 'Open Sans Condensed';
  font-weight: 700;
  background: #333333;
  display: inline-block;
  color: #fff;
  width: 25vw;
`

export default App;
