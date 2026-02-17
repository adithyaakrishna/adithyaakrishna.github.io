import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { email } from '@config';

const StyledArticlePanel = styled.section`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  flex-shrink: 0;
  display: flex;
  max-width: none;
  margin: 0;
  padding: 0;
  background: var(--c-cream);
  overflow: hidden;

  .article-nav {
    width: 320px;
    min-width: 320px;
    padding: 60px 30px 60px calc(30px + 80px);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border-color-subtle);
    flex-shrink: 0;
    overflow-y: auto;

    @media (max-width: 1080px) {
      width: 240px;
      min-width: 240px;
      padding-left: calc(20px + 80px);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .back-link {
    font-family: var(--font-code);
    font-size: 0.7rem;
    text-decoration: none;
    color: var(--c-red);
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: var(--c-red);
    }
  }

  .article-meta {
    font-family: var(--font-code);
    font-size: 0.7rem;
    color: var(--c-subtle);
    margin-bottom: 2rem;
    letter-spacing: 1px;
  }

  .meta-label {
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .meta-value {
    color: var(--c-ink);
    margin-bottom: 18px;
    font-size: 0.75rem;
  }

  .toc {
    list-style: none;
    margin-top: 30px;
    padding: 0;
  }

  .toc-item {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    font-family: var(--font-code);
    font-size: 0.7rem;
    color: var(--c-subtle);
    text-decoration: none;
    transition: color 0.3s;
    letter-spacing: 0.5px;
    cursor: pointer;

    &:hover {
      color: var(--c-ink);
    }

    &.active {
      color: var(--c-ink);
    }

    span {
      margin-right: 10px;
      color: var(--c-red);
      font-weight: 600;
    }
  }

  .content-area {
    flex: 1;
    display: flex;
    overflow-y: auto;
    scroll-behavior: smooth;
    padding: 60px 0;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--c-red);
    }

    @media (max-width: 768px) {
      padding: 30px 0;
      flex-direction: column;
    }
  }

  .article-column {
    flex: 1;
    padding: 0 50px 80px 50px;
    min-width: 0;

    @media (max-width: 768px) {
      padding: 0 20px 60px 20px;
    }
  }

  .annotations-column {
    width: 340px;
    min-width: 340px;
    padding: 40px 20px 40px 30px;
    margin-right: 60px;
    border-left: 1px solid var(--border-color-subtle);
    position: sticky;
    top: 0;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 50px;
    flex-shrink: 0;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .annotation-item {
    font-family: var(--font-code);
    font-size: 0.75rem;
    line-height: 1.8;
    color: var(--c-subtle);

    strong {
      display: block;
      color: var(--c-red);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    blockquote {
      font-family: var(--font-code);
      font-size: 0.75rem;
      font-style: normal;
      color: var(--c-ink);
      margin-top: 8px;
      border-left: 1px solid var(--c-red);
      padding-left: 15px;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ul a {
      color: var(--c-ink);
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color 0.3s;

      &:hover {
        color: var(--c-red);
      }
    }
  }

  .mobile-back {
    display: none;

    @media (max-width: 768px) {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-code);
      font-size: 0.7rem;
      color: var(--c-red);
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
      padding: 8px 0;
      cursor: pointer;
      background: none;
      border: none;
    }
  }

  .article-header h1 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4.2rem);
    line-height: 0.9;
    text-transform: uppercase;
    margin-bottom: 60px;
    color: var(--text-primary);
    max-width: 800px;

    @media (max-width: 768px) {
      font-size: clamp(1.8rem, 8vw, 2.5rem);
      margin-bottom: 40px;
    }
  }

  .portfolio-section {
    font-family: 'Inter', sans-serif;
    margin: 0 0 70px 0;
    padding: 0;
    max-width: 720px;
    width: 100%;
  }

  .recommendations {
    font-family: var(--font-code);
    margin: 80px 0 0 0 !important;
    padding: 50px 0 50px 0 !important;
    max-width: 720px;
    width: 100%;
    border-top: 1px solid var(--border-color-subtle);
  }

  .section-label {
    font-family: var(--font-code);
    color: var(--c-red);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1.5rem;
    display: block;
  }

  .section-title {
    font-family: 'Inter', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  .section-content {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-muted);
    font-weight: 400;

    p {
      margin-bottom: 1rem;
    }

    ul {
      list-style: disc;
      padding-left: 1.25rem;
      margin: 0.5rem 0;
    }

    li {
      margin-bottom: 0.4rem;
      font-size: 0.95rem;
      color: var(--text-muted);
    }
  }

  .experience-item {
    margin-bottom: 0;
    border-bottom: 1px solid var(--border-color-subtle);
  }

  .exp-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    cursor: pointer;
    user-select: none;
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    color: inherit;
    font-family: inherit;

    &:hover .item-title {
      color: var(--c-red);
    }
  }

  .exp-toggle-icon {
    font-family: var(--font-code);
    font-size: 1.2rem;
    color: var(--c-red);
    flex-shrink: 0;
    margin-left: 1rem;
    transition: transform 0.3s;

    &.open {
      transform: rotate(45deg);
    }
  }

  .exp-toggle-left {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .exp-toggle-top {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.2rem;
    }
  }

  .exp-body {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
    padding: 0 0 0 0;

    &.open {
      max-height: 600px;
      opacity: 1;
      padding: 0 0 1.5rem 0;
    }
  }

  .project-item {
    margin-bottom: 2.5rem;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.25rem;
    }
  }

  .item-title {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .item-meta {
    font-family: var(--font-code);
    font-size: 0.7rem;
    color: var(--c-subtle);
    white-space: nowrap;
    letter-spacing: 0.5px;
    transition: color 0.2s;

    @media (max-width: 768px) {
      font-size: 0.65rem;
    }

    &:hover {
      color: var(--c-red);
    }
  }

  .item-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--c-red);
    margin-bottom: 0.75rem;

    a {
      color: var(--c-red);
      text-decoration: none;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-category {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .skill-list {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: var(--c-subtle);
    line-height: 1.6;
  }

  .rec-label {
    font-family: var(--font-code);
    color: var(--c-red);
    font-size: 0.75rem;
    margin-bottom: 30px;
    display: block;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .rec-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .rec-card {
    font-family: var(--font-code);
    border: 1px solid var(--border-color-subtle);
    padding: 25px;
    text-decoration: none;
    transition: all 0.3s;
    display: block;

    &:hover {
      border-color: var(--c-red);
      background: var(--card-hover-bg);
      color: inherit;
    }

    .rec-meta {
      font-family: var(--font-code);
      font-size: 0.7rem;
      color: var(--c-subtle);
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h4 {
      font-family: var(--font-code);
      font-size: 1.3rem;
      color: var(--text-primary);
      font-weight: 400;
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___index], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              url
            }
            html
          }
        }
      }
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const featuredData = data.featured.edges;
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState('about');
  const [openJobs, setOpenJobs] = useState(() => {
    const initial = {};
    jobsData.forEach((_, i) => {
      if (i < 2) initial[i] = true;
    });
    return initial;
  });

  const toggleJob = i => {
    setOpenJobs(prev => ({ ...prev, [i]: !prev[i] }));
  };

  useEffect(() => {
    const contentArea = contentRef.current;
    if (!contentArea) return;

    const handleScroll = () => {
      const sections = contentArea.querySelectorAll('[data-section]');
      let current = 'about';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 250) {
          current = section.dataset.section;
        }
      });
      setActiveSection(current);
    };

    contentArea.addEventListener('scroll', handleScroll);
    return () => contentArea.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = sectionId => {
    const contentArea = contentRef.current;
    const section = contentArea?.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackClick = e => {
    e.preventDefault();
    const scroller = document.getElementById('scrollContainer');
    if (scroller) {
      scroller.style.transform = 'translateX(0vw)';
    }
  };

  return (
    <StyledArticlePanel id="article-panel">
      <aside className="article-nav">
        <a href="#" className="back-link" onClick={handleBackClick}>
          &larr; Back to Home
        </a>

        <div className="article-meta">
          <div className="meta-label">Role</div>
          <div className="meta-value">Software Engineer</div>
          <div className="meta-label">Location</div>
          <div className="meta-value">Bengaluru, IN</div>
          <div className="meta-label">Status</div>
          <div className="meta-value">Building at Noice</div>
        </div>

        <nav className="toc">
          {[
            { id: 'about', num: '01', label: 'About Me' },
            { id: 'experience', num: '02', label: 'Work Experience' },
            { id: 'skills', num: '03', label: 'Technical Skills' },
            { id: 'projects', num: '04', label: 'Selected Projects' },
          ].map(item => (
            <a
              key={item.id}
              className={`toc-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}>
              <span>{item.num}</span> {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="content-area" ref={contentRef}>
        <div className="article-column">
          <button className="mobile-back" onClick={handleBackClick}>
            &larr; Back to Home
          </button>
          <header className="article-header">
            <h1>
              Curating
              <br />
              Efficient Digital
              <br />
              Experiences
            </h1>
          </header>

          <section data-section="about" className="portfolio-section">
            <span className="section-label">01 / Profile</span>
            <h2 className="section-title">
              Full-stack developer crafting delightful digital experiences.
            </h2>
            <div className="section-content">
              <p>
                I&apos;m Adithya Krishna, a Software Engineer at Noice where I build
                token launching interfaces and web3 experiences using Next.js, PixiJS, and WebGL2.
                I care deeply about performant UIs, clean architecture, and shipping fast.
              </p>
              <p>
                Before Noice, I built frontend systems at Tensorlake and Reclaim Protocol,
                worked on document signing UX at Documenso, and spent ~2.5 years at
                Red Hat on the Customer Portal team. I&apos;m also a GSoC &apos;23 alum
                (OpenChemistry / 3DMol.js) and a maintainer of Meshery, a CNCF Sandbox Project.
              </p>
            </div>
          </section>

          <section data-section="experience" className="portfolio-section">
            <span className="section-label">02 / Experience</span>
            {jobsData.map(({ node }, i) => {
              const { title, company, range, url } = node.frontmatter;
              const isOpen = !!openJobs[i];
              return (
                <div className="experience-item" key={i}>
                  <button
                    className="exp-toggle"
                    onClick={() => toggleJob(i)}
                    aria-expanded={isOpen}>
                    <div className="exp-toggle-left">
                      <div className="exp-toggle-top">
                        <h3 className="item-title">{title}</h3>
                        <span className="item-meta">{range}</span>
                      </div>
                      <div className="item-subtitle">
                        <a
                          href={url}
                          onClick={e => e.stopPropagation()}>
                          {company}
                        </a>
                      </div>
                    </div>
                    <span className={`exp-toggle-icon ${isOpen ? 'open' : ''}`}>+</span>
                  </button>
                  <div className={`exp-body ${isOpen ? 'open' : ''}`}>
                    <div
                      className="section-content"
                      dangerouslySetInnerHTML={{ __html: node.html }}
                    />
                  </div>
                </div>
              );
            })}
          </section>

          <section data-section="skills" className="portfolio-section">
            <span className="section-label">03 / Expertise</span>
            <div className="skills-grid">
              <div className="skill-group">
                <div className="skill-category">Frontend &amp; Design</div>
                <div className="skill-list">
                  TypeScript, React, Next.js, PixiJS, WebGL2, Tailwind CSS, Framer Motion,
                  Playwright, Jest, Figma
                </div>
              </div>
              <div className="skill-group">
                <div className="skill-category">Backend &amp; Tools</div>
                <div className="skill-list">
                  PostgreSQL, MongoDB, Firebase, Docker, Kubernetes, Git, GitHub Actions,
                  GCP, AWS, Vercel
                </div>
              </div>
            </div>
          </section>

          <section data-section="projects" className="portfolio-section">
            <span className="section-label">04 / Projects</span>
            {featuredData.slice(0, 4).map(({ node }, i) => {
              const { title, tech, github, external } = node.frontmatter;
              return (
                <div className="project-item" key={i}>
                  <div className="item-header">
                    <h3 className="item-title">{title}</h3>
                    <span className="item-meta">{tech ? tech.join(' / ') : ''}</span>
                  </div>
                  <div className="item-subtitle">
                    {external && <a href={external}>Live &rarr;</a>}
                    {external && github && ' \u00A0 '}
                    {github && <a href={github}>GitHub &rarr;</a>}
                  </div>
                  <div
                    className="section-content"
                    dangerouslySetInnerHTML={{ __html: node.html }}
                  />
                </div>
              );
            })}
          </section>

          <section className="recommendations">
            <span className="rec-label">Get In Touch</span>
            <div className="rec-grid">
              <a href={`mailto:${email}`} className="rec-card">
                <div className="rec-meta">Email</div>
                <h4>{email}</h4>
              </a>
              <Link to="https://x.com/adii_kris" className="rec-card">
                <div className="rec-meta">Twitter</div>
                <h4>@adii_kris</h4>
              </Link>
            </div>
          </section>
        </div>

        <aside className="annotations-column">
          <div className="annotation-item">
            <strong>Design Ethos</strong>
            <blockquote>
              &ldquo;Building high-performance interfaces at the edge of web3, open-source,
              and design systems. I care deeply about performant UIs, clean architecture, and shipping fast.&rdquo;
            </blockquote>
          </div>

          <div className="annotation-item">
            <strong>Currently</strong>
            <p>
              Building web3 experiences at Noice. Previously at Reclaim Protocol,
              Tensorlake, Documenso, and Red Hat.
            </p>
          </div>

          <div className="annotation-item">
            <strong>Quick Links</strong>
            <ul>
              <li>
                <a href="/resume.pdf">Resume (PDF)</a>
              </li>
              <li>
                <a href="https://github.com/adithyaakrishna">GitHub</a>
              </li>
              <li>
                <a href="https://adikris.in/blog">Blog</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </StyledArticlePanel>
  );
};

export default About;
