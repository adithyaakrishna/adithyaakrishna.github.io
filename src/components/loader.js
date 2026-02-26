import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--navy);
  z-index: 99;
  flex-direction: column;
  gap: 16px;

  .loader-text {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--c-red);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: ${props => (props.isMounted ? 1 : 0)};
    transition: opacity 0.3s;
  }

  .loader-bar {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: rgba(217, 72, 56, 0.5);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    transition: opacity 0.3s;
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '.loader-text',
        opacity: [0, 1],
        duration: 400,
        easing: 'easeInOutQuart',
      })
      .add({
        targets: '.loader-bar',
        opacity: [0, 1],
        duration: 400,
        easing: 'easeInOutQuart',
      })
      .add({
        targets: '.loader',
        delay: 800,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="loader-text">LOADING TERMINAL...</div>
      <div className="loader-bar">[########################----]</div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
