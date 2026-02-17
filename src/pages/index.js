import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About } from '@components';
import { socialMedia, email } from '@config';

const StyledHomeLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const StyledLeftRail = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80px;
  border-right: var(--border-width) solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  z-index: 100;
  background: var(--c-cream);

  @media (max-width: 768px) {
    display: none;
  }

  .vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-family: var(--font-code);
    font-size: 0.8rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--c-ink);
    opacity: 0.6;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .social-link {
    writing-mode: vertical-rl;
    text-decoration: none;
    color: var(--c-ink);
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: 1px;
    margin: 10px 0;
    transition: color 0.3s;
    font-size: 0.85rem;
    text-transform: uppercase;

    &:hover {
      color: var(--c-red);
    }
  }

  .rail-divider {
    width: 1px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    margin: 20px 0;
  }

  .email-link {
    writing-mode: vertical-rl;
    text-decoration: none;
    color: var(--c-ink);
    font-family: var(--font-code);
    font-size: 0.7rem;
    opacity: 0.6;
    transition: color 0.3s;

    &:hover {
      color: var(--c-red);
      opacity: 1;
    }
  }
`;

const StyledHorizontalScroller = styled.div`
  display: flex;
  width: 200vw;
  height: 100vh;
  transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;

  & > * {
    flex-shrink: 0;
    width: 100vw;
    height: 100vh;
  }
`;

const StyledRightRail = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background: #1a1a1a;
  border-left: var(--border-width) solid rgba(255, 255, 255, 0.1);
  z-index: 100;

  @media (max-width: 768px) {
    display: none;
  }

  .minimap-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .minimap-indicator {
    width: 4px;
    background: var(--c-red);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: height 0.3s;
    top: 0;
  }
`;

const IndexPage = ({ location }) => {
  const scrollerRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const container = scrollerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.overflow = 'hidden';

    let currentPanel = 0;
    let isTransitioning = false;

    const goToPanel = panel => {
      if (isTransitioning || panel === currentPanel) return;
      isTransitioning = true;
      currentPanel = panel;
      container.style.transform = `translateX(-${panel * 100}vw)`;
      indicator.style.height = `${panel * window.innerHeight}px`;
      setTimeout(() => {
        isTransitioning = false;
      }, 750);
    };

    const handleWheel = evt => {
      const articlePanel = document.getElementById('article-panel');
      const isOnArticle = articlePanel && articlePanel.contains(evt.target);

      if (isOnArticle) {
        const contentArea = articlePanel.querySelector('.content-area');
        if (contentArea) {
          const atTop = contentArea.scrollTop <= 1;
          const scrollingUp = evt.deltaY < 0;

          if (atTop && scrollingUp) {
            evt.preventDefault();
            goToPanel(0);
            return;
          }
        }
        return;
      }

      evt.preventDefault();
      if (evt.deltaY > 0) {
        goToPanel(1);
      }
    };

    const handleKeyDown = evt => {
      if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
        goToPanel(1);
      } else if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') {
        goToPanel(0);
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredSocials = socialMedia
    ? socialMedia.filter(({ name }) => ['Twitter', 'GitHub', 'Linkedin'].includes(name))
    : [];

  return (
    <Layout location={location}>
      <StyledHomeLayout>
        <StyledLeftRail>
          <div className="vertical-text">Est. 1999</div>
          <div className="social-links">
            {filteredSocials.map(({ url, name }) => (
              <a
                key={name}
                href={url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer">
                {name.toUpperCase()}
              </a>
            ))}
            <div className="rail-divider" />
            <a href={`mailto:${email}`} className="email-link">
              {email}
            </a>
          </div>
        </StyledLeftRail>

        <StyledHorizontalScroller ref={scrollerRef} id="scrollContainer">
          <Hero />
          <About />
        </StyledHorizontalScroller>

        <StyledRightRail>
          <div className="minimap-container">
            <div className="minimap-indicator" ref={indicatorRef} />
          </div>
        </StyledRightRail>
      </StyledHomeLayout>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
