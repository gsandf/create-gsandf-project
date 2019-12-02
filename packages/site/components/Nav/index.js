import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

// TODO: replace with navigation routes from site
const routes = [
  { displayName: 'Home', path: '/' },
  { displayName: 'About', path: '/about' },
  { displayName: 'Posts', path: '/posts' }
];

const navHeight = '54px';

const NavContainer = styled.nav`
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  box-sizing: border-box;
  display: flex;
  height: ${navHeight};
  justify-content: center;
  position: fixed;
  width: 100%;
`;

const NavList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  margin: 0 16px;
  max-width: 800px;
  padding: 0;

  @media (min-width: 832px) {
    margin: 0 auto;
    max-width: 800px;
  }
`;

const NavItem = styled.li`
  display: inline-block;
  list-style: none;
`;

const Spacer = styled.div`
  height: ${navHeight};
  width: 100%;
`;

const StyledNavLink = styled.a`
  color: inherit;
  cursor: pointer;
  opacity: 0.5;
  text-decoration: none;

  &.active {
    opacity: 1;
  }
`;

function NavItems() {
  return routes
    .filter(route => route.displayName)
    .map(route => (
      <NavItem key={route.path}>
        <Link href={route.path}>
          <StyledNavLink>{route.displayName}</StyledNavLink>
        </Link>
      </NavItem>
    ));
}

function Nav() {
  return (
    <>
      <NavContainer>
        <NavList>
          <NavItems />
        </NavList>
      </NavContainer>

      <Spacer />
    </>
  );
}

export default Nav;
