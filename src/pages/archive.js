import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { Icon } from '@components/icons';

const StyledTableContainer = styled.div`
  margin: 80px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-mono);

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: rgba(217, 72, 56, 0.03);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;
      font-size: var(--fz-sm);
      border-bottom: 1px solid var(--border-color);

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }

    th {
      color: var(--c-red);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;
        color: var(--c-red);
        font-size: var(--fz-xs);

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: 10px;
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-md);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-sm);
        white-space: nowrap;
        color: var(--c-subtle);
      }

      &.tech {
        font-size: 10px;
        font-family: var(--font-mono);
        line-height: 1.5;
        color: var(--c-subtle);

        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 100px;

        div {
          display: flex;
          align-items: center;

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
            color: var(--c-subtle);

            &:hover {
              color: var(--c-red);
            }
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const ArchivePage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Archive" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading" style={{ fontFamily: 'var(--font-mono)' }}>Archive</h1>
          <p className="subtitle">ls -la ./all_projects</p>
        </header>

        <StyledTableContainer ref={revealTable}>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hide-on-mobile">Made at</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map(({ node }, i) => {
                  const {
                    date,
                    github,
                    external,
                    ios,
                    android,
                    title,
                    tech,
                    company,
                  } = node.frontmatter;
                  return (
                    <tr key={i} ref={el => (revealProjects.current[i] = el)}>
                      <td className="overline year">{`${new Date(date).getFullYear()}`}</td>

                      <td className="title">{title}</td>

                      <td className="company hide-on-mobile">
                        {company ? <span>{company}</span> : <span>—</span>}
                      </td>

                      <td className="tech hide-on-mobile">
                        {tech?.length > 0 &&
                          tech?.map((item, j) => (
                            <span key={j}>
                              {item}
                              {''}
                              {j !== tech?.length - 1 && <span className="separator">&middot;</span>}
                            </span>
                          ))}
                      </td>

                      <td className="links">
                        <div>
                          {external && (
                            <a href={external} aria-label="External Link">
                              <Icon name="External" />
                            </a>
                          )}
                          {github && (
                            <a href={github} aria-label="GitHub Link">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {ios && (
                            <a href={ios} aria-label="Apple App Store Link">
                              <Icon name="AppStore" />
                            </a>
                          )}
                          {android && (
                            <a href={android} aria-label="Google Play Store Link">
                              <Icon name="PlayStore" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>
      </main>
    </Layout>
  );
};

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            tech
            github
            external
            ios
            android
            company
          }
          html
        }
      }
    }
  }
`;
