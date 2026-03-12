import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Layout, Hero, Jobs, Featured, Skills, Thoughts, Contact } from '@components';
import { email } from '@config';

const breathe = keyframes`
  0% { transform: translate(-50%, -50%) scale(0.95) rotate(0deg); opacity: 0.25; }
  100% { transform: translate(-50%, -50%) scale(1.05) rotate(3deg); opacity: 0.4; }
`;

const StyledNoiseOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: var(--noise-opacity, 0.06);
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');
`;

const StyledGhostBlob = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vh;
  height: 50vh;
  background: radial-gradient(circle, var(--blob-color) 0%, transparent 72%);
  filter: blur(80px);
  z-index: -1;
  animation: ${breathe} 12s infinite alternate ease-in-out;
  opacity: 0.8;
`;

const StyledLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr min(720px, 100%) 1fr;
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
`;

const StyledBrandCol = styled.aside`
  position: sticky;
  top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  align-self: start;

  @media (max-width: 900px) {
    display: none;
  }

  .logo {
    font-size: 14px;
    letter-spacing: 0.05em;
    color: var(--text-main) !important;
    text-decoration: none;

    &:hover,
    &:focus {
      color: var(--accent);
    }
  }

  .coords {
    font-size: 10px;
    color: var(--accent);
    opacity: 0.6;
  }
`;

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  z-index: 10;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
`;

const StyledMetaCol = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;

  @media (max-width: 900px) {
    display: none;
  }

  .vertical-line-container {
    position: fixed;
    right: 3rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .social-link {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--accent);
    text-decoration: none;
    text-transform: lowercase;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    padding: 0.25rem 0;

    &:hover {
      color: var(--text-main);
      text-shadow: 0 0 8px var(--glow-color);
    }
  }
`;

const IndexPage = ({ location }) => {
  const blobRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = e => {
      if (!blobRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      blobRef.current.style.transform = `translate(calc(-50% + ${x * 30}px), calc(-50% + ${
        y * 30
      }px))`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout location={location}>
      <StyledNoiseOverlay />
      <StyledGhostBlob ref={blobRef} />

      <StyledLayoutGrid>
        <StyledBrandCol>
          <a href="#" className="logo">
            Adithya Krishna
          </a>
          <div className="coords">
            lat: 12.9716
            <br />
            lon: 77.5946
          </div>
        </StyledBrandCol>

        <StyledMainContent>
          <Hero />
          <Thoughts />
          <Jobs />
          {/* <Skills /> */}
          {/* <Featured /> */}
          <Contact />
        </StyledMainContent>

        <StyledMetaCol>
          <div className="vertical-line-container">
            <a href={`mailto:${email}`} className="social-link">
              {email}
            </a>
          </div>
        </StyledMetaCol>
      </StyledLayoutGrid>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
