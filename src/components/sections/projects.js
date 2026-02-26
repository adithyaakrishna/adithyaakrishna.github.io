import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-family: var(--font-mono);
    font-size: clamp(16px, 3vw, var(--fz-heading));
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    letter-spacing: 1px;
    color: var(--c-red);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;
    width: 100%;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    color: var(--red);
    background-color: transparent;
    border: 1px solid var(--red);
    border-radius: 0;
    padding: 1rem 1.5rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s;
    margin: 60px auto 0;

    &:hover,
    &:focus,
    &:active {
      background-color: var(--red-tint);
      outline: none;
    }
  }
`;

const StyledProject = styled.div`
  cursor: default;
  transition: var(--transition);

  &:hover,
  &:focus {
    outline: 0;
    .project-inner {
      transform: translateY(-3px);
      border-color: rgba(217, 72, 56, 0.4);
    }
  }

  .project-inner {
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 24px 20px;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    transition: all 0.3s;
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 20px;

    .folder {
      color: var(--red);
      svg {
        width: 32px;
        height: 32px;
      }
    }

    .project-links {
      margin-right: -10px;
      color: var(--c-subtle);

      a {
        padding: 5px 10px;
        transition: color 0.3s;

        &:hover {
          color: var(--red);
        }

        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .project-description {
    color: var(--c-ink);
    font-size: var(--fz-sm);
    line-height: 1.6;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: 10px;
      line-height: 1.75;
      color: var(--c-subtle);

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link>

      <TransitionGroup className="projects-grid">
        {projectsToShow &&
          projectsToShow.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { github, external, title, tech } = frontmatter;

            return (
              <CSSTransition
                key={i}
                classNames="fadeup"
                timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                exit={false}>
                <StyledProject
                  key={i}
                  ref={el => (revealProjects.current[i] = el)}
                  tabIndex="0"
                  style={{
                    transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                  }}>
                  <div className="project-inner">
                    <header>
                      <div className="project-top">
                        <div className="folder">
                          <Icon name="Folder" />
                        </div>
                        <div className="project-links">
                          {github && (
                            <a href={github} aria-label="GitHub Link">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {external && (
                            <a href={external} aria-label="External Link">
                              <Icon name="External" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="project-title">{title}</h3>

                      <div
                        className="project-description"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </header>

                    <footer>
                      {tech && (
                        <ul className="project-tech-list">
                          {tech.map((t, j) => (
                            <li key={j}>{t}</li>
                          ))}
                        </ul>
                      )}
                    </footer>
                  </div>
                </StyledProject>
              </CSSTransition>
            );
          })}
      </TransitionGroup>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
