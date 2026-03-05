import React, { useEffect, useMemo, useState } from 'react';
import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import BlogLayout from '@components/blog-layout';

const StyledSnippetPage = styled.div`
  padding-top: 0.5vh;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding-top: 4vh;
  }

  .nav-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 10px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-stack, 'Space Mono', monospace);
    font-size: 13px;
    color: #29bc89;
    text-decoration: none;
    text-transform: lowercase;
    letter-spacing: 0.1em;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
      color: #29bc89;
    }
  }
`;

const StyledSnippetHeader = styled.header`
  margin-bottom: 2.2rem;

  h1 {
    font-size: clamp(32px, 5vw, 46px);
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    color: var(--text-main, #e8e8e8);
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  .snippet-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 14px;
    color: var(--text-dim, #888888);
  }

  .snippet-tag {
    color: #29bc89;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Courier Prime', monospace;
  }

  .snippet-description {
    margin-top: 1rem;
    line-height: 1.7;
    color: var(--text-dim, #888888);
    font-size: 17px;
  }
`;

const StyledSnippetSection = styled.section`
  margin-bottom: 1.5rem;

  .section-title {
    font-size: 14px;
    color: var(--text-dim, #888888);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    &::after {
      content: '';
      height: 1px;
      flex-grow: 1;
      background: var(--text-dim, #888888);
      opacity: 0.2;
    }
  }
`;

const StyledDemoFrame = styled.iframe`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.01);
  display: block;
  min-height: 220px;
`;

const StyledCodeBlock = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);

  .copy-button {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(0, 0, 0, 0.25);
    color: var(--text-main, #e8e8e8);
    font-size: 12px;
    text-transform: lowercase;
    letter-spacing: 0.08em;
    padding: 0.3rem 0.55rem;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  pre {
    margin: 0;
    padding: 1.8rem 1.6rem;
    overflow-x: auto;
    line-height: 1.65;
    font-size: 14px;
    color: var(--text-dim, #b0b0b0);
    white-space: pre;
  }

  code {
    font-family: 'Space Mono', 'Courier Prime', monospace;
    font-size: 14px;
  }

  .token-comment {
    color: #7a7f8e;
  }

  .token-selector {
    color: #f472b6;
  }

  .token-property {
    color: #a78bfa;
  }

  .token-punctuation {
    color: #9ca3af;
  }

  .token-value {
    color: #fbbf24;
  }

  .token-string {
    color: #86efac;
  }

  .token-keyword {
    color: #7dd3fc;
  }

  .token-tag {
    color: #c4b5fd;
  }

  .token-attr-name {
    color: #fca5a5;
  }

  .token-attr-value {
    color: #86efac;
  }
`;

function escapeHtml(input = '') {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightCss(source = '') {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, match => `<span class="token-comment">${match}</span>`)
    .replace(/([^{\n]+)(\s*\{)/g, (_, selector, brace) =>
      `<span class="token-selector">${selector}</span><span class="token-punctuation">${brace}</span>`
    )
    .replace(/([a-zA-Z-]+)(\s*:)/g, (_, property, colon) =>
      `<span class="token-property">${property}</span><span class="token-punctuation">${colon}</span>`
    )
    .replace(/(:\s*)([^;\n]+)(;?)/g, (_, prefix, value, suffix) =>
      `${prefix}<span class="token-value">${value}</span><span class="token-punctuation">${suffix}</span>`
    )
    .replace(/([{}();,])/g, '<span class="token-punctuation">$1</span>');
}

function highlightMarkup(source = '') {
  return source
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token-comment">$1</span>')
    .replace(/(&lt;\/?)([a-zA-Z0-9-]+)([^&]*?)(\/?&gt;)/g, (_, open, tag, attrs, close) => {
      const highlightedAttrs = attrs
        .replace(/([a-zA-Z:-]+)(=)("[^"]*"|'[^']*')/g, '<span class="token-attr-name">$1</span><span class="token-punctuation">$2</span><span class="token-attr-value">$3</span>');
      return `${open}<span class="token-tag">${tag}</span>${highlightedAttrs}${close}`;
    });
}

function highlightJavaScript(source = '') {
  return source
    .replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>')
    .replace(/\b(const|let|var|function|return|if|else|for|while|new|class|import|from|export|await|async)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="token-string">$1</span>')
    .replace(/([{}();,])/g, '<span class="token-punctuation">$1</span>');
}

function highlightCode(source = '', language = 'css') {
  const escapedCode = escapeHtml(source);
  if (language === 'markup' || language === 'html') return highlightMarkup(escapedCode);
  if (language === 'javascript' || language === 'js') return highlightJavaScript(escapedCode);
  return highlightCss(escapedCode);
}

function createSnippetFrameDoc({ sharedCss, demoCss, demoMarkup }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${sharedCss || ''}</style>
  <style>
    html, body {
      height: auto;
      overflow: visible;
    }
    body {
      justify-content: flex-start;
      padding: 0;
      min-height: 0;
    }
    main {
      max-width: none;
      width: 100%;
      padding: 20px;
    }
    @media (max-width: 600px) {
      main {
        padding: 16px;
      }
    }
  </style>
  <style>${demoCss || ''}</style>
</head>
<body>
  <main>${demoMarkup || ''}</main>
  <script>
    (function () {
      function postHeight() {
        var main = document.querySelector('main');
        var body = document.body;
        var contentHeight = main ? Math.ceil(main.getBoundingClientRect().height) : 0;
        var mainScrollHeight = main ? main.scrollHeight : 0;
        var bodyScrollHeight = body ? body.scrollHeight : 0;
        var height = Math.max(contentHeight, mainScrollHeight, bodyScrollHeight);
        parent.postMessage({ type: 'snippet-demo-height', height: height }, '*');
      }
      postHeight();
      window.addEventListener('load', postHeight);
      window.addEventListener('resize', postHeight);
      if ('MutationObserver' in window) {
        new MutationObserver(postHeight).observe(document.body, {
          subtree: true,
          childList: true,
          attributes: true,
          characterData: true
        });
      }
      setTimeout(postHeight, 50);
      setTimeout(postHeight, 300);
      setTimeout(postHeight, 800);
    })();
  </script>
</body>
</html>`;
}

function copyWithFallback(rawCode) {
  if (typeof document === 'undefined') return false;
  const textArea = document.createElement('textarea');
  textArea.value = rawCode;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  const didCopy = document.execCommand('copy');
  document.body.removeChild(textArea);
  return didCopy;
}

const SnippetTemplate = ({ location, pageContext }) => {
  const { snippet } = pageContext;
  const [frameHeight, setFrameHeight] = useState(260);
  const [copyLabel, setCopyLabel] = useState('copy');
  const frameDoc = useMemo(
    () => createSnippetFrameDoc(snippet),
    [snippet]
  );
  const highlightedCode = useMemo(
    () => highlightCode(snippet.code, snippet.codeLanguage),
    [snippet.code, snippet.codeLanguage]
  );

  useEffect(() => {
    function onMessage(event) {
      if (!event || !event.data) return;
      if (event.data.type !== 'snippet-demo-height') return;
      const nextHeight = Number(event.data.height);
      if (!Number.isFinite(nextHeight) || nextHeight <= 0) return;
      // Keep demos tight to content while avoiding runaway heights.
      setFrameHeight(Math.max(220, Math.min(nextHeight + 8, 460)));
    }

    if (typeof window !== 'undefined')
      window.addEventListener('message', onMessage);

    return () => {
      if (typeof window !== 'undefined')
        window.removeEventListener('message', onMessage);
    };
  }, []);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
      return;
    }
    navigate('/snippets');
  };

  const handleCopy = async () => {
    if (!snippet.code) return;

    let didCopy = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(snippet.code);
        didCopy = true;
      } catch (error) {
        didCopy = copyWithFallback(snippet.code);
      }
    } else {
      didCopy = copyWithFallback(snippet.code);
    }

    setCopyLabel(didCopy ? 'copied' : 'copy failed');
    setTimeout(() => setCopyLabel('copy'), 1800);
  };

  return (
    <Layout location={location}>
      <BlogLayout contentWidth={1120}>
        <Helmet title={`${snippet.title} | Snippets`} />

        <StyledSnippetPage>
          <div className="nav-row">
            <button className="back-link" onClick={handleBack}>
              &larr; back
            </button>
            <Link to="/snippets" className="back-link">
              snippets
            </Link>
          </div>

          <StyledSnippetHeader>
            <h1>{snippet.title}</h1>
            <div className="snippet-meta">
              <span className="snippet-tag">#{snippet.tag}</span>
              <span>{snippet.slug}</span>
            </div>
            <p className="snippet-description">{snippet.description}</p>
          </StyledSnippetHeader>

          <StyledSnippetSection>
            <div className="section-title">live_demo</div>
            <StyledDemoFrame
              title={`${snippet.slug} demo`}
              srcDoc={frameDoc}
              style={{ height: `${frameHeight}px` }}
              loading="lazy"
              sandbox="allow-scripts"
            />
          </StyledSnippetSection>

          <StyledSnippetSection>
            <div className="section-title">code</div>
            <StyledCodeBlock>
              <button type="button" className="copy-button" onClick={handleCopy}>
                {copyLabel}
              </button>
              <pre>
                <code
                  className={`language-${snippet.codeLanguage || 'css'}`}
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </StyledCodeBlock>
          </StyledSnippetSection>
        </StyledSnippetPage>
      </BlogLayout>
    </Layout>
  );
};

SnippetTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    snippet: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      sharedCss: PropTypes.string.isRequired,
      demoCss: PropTypes.string.isRequired,
      demoMarkup: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      codeLanguage: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SnippetTemplate;
