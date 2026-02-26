import React, { useState, useRef, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { gsap } from 'gsap';

const StyledJobsSection = styled.section`
  margin-bottom: 60px;
  max-width: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  .experience-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .experience-item {
    border: 1px solid var(--border-color);
    border-bottom: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:last-child {
      border-bottom: 1px solid var(--border-color);
    }

    &:hover {
      border-color: rgba(217, 72, 56, 0.4);
      background: rgba(217, 72, 56, 0.05);
    }
  }

  .exp-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 20px;
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    cursor: pointer;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }

  .exp-left {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }

  .exp-permission {
    color: var(--c-red);
    font-size: var(--fz-xs);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .exp-title {
    color: var(--c-bright);
    font-size: var(--fz-lg);
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      white-space: normal;
    }
  }

  .exp-company {
    color: var(--c-red);
    font-size: var(--fz-sm);
    font-weight: 700;
  }

  .exp-date {
    font-size: var(--fz-xs);
    opacity: 0.5;
    white-space: nowrap;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .exp-body {
    overflow: hidden;
    height: 0;
  }

  .exp-body-inner {
    padding: 0 20px 16px 20px;
    font-size: var(--fz-sm);
    line-height: 1.7;
    color: var(--c-ink);

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-bottom: 6px;
      padding-left: 20px;
      position: relative;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--c-red);
      }
    }

    p {
      margin: 0 0 8px 0;
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
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const [openJobs, setOpenJobs] = useState({ 0: true, 1: true });
  const expBodyRefs = useRef({});

  useEffect(() => {
    [0, 1].forEach(i => {
      const el = expBodyRefs.current[i];
      if (el) {
        el.style.height = 'auto';
      }
    });
  }, []);

  const toggleJob = (i, e) => {
    const expBody = expBodyRefs.current[i];
    if (!expBody) return;

    const isOpening = !openJobs[i];
    gsap.killTweensOf(expBody);

    if (isOpening) {
      expBody.style.height = 'auto';
      const targetHeight = expBody.scrollHeight;
      expBody.style.height = '0px';
      gsap.to(expBody, {
        height: targetHeight,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          expBody.style.height = 'auto';
        },
      });
    } else {
      gsap.to(expBody, {
        height: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }

    setOpenJobs(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <StyledJobsSection data-section="experience">
      <h2 className="terminal-header">ls -la ./experience</h2>
      <br />
      <div className="experience-list">
        {jobsData.map(({ node }, i) => {
          const { title, company, range, url } = node.frontmatter;
          return (
            <div className="experience-item" key={i}>
              <button className="exp-toggle" onClick={e => toggleJob(i, e)}>
                <div className="exp-left">
                  <span className="exp-permission">drwxr-xr-x</span>
                  <span className="exp-title">{title}</span>
                  <a
                    href={url}
                    className="exp-company"
                    onClick={e => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer">
                    @ {company}
                  </a>
                </div>
                <span className="exp-date">{range?.replace(/ /g, '_')}</span>
              </button>
              <div className="exp-body" ref={el => (expBodyRefs.current[i] = el)}>
                <div
                  className="exp-body-inner"
                  dangerouslySetInnerHTML={{ __html: node.html }}
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
