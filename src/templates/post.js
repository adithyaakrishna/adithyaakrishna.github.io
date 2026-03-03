import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';

const StyledPostPage = styled.div`
  padding-top: 10vh;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #29BC89;
    text-decoration: none;
    text-transform: lowercase;
    letter-spacing: 0.1em;
    margin-bottom: 4rem;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: #29BC89;
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
    color: #29BC89;
    text-decoration: none;
    font-size: 12px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: #29BC89;
    }
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;

  h1, h2, h3, h4, h5, h6 {
    margin: 2.5em 0 1em;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main, #e8e8e8);
  }

  h2 { font-size: 20px; }
  h3 { font-size: 18px; }

  p {
    margin: 1.2em 0;
    line-height: 1.8;
    color: var(--text-dim, #888888);
    max-width: none;
    font-size: 14px;
  }

  a {
    color: #29BC89;
    text-decoration: none;
    border-bottom: 1px solid rgba(41, 188, 137, 0.3);
    transition: border-color 0.3s;

    &:hover {
      border-color: #29BC89;
      color: #29BC89;
    }
  }

  strong {
    color: var(--text-main, #e8e8e8);
    font-weight: 700;
  }

  em {
    color: var(--text-main, #e8e8e8);
  }

  ul, ol {
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
    border-left: 2px solid #29BC89;
    margin: 2em 0;
    padding: 0.5em 0 0.5em 1.5em;

    p {
      font-size: 14px;
      font-style: italic;
      color: var(--text-main, #e8e8e8);
      opacity: 0.8;
    }
  }

  code {
    font-family: 'Space Mono', 'Courier Prime', monospace;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.2em 0.4em;
    border-radius: 2px;
    color: var(--text-main, #e8e8e8);
  }

  pre {
    margin: 2em 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.6;

    code {
      background: none;
      padding: 0;
      font-size: 13px;
    }
  }

  img {
    max-width: 100%;
    margin: 2em 0;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  hr {
    border: none;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 3em 0;
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;

  return (
    <Layout location={location}>
      <BlogLayout>
        <Helmet title={title} />

        <StyledPostPage>
          <Link to="/blog" className="back-link">
            &larr; all posts
          </Link>

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

          <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
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
  query($path: String!) {
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
