import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledJobsSection = styled.section`
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

  .experience-list {
    display: flex;
    gap: 4rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .experience-item {
    flex: 1;
    max-width: 450px;
  }

  .exp-date {
    font-family: var(--font-code);
    color: var(--c-red);
    font-size: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .exp-details {
    h3 {
      font-family: var(--font-display);
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      color: var(--c-ink);
    }

    .company {
      font-family: var(--font-code);
      color: var(--c-red);
      margin-bottom: 15px;
      display: block;
      font-size: 0.9rem;

      a {
        color: var(--c-red);
        text-decoration: none;
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.7;
        }
      }
    }

    .description {
      font-size: 1.2rem;
      line-height: 1.6;
      color: var(--c-subtle);
      font-family: var(--font-body);

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        margin-bottom: 0.5rem;
        padding-left: 0;

        &:before {
          display: none;
        }
      }

      p {
        margin: 0;
      }
    }
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___index], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
              index
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges.slice(0, 2);

  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <div className="section-header">
        <span className="section-label">02 / History</span>
        <h2 className="section-title">Selected Works</h2>
      </div>

      <div className="experience-list">
        {jobsData.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { title, url, company, range } = frontmatter;

          return (
            <div className="experience-item" key={i}>
              <div className="exp-date">{range}</div>
              <div className="exp-details">
                <h3>{title}</h3>
                <span className="company">
                  <a href={url}>{company}</a>
                </span>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
