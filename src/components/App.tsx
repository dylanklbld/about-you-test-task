import styled, { createGlobalStyle } from 'styled-components';

import Filter from './Filter';
import Header from './Header';
import ProductStream from './ProductStream';
import React from 'react';
import { filtersMock } from '../mock'
import { useFilterLoader } from '../api/useFilterLoader';
import { useProductLoader } from '../api/useProductLoader';

const App = () => {
  const products = useProductLoader();
  //const filters = useFilterLoader();

  const [appliedFilters, setAppliedFilters] = React.useState({})

  // React.useEffect(() => {
  //   const loadFiltersSimple = async () => await loadFiltersSimple()
  //   loadFiltersSimple()
  // }, [])


  // React.useEffect(() => {
  //   console.log(filters)
  // }, [filters])

  const updateAppliedFilters = (section, type, name, value) => {
    console.log(section, type, name, value)
    // apply this change to the filters ddata
    const appliedFilters = type !== 'range' ? appliedFilters[`${section}`][`${name}`] : appliedFilters33
  }

  const f = filtersMock

  return (
    <>
      <GlobalStyle />
      <Header />
      <button>Filter</button>
      <Filter filters={f} appliedFilterValues={appliedFilters} updateAppliedFilters={updateAppliedFilters} />
      <Layout>
        <ProductStream products={products} />
      </Layout>
    </>
  );
};

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

export default App;
