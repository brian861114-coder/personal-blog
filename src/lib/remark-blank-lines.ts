import type { Root, RootContent } from 'mdast';

function extraBreaksBetween(src: string, from: number, to: number) {
  const gap = src.slice(from, to);
  const newlines = (gap.match(/\n/g) ?? []).length;
  return Math.max(0, Math.floor(newlines / 2) - 1);
}

function breakNode(): RootContent {
  return {
    type: 'mdxJsxFlowElement',
    name: 'Break',
    attributes: [],
    children: [],
  } as RootContent;
}

/** Turn leftover extra blank lines in the MDX source into `<Break />` nodes. */
export function remarkBlankLines() {
  return (tree: Root, file: { value?: unknown }) => {
    const src = String(file.value ?? '');
    if (!src || !tree.children.length) return;

    const next: RootContent[] = [];
    for (let i = 0; i < tree.children.length; i++) {
      const curr = tree.children[i];
      if (i > 0) {
        const prev = tree.children[i - 1];
        const a = prev.position?.end?.offset;
        const b = curr.position?.start?.offset;
        if (a != null && b != null) {
          const extra = extraBreaksBetween(src, a, b);
          for (let n = 0; n < extra; n++) next.push(breakNode());
        }
      }
      next.push(curr);
    }
    tree.children = next;
  };
}
