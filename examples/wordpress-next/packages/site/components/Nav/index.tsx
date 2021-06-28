import Link from 'next/link';
import { transparentize } from 'polished';
import React from 'react';
import styled from 'styled-components';

// TODO: replace with navigation routes from site.
const routes = [
  { displayName: 'Home', path: '/' },
  { displayName: 'About', path: '/about' },
  { displayName: 'Posts', path: '/posts' }
];

const NavContainer = styled.nav`
  align-items: center;
  background-color: ${p => transparentize(0.4, p.theme.colors.dark)};
  backdrop-filter: blur(${p => p.theme.space[3]});
  box-sizing: border-box;
  display: flex;
  height: ${p => p.theme.sizes.sm};
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
  height: ${p => p.theme.sizes.sm};
  width: 100%;
`;

const StyledNavLink = styled.a`
  color: ${p => p.theme.colors.textLight};
  cursor: pointer;
  padding-bottom: ${p => p.theme.space[2]};
  text-decoration: none;
  transition: all 200ms ease-out;

  &:hover {
    box-shadow: 0 2px 0 0 ${p => p.theme.colors.textLight};
  }
`;

function NavItems() {
  return (
    <>
      {routes
        .filter(route => route.displayName)
        .map(route => (
          <NavItem key={route.path}>
            <Link href={route.path} passHref>
              <StyledNavLink>{route.displayName}</StyledNavLink>
            </Link>
          </NavItem>
        ))}
    </>
  );
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
