import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';

const StyledTagsPage = styled.div`
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
    margin-bottom: 3rem;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: #29BC89;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main, #e8e8e8);
    margin-bottom: 2rem;
  }

  .tags-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-dim, #888888);
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 8px 14px;
    transition: color 0.3s ease, border-color 0.3s ease, text-shadow 0.3s ease;

    .count {
      color: #29BC89;
      font-size: 11px;
    }

    &:hover {
      color: var(--accent, #ffffff);
      border-color: rgba(255, 255, 255, 0.25);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }
  }
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
  location,
}) => (
  <Layout location={location}>
    <BlogLayout>
      <Helmet title="Tags" />

      <StyledTagsPage>
        <Link to="/blog" className="back-link">
          &larr; all posts
        </Link>

        <h1>tags</h1>
        <ul className="tags-list">
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`} className="tag-chip">
                #{tag.fieldValue} <span className="count">({tag.totalCount})</span>
              </Link>
            </li>
          ))}
        </ul>
      </StyledTagsPage>
    </BlogLayout>
  </Layout>
);

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
  }),
  location: PropTypes.object,
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000, filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
