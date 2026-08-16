const affiliateHostPattern = /(^|\.)amazon\.(co\.uk|com)$/i;

function visit(node) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === 'a') {
    const href = String(node.properties?.href ?? '');
    let isAffiliateLink = false;

    try {
      const url = new URL(href);
      isAffiliateLink = affiliateHostPattern.test(url.hostname) || url.searchParams.has('tag');
    } catch {
      isAffiliateLink = /amazon\.(co\.uk|com).*tag=/i.test(href);
    }

    if (isAffiliateLink) {
      node.properties = {
        ...node.properties,
        rel: 'sponsored nofollow noopener',
        target: '_blank',
      };
    }
  }

  if (Array.isArray(node.children)) {
    node.children.forEach(visit);
  }
}

export default function rehypeAffiliateLinks() {
  return (tree) => visit(tree);
}
