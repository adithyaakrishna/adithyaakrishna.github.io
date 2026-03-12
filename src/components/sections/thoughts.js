import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const blogPosts = [
  {
    slug: 'log_005',
    title: 'smooth trading charts with pixijs & react',
    url: '/blog/pixijs-trading-chart',
    date: 'feb 2026',
  },
  {
    slug: 'log_004',
    title: 'deduped sonner toasts with nudge',
    url: '/blog/sonner-toast-dedup',
    date: 'feb 2026',
  },
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
  width: 100%;
  overflow: hidden;

  .section-header {
    font-size: 14px;
    font-weight: 600;
    color: #29bc89;
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
    border-bottom: 1px solid var(--border-color-subtle);
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
    color: inherit;
    gap: 0.5rem;

    @media (max-width: 600px) {
      flex-wrap: wrap;
    }

    &:hover {
      padding-left: 10px;
      color: var(--text-main, #e8e8e8);
      border-bottom: 1px solid var(--border-color-strong);
    }

    &:hover .item-title {
      filter: blur(0px);
      text-shadow: 0 0 8px var(--glow-color);
    }
  }

  .item-left {
    display: flex;
    gap: 1rem;
    align-items: baseline;
    min-width: 0;
    flex: 1;

    @media (max-width: 600px) {
      gap: 0.75rem;
      flex: 1 1 100%;
    }
  }

  .item-index {
    font-size: 12px;
    font-weight: 600;
    color: #29bc89;
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

  .view-all {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 12px;
    line-height: 1;
    color: var(--text-dim, #888888);
    text-decoration: none;
    border: 1px solid var(--border-color);
    background: var(--surface-bg);
    padding: 8px 14px;
    margin-top: 0.5rem;
    transition: color 0.3s ease, border-color 0.3s ease, text-shadow 0.3s ease;
    text-transform: lowercase;
    letter-spacing: 0.05em;

    &:hover {
      color: var(--accent);
      border-color: var(--border-color-strong);
      text-shadow: 0 0 8px var(--glow-color);
    }
  }
`;

const Thoughts = () => (
  <StyledThoughtsSection id="thoughts">
    <div className="section-header">thoughts_&amp;_logs</div>
    {blogPosts.slice(0, 3).map((post, i) => (
      <a href={post.url} className="list-item" key={i}>
        <div className="item-left">
          <span className="item-index">{post.slug}</span>
          <span className="item-title">{post.title}</span>
        </div>
        <span className="item-meta">read &middot; {post.date}</span>
      </a>
    ))}
    <Link to="/blog" className="view-all">
      all posts &rarr;
    </Link>
  </StyledThoughtsSection>
);

export default Thoughts;
