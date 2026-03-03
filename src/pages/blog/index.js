import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';

const StyledBlogPage = styled.div`
  padding-top: 10vh;

  @media (max-width: 600px) {
    padding-top: 4vh;
  }

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

  .page-header {
    margin-bottom: 4rem;
  }

  .page-title {
    font-size: 24px;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main, #e8e8e8);
    margin-bottom: 0.5rem;
  }

  .page-subtitle {
    font-size: 12px;
    color: var(--text-dim, #888888);
    max-width: none;
  }

  .section-header {
    font-size: 12px;
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

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  .post-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    gap: 1rem;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 0.5rem;
    }

    &:hover {
      padding-left: 10px;
      color: var(--accent, #ffffff);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    &:hover .post-title {
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
  }

  .post-left {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
    flex: 1;

    @media (max-width: 600px) {
      width: 100%;
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

  .post-desc {
    font-size: 12px;
    color: var(--text-dim, #888888);
    max-width: none;
    margin: 0;
  }

  .post-right {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-shrink: 0;

    @media (max-width: 600px) {
      width: 100%;
      justify-content: space-between;
    }
  }

  .post-tags {
    display: flex;
    gap: 0.5rem;

    .tag {
      font-size: 11px;
      color: #29BC89;
      text-decoration: none;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.7;
        color: #29BC89;
      }
    }
  }

  .post-date {
    font-size: 12px;
    color: var(--text-dim, #888888);
    font-family: 'Courier Prime', monospace;
    white-space: nowrap;
  }
`;

const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;

  const formatDate = dateStr => {
    const d = new Date(dateStr);
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <Layout location={location}>
      <BlogLayout>
        <Helmet title="Blog" />

        <StyledBlogPage>
          <Link to="/" className="back-link">
            &larr; home
          </Link>

          <div className="page-header">
            <h1 className="page-title">thoughts_&amp;_logs</h1>
            <p className="page-subtitle">a collection of writings and notes</p>
          </div>

          <div className="section-header">all_posts</div>

          <StyledPostList>
            {posts.length > 0 &&
              posts.map(({ node }, i) => {
                const { title, description, slug, date, tags } = node.frontmatter;
                return (
                  <Link to={slug} className="post-item" key={i}>
                    <div className="post-left">
                      <h3 className="post-title">{title}</h3>
                      <p className="post-desc">{description}</p>
                    </div>
                    <div className="post-right">
                      <div className="post-tags">
                        {tags &&
                          tags.map((tag, j) => (
                            <span key={j} className="tag">
                              #{tag}
                            </span>
                          ))}
                      </div>
                      <span className="post-date">{formatDate(date)}</span>
                    </div>
                  </Link>
                );
              })}
          </StyledPostList>
        </StyledBlogPage>
      </BlogLayout>
    </Layout>
  );
};

BlogPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
          }
          html
        }
      }
    }
  }
`;
