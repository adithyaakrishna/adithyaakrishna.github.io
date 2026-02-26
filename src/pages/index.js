import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, Jobs, Featured, Contact } from '@components';
import { socialMedia, email } from '@config';

const StyledTerminalLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const StyledGridOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
`;

const StyledSidebar = styled.aside`
  width: 25%;
  min-width: 240px;
  max-width: 320px;
  height: 100vh;
  border-right: 1px solid var(--border-color);
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }

  .version-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--c-red);
    font-weight: 700;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-section-label {
    margin-bottom: 12px;
    opacity: 0.4;
    font-size: var(--fz-xs);
    letter-spacing: 0.2em;
  }

  .nav-link {
    padding: 8px 12px;
    font-size: var(--fz-sm);
    color: var(--c-subtle);
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: all 0.2s ease;
    display: block;

    &:hover {
      color: var(--c-red);
      background-color: rgba(217, 72, 56, 0.08);
      border-left-color: var(--c-red);
    }

    &.active {
      color: var(--c-red);
      background-color: rgba(217, 72, 56, 0.08);
      border-left-color: var(--c-red);
    }
  }

  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .location-info {
    font-size: var(--fz-sm);
    line-height: 2;

    .label {
      color: var(--c-red);
    }
  }

  .social-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;
    font-size: var(--fz-sm);

    a {
      color: var(--c-subtle);
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--c-red);
      }
    }
  }
`;

const StyledMobileHeader = styled.header`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    position: sticky;
    top: 0;
    z-index: 50;

    .mobile-logo {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: var(--c-red);
      font-weight: 700;
    }

    .mobile-nav-toggle {
      background: none;
      border: 1px solid var(--border-color);
      color: var(--c-subtle);
      font-family: var(--font-mono);
      font-size: 10px;
      padding: 6px 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: var(--c-red);
        border-color: var(--c-red);
      }
    }
  }
`;

const StyledMobileNav = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    padding: 16px 20px;
    gap: 4px;
    background: rgba(255, 255, 255, 0.98);
    border-bottom: 1px solid var(--border-color);

    a {
      padding: 10px 12px;
      font-size: var(--fz-sm);
      color: var(--c-subtle);
      text-decoration: none;
      border-left: 2px solid transparent;
      transition: all 0.2s;

      &:hover {
        color: var(--c-red);
        border-left-color: var(--c-red);
      }
    }
  }
`;

const StyledMain = styled.main`
  flex: 1;
  height: 100vh;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 48px;
  overflow-y: auto;
  min-height: auto;
  max-width: none;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }

  @media (max-width: 1080px) {
    padding: 40px 32px;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: auto;
    padding: 24px 20px;
    overflow: visible;
  }
`;

const StyledVerticalName = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
  padding-right: 24px;
  z-index: 5;

  @media (max-width: 1200px) {
    display: none;
  }

  h1 {
    font-size: 15vh;
    line-height: 1;
    color: rgba(217, 72, 56, 0.08);
    letter-spacing: -0.05em;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-family: var(--font-decorative);
    font-style: italic;
    font-weight: 400;
    user-select: none;
    margin: 0;
  }
`;

const StyledTerminalFooter = styled.footer`
  margin-top: auto;
  padding-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 10px;
  letter-spacing: 0.2em;
  opacity: 0.4;
  border-top: 1px solid var(--border-color);
  padding-bottom: 0;

  .footer-left,
  .footer-right {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .footer-right {
    text-align: right;
  }
`;

const navItems = [
  { id: 'about', label: '> ABOUT.md', href: '#about' },
  { id: 'skills', label: '> SKILLS.exe', href: '#skills' },
  { id: 'experience', label: '> EXPERIENCE/', href: '#experience' },
  { id: 'projects', label: '> PROJECTS/', href: '#projects' },
  { id: 'contact', label: '> CONTACT.sh', href: '#contact' },
];

const IndexPage = ({ location }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const mainEl = document.getElementById('terminal-main');
    if (!mainEl) return;

    const handleScroll = () => {
      const sections = mainEl.querySelectorAll('[data-section]');
      let current = 'about';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
          current = section.dataset.section;
        }
      });
      setActiveSection(current);
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId, e) => {
    if (e) e.preventDefault();
    setMobileNavOpen(false);
    const mainEl = document.getElementById('terminal-main');
    const section = mainEl?.querySelector(`[data-section="${sectionId}"]`);
    if (section && mainEl) {
      const offset = section.offsetTop - mainEl.offsetTop;
      mainEl.scrollTo({ top: offset - 20, behavior: 'smooth' });
    }
  };

  const filteredSocials = socialMedia
    ? socialMedia.filter(({ name }) => ['GitHub', 'Linkedin', 'Twitter'].includes(name))
    : [];

  return (
    <Layout location={location}>
      <StyledTerminalLayout>
        <StyledGridOverlay />

        <StyledSidebar>
          <div className="version-label">TERMINAL_V3.0.26</div>

          <div className="sidebar-nav">
            <div className="nav-section-label">[ NAVIGATION ]</div>
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={e => scrollToSection(item.id, e)}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="location-info">
              <span className="label">LOC:</span> BENGALURU, IN<br />
              <span className="label">STATUS:</span> BUILDING_AT_NOICE
            </div>
            <div className="social-links">
              {filteredSocials.map(({ url, name }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                  [{name.toUpperCase()}]
                </a>
              ))}
              <a href={`mailto:${email}`}>[EMAIL]</a>
            </div>
          </div>
        </StyledSidebar>

        <StyledMobileHeader>
          <span className="mobile-logo">ADITHYA_TERMINAL</span>
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? 'CLOSE' : 'MENU'}
          </button>
        </StyledMobileHeader>

        <StyledMobileNav isOpen={mobileNavOpen}>
          {navItems.map(item => (
            <a
              key={item.id}
              href={item.href}
              onClick={e => scrollToSection(item.id, e)}>
              {item.label}
            </a>
          ))}
        </StyledMobileNav>

        <StyledMain id="terminal-main">
          <Hero />
          <Jobs />
          <Featured />
          <Contact />

          <StyledVerticalName>
            <h1>adithya</h1>
          </StyledVerticalName>

          <StyledTerminalFooter>
            <div className="footer-left">
              <span>SYST_MONITOR: OK</span>
              <span>UPTIME: STABLE</span>
            </div>
            <div className="footer-right">
              <span>&copy; ADITHYA_TERMINAL_ENV</span>
              <span>V.26.0.0</span>
            </div>
          </StyledTerminalFooter>
        </StyledMain>
      </StyledTerminalLayout>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
