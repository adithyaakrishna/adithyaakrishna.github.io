import React, { useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';

function copyWithFallback(rawCode) {
  if (typeof document === 'undefined') return false;
  const textArea = document.createElement('textarea');
  textArea.value = rawCode;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  const didCopy = document.execCommand('copy');
  document.body.removeChild(textArea);
  return didCopy;
}

const StyledPostPage = styled.div`
  padding-top: 0.5vh;

  @media (max-width: 600px) {
    padding-top: 4vh;
  }

  .nav-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 12px;
    font-weight: 600;
    color: #29bc89;
    text-decoration: none;
    text-transform: lowercase;
    letter-spacing: 0.1em;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: #29bc89;
    }
  }
`;

const StyledPostHeader = styled.header`
  margin-bottom: 4rem;

  h1 {
    font-size: 28px;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main, #e8e8e8);
    line-height: 1.3;
    margin-bottom: 1.5rem;
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--text-dim, #888888);
  }

  .post-date {
    color: var(--text-dim, #888888);
  }

  .post-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    color: #29bc89;
    text-decoration: none;
    font-size: 12px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: #29bc89;
    }
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2.5em 0 1em;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main, #e8e8e8);
  }

  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }

  p {
    margin: 1.2em 0;
    line-height: 1.8;
    color: var(--text-dim, #888888);
    max-width: none;
    font-size: 14px;
  }

  a {
    color: #29bc89;
    text-decoration: none;
    border-bottom: 1px solid rgba(41, 188, 137, 0.3);
    transition: border-color 0.3s;

    &:hover {
      border-color: #29bc89;
      color: #29bc89;
    }
  }

  strong {
    color: var(--text-main, #e8e8e8);
    font-weight: 700;
  }

  em {
    color: var(--text-main, #e8e8e8);
  }

  ul,
  ol {
    margin: 1em 0;
    padding-left: 1.5rem;
    color: var(--text-dim, #888888);
    font-size: 14px;
    line-height: 1.8;
  }

  li {
    margin-bottom: 0.4rem;
  }

  blockquote {
    border-left: 2px solid #29bc89;
    margin: 2em 0;
    padding: 0.5em 0 0.5em 1.5em;

    p {
      font-size: 14px;
      font-style: italic;
      color: var(--text-main, #e8e8e8);
      opacity: 0.8;
    }
  }

  :where(p, li, blockquote, h1, h2, h3, h4, h5, h6) > code {
    font-family: 'Space Mono', 'Courier Prime', monospace;
    font-size: 13px;
    background: var(--code-bg);
    padding: 0.2em 0.4em;
    border-radius: 2px;
    color: var(--text-main, #e8e8e8);
  }

  .gatsby-highlight {
    margin: 2.2em 0;
  }

  .gatsby-code-title,
  .gatsby-highlight {
    position: relative;
  }

  .gatsby-highlight pre[class*='language-'] {
    font-size: 13px;
    line-height: 1.7;
  }

  .code-copy-button {
    position: absolute;
    top: 0.8rem;
    right: 0.9rem;
    z-index: 2;
    border: 1px solid rgba(139, 233, 253, 0.18);
    background: rgba(248, 248, 242, 0.08);
    color: #8be9fd;
    padding: 0.28rem 0.58rem;
    font-family: 'Space Mono', 'Courier Prime', monospace;
    font-size: 11px;
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .code-copy-button:hover,
  .code-copy-button:focus-visible {
    background: rgba(139, 233, 253, 0.14);
    border-color: rgba(139, 233, 253, 0.35);
    color: #f8f8f2;
    outline: none;
  }

  .gatsby-code-title .code-copy-button {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }

  img {
    max-width: 100%;
    margin: 2em 0;
    border: 1px solid var(--border-color);
  }

  hr {
    border: none;
    height: 1px;
    background: var(--border-color-subtle);
    margin: 3em 0;
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;
  const contentRef = useRef(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return undefined;

    const copyButtons = [];
    const resetTimers = [];
    const highlights = container.querySelectorAll('.gatsby-highlight');

    highlights.forEach(block => {
      const codeNode = block.querySelector('code');
      if (!codeNode) return;

      const previousSibling = block.previousElementSibling;
      const mountTarget =
        previousSibling && previousSibling.classList.contains('gatsby-code-title')
          ? previousSibling
          : block;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = 'copy';
      button.setAttribute('aria-label', 'Copy code block');

      const handleCopy = async () => {
        const rawCode = codeNode.textContent || '';
        if (!rawCode) return;

        let didCopy = false;
        if (
          typeof navigator !== 'undefined' &&
          navigator.clipboard &&
          typeof window !== 'undefined' &&
          window.isSecureContext
        ) {
          try {
            await navigator.clipboard.writeText(rawCode);
            didCopy = true;
          } catch (error) {
            didCopy = copyWithFallback(rawCode);
          }
        } else {
          didCopy = copyWithFallback(rawCode);
        }

        button.textContent = didCopy ? 'copied' : 'failed';
        const timeout = window.setTimeout(() => {
          button.textContent = 'copy';
        }, 1800);
        resetTimers.push(timeout);
      };

      button.addEventListener('click', handleCopy);
      mountTarget.appendChild(button);
      copyButtons.push({ button, handleCopy });
    });

    return () => {
      resetTimers.forEach(timeout => window.clearTimeout(timeout));
      copyButtons.forEach(({ button, handleCopy }) => {
        button.removeEventListener('click', handleCopy);
        button.remove();
      });
    };
  }, [html]);

  return (
    <Layout location={location}>
      <BlogLayout>
        <Helmet title={title} />

        <StyledPostPage>
          <div className="nav-row">
            <button className="back-link" onClick={() => window.history.back()}>
              &larr; back
            </button>
          </div>

          <StyledPostHeader>
            <h1>{title}</h1>
            <div className="post-meta">
              <time className="post-date">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {tags && tags.length > 0 && (
                <div className="post-tags">
                  {tags.map((tag, i) => (
                    <Link key={i} to={`/blog/tags/${kebabCase(tag)}/`} className="tag">
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </StyledPostHeader>

          <StyledPostContent ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
        </StyledPostPage>
      </BlogLayout>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
  }
`;
