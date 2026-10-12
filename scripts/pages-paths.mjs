// Deployment-only transforms: keep existing page source and styling intact.
export function pagesPaths() {
  return {
    name: 'github-pages-font-paths',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('/node_modules/')) return;
      if (id.split('?')[0].endsWith('/src/styles/fonts.css')) {
        return code.replace(/url\(\/public\/fonts\//g, 'url(../../public/fonts/');
      }
    },
  };
}

// Apply to both literal and dynamic asset/anchor URLs. React Router handles
// Link/Navigate destinations with its basename; external URLs and hashes stay intact.
export function pagesAttributes(base) {
  return ({ types: t, template }) => ({
    visitor: {
      Program: {
        enter(path, state) {
          state.pagesUrlId = path.scope.generateUidIdentifier('pagesUrl');
          state.pagesUrlUsed = false;
        },
        exit(path, state) {
          if (!state.pagesUrlUsed) return;
          const helper = template.statement.ast(`
            const ${state.pagesUrlId.name} = (url) =>
              typeof url === 'string' && url.startsWith('/') && !url.startsWith('//') &&
              url !== ${JSON.stringify(base.slice(0, -1))} && !url.startsWith(${JSON.stringify(base)})
                ? ${JSON.stringify(base.slice(0, -1))} + url : url;
          `);
          path.unshiftContainer('body', helper);
        },
      },
      JSXAttribute(path, state) {
        const { name, value } = path.node;
        if (!t.isJSXIdentifier(name) || !['src', 'href', 'poster'].includes(name.name) || !value) return;
        const expression = t.isStringLiteral(value) ? value
          : t.isJSXExpressionContainer(value) && !t.isJSXEmptyExpression(value.expression) ? value.expression : null;
        if (!expression) return;
        state.pagesUrlUsed = true;
        path.node.value = t.jsxExpressionContainer(t.callExpression(t.cloneNode(state.pagesUrlId), [expression]));
      },
    },
  });
}
