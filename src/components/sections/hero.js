import React from 'react';
import styled, { keyframes } from 'styled-components';
import { socialMedia } from '@config';

const iconMap = {
  GitHub: 'ri-github-line',
  Twitter: 'ri-twitter-x-line',
  Linkedin: 'ri-linkedin-box-line',
};

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const StyledHeroSection = styled.section`
  padding-top: 10vh;
  margin: 0;
  max-width: none;

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(41, 188, 137, 0.3);
    padding: 6px 14px;
    color: #29BC89;
    font-size: 12px;
    border-radius: 0;
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;

    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #29BC89;
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }

  .intro-text {
    font-size: 24px;
    line-height: 1.4;
    color: var(--text-main, #e8e8e8);
    margin-bottom: 2rem;
    filter: blur(0.4px);
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    max-width: none;
  }

  p {
    color: var(--text-dim, #888888);
    max-width: 100ch;
  }

  .social-chips {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .social-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 12px;
    line-height: 1;
    color: var(--text-dim, #888888);
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 8px 14px;
    transition: color 0.3s ease, border-color 0.3s ease, text-shadow 0.3s ease;

    i {
      font-size: 14px;
      line-height: 1;
    }

    &:hover {
      color: #29BC89;
      border-color: rgba(41, 188, 137, 0.35);
      text-shadow: 0 0 8px rgba(41, 188, 137, 0.3);
    }
  }
`;

const Hero = () => {
  const filteredSocials = socialMedia
    ? socialMedia.filter(({ name }) => ['GitHub', 'Twitter', 'Linkedin'].includes(name))
    : [];

  return (
    <StyledHeroSection id="home">
      <div className="status-pill">
        <span className="status-dot" />
        open to opportunities
      </div>
      <h1 className="intro-text">
        I build clear, fast products and design interfaces people trust and love to use.
      </h1>
      <p>
        Hi, I'm Adithya Krishna. I create high-performance web products and crisp, intuitive interfaces using technologies like Next.js, PixiJS, and WebGL2.<br /><br />
        <span style={{ color: '#29BC89' }}>Previously:</span> frontend at Noice, Tensorlake &amp; Reclaim Protocol, workflow automation at Documenso, and engineering at Red Hat. Meshery maintainer, GSoC '23 alum, based in Bengaluru, India.
      </p>
      <div className="social-chips">
        {filteredSocials.map(({ url, name }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-chip">
            <i className={iconMap[name] || 'ri-link'} />
            {name.toLowerCase()}
          </a>
        ))}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
