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
    --c-red: #C0392B;
    --c-cream: #ffffff;
    --c-ink: #000000;
    --c-subtle: #444444;
    --c-bright: #000000;
    --border-color: rgba(0, 0, 0, 0.18);
    --border-color-subtle: rgba(0, 0, 0, 0.1);
    --grid-color: rgba(192, 57, 43, 0.03);
    --rail-right-bg: #ffffff;
    --rail-divider: rgba(0, 0, 0, 0.25);
    --hero-text: #000000;
    --text-primary: #000000;
    --text-muted: #222222;
    --card-bg: #f5f5f5;
    --card-hover-bg: #eeeeee;
    --code-bg: #f5f5f5;
    --font-display: 'Inter', -apple-system, sans-serif;
    --font-body: 'Inter', -apple-system, sans-serif;
    --font-code: 'Space Mono', monospace;
    --font-sans: 'Inter', -apple-system, sans-serif;
    --font-mono: 'Space Mono', 'SF Mono', monospace;
    --font-decorative: 'Playfair Display', serif;
    --border-width: 1px;
    --layout-padding: 6vw;
    --fz-xxs: 13px;
    --fz-xs: 14px;
    --fz-sm: 15px;
    --fz-md: 16px;
    --fz-lg: 17px;
    --fz-xl: 18px;
    --fz-xxl: 20px;
    --fz-heading: 22px;
    --border-radius: 0px;
    --nav-height: 70px;
    --nav-scroll-height: 56px;
    --tab-height: 42px;
    --tab-width: 120px;
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --hamburger-width: 30px;
    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
    --dark-navy: #eeeeee;
    --Fwhite: #000000;
    --navy: #ffffff;
    --light-navy: #f5f5f5;
    --lightest-navy: #eeeeee;
    --navy-shadow: rgba(0, 0, 0, 0.1);
    --slate: #444444;
    --light-slate: #444444;
    --lightest-slate: #000000;
    --white: #000000;
    --red: #C0392B;
    --red-tint: rgba(192, 57, 43, 0.1);
  }

  [data-theme="light"],
  [data-theme="dark"] {
    --c-red: #C0392B;
    --c-cream: #ffffff;
    --c-ink: #000000;
    --c-subtle: #444444;
    --c-bright: #000000;
    --border-color: rgba(0, 0, 0, 0.18);
    --border-color-subtle: rgba(0, 0, 0, 0.1);
    --grid-color: rgba(192, 57, 43, 0.03);
    --hero-text: #000000;
    --text-primary: #000000;
    --text-muted: #222222;
    --card-bg: #f5f5f5;
    --card-hover-bg: #eeeeee;
    --code-bg: #f5f5f5;
    --dark-navy: #eeeeee;
    --Fwhite: #000000;
    --navy: #ffffff;
    --light-navy: #f5f5f5;
    --lightest-navy: #eeeeee;
    --navy-shadow: rgba(0, 0, 0, 0.1);
    --slate: #444444;
    --light-slate: #444444;
    --lightest-slate: #000000;
    --white: #000000;
    --red: #C0392B;
    --red-tint: rgba(192, 57, 43, 0.1);
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
  }

  a, button, input, textarea, [role="button"] {
    cursor: pointer;
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
    font-size: var(--fz-md);
    line-height: 1.6;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;

    @media (max-width: 480px) {
      font-size: var(--fz-sm);
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

  .bg-grid {
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
  }

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }

  .cursor-blink {
    animation: blink 1s step-end infinite;
    display: inline-block;
    width: 8px;
    height: 1.2em;
    background-color: var(--c-red);
    vertical-align: middle;
    margin-left: 4px;
  }

  .terminal-header {
    color: var(--c-red);
    font-weight: 700;
    font-size: 22px;
    font-family: var(--font-mono);
    padding: 16px 0;
    margin-bottom: 12px;
    border-bottom: 2px solid var(--c-red);
    letter-spacing: 0.5px;

    &::before {
      content: 'user@adithya:~$ ';
      color: var(--c-subtle);
      font-weight: 400;
      font-size: 16px;
    }
  }

  .custom-scrollbar {
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
    }
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
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
    margin: 0;
    padding: 60px 0;
    max-width: none;

    @media (max-width: 768px) {
      padding: 50px 0;
    }

    @media (max-width: 480px) {
      padding: 40px 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 700;
    color: var(--lightest-slate);
    line-height: 1.1;
    font-family: var(--font-mono);
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
    font-family: var(--font-mono);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
    font-family: var(--font-mono);
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-family: var(--font-mono);
    font-size: clamp(16px, 3vw, var(--fz-heading));
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 0;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--red);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-sm), 3vw, var(--fz-lg));
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
      top: 0;
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
      font-size: var(--fz-md);
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
      font-size: var(--fz-lg);
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
