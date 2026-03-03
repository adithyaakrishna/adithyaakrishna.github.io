import React from 'react';
import styled from 'styled-components';
import { email } from '@config';

const StyledContactSection = styled.section`
  padding-top: 2rem;
  margin: 0;
  max-width: none;
  width: 100%;
  overflow-wrap: break-word;

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

  p {
    color: var(--text-dim, #555555);
    max-width: 100ch;
    margin-bottom: 2rem;
  }

  .email-link {
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid #444;
    padding-bottom: 2px;
    transition: border-color 0.3s;

    &:hover {
      border-color: #fff;
      color: #fff;
    }
  }

  .footer-quote {
    margin-top: 4rem;
    font-size: 13px;
    color: #29BC89;
    max-width: 100ch;
    font-style: italic;
    opacity: 0.6;
  }
`;

const Contact = () => (
  <StyledContactSection id="contact">
    <div className="section-header">contact</div>
    <p>
      I'd love to hear from you. Feel free to reach out via email anytime.
    </p>
    <a href={`mailto:${email}`} className="email-link">{email}</a>
    <div className="footer-quote">
      &ldquo;I build clear, fast products and design interfaces
      people trust and love to use.&rdquo;
    </div>
  </StyledContactSection>
);

export default Contact;
