import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import adiLoadingAnimation from './loading.json';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 99;
  opacity: ${props => (props.isFading ? 0 : 1)};
  transition: opacity 0.4s ease-out;

  .lottie-wrapper {
    width: 200px;
    height: 200px;
    filter: invert(1);
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  useEffect(() => {
    const mountTimeout = setTimeout(() => setIsMounted(true), 10);
    const fadeTimeout = setTimeout(() => setIsFading(true), 2200);
    const doneTimeout = setTimeout(() => finishLoading(), 2600);
    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(doneTimeout);
    };
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted} isFading={isFading}>
      <Helmet bodyAttributes={{ class: 'hidden' }} />
      <div className="lottie-wrapper">
        <Lottie animationData={adiLoadingAnimation} loop />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
