import { createGlobalStyle } from 'styled-components';
import Fonts from './fonts';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${Fonts};

  :root {
    --font-stack: 'Space Mono', 'Courier Prime', monospace;
    --font-display: 'Space Mono', 'Courier Prime', monospace;
    --font-body: 'Space Mono', 'Courier Prime', monospace;
    --font-code: 'Space Mono', 'Courier Prime', monospace;
    --font-sans: 'Space Mono', 'Courier Prime', monospace;
    --font-mono: 'Space Mono', 'Courier Prime', monospace;
    --border-width: 1px;
    --layout-padding: 6vw;
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

  html[data-theme='light'] {
    color-scheme: light;
    --bg-color:rgb(255, 255, 255);
    --text-main: #163325;
    --text-dim:rgb(63, 72, 67);
    --accent: #1d7f53;
    --accent-bright: #249565;
    --accent-tint: rgba(29, 127, 83, 0.1);
    --selection-bg: rgba(29, 127, 83, 0.16);
    --selection-text: #102217;
    --noise-opacity: 0.025;
    --c-red: #1d7f53;
    --c-cream: #f7faf6;
    --c-ink: #163325;
    --c-subtle: rgb(63, 72, 67);
    --border-color: rgba(22, 51, 37, 0.1);
    --border-color-subtle: rgba(22, 51, 37, 0.06);
    --border-color-strong: rgba(22, 51, 37, 0.18);
    --surface-bg: rgba(255, 255, 255, 0.72);
    --surface-muted: rgba(238, 245, 239, 0.9);
    --surface-overlay: rgba(247, 250, 246, 0.86);
    --surface-strong: #ffffff;
    --surface-hover: rgba(29, 127, 83, 0.045);
    --shadow-color: rgba(17, 46, 33, 0.1);
    --rail-right-bg: rgba(255, 255, 255, 0.8);
    --rail-divider: rgba(22, 51, 37, 0.16);
    --hero-text: #163325;
    --text-primary: #163325;
    --text-muted: rgb(63, 72, 67);
    --card-bg: #ffffff;
    --card-hover-bg: #f2f7f3;
    --code-bg: #eef4ef;
    --blob-color: rgba(151, 197, 166, 0.45);
    --glow-color: rgba(29, 127, 83, 0.16);
    --dark-navy: #eef4ef;
    --Fwhite: #ffffff;
    --navy: rgba(247, 250, 246, 0.88);
    --light-navy: #ffffff;
    --lightest-navy: #edf4ef;
    --navy-shadow: rgba(17, 46, 33, 0.1);
    --slate: rgb(63, 72, 67);
    --light-slate: #7a8c81;
    --lightest-slate: #163325;
    --white: #163325;
    --red: var(--accent);
    --red-tint: rgba(29, 127, 83, 0.1);
  }

  html[data-theme='dark'] {
    color-scheme: dark;
    --bg-color: #080808;
    --text-main: #e8e8e8;
    --text-dim: #888888;
    --accent: #29bc89;
    --accent-bright: #35ebb0;
    --accent-tint: rgba(41, 188, 137, 0.12);
    --selection-bg: rgba(255, 255, 255, 0.2);
    --selection-text: #ffffff;
    --noise-opacity: 0.06;
    --c-red: #ffffff;
    --c-cream: #080808;
    --c-ink: #e8e8e8;
    --c-subtle: #888888;
    --border-color: rgba(255, 255, 255, 0.08);
    --border-color-subtle: rgba(255, 255, 255, 0.05);
    --border-color-strong: rgba(255, 255, 255, 0.22);
    --surface-bg: rgba(255, 255, 255, 0.02);
    --surface-muted: rgba(255, 255, 255, 0.04);
    --surface-overlay: rgba(8, 8, 8, 0.72);
    --surface-strong: #0e0e0e;
    --surface-hover: rgba(255, 255, 255, 0.03);
    --shadow-color: rgba(0, 0, 0, 0.35);
    --rail-right-bg: #0e0e0e;
    --rail-divider: rgba(255, 255, 255, 0.2);
    --hero-text: #e8e8e8;
    --text-primary: #e8e8e8;
    --text-muted: #888888;
    --card-bg: #0e0e0e;
    --card-hover-bg: #111111;
    --code-bg: #0e0e0e;
    --blob-color: rgba(30, 30, 30, 0.6);
    --glow-color: rgba(255, 255, 255, 0.3);
    --dark-navy: #050505;
    --Fwhite: #ffffff;
    --navy: #080808;
    --light-navy: #0e0e0e;
    --lightest-navy: #1a1a1a;
    --navy-shadow: #000000;
    --slate: #888888;
    --light-slate: #999999;
    --lightest-slate: #e8e8e8;
    --white: #e8e8e8;
    --red: #ffffff;
    --red-tint: rgba(255, 255, 255, 0.08);
  }

  html {
    box-sizing: border-box;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
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
    background-color: var(--selection-bg);
    color: var(--selection-text);
  }

  body {
    margin: 0;
    width: 100%;
    max-width: 100vw;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: 'Space Mono', 'Courier Prime', monospace;
    font-size: 14px;
    line-height: 1.6;
    scrollbar-width: none;
    -ms-overflow-style: none;

    @media (max-width: 480px) {
      font-size: 13px;
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
        filter: blur(5px) brightness(0.92);
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
    max-width: 100vw;
    overflow-x: hidden;
  }

  #content {
    max-width: 100vw;
    overflow-x: hidden;
    width: 100%;
  }

  main {
    margin: 0;
    width: 100%;
    max-width: 100%;
    min-height: auto;
    padding: 0;
  }

  section {
    margin: 0;
    padding: 0;
    max-width: 100%;
    width: 100%;

    @media (max-width: 768px) {
      padding: 0;
    }

    @media (max-width: 480px) {
      padding: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main);
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
    font-size: clamp(26px, 5vw, var(--fz-heading));
    text-transform: lowercase;
    letter-spacing: -0.02em;
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--accent);
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
      background-color: var(--text-dim);
      opacity: 0.2;

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
      color: var(--accent);
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
    color: var(--text-dim);

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
          color: var(--accent);
        }
      }
    }
  }

  blockquote {
    border-left-color: var(--accent);
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
    background-color: var(--border-color-subtle);
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
    color: var(--accent);
  }

  .overline {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--text-dim);
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
    color: var(--accent);

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
