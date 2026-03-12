import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';
import SnippetPreviewMedia from '../../components/snippet-preview-media';
import snippets from '../../data/snippets.json';

const PAGE_WIDTH = 1180;

const StyledSnippetsPage = styled.div`
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
    text-transform: lowercase;
    letter-spacing: 0.05em;
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

  .page-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    font-size: 12px;
    color: var(--text-dim, #888888);
    line-height: 1.8;
  }

  .page-link {
    color: #29bc89;
    text-decoration: none;
    border-bottom: 1px solid rgba(41, 188, 137, 0.3);

    &:hover {
      border-color: #29bc89;
    }
  }
`;

const StyledSnippetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem 1.35rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }

  .snippet-card {
    display: grid;
    gap: 0.95rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.28s ease;
  }

  .snippet-card:hover {
    transform: translateY(-4px);
  }

  .snippet-card:hover .media-shell {
    transform: translateY(-2px);
  }

  .snippet-card:hover .media-video,
  .snippet-card:hover .media-image {
    transform: scale(1.018);
  }

  .snippet-card:hover .card-title {
    color: var(--text-main);
  }

  .media-frame {
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
    padding: clamp(8px, 1.4vw, 10px);
    transition: transform 0.35s ease;
  }

  .media-frame::after {
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

  .card-copy {
    display: grid;
    gap: 0.4rem;
    min-width: 0;
  }

  .card-kicker {
    font-family: 'Courier Prime', monospace;
    font-size: 12px;
    font-weight: 600;
    color: #29bc89;
    letter-spacing: 0.08em;
    text-transform: lowercase;
  }

  .card-title {
    margin: 0;
    font-size: 20px;
    line-height: 1.4;
    font-weight: 500 !important;
    color: var(--text-main, #e8e8e8);
    transition: color 0.25s ease;
  }

  .card-description {
    margin: 0;
    font-size: 13px;
    line-height: 1.8;
    color: var(--text-dim, #888888);
  }
`;

function SnippetCard({ snippet }) {
  return (
    <Link to={snippet.path} className="snippet-card">
      <SnippetPreviewMedia
        slug={snippet.slug}
        title={snippet.title}
        previewImage={snippet.previewImage}
        previewVideo={snippet.previewVideo}
      />

      <div className="card-copy">
        <span className="card-kicker">{snippet.tag}</span>
        <h2 className="card-title">{snippet.title}</h2>
      </div>
    </Link>
  );
}

SnippetCard.propTypes = {
  snippet: PropTypes.shape({
    path: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string,
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

const SnippetsPage = ({ location }) => {
  const cssHacks = [...snippets]
    .filter(snippet => (snippet.section || 'css-hacks') === 'css-hacks')
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  return (
    <Layout location={location}>
      <BlogLayout contentWidth={PAGE_WIDTH}>
        <Helmet title="Snippets" />

        <StyledSnippetsPage>
          <div className="nav-row">
            <Link to="/" className="nav-link">
              home
            </Link>
            <Link to="/snippets/ux-laws" className="nav-link">
              laws of ux
            </Link>
          </div>

          <div className="page-intro">
            <div className="page-header">snippets</div>
            <h1 className="page-title">CSS snippets you can preview and explore.</h1>
            <p className="page-copy">
              The index stays quiet and visual. Each tile leads to a focused view of the snippet.
              For deeper UX-related examples, see the separate{' '}
              <Link to="/snippets/ux-laws" className="page-link">
                laws of ux page
              </Link>
              .
            </p>
          </div>

          <StyledSnippetGrid>
            {cssHacks.map(snippet => (
              <SnippetCard snippet={snippet} key={snippet.slug} />
            ))}
          </StyledSnippetGrid>
        </StyledSnippetsPage>
      </BlogLayout>
    </Layout>
  );
};

SnippetsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SnippetsPage;
