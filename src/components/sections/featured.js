import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledFeaturedSection = styled.section`
  margin-bottom: 60px;
  max-width: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .project-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border: 1px solid var(--border-color);
    border-bottom: none;
    transition: all 0.2s ease;
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    &:last-child {
      border-bottom: 1px solid var(--border-color);
    }

    &:hover {
      border-color: rgba(217, 72, 56, 0.4);
      background: rgba(217, 72, 56, 0.03);
      color: inherit;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  .project-left {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .project-permission {
    color: var(--c-red);
    font-size: var(--fz-xs);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .project-title {
    color: var(--c-bright);
    font-size: var(--fz-md);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      white-space: normal;
    }
  }

  .project-tech {
    font-size: 10px;
    color: var(--c-subtle);
    white-space: nowrap;
    opacity: 0.7;

    @media (max-width: 768px) {
      white-space: normal;
    }
  }

  .project-links {
    display: flex;
    gap: 12px;
    font-size: 10px;
    flex-shrink: 0;

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

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              date
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);

  return (
    <StyledFeaturedSection data-section="projects">
      <h2 className="terminal-header">ls -la ./projects</h2>
      <br />
      <div className="projects-list">
        {featuredProjects.map(({ node }, i) => {
          const { title, tech, github, external, date } = node.frontmatter;
          const techString = tech ? tech.join(' / ') : '';
          const dateStr = date
            ? new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase().replace(' ', '_')
            : '';

          return (
            <div className="project-item" key={i}>
              <div className="project-left">
                <span className="project-permission">drwxr-xr-x</span>
                <span className="project-title">{title}</span>
                {techString && <span className="project-tech">{techString}</span>}
              </div>
              <div className="project-links">
                {external && (
                  <a href={external} target="_blank" rel="noopener noreferrer">
                    [LIVE]
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    [SRC]
                  </a>
                )}
                {dateStr && <span style={{ opacity: 0.4 }}>{dateStr}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </StyledFeaturedSection>
  );
};

export default Featured;
