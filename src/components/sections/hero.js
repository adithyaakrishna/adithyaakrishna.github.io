import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { loaderDelay } from '@utils';

const StyledHeroSection = styled.section`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: var(--border-width) solid rgba(255, 255, 255, 0.1);
  background-color: var(--c-red);
  color: #ffffff;
  padding: var(--layout-padding);
  padding-left: calc(var(--layout-padding) + 80px);
  justify-content: space-between;
  overflow: hidden;
  max-width: none;
  margin: 0;

  @media (max-width: 768px) {
    padding-left: var(--layout-padding);
  }

  .hero-meta {
    font-family: var(--font-code);
    font-size: 1rem;
    font-weight: 700;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 400px;
    gap: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding-top: 1rem;
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 400;
    text-transform: uppercase;
    line-height: 0.85;
    letter-spacing: -2px;
    margin-top: 2rem;
    color: #ffffff;
  }
  .hero-subtitle-2 {
    font-family: var(--font-code);
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    max-width: 700px;
    opacity: 0.9;
    color: #ffffff;
  }

  .hero-subtitle {
    font-family: var(--font-code);
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    max-width: 700px;
    opacity: 0.9;
    color: #ffffff;
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  .scroll-hint {
    font-family: var(--font-code);
    font-size: 0.8rem;
    letter-spacing: 4px;
    opacity: 0.5;
    text-transform: uppercase;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <div className="hero-meta">
      <span>PORTFOLIO VOL. 1</span>
      <span>BENGALURU</span>
      <span>FULL STACK</span>
      <span>UI ENGINEERING</span>
    </div>
  );

  const two = (
    <div>
      <h1 className="hero-title">
        Adithya Krishna
      </h1>
      <h2 className="hero-subtitle-2">
        Software Engineer
      </h2>
      <p className="hero-subtitle">
        Building high-performance interfaces at the edge of web3, open-source, and design systems.
      </p>
    </div>
  );

  const items = [one, two];

  return (
    <StyledHeroSection id="home">
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledHeroSection>
  );
};

export default Hero;
