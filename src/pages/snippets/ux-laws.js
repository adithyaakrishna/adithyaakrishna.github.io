import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';
import SnippetPreviewMedia from '../../components/snippet-preview-media';
import lawsOfUx from '../../data/laws-of-ux.json';
import snippets from '../../data/snippets.json';

const PAGE_WIDTH = 1180;
const snippetMetaBySlug = new Map(snippets.map(snippet => [snippet.slug, snippet]));
const lawsWithSnippets = lawsOfUx.filter(
  law => law.snippetSlug && snippetMetaBySlug.get(law.snippetSlug),
);

const StyledPage = styled.div`
  width: 100%;
  display: grid;
  gap: 2.5rem;

  .nav-row {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 12px;
    line-height: 1;
    color: var(--text-dim, #888888);
    text-decoration: none;
    border: 1px solid var(--border-color);
    padding: 8px 14px;
    transition: color 0.25s ease, border-color 0.25s ease;
    text-transform: lowercase;
    letter-spacing: 0.05em;

    &:hover {
      color: #29bc89;
      border-color: rgba(41, 188, 137, 0.35);
    }
  }

  .page-intro {
    display: grid;
    gap: 1rem;
    max-width: 150ch;
  }

  .page-header {
    font-size: 12px;
    color: #29bc89;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .page-header::after {
    content: '';
    height: 1px;
    flex-grow: 1;
    background: var(--text-dim, #555555);
    opacity: 0.2;
  }

  .page-title {
    margin: 0;
    font-size: clamp(28px, 4vw, 38px);
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: -0.03em;
    color: var(--text-main, #e8e8e8);
  }

  .page-copy {
    margin: 0;
    font-size: 14px;
    line-height: 1.85;
    color: var(--text-dim, #888888);
  }

  .page-copy a {
    color: #29bc89;
    text-decoration: none;
    border-bottom: 1px solid rgba(41, 188, 137, 0.3);

    &:hover {
      border-color: #29bc89;
    }
  }

  .section-header {
    font-size: 12px;
    color: #29bc89;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-transform: lowercase;
    letter-spacing: 0.05em;
  }

  .section-header::after {
    content: '';
    height: 1px;
    flex-grow: 1;
    background: var(--text-dim, #555555);
    opacity: 0.2;
  }

  .section-meta {
    font-size: 12px;
    color: var(--text-dim, #888888);
    line-height: 1.8;
  }
`;

const StyledLawGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }

  .law-card {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .law-card:hover .media-shell {
    transform: translateY(-2px);
  }

  .law-card:hover .media-video,
  .law-card:hover .media-image {
    transform: scale(1.018);
  }

  .law-preview,
  .law-placeholder {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-radius: 28px;
    border: 1px solid rgba(118, 133, 162, 0.18);
    background: linear-gradient(
      180deg,
      rgba(236, 241, 248, 0.95) 0%,
      rgba(245, 247, 251, 0.98) 100%
    );
  }

  .media-shell {
    width: 100%;
    height: 100%;
    padding: clamp(12px, 1.4vw, 18px);
    transition: transform 0.35s ease;
  }

  .law-preview::after,
  .law-placeholder::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 45%);
  }

  .media-video,
  .media-image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
    border-radius: 22px;
    border: 1px solid rgba(130, 144, 171, 0.14);
    background: rgba(255, 255, 255, 0.94);
  }

  .media-status {
    position: absolute;
    left: 0.75rem;
    bottom: 0.75rem;
    display: inline-flex;
    align-items: center;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 10px;
    line-height: 1;
    color: rgba(232, 232, 232, 0.78);
    text-transform: lowercase;
    letter-spacing: 0.05em;
    padding: 5px 8px;
    background: var(--surface-overlay);
    border: 1px solid var(--border-color);
    border-radius: 999px;
  }

  .law-placeholder {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0.9rem;
    color: var(--text-main, #e8e8e8);
    font-size: 12px;
    line-height: 1.6;
    text-transform: lowercase;
    letter-spacing: 0.05em;
  }

  .law-title {
    margin: 0;
    font-size: 16px;
    transition: 0.3s;
    text-transform: lowercase;
    font-weight: 400;
    color: var(--text-main, #e8e8e8);
    line-height: 1.45;
  }

  .law-meta {
    margin: 0;
    font-size: 12px;
    color: var(--text-dim, #888888);
    line-height: 1.8;
  }

  .law-links {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .law-link {
    font-size: 12px;
    color: #29bc89;
    text-decoration: none;
    border-bottom: 1px solid rgba(41, 188, 137, 0.3);

    &:hover {
      border-color: #29bc89;
    }
  }
`;

function LawCard({ law }) {
  const snippet = law.snippetSlug ? snippetMetaBySlug.get(law.snippetSlug) : null;

  return (
    <li className="law-card">
      {snippet && (
        <Link to={snippet.path}>
          <SnippetPreviewMedia
            className="law-preview"
            slug={snippet.slug}
            title={snippet.title}
            previewImage={snippet.previewImage}
            previewVideo={snippet.previewVideo}
            fallbackLabel="preview"
          />
        </Link>
      )}

      <h2 className="law-title">{law.name}</h2>
      <p className="law-meta">{law.cssTakeaway}</p>

      <div className="law-links">
        {snippet && (
          <Link to={snippet.path} className="law-link">
            open editable demo
          </Link>
        )}
        <a href={law.externalUrl} className="law-link" target="_blank" rel="noopener noreferrer">
          read principle
        </a>
      </div>
    </li>
  );
}

LawCard.propTypes = {
  law: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cssTakeaway: PropTypes.string.isRequired,
    snippetSlug: PropTypes.string,
    externalUrl: PropTypes.string.isRequired,
  }).isRequired,
};

const UxLawsPage = ({ location }) => {
  return (
    <Layout location={location}>
      <BlogLayout contentWidth={PAGE_WIDTH} mode="focused">
        <Helmet title="Laws of UX in CSS | Snippets" />

        <StyledPage>
          <div className="nav-row">
            <Link to="/" className="nav-link">
              home
            </Link>
            <Link to="/snippets" className="nav-link">
              all snippets
            </Link>
          </div>

          <div className="page-intro">
            <div className="page-header">laws_of_ux</div>
            <h1 className="page-title">
              the same quiet tile system, but filtered through design principles and css takeaways.
            </h1>
            <p className="page-copy">
              Each tile points to a snippet when there is one. Open the demo if you want to edit the
              code, or jump to <a href="https://lawsofux.com/">Laws of UX</a> for the source
              principle.
            </p>
          </div>

          <div className="section-header">principles_and_takeaways</div>
          <div className="section-meta">{lawsWithSnippets.length} entries.</div>

          <StyledLawGrid>
            {lawsWithSnippets.map(law => (
              <LawCard key={law.id} law={law} />
            ))}
          </StyledLawGrid>
        </StyledPage>
      </BlogLayout>
    </Layout>
  );
};

UxLawsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default UxLawsPage;
