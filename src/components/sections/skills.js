import React from 'react';
import styled from 'styled-components';

const StyledSkillsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  max-width: none;
  width: 100%;
  overflow-wrap: break-word;

  .section-header {
    font-size: 12px;
    color: #29BC89;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    &::after {
      content: '';
      height: 1px;
      flex-grow: 1;
      background: var(--text-dim, #555555);
      opacity: 0.2;
    }
  }

  .skills-block {
    font-size: 14px;
    line-height: 2;
    color: var(--text-dim, #555555);
  }

  .skill {
    color: var(--text-main, #d4d4d4);
    transition: color 0.2s;

    &:hover {
      color: #fff;
      text-decoration: line-through;
    }
  }
`;

const skills = [
  'typescript',
  'react.js',
  'next.js',
  'pixijs',
  'webgl2',
  'tailwind css',
  'framer motion',
  'playwright',
  'jest',
  'postgresql',
  'mongodb',
  'firebase',
  'docker',
  'kubernetes',
  'git',
  'github actions',
  'figma',
];

const Skills = () => (
  <StyledSkillsSection id="skills">
    <div className="section-header">technical_stack</div>
    <div className="skills-block">
      {skills.map((skill, i) => (
        <React.Fragment key={skill}>
          <span className="skill">{skill}</span>
          {i < skills.length - 1 && ' / '}
        </React.Fragment>
      ))}
    </div>
  </StyledSkillsSection>
);

export default Skills;
