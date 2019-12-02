import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerCircle = styled.div`
  animation: ${rotate} 2s linear infinite;
  border-color: transparent tomato tomato tomato;
  border-radius: 50% 50%;
  border-style: solid;
  border-width: 2px;
  height: 10vmin;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10vmin;
`;

function Spinner({ timeout = 1000 }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), timeout);

    return () => {
      clearTimeout(timer);
      setShowSpinner(false);
    };
  }, [timeout]);

  return showSpinner ? <SpinnerCircle /> : null;
}

Spinner.propTypes = {
  timeout: PropTypes.number
};

export default Spinner;
