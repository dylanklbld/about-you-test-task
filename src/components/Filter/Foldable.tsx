import React, { FC } from 'react';

import { Product } from '../../types/Product';
import ProductTile from '../ProductTile';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2.5px;
  width: 100%;
  
  > * {
    padding: 10px 2.5px 0;
    @media (min-width: 768px) {
      width: 33%;
    }
    @media (min-width: 1024px) {
      width: 25%;
    }
  }
`;

const UnfoldedArea = styled.div`
  max-height: 300px;
  overflow: hidden;
  width: 100%;
`

const FoldButton = styled.div`
   display:flex;
   padding: 0.3em 0.5em;
   border-radius:0.12em;
   box-sizing: border-box;
   text-decoration:none;
   font-family:'Roboto',sans-serif;
   font-weight:300;
   color:#FFFFFF;
   text-align:center;
   transition: all 0.2s;
   width: 100%;
   text-align: left;

  :hover {
    color:#000000;
    background-color:#FFFFFF;
    cursor: pointer;
  }

  :before {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 15px;
    border-color: transparent transparent transparent #007bff;
  }

  @media all and (max-width:30em){
    display:block;
    margin:0.4em auto;
  }
`

const Header = styled.div`
  border-radius: 2px;
  background: #ffffff85;

  :hover {
    color:#000000;
    background-color:#FFFFFF;
  }
`

const Triangle = styled.div`
  margin: 0 10px 0px 0px;
  align-self: center;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${props => props.isFolded ? "5px 0 5px 10px" : "10px 7.5px 0 7.5px"};
  border-color:${props => props.isFolded ? "transparent transparent transparent #3c3d3e" : " #3c3d3e transparent transparent transparent"};
  transition: all 0.2s;
`



interface Props {
  name: string;
}

const Foldable: FC<Props> = ({ name, children }) => {
  const [isFolded, setIsFolded] = React.useState(true)

  return (
    <React.Fragment>
      <Header>
        <FoldButton onClick={() => setIsFolded(!isFolded)} >
          <Triangle isFolded={isFolded} />
          {name}
        </FoldButton>
      </Header>
      <Wrapper>
        {!isFolded ? <UnfoldedArea>{children}</UnfoldedArea> : <div />}
      </Wrapper>
    </React.Fragment>
  );
};

export default Foldable;
