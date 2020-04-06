import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled, { css } from 'styled-components';

// TODO: replace with navigation routes from site
const routes = [
  { displayName: 'Home', path: '/' },
  { displayName: 'About', path: '/about' },
  { displayName: 'Posts', path: '/posts' }
];

const navHeight = '54px';

const NavContainer = styled.nav`
  align-items: center;
  background-color: ${p => p.theme.colors.white};
  border-bottom: 1px solid ${p => p.theme.colors.darken};
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
  margin: 0 ${p => p.theme.space[4]};
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
  color: ${p => p.theme.colors.textDark};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${p => p.theme.colors.accent};
  }

  ${p =>
    p.isActive &&
    css`
      color: ${p => p.theme.colors.accent};
    `}
`;

function NavItems() {
  const router = useRouter();

  const isActiveRoute = path => path === router.pathname;

  return routes
    .filter(route => route.displayName)
    .map(route => (
      <NavItem key={route.path}>
        <Link href={route.path} passHref>
          <StyledNavLink isActive={isActiveRoute(route.path)}>
            {route.displayName}
          </StyledNavLink>
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
