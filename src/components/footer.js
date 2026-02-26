import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 50px;
  padding: 15px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--c-subtle);
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.6;
  border-top: 1px solid var(--border-color);
  margin-top: 40px;
`;

const Footer = () => (
  <StyledFooter>
    <div>
      SYST_STATUS: OK &nbsp;&middot;&nbsp; Built with Gatsby &nbsp;&middot;&nbsp;
      <a href="https://github.com/bchiang7/v4" style={{ color: 'inherit' }}>
        Thanks to Brittany Chiang
      </a>
    </div>
  </StyledFooter>
);

export default Footer;
