import React from 'react';
import styled from 'styled-components';

const StyledHeroSection = styled.section`
  margin-bottom: 60px;
  max-width: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 40px;
    padding: 0;
  }
`;

const StyledAbout = styled.div`
  margin-bottom: 60px;

  p {
    line-height: 1.7;
    color: var(--c-bright);
    font-size: var(--fz-md);
  }
`;

const StyledSkills = styled.div`
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 48px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-item {
    .skill-header {
      display: flex;
      justify-content: space-between;
      font-size: var(--fz-sm);
      margin-bottom: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .skill-bar {
      color: var(--c-red);
      opacity: 0.6;
      font-size: var(--fz-md);
      letter-spacing: -0.5px;
    }
  }
`;

function generateBar(percentage) {
  const total = 28;
  const filled = Math.round((percentage / 100) * total);
  const empty = total - filled;
  return `[${'#'.repeat(filled)}${'-'.repeat(empty)}]`;
}

const skills = [
  { name: 'FRONTEND_ENG', pct: 95 },
  { name: 'REACT_NEXT', pct: 92 },
  { name: 'TYPESCRIPT', pct: 90 },
  { name: 'WEBGL_PIXI', pct: 78 },
  { name: 'UI_SYSTEMS', pct: 88 },
  { name: 'OPEN_SOURCE', pct: 85 },
];

const Hero = () => (
  <StyledHeroSection>
    <StyledAbout data-section="about">
      <h2 className="terminal-header">cat about_me.txt</h2>
      <br />
      <p>
        Software engineer who cares about performance, clarity, and craft. Building token
        launching interfaces and web3 experiences at Noice using Next.js, PixiJS, and WebGL2.
        Previously shipped frontend systems at Tensorlake, Reclaim Protocol, Documenso, and
        spent ~2.5 years at Red Hat on the Customer Portal team. GSoC &apos;23 alum and
        maintainer of Meshery (CNCF).
        <span className="cursor-blink" />
      </p>
    </StyledAbout>

    <StyledSkills data-section="skills">
      <h2 className="terminal-header">./display_skills --verbose</h2>
      <br />
      <div className="skills-grid">
        {skills.map(skill => (
          <div className="skill-item" key={skill.name}>
            <div className="skill-header">
              <span>{skill.name}</span>
              <span>{skill.pct}%</span>
            </div>
            <div className="skill-bar">{generateBar(skill.pct)}</div>
          </div>
        ))}
      </div>
    </StyledSkills>
  </StyledHeroSection>
);

export default Hero;
