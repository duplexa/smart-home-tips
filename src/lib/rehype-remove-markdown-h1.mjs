function removeH1Children(node) {
  if (!node || typeof node !== 'object') return;

  if (Array.isArray(node.children)) {
    node.children = node.children.filter((child) => !(child.type === 'element' && child.tagName === 'h1'));
    node.children.forEach(removeH1Children);
  }
}

export default function rehypeRemoveMarkdownH1() {
  return (tree) => removeH1Children(tree);
}
