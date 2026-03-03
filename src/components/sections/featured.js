import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledFeaturedSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  max-width: none;

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

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
    color: inherit;

    &:hover {
      padding-left: 10px;
      color: var(--accent, #ffffff);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    &:hover .item-title {
      filter: blur(0px);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
  }

  .item-left {
    display: flex;
    gap: 2rem;
    align-items: baseline;
  }

  .item-index {
    font-size: 12px;
    color: var(--text-dim, #555555);
    font-family: 'Courier Prime', monospace;
  }

  .item-title {
    font-size: 16px;
    transition: 0.3s;
    text-transform: lowercase;
    letter-spacing: normal;
    font-weight: 400;
    color: var(--text-main, #d4d4d4);
    margin: 0;
  }

  .item-meta {
    font-size: 12px;
    color: var(--text-dim, #555555);
    text-align: right;
  }

  .update-notice {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.25rem;
    padding: 1rem 0;
    font-size: 12px;
    color: var(--text-dim, #888888);

    .update-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #e8a317;
      border: 1px solid rgba(232, 163, 23, 0.25);
      padding: 4px 10px;
      letter-spacing: 0.05em;
    }

    a {
      color: #29BC89;
      text-decoration: none;
      border-bottom: 1px solid rgba(41, 188, 137, 0.3);
      font-size: 12px;
      transition: border-color 0.3s;

      &:hover {
        border-color: #29BC89;
        color: #29BC89;
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
            }
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);

  return (
    <StyledFeaturedSection id="featured">
      <div className="section-header">selected_projects</div>
      <div className="update-notice">
        <span className="update-chip">update pending</span>
        for newer projects, visit{' '}
        <a href="https://github.com/adithyaakrishna" target="_blank" rel="noopener noreferrer">
          github.com/adithyaakrishna
        </a>
      </div>
      {featuredProjects.map(({ node }, i) => {
        const { title, external, github } = node.frontmatter;
        const link = external || github || '#';
        return (
          <a
            href={link}
            className="list-item"
            key={i}
            target="_blank"
            rel="noopener noreferrer">
            <div className="item-left">
              <span className="item-index">proj_{String(i + 1).padStart(3, '0')}</span>
              <span className="item-title">{title?.toLowerCase()}</span>
            </div>
            <span className="item-meta">view</span>
          </a>
        );
      })}
    </StyledFeaturedSection>
  );
};

export default Featured;
