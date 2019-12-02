import PropTypes from 'prop-types';
import React from 'react';
import Nav from '../components/Nav';

function Basic({ children }) {
  return (
    <>
      <Nav />

      <main>{children}</main>
    </>
  );
}

Basic.propTypes = {
  children: PropTypes.node.isRequired
};

export default Basic;
