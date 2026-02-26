import React from 'react';
import styled from 'styled-components';
import { email } from '@config';

const StyledAboutSection = styled.section`
  max-width: 720px;
  padding: 0;

  .terminal-header {
    margin-bottom: 24px;
  }

  .about-text {
    font-size: var(--fz-md);
    line-height: 1.8;
    color: var(--c-ink);
    max-width: 640px;

    p {
      margin-bottom: 16px;
    }
  }

  .contact-link {
    display: inline-block;
    margin-top: 24px;
    padding: 12px 20px;
    border: 1px solid var(--border-color);
    color: var(--c-red);
    font-size: var(--fz-sm);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.2s;

    &:hover {
      background: rgba(217, 72, 56, 0.08);
      border-color: var(--c-red);
    }
  }
`;

const About = () => (
  <StyledAboutSection id="about">
    <h2 className="terminal-header">cat about_me.txt</h2>
    <div className="about-text">
      <p>
        I&apos;m Adithya Krishna. I build token launching interfaces and web3 experiences
        at Noice using Next.js, PixiJS, and WebGL2. I care about performant UIs,
        clean architecture, and shipping fast.
      </p>
      <p>
        Before Noice, I shipped frontend systems at Tensorlake and Reclaim Protocol,
        shaped document signing UX at Documenso, and spent ~2.5 years at Red Hat
        on the Customer Portal team. I&apos;m a GSoC &apos;23 alum (OpenChemistry / 3DMol.js)
        and a maintainer of Meshery, a CNCF Sandbox Project.
      </p>
    </div>
    <a className="contact-link" href={`mailto:${email}`}>
      Get In Touch →
    </a>
  </StyledAboutSection>
);

export default About;
