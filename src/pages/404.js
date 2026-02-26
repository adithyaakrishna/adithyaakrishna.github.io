import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navDelay } from '@utils';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
`;

const StyledTitle = styled.h1`
  color: var(--red);
  font-family: var(--font-mono);
  font-size: clamp(80px, 20vw, 160px);
  line-height: 1;
`;

const StyledSubtitle = styled.h2`
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 400;
  font-family: var(--font-mono);
  color: var(--c-ink);
  margin-top: 8px;
`;

const StyledTerminalText = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  color: var(--c-subtle);
  margin-top: 24px;
  text-align: center;
  line-height: 1.8;

  .cmd {
    color: var(--c-red);
  }
`;

const StyledHomeButton = styled(Link)`
  ${({ theme }) => theme.mixins.bigButton};
  margin-top: 40px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: var(--fz-xs);
`;

const NotFoundPage = ({ location }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Page Not Found" />

      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition timeout={500} classNames="fadeup">
            <StyledMainContainer className="fillHeight">
              <StyledTitle>404</StyledTitle>
              <StyledSubtitle>Page Not Found</StyledSubtitle>
              <StyledTerminalText>
                <span className="cmd">user@adithya:~$</span> cat page.txt<br />
                Error: No such file or directory
              </StyledTerminalText>
              <StyledHomeButton to="/">cd ~</StyledHomeButton>
            </StyledMainContainer>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Layout>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;
