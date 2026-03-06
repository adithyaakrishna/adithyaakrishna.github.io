/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const snippetMetas = require('./src/data/snippets.json');

function decodeHtmlEntities(value = '') {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractMatch(content, expression, fallback = '') {
  const match = content.match(expression);
  if (!match || !match[1]) return fallback;
  return match[1].trim();
}

function parseSnippetSource({ slug, sourceFile, title, description, tag }) {
  const sourcePath = path.resolve(sourceFile);
  const source = fs.readFileSync(sourcePath, 'utf8');
  const sharedCss = fs.readFileSync(path.resolve('content/css-hacks/style.css'), 'utf8');
  const demoCss = extractMatch(source, /<style>([\s\S]*?)<\/style>/i);
  const mainInner = extractMatch(source, /<main>([\s\S]*?)<\/main>/i);
  const codeLanguageClass = extractMatch(source, /<pre><code class="([^"]+)">/i, 'language-css');
  const code = decodeHtmlEntities(extractMatch(source, /<pre><code class="[^"]+">([\s\S]*?)<\/code><\/pre>/i));
  const inferredTitle = decodeHtmlEntities(extractMatch(source, /<h1>([\s\S]*?)<\/h1>/i, title));
  const inferredDescription = decodeHtmlEntities(
    extractMatch(source, /<p class="desc">([\s\S]*?)<\/p>/i, description)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  ).trim();
  const inferredTag = decodeHtmlEntities(extractMatch(source, /<span class="tag[^"]*">([\s\S]*?)<\/span>/i, tag));

  const withoutHero = mainInner.replace(/<div class="hero">[\s\S]*?<\/div>/i, '');
  const withoutCode = withoutHero.replace(/<div class="code-block">[\s\S]*?<\/div>/i, '');
  const demoMarkup = withoutCode.trim();

  return {
    slug,
    title: inferredTitle || title,
    description: inferredDescription || description,
    tag: inferredTag || tag,
    code,
    codeLanguage: codeLanguageClass.replace('language-', ''),
    sharedCss,
    demoCss,
    demoMarkup,
  };
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');
  const snippetTemplate = path.resolve('src/templates/snippet.js');

  createRedirect({
    fromPath: `/console-log/*`,
    toPath: `https://adithyaakrishna.notion.site/96eab65068354b4ab1b69bae6c12df5d`,
    statusCode: 404,
  });

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create post detail pages
  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: postTemplate,
      context: {},
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  snippetMetas.forEach(snippetMeta => {
    const snippet = parseSnippetSource(snippetMeta);
    createPage({
      path: snippetMeta.path,
      component: snippetTemplate,
      context: {
        snippet: {
          ...snippet,
          ...(snippetMeta.whyItWorks && { whyItWorks: snippetMeta.whyItWorks }),
          ...(snippetMeta.uxLaw && { uxLaw: snippetMeta.uxLaw }),
        },
      },
    });
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
