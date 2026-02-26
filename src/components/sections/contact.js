import React from 'react';
import styled from 'styled-components';
import { email, socialMedia } from '@config';

const StyledContactSection = styled.section`
  margin-bottom: 80px;
  max-width: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  .contact-content {
    display: flex;
    flex-direction: column;
  }

  .contact-item {
    margin-bottom: 32px;
  }

  .contact-label {
    font-size: 10px;
    color: var(--c-red);
    display: block;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .contact-value {
    color: var(--c-bright);
    font-size: var(--fz-md);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--c-red);
    }
  }

  .contact-socials {
    display: flex;
    gap: 16px;
    margin-top: 8px;
  }

  .social-link {
    color: var(--c-bright);
    text-decoration: none;
    font-size: var(--fz-sm);
    transition: color 0.2s;

    &:hover {
      color: var(--c-red);
    }
  }

  .contact-cta {
    margin-top: 32px;
    padding: 16px 24px;
    border: 1px solid var(--border-color);
    display: inline-block;
    color: var(--c-red);
    text-decoration: none;
    font-size: var(--fz-sm);
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.2s;

    &:hover {
      background: rgba(217, 72, 56, 0.08);
      border-color: var(--c-red);
      color: var(--c-red);
    }
  }
`;

const Contact = () => {
  const socialLinks = socialMedia
    ? socialMedia.filter(({ name }) => ['Twitter', 'Linkedin', 'GitHub'].includes(name))
    : [];

  return (
    <StyledContactSection data-section="contact">
      <h2 className="terminal-header">./contact.sh</h2>
      <br />
      <div className="contact-content">
        <div className="contact-item">
          <span className="contact-label">Email</span>
          <a className="contact-value" href={`mailto:${email}`}>
            {email}
          </a>
        </div>

        <div className="contact-item">
          <span className="contact-label">Socials</span>
          <div className="contact-socials">
            {socialLinks.map(({ url, name }) => (
              <a
                key={name}
                href={url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer">
                [{name.toUpperCase()}]
              </a>
            ))}
          </div>
        </div>

        <div className="contact-item">
          <span className="contact-label">Resume</span>
          <a className="contact-value" href="/resume.pdf">
            resume.pdf
          </a>
        </div>

        <a className="contact-cta" href={`mailto:${email}`}>
          Send Inquiry →
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
