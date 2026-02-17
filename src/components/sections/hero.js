import React from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const StyledHeroSection = styled.section`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: var(--border-width) solid rgba(255, 255, 255, 0.2);
  background-color: var(--c-red);
  color: var(--hero-text);
  padding: var(--layout-padding);
  padding-left: calc(var(--layout-padding) + 80px);
  justify-content: space-between;
  overflow: hidden;
  max-width: none;
  margin: 0;

  @media (max-width: 768px) {
    padding: 24px;
    padding-top: 40px;
  }

  .hero-meta {
    font-family: var(--font-code);
    font-size: 1rem;
    font-weight: 700;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 400px;
    gap: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.25);
    padding-top: 1rem;

    @media (max-width: 768px) {
      font-size: 0.7rem;
      max-width: 100%;
      gap: 0.6rem;
    }
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 400;
    text-transform: uppercase;
    line-height: 0.85;
    letter-spacing: -2px;
    margin-top: 2rem;
    color: var(--hero-text);

    @media (max-width: 768px) {
      font-size: clamp(2.2rem, 12vw, 4rem);
      letter-spacing: -1px;
    }
  }

  .header-line {
    display: block;
    overflow: hidden;
    height: 1.1em;
  }

  .header-inner {
    font-size: 1em;
    display: block;
  }

  .header-inner-2 {
    font-size: 0.65em;
    font-family: var(--font-body);
    font-style: italic;
    display: block;
    letter-spacing: 0.02em;
    text-transform: none;
  }

  .hero-subtitle-2 {
    font-family: var(--font-code);
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    max-width: 700px;
    opacity: 0.9;
    color: var(--hero-text);

    @media (max-width: 768px) {
      font-size: 0.95rem;
      margin-top: 1rem;
    }
  }

  .hero-subtitle {
    font-family: var(--font-code);
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    max-width: 700px;
    opacity: 0.9;
    color: var(--hero-text);
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      margin-top: 0.75rem;
      line-height: 1.5;
    }
  }

  .scroll-hint {
    font-family: var(--font-code);
    font-size: 0.8rem;
    letter-spacing: 4px;
    opacity: 0.5;
    text-transform: uppercase;

    @media (max-width: 768px) {
      font-size: 0.65rem;
      letter-spacing: 2px;
    }
  }
`;

const Hero = () => {
  return (
    <StyledHeroSection id="home" className="hero-panel">
      <div className="hero-meta">
        <span>PORTFOLIO VOL. 3</span>
        <span>BENGALURU</span>
        <span>FRONTEND · UI</span>
        <span>OPEN SOURCE</span>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="header-line">
            <span className="header-inner">Adithya Krishna</span>
          </span>
          <span className="header-line">
            <span className="header-inner-2">Software Engineer</span>
          </span>
        </h1>
        <p className="hero-subtitle">
          Building web3 interfaces at Noice. Open source at Reclaim & Meshery. Past: Red Hat, Tensorlake, Documenso, GSoC.
        </p>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
