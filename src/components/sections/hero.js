import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'gatsby';
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
  padding-top: 0.5vh;
  margin: 0;
  max-width: none;
  width: 100%;
  overflow-wrap: break-word;

  @media (max-width: 600px) {
    padding-top: 4vh;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(29, 127, 83, 0.2);
    background: var(--accent-tint);
    padding: 6px 14px;
    color: var(--accent);
    font-size: 12px;
    border-radius: 0;
    margin-bottom: 0;
    letter-spacing: 0.05em;

    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--accent);
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }

  .status-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .status-link {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 12px;
    line-height: 1;
    color: var(--text-dim, #888888);
    text-decoration: none;
    border: 1px solid var(--border-color);
    background: var(--surface-bg);
    padding: 8px 14px;
    transition: color 0.3s ease, border-color 0.3s ease, text-shadow 0.3s ease;

    &:hover {
      color: var(--accent);
      border-color: var(--border-color-strong);
      text-shadow: 0 0 8px var(--glow-color);
    }
  }

  .status-link--primary {
    border-color: rgba(29, 127, 83, 0.2);
    background: var(--accent-tint);
    color: var(--accent);
    font-weight: 500;
    letter-spacing: 0.05em;
    font-size: 13px;
    padding: 7px 18px;
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

    @media (max-width: 600px) {
      font-size: 18px;
    }
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
    border: 1px solid var(--border-color);
    background: var(--surface-bg);
    padding: 8px 14px;
    transition: color 0.3s ease, border-color 0.3s ease, text-shadow 0.3s ease;

    i {
      font-size: 14px;
      line-height: 1;
    }

    &:hover {
      color: var(--accent);
      border-color: var(--border-color-strong);
      text-shadow: 0 0 8px var(--glow-color);
    }
  }
`;

const Hero = () => {
  const filteredSocials = socialMedia
    ? socialMedia.filter(({ name }) => ['GitHub', 'Twitter', 'Linkedin'].includes(name))
    : [];

  return (
    <StyledHeroSection id="home">
      <div
        className="status-actions"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: '1rem',
        }}>
        <div className="status-pill">
          <span className="status-dot" />
          <span style={{ fontWeight: 600 }}>open to opportunities</span>
        </div>
        <div className="status-links" style={{ display: 'flex', gap: '0.8rem' }}>
          <Link to="/snippets" className="status-link status-link--primary">
            snippets
          </Link>
          <Link to="/snippets/ux-laws" className="status-link status-link--primary">
            laws of ux
          </Link>
        </div>
      </div>
      <h1 className="intro-text">
        I build clear, fast products and design interfaces people trust and love to use.
      </h1>
      <p>
        Hi, I'm Adithya Krishna. I create high-performance web products and crisp, intuitive
        interfaces using technologies like Next.js, PixiJS, and WebGL2.
        <br />
        <br />
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Previously:</span> frontend at{' '}
        <a
          href="https://noice.so"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          Noice
        </a>
        {', '}
        <a
          href="https://tensorlake.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          Tensorlake
        </a>
        {' & '}
        DX engineer at Reclaim Protocol, Software engineer at Documenso, and{' '}
        <a
          href="https://redhat.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          Red Hat
        </a>
        . Meshery maintainer, GSoC '23 alum, based in Bengaluru, India.
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
