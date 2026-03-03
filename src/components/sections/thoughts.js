import React from 'react';
import styled from 'styled-components';

const blogPosts = [
  {
    slug: 'log_003',
    title: 'boxing the digital canvas: i love pdfs',
    url: '/blog/bounding-box',
    date: 'apr 2025',
  },
  {
    slug: 'log_002',
    title: 'play: the joyful path to productivity',
    url: '/blog/play',
    date: 'oct 2024',
  },
  {
    slug: 'log_001',
    title: 'fomo: your unexpected ally',
    url: '/blog/fomo',
    date: 'sep 2024',
  },
];

const StyledThoughtsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  max-width: none;

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
      background: var(--text-dim, #555555);
      opacity: 0.2;
    }
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
    color: inherit;

    &:hover {
      padding-left: 10px;
      color: var(--accent, #ffffff);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    &:hover .item-title {
      filter: blur(0px);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
  }

  .item-left {
    display: flex;
    gap: 2rem;
    align-items: baseline;
  }

  .item-index {
    font-size: 12px;
    color: #29BC89;
    font-family: 'Courier Prime', monospace;
  }

  .item-title {
    font-size: 16px;
    transition: 0.3s;
    text-transform: lowercase;
    letter-spacing: normal;
    font-weight: 400;
    color: var(--text-main, #e8e8e8);
    margin: 0;
  }

  .item-meta {
    font-size: 12px;
    color: var(--text-dim, #888888);
    text-align: right;
    white-space: nowrap;
  }
`;

const Thoughts = () => (
  <StyledThoughtsSection id="thoughts">
    <div className="section-header">thoughts_&amp;_logs</div>
    {blogPosts.map((post, i) => (
      <a
        href={post.url}
        className="list-item"
        key={i}>
        <div className="item-left">
          <span className="item-index">{post.slug}</span>
          <span className="item-title">{post.title}</span>
        </div>
        <span className="item-meta">read &middot; {post.date}</span>
      </a>
    ))}
  </StyledThoughtsSection>
);

export default Thoughts;
