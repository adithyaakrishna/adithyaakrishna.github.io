import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    // display: grid;
    // grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--red);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }
  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--white);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--red);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "Adi.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#29bc89" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Languages: TypeScript, JavaScript, Python, GoLang, HTML, CSS, Dart, Java, WebAssembly',
    'Libraries/Frameworks: NextJS, ReactJS, NodeJS, Tensorflow, Jest, Flutter',
    'Databases: MySQL, MongoDB, Firebase',
    'Design: Adobe Photoshop, Illustrator, Xd, Figma',
    'Tools: Prisma, Kubernetes, Docker, Git, GCP, AWS, JIRA, Confluence, Apache Solr, Apache TomCat, GitHub Actions'
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">ನಮಸ್ಕಾರ</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm Adithya Krishna, a Full-stack developer by day and a framework tinkerer by night. I currently work with{' '}
              <a href="https://tensorlake.ai" target="_blank" rel="noopener noreferrer">
                TensorLake AI
              </a>
              , building the UI for next-gen AI Infrastructure catering to generative AI applications.
            </p>

            <p>
              Previously, I worked as a SWE-II at{' '}
              <a href="https://documenso.com" target="_blank" rel="noopener noreferrer">
                Documenso
              </a>
              {' '}for ~7 months, and started my career at{' '}
              <a href="https://redhat.com" target="_blank" rel="noopener noreferrer">
                Red Hat
              </a>
              {' '}(~2.5 years) with the Customer Portal team.
            </p>

            <p>
              I was a Google Season of Docs (GSoD '23) Technical Writer at{' '}
              <a href="https://github.com/WasmEdge" target="_blank" rel="noopener noreferrer">
                WasmEdge
              </a>
              {' '}and a Google Summer of Code (GSoC '23) Developer at{' '}
              <a href="https://openchemistry.org" target="_blank" rel="noopener noreferrer">
                OpenChemistry
              </a>
              , where I worked on the{' '}
              <a href="https://github.com/3dmol/3Dmol.js" target="_blank" rel="noopener noreferrer">
                3DMol.js
              </a>
              {' '}library.
            </p>

            <p>
              I'm also a Maintainer of{' '}
              <a href="https://meshery.io" target="_blank" rel="noopener noreferrer">
                Meshery
              </a>
              , a CNCF Sandbox Project, where I contribute to UI, GitHub Actions, documentation, and code reviews.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            <li><strong style={{ color: 'white' }}>Languages:</strong> TypeScript, JavaScript, HTML, CSS, Python, GoLang, WebAssembly</li>
            <li><strong style={{color: 'white'}}>Libraries/Frameworks:</strong> ReactJS, NextJS, Jest, React Testing Library, Playwright</li>
            <li><strong style={{color: 'white'}}>Databases:</strong> MySQL, MongoDB, Firebase</li>
            <li><strong style={{color: 'white'}}>Design:</strong> Adobe Photoshop, Illustrator, Xd, Figma</li>
            <li><strong style={{ color: 'white' }}>Tools:</strong> Kubernetes (Familiar), Docker (Familiar), Git, GCP, AWS, JIRA, Confluence, Apache Solr, Apache TomCat, GitHub Actions</li>
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage 
              className="img"
              src="../../images/Adi.jpeg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
