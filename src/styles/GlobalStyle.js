import { createGlobalStyle } from 'styled-components';
import Fonts from './fonts';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${Fonts};

  [data-theme-transitioning] * {
    transition: none !important;
  }

  :root {
    --c-red: #D94838;
    --c-cream: #121212;
    --c-ink: #E0E0E0;
    --c-subtle: #666666;
    --border-color: rgba(255, 255, 255, 0.1);
    --border-color-subtle: rgba(255, 255, 255, 0.05);
    --rail-right-bg: #1a1a1a;
    --rail-divider: rgba(255, 255, 255, 0.2);
    --hero-text: #ffffff;
    --text-primary: #E0E0E0;
    --text-muted: rgba(224, 224, 224, 0.8);
    --card-bg: #181818;
    --card-hover-bg: #1a1a1a;
    --code-bg: #181818;
    --font-display: 'Oswald', sans-serif;
    --font-body: 'Cormorant Garamond', serif;
    --font-code: 'Space Mono', monospace;
    --border-width: 1px;
    --layout-padding: 6vw;
    --font-sans: 'Cormorant Garamond', 'Calibre', serif;
    --font-mono: 'Space Mono', 'SF Mono', monospace;
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;
    --border-radius: 0px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;
    --tab-height: 42px;
    --tab-width: 120px;
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --hamburger-width: 30px;
    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }

  [data-theme="light"] .section-content span[style*="color:white"],
  [data-theme="light"] .section-content span[style*="color: white"] {
    color: var(--text-primary) !important;
  }

  [data-theme="light"] {
    --c-cream: #F2EFE9;
    --c-ink: #1A1A1A;
    --c-subtle: #8A8A8A;
    --holo-orb: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(230,230,250,0.4), rgba(255,218,185,0.2));
    --border-color: rgba(0, 0, 0, 0.1);
    --border-color-subtle: rgba(0, 0, 0, 0.05);
    --rail-right-bg: #fff;
    --rail-divider: rgba(0, 0, 0, 0.15);
    --hero-text: #F2EFE9;
    --text-primary: #1A1A1A;
    --text-muted: rgba(26, 26, 26, 0.8);
    --card-bg: #fff;
    --card-hover-bg: #f5f5f5;
    --code-bg: #e8e8e8;
    --dark-navy: #0a0a0a;
    --Fwhite: #ffffff;
    --navy: #121212;
    --light-navy: #181818;
    --lightest-navy: #2a2a2a;
    --navy-shadow: #0a0a0a;
    --slate: #666666;
    --light-slate: #8a8a8a;
    --lightest-slate: #1A1A1A;
    --white: #1A1A1A;
    --red: #D94838;
    --red-tint: rgba(217, 72, 56, 0.15);
  }

  [data-theme="dark"] {
    --c-cream: #121212;
    --c-ink: #E0E0E0;
    --c-subtle: #666666;
    --holo-orb: radial-gradient(circle at 30% 30%, rgba(217, 72, 56, 0.4), rgba(20, 20, 20, 0.1), rgba(0, 0, 0, 0.5));
    --border-color: rgba(255, 255, 255, 0.1);
    --border-color-subtle: rgba(255, 255, 255, 0.05);
    --rail-right-bg: #1a1a1a;
    --rail-divider: rgba(255, 255, 255, 0.2);
    --hero-text: #ffffff;
    --text-primary: #E0E0E0;
    --text-muted: rgba(224, 224, 224, 0.8);
    --card-bg: #181818;
    --card-hover-bg: #1a1a1a;
    --code-bg: #181818;
    --dark-navy: #0a0a0a;
    --Fwhite: #ffffff;
    --navy: #121212;
    --light-navy: #181818;
    --lightest-navy: #2a2a2a;
    --navy-shadow: #0a0a0a;
    --slate: #999999;
    --light-slate: #b0b0b0;
    --lightest-slate: #E0E0E0;
    --white: #f0f0f0;
    --red: #D94838;
    --red-tint: rgba(217, 72, 56, 0.15);
  }

  html {
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;

    @media (max-width: 768px) {
      max-width: 100vw;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    cursor: crosshair;
  }

  a, button, input, textarea, [role="button"] {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  ::selection {
    background-color: var(--c-red);
    color: #ffffff;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    max-width: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--c-cream);
    color: var(--c-ink);
    font-family: var(--font-body);
    font-size: var(--fz-xl);
    line-height: 1.3;
    scrollbar-width: none;
    -ms-overflow-style: none;

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
    overflow-x: hidden;
    max-width: 100%;
  }

  #content {
    overflow-x: hidden;
    max-width: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px;

    @media (max-width: 1080px) {
      padding: 200px 100px;
    }
    @media (max-width: 768px) {
      padding: 150px 50px;
    }
    @media (max-width: 480px) {
      padding: 125px 25px;
    }

    &.fillHeight {
      padding: 0 150px;

      @media (max-width: 1080px) {
        padding: 0 100px;
      }
      @media (max-width: 768px) {
        padding: 0 50px;
      }
      @media (max-width: 480px) {
        padding: 0 25px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 80px 0;
    max-width: 1000px;

    @media (max-width: 768px) {
      padding: 80px 0;
    }

    @media (max-width: 480px) {
      padding: 60px 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--lightest-slate);
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-family: var(--font-display);
    font-size: clamp(26px, 5vw, var(--fz-heading));
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--red);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--border-color);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: var(--red);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  button {
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--code-bg);
      color: var(--text-primary);
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-lg);
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--red);
        }
      }
    }
  }

  blockquote {
    border-left-color: var(--red);
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 24px;
    }
  }

  hr {
    background-color: var(--border-color);
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }

  #logo {
    color: var(--red);
  }

  .overline {
    color: var(--red);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--red);
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    font-weight: 400;
    line-height: 1.5;
    @media (max-width: 1080px) {
      font-size: var(--fz-sm);
    }
    @media (max-width: 768px) {
      font-size: var(--fz-xs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: var(--red);

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 600;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${TransitionStyles};

  ${PrismStyles};
`;

export default GlobalStyle;
