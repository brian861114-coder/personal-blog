const ORIGINAL_BLOCKS = `function _blocks(fragment, state) {
  const children = [];
  fragment.forEach(child => {
    children.push(proseMirrorToMDX(child, state));
  });
  return children;
}`;

const PATCHED_BLOCKS = `function _blocks(fragment, state) {
  const children = [];
  fragment.forEach((child, _offset, index) => {
    let hasNonText = false;
    child.content.forEach(n => {
      if (!n.isText) hasNonText = true;
    });
    const isEmptyPara = child.type.name === 'paragraph' && child.textContent === '' && !hasNonText;
    if (isEmptyPara && index === fragment.childCount - 1) {
      return;
    }
    if (isEmptyPara) {
      children.push({
        type: 'mdxJsxFlowElement',
        name: 'Break',
        attributes: [],
        children: []
      });
      return;
    }
    children.push(proseMirrorToMDX(child, state));
  });
  return children;
}`;

const ORIGINAL_PARSE = `function parseToEditorStateMDX(content, schema, files, otherFiles, slug) {
  const root = fromMarkdown(content, {`;

const PATCHED_PARSE = `function extraBlankLinesToBreakTags(content) {
  const normalized = String(content).replace(/\\r\\n/g, '\\n');
  const fences = [];
  let body = normalized.replace(/\`\`\`[\\s\\S]*?\`\`\`/g, m => {
    fences.push(m);
    return '\\n%%FENCE' + (fences.length - 1) + '%%\\n';
  });
  body = body.replace(/\\n{3,}/g, m => {
    const extra = Math.floor(m.length / 2) - 1;
    if (extra < 1) return m;
    return '\\n\\n' + Array(extra).fill('<Break />').join('\\n\\n') + '\\n\\n';
  });
  return body.replace(/\\n%%FENCE(\\d+)%%\\n/g, (_, i) => fences[Number(i)]);
}
function parseToEditorStateMDX(content, schema, files, otherFiles, slug) {
  content = extraBlankLinesToBreakTags(content);
  const root = fromMarkdown(content, {`;

const ORIGINAL_SERIALIZE = `  const mdx = toMarkdown(mdxNode, {
    extensions: [gfmAutolinkLiteralToMarkdown(), gfmStrikethroughToMarkdown(), gfmTableToMarkdown(), mdxToMarkdown()],
    rule: '-'
  });`;

const PATCHED_SERIALIZE = `  const mdx = extraBlankLinesToBreakTags(toMarkdown(mdxNode, {
    extensions: [gfmAutolinkLiteralToMarkdown(), gfmStrikethroughToMarkdown(), gfmTableToMarkdown(), mdxToMarkdown()],
    rule: '-'
  }));`;

/** Keep Enter blank lines as \`<Break />\` in Keystatic's MDX round-trip. */
export function keystaticEmptyParagraphs() {
  return {
    name: 'keystatic-empty-paragraphs',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.replace(/\\/g, '/').includes('/@keystatic/core/')) return;
      let next = code;
      if (next.includes(ORIGINAL_BLOCKS)) next = next.replace(ORIGINAL_BLOCKS, PATCHED_BLOCKS);
      if (next.includes(ORIGINAL_PARSE)) next = next.replace(ORIGINAL_PARSE, PATCHED_PARSE);
      if (next.includes(ORIGINAL_SERIALIZE)) next = next.replace(ORIGINAL_SERIALIZE, PATCHED_SERIALIZE);
      if (next === code) return;
      return { code: next, map: null };
    },
  };
}
