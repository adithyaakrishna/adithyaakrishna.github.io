import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const monthMap = {
  january: 'jan', february: 'feb', march: 'mar', april: 'apr',
  may: 'may', june: 'jun', july: 'jul', august: 'aug',
  september: 'sep', october: 'oct', november: 'nov', december: 'dec',
};

function shortenRange(range) {
  if (!range) return '';
  return range.toLowerCase().replace(
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/g,
    match => monthMap[match],
  );
}

const shownCompanies = [
  'noice',
  'tensorlake',
];

const companyDisplayNames = {
  'openchemistry - google summer of code': 'GSOC',
  'wasmedge - google season of docs': 'GSOC',
  'cloud native computing foundation (cncf)': 'CNCF',
};

const StyledJobsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  max-width: none;
  width: 100%;
  overflow: hidden;

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
      background: var(--text-dim, #888888);
      opacity: 0.2;
    }
  }

  .exp-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: border-color 0.3s ease;

    &:hover {
      border-bottom-color: rgba(255, 255, 255, 0.2);
    }
  }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    cursor: pointer;
    transition: all 0.3s ease;
    color: inherit;
    user-select: none;
    gap: 0.5rem;

    @media (max-width: 600px) {
      align-items: flex-start;
    }

    &:hover {
      padding-left: 10px;
      color: var(--accent, #ffffff);
    }

    &:hover .item-title {
      filter: blur(0px);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
  }

  .exp-left-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    min-width: 0;
    flex: 1;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 0.15rem;
    }
  }

  .item-left {
    display: flex;
    gap: 1rem;
    align-items: baseline;
  }

  .item-index {
    font-size: 12px;
    color: #29BC89;
    font-family: 'Courier Prime', monospace;
    flex-shrink: 0;
  }

  .item-title {
    font-size: 16px;
    transition: 0.3s;
    text-transform: lowercase;
    letter-spacing: normal;
    font-weight: 400;
    color: var(--text-main, #e8e8e8);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-meta {
    font-size: 12px;
    color: var(--text-dim, #888888);
    white-space: nowrap;

    @media (max-width: 600px) {
      padding-left: calc(1rem + 1.5em);
      white-space: normal;
    }

    .role {
      color: var(--text-main, #e8e8e8);
    }

    .separator {
      margin: 0 0.4rem;
      color: #29BC89;
      opacity: 0.8;
    }
  }

  .exp-toggle {
    font-size: 14px;
    color: var(--text-dim, #888888);
    transition: transform 0.3s ease, color 0.3s ease;
    display: inline-block;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .exp-item.open .exp-toggle {
    transform: rotate(45deg);
    color: var(--accent, #ffffff);
  }

  .exp-body {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 0.35s ease, opacity 0.3s ease;
    opacity: 0;

    > div {
      overflow: hidden;
    }
  }

  .exp-item.open .exp-body {
    grid-template-rows: 1fr;
    opacity: 1;
  }

  .exp-detail {
    padding: 0.5rem 0 1.5rem 2.5rem;

    @media (max-width: 600px) {
      padding: 0.5rem 0 1rem 1.75rem;
    }
    font-size: 13px;
    color: var(--text-dim, #888888);
    line-height: 1.8;

    span {
      color: var(--text-main, #e8e8e8);
    }

    p {
      max-width: none;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0.5rem 0;
    }

    li {
      margin-bottom: 0.35rem;
      padding-left: 1.2rem;
      position: relative;

      &:before {
        content: '▸';
        position: absolute;
        left: 0;
        color: #29BC89;
      }
    }
  }

  .others-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 12px;
    line-height: 1;
    color: var(--text-dim, #888888);
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 8px 14px;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: color 0.3s ease, border-color 0.3s ease, text-shadow 0.3s ease;
    text-transform: lowercase;
    letter-spacing: 0.05em;

    &:hover {
      color: var(--accent, #ffffff);
      border-color: rgba(255, 255, 255, 0.25);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .pill-toggle {
      transition: transform 0.3s ease;
      display: inline-block;
    }

    &.open .pill-toggle {
      transform: rotate(45deg);
    }
  }

  .others-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    opacity: 0;
    display: flex;
    flex-direction: column;
    gap: 0;

    &.open {
      max-height: 2000px;
      opacity: 1;
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

  const allJobs = data.jobs.edges;
  const mainJobs = allJobs.filter(
    ({ node }) => shownCompanies.includes(node.frontmatter.company?.toLowerCase()),
  );
  const otherJobs = allJobs.filter(
    ({ node }) => !shownCompanies.includes(node.frontmatter.company?.toLowerCase()),
  );

  const [openJobs, setOpenJobs] = useState({});
  const [showOthers, setShowOthers] = useState(false);

  const toggleJob = key => {
    setOpenJobs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderExpItem = (node, idx, keyPrefix, displayNum) => {
    const { title, company, range } = node.frontmatter;
    const companyLower = company?.toLowerCase();
    const companySlug = companyDisplayNames[companyLower] || companyLower?.replace(/\s+/g, '_');
    const key = `${keyPrefix}-${idx}`;
    const isOpen = !!openJobs[key];
    return (
      <div className={`exp-item${isOpen ? ' open' : ''}`} key={key}>
        <div className="exp-header" onClick={() => toggleJob(key)} role="button" tabIndex={0}>
          <div className="exp-left-group">
            <div className="item-left">
              <span className="item-index">{String(displayNum).padStart(2, '0')}</span>
              <span className="item-title">{companySlug}</span>
            </div>
            <span className="item-meta">
              <span className="role">{title?.toLowerCase()}</span>
              <span className="separator">&middot;</span>
              {shortenRange(range)}
            </span>
          </div>
          <span className="exp-toggle">+</span>
        </div>
        <div className="exp-body">
          <div
            className="exp-detail"
            dangerouslySetInnerHTML={{ __html: node.html }}
          />
        </div>
      </div>
    );
  };

  return (
    <StyledJobsSection id="jobs">
      <div className="section-header">experience</div>
      {mainJobs.map(({ node }, i) => renderExpItem(node, i, 'main', i + 1))}

      {otherJobs.length > 0 && (
        <>
          <button
            className={`others-pill${showOthers ? ' open' : ''}`}
            onClick={() => setShowOthers(prev => !prev)}>
            previous ({otherJobs.length}) <span className="pill-toggle">+</span>
          </button>
          <div className={`others-body${showOthers ? ' open' : ''}`}>
            {otherJobs.map(({ node }, i) => renderExpItem(node, i, 'other', mainJobs.length + i + 1))}
          </div>
        </>
      )}
    </StyledJobsSection>
  );
};

export default Jobs;
