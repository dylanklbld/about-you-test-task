import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Wrapper>
      <Logo>
        ABOUT <span />
        YOU
      </Logo>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 10px 20px;
  @media (min-width: 1024px) {
    text-align: center;
  }
`;

const Logo = styled.div`
  font-family: 'Open Sans Condensed';
  font-weight: 700;
  background: #333333;
  display: inline-block;
  color: #fff;
  font-size: 30px;
  line-height: 30px;
  padding-right: 18px;
  padding-left: 4px;
  text-align: center;
  white-space: nowrap;
  display: inline-block;
  letter-spacing: -0.02em;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='141' height='141' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M70.7.6C32 .6.5 32.1.5 70.8S32 141 70.7 141s70.2-31.5 70.2-70.2S109.5.6 70.7.6zm0 119.4c-27.1 0-49.2-22-49.2-49.2 0-27.2 22-49.2 49.2-49.2 9.8 0 18.8 2.9 26.5 7.8L75.5 51l15 15 21.6-21.6c4.9 7.6 7.8 16.7 7.8 26.4 0 27.1-22.1 49.2-49.2 49.2z' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-position: 97% 4px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
  padding-bottom: 3px;

  > span {
    display: inline-block;
    background: #fff;
    width: 2px;
    height: 37px;
    margin: 0px 5px -7px -1px;
  }
`;

export default Header;
