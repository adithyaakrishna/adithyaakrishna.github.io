import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';

const StyledFeaturedSection = styled.section`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: var(--border-width) solid rgba(255, 255, 255, 0.1);
  padding: var(--layout-padding);
  padding-left: calc(var(--layout-padding) + 80px);
  padding-right: calc(var(--layout-padding) + 60px);
  max-width: none;
  margin: 0;

  @media (max-width: 768px) {
    padding-left: var(--layout-padding);
    padding-right: var(--layout-padding);
  }

  .section-header {
    margin-bottom: 4rem;
  }

  .section-label {
    font-family: var(--font-code);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--c-red);
    display: block;
    margin-bottom: 1rem;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 5rem);
    text-transform: uppercase;
    color: var(--c-ink);
    line-height: 1;
    margin: 0;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .blog-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem;
    background: #181818;
    transition: transform 0.3s;
    text-decoration: none;
    display: block;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 10px 10px 0px rgba(217, 72, 56, 0.2);
      color: inherit;
    }
  }

  .blog-meta {
    font-family: var(--font-code);
    font-size: 0.8rem;
    color: var(--c-red);
    margin-bottom: 1.5rem;
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .blog-title {
    font-family: var(--font-body);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    line-height: 1.1;
    margin-bottom: 1.5rem;
    font-style: italic;
    color: var(--c-ink);
    font-weight: 400;
  }

  .blog-description {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--c-subtle);
    font-family: var(--font-body);

    p {
      margin: 0;
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

  const featuredProjects = data.featured.edges.filter(({ node }) => node).slice(0, 2);

  const revealContainer = useRef(null);
  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledFeaturedSection id="projects" ref={revealContainer}>
      <div className="section-header">
        <span className="section-label">03 / Thoughts</span>
        <h2 className="section-title">The Journal</h2>
      </div>

      <div className="blog-grid">
        {featuredProjects.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { external, title, tech, github } = frontmatter;
          const techString = tech ? tech.join(' / ') : '';
          const link = external || github || '#';

          return (
            <a href={link} className="blog-card" key={i}>
              <span className="blog-meta">{techString}</span>
              <h3 className="blog-title">{title}</h3>
              <div
                className="blog-description"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </a>
          );
        })}
      </div>
    </StyledFeaturedSection>
  );
};

export default Featured;
