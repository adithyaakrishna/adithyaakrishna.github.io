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
