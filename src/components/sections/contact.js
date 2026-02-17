import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email, socialMedia } from '@config';
import sr from '@utils/sr';

const StyledContactSection = styled.section`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: var(--border-width) solid rgba(255, 255, 255, 0.1);
  max-width: none;
  margin: 0;
  padding: 0;

  .contact-container {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    height: 100%;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .contact-left {
    padding: var(--layout-padding);
    padding-left: calc(var(--layout-padding) + 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
      padding-left: var(--layout-padding);
    }
  }

  .contact-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 5rem);
    text-transform: uppercase;
    color: var(--c-red);
    line-height: 1;
    margin-bottom: 3rem;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
  }

  .contact-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-family: var(--font-body);
    font-size: clamp(1.2rem, 2vw, 2rem);
    padding: 1rem 0;
    margin-bottom: 3rem;
    outline: none;
    color: var(--c-ink);
    cursor: text;

    &::placeholder {
      color: var(--c-subtle);
      font-family: var(--font-code);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

  .submit-button {
    background: var(--c-red);
    color: white;
    border: none;
    padding: 1.5rem 4rem;
    font-family: var(--font-display);
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: opacity 0.3s;
    align-self: flex-start;

    &:hover {
      opacity: 0.9;
    }
  }

  .contact-right {
    padding: var(--layout-padding);
    background-color: var(--c-red);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .contact-details {
    h4 {
      font-family: var(--font-code);
      opacity: 0.7;
      margin-bottom: 1rem;
      font-size: 0.8rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #ffffff;
    }

    a {
      display: block;
      color: #ffffff;
      font-family: var(--font-display);
      font-size: clamp(1.5rem, 3vw, 3rem);
      text-decoration: none;
      margin-bottom: 1rem;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
        color: #ffffff;
      }
    }
  }

  .contact-footer {
    margin-top: 4rem;
    font-family: var(--font-code);
    font-size: 0.7rem;
    opacity: 0.8;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const socialLinks = socialMedia
    ? socialMedia.filter(({ name }) => ['Twitter', 'Linkedin', 'GitHub'].includes(name))
    : [];

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <div className="contact-container">
        <div className="contact-left">
          <h2 className="contact-title">Let&apos;s Talk</h2>
          <form
            className="contact-form"
            onSubmit={e => {
              e.preventDefault();
              window.location.href = `mailto:${email}`;
            }}>
            <input type="text" className="contact-input" placeholder="YOUR NAME" />
            <input type="email" className="contact-input" placeholder="YOUR EMAIL" />
            <input type="text" className="contact-input" placeholder="YOUR MESSAGE" />
            <button type="submit" className="submit-button">
              Send Inquiry
            </button>
          </form>
        </div>
        <div className="contact-right">
          <div className="contact-details">
            <h4>Direct Contact</h4>
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            <h4>Socials</h4>
            {socialLinks.map(({ url, name }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                {name === 'Twitter' ? 'Twitter / X' : name}
              </a>
            ))}
          </div>
          <footer className="contact-footer">
            &copy; {new Date().getFullYear()} AADITHYA. DESIGNED WITH PRECISION.
          </footer>
        </div>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
