import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';
import lawsOfUx from '../../data/laws-of-ux.json';

const StyledPage = styled.div`
  padding-top: 0.5vh;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding-top: 4vh;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #29bc89;
    text-decoration: none;
    text-transform: lowercase;
    letter-spacing: 0.1em;
    margin-bottom: 10px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: #29bc89;
    }
  }

  .page-header {
    margin-bottom: 2.5rem;
  }

  .page-title {
    font-size: clamp(36px, 5vw, 52px);
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main, #e8e8e8);
    margin-bottom: 0.5rem;
  }

  .page-subtitle {
    font-size: 18px;
    color: var(--text-dim, #888888);
    max-width: 620px;
    line-height: 1.7;
  }

  .section-header {
    font-size: 16px;
    color: var(--text-dim, #888888);
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

  .law-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .law-card {
    padding: 1.25rem 1.25rem 1.35rem;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    transition: border-color 0.25s ease, background 0.25s ease;

    &:hover {
      border-color: rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.04);
    }
  }

  .law-name {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-main, #e8e8e8);
    margin-bottom: 0.4rem;
    letter-spacing: -0.01em;
  }

  .law-description {
    font-size: 15px;
    color: var(--text-dim, #888888);
    line-height: 1.6;
    margin-bottom: 0.85rem;
  }

  .law-css {
    font-size: 14px;
    color: #29bc89;
    line-height: 1.65;
    font-family: var(--font-stack, 'Space Mono', monospace);
    letter-spacing: 0.02em;
  }

  .law-css-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-dim, #888888);
    margin-bottom: 0.35rem;
  }

  .law-link {
    display: inline-block;
    margin-top: 0.75rem;
    font-size: 13px;
    color: #29bc89;
    text-decoration: none;
    text-transform: lowercase;
    letter-spacing: 0.08em;
    transition: opacity 0.25s;

    &:hover {
      opacity: 0.8;
    }
  }

  .law-external {
    font-size: 12px;
    color: var(--text-dim, #888888);
    margin-top: 0.5rem;

    a {
      color: var(--text-dim, #888888);
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      transition: color 0.2s;

      &:hover {
        color: var(--text-main, #e8e8e8);
      }
    }
  }
`;

const UxLawsPage = ({ location }) => {
  return (
    <Layout location={location}>
      <BlogLayout contentWidth={1120}>
        <Helmet title="Laws of UX in CSS | Snippets" />

        <StyledPage>
          <Link to="/snippets" className="back-link">
            &larr; snippets
          </Link>

          <div className="page-header">
            <h1 className="page-title">laws_of_ux_in_css</h1>
            <p className="page-subtitle">
              UX principles from <a href="https://lawsofux.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#29bc89', textDecoration: 'none' }}>Laws of UX</a>, mapped to concrete CSS takeaways.
            </p>
          </div>

          <div className="section-header">principles_&amp;_takeaways</div>

          <ul className="law-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {lawsOfUx.map(law => (
              <li key={law.id} className="law-card">
                <div className="law-name">{law.name}</div>
                <p className="law-description">{law.description}</p>
                <div className="law-css-label">CSS takeaway</div>
                <p className="law-css">{law.cssTakeaway}</p>
                {law.snippetSlug && (
                  <Link to={`/snippets/${law.snippetSlug}`} className="law-link">
                    See snippet: {law.snippetSlug} →
                  </Link>
                )}
                <div className="law-external">
                  <a href={law.externalUrl} target="_blank" rel="noopener noreferrer">
                    Read on Laws of UX →
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </StyledPage>
      </BlogLayout>
    </Layout>
  );
};

UxLawsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default UxLawsPage;
