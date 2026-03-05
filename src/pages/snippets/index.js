import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';
import snippets from '../../data/snippets.json';

const StyledSnippetsPage = styled.div`
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
`;

const StyledSnippetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .snippet-item {
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
    padding: 1rem 1rem 1.1rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    text-decoration: none;
    color: inherit;
    background: rgba(255, 255, 255, 0.01);
    min-height: 264px;
    transition: border-color 0.3s ease, transform 0.3s ease;
    min-width: 0;

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }

  .snippet-tag {
    font-size: 16px;
    letter-spacing: 0.02em;
    text-transform: none;
    font-family: 'Courier Prime', monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    width: fit-content;
  }

  .snippet-tag.is-at-rule {
    color: #9f7aea;
  }

  .snippet-tag.is-pseudo {
    color: #35d39a;
  }

  .snippet-tag.is-function {
    color: #7dd3fc;
  }

  .snippet-tag.is-keyword {
    color: #f9a8d4;
  }

  .snippet-title {
    font-size: 26px;
    text-transform: lowercase;
    font-weight: 400;
    color: var(--text-main, #e8e8e8);
    margin: 0;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  .snippet-desc {
    font-size: 18px;
    color: var(--text-dim, #888888);
    margin: 0;
    line-height: 1.7;
    overflow-wrap: anywhere;
  }

  .preview-frame {
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.08);
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  }

  .preview-image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }

  .preview-image.is-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .preview-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0.75rem;
    background: radial-gradient(circle at 20% 20%, rgba(41, 188, 137, 0.35), rgba(255, 255, 255, 0));
    color: var(--text-main, #e8e8e8);
    font-family: 'Courier Prime', monospace;
    font-size: 14px;
    letter-spacing: 0.03em;
  }
`;

function getTokenClassName(tag) {
  if (tag.startsWith('@')) return 'is-at-rule';
  if (tag.startsWith(':')) return 'is-pseudo';
  if (tag.includes('(')) return 'is-function';
  return 'is-keyword';
}

const SnippetsPage = ({ location }) => {
  const orderedSnippets = [...snippets]
    .sort((a, b) => a.order - b.order);

  return (
    <Layout location={location}>
      <BlogLayout contentWidth={1120}>
        <Helmet title="Snippets" />

        <StyledSnippetsPage>
          <Link to="/" className="back-link">
            &larr; home
          </Link>

          <div className="page-header">
            <h1 className="page-title">snippets_&amp;_hacks</h1>
            <p className="page-subtitle">
              These are findings from my snippets and hacks.<br />
            </p>
          </div>

          <div className="section-header">all_snippets</div>

          <StyledSnippetGrid>
            {orderedSnippets.map(snippet => (
              <Link to={snippet.path} className="snippet-item" key={snippet.slug}>
                <div className="preview-frame">
                  <img
                    src={snippet.previewImage}
                    alt={`${snippet.title} preview`}
                    className="preview-image"
                    loading="lazy"
                    onError={event => {
                      event.currentTarget.classList.add('is-hidden');
                    }}
                  />
                  <div className="preview-fallback">{snippet.tag}</div>
                </div>
                <span className={`snippet-tag ${getTokenClassName(snippet.tag)}`}>{snippet.tag}</span>
                <h3 className="snippet-title">{snippet.title}</h3>
                <p className="snippet-desc">{snippet.description}</p>
              </Link>
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
