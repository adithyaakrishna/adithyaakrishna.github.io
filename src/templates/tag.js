import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';

const StyledTagPage = styled.div`
  padding-top: 0.5vh;

  @media (max-width: 600px) {
    padding-top: 4vh;
  }

  .nav-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 10px;
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

  .tag-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2rem;

    h1 {
      font-size: 24px;
      font-weight: 400;
      text-transform: lowercase;
      color: var(--text-main, #e8e8e8);
    }

    .view-all {
      font-size: 12px;
      color: #29bc89;
      text-decoration: none;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.7;
        color: #29bc89;
      }
    }
  }

  .section-header {
    font-size: 14px;
    font-weight: 600;
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

  .post-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color-subtle);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;

    &:hover {
      padding-left: 10px;
      color: var(--text-main, #e8e8e8);
      border-bottom: 1px solid var(--border-color-strong);
    }

    &:hover .post-title {
      text-shadow: 0 0 8px var(--glow-color);
    }
  }

  .post-title {
    font-size: 16px;
    text-transform: lowercase;
    font-weight: 400;
    color: var(--text-main, #e8e8e8);
    transition: 0.3s;
    margin: 0;
  }

  .post-date {
    font-size: 12px;
    color: var(--text-dim, #888888);
    font-family: 'Courier Prime', monospace;
    white-space: nowrap;
  }
`;

const TagTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges } = data.allMarkdownRemark;

  const formatDate = dateStr => {
    const d = new Date(dateStr);
    const months = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <Layout location={location}>
      <BlogLayout>
        <Helmet title={`tagged: #${tag}`} />

        <StyledTagPage>
          <div className="nav-row">
            <button className="back-link" onClick={() => window.history.back()}>
              &larr; back
            </button>
          </div>

          <div className="tag-header">
            <h1>#{tag}</h1>
            <Link to="/blog/tags" className="view-all">
              view all tags
            </Link>
          </div>

          <div className="section-header">posts</div>

          {edges.map(({ node }) => {
            const { title, slug, date } = node.frontmatter;
            return (
              <Link to={slug} className="post-item" key={slug}>
                <span className="post-title">{title}</span>
                <span className="post-date">{formatDate(date)}</span>
              </Link>
            );
          })}
        </StyledTagPage>
      </BlogLayout>
    </Layout>
  );
};

export default TagTemplate;

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired,
      ),
    }),
  }),
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query ($tag: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            description
            date
            slug
            tags
          }
        }
      }
    }
  }
`;
