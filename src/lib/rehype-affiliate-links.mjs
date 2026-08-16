const affiliateHostPattern = /(^|\.)amazon\.(co\.uk|com)$/i;
const associateTag = 'smarthomestip-21';

function normalizeAmazonHref(href) {
  const url = new URL(href);

  if (!affiliateHostPattern.test(url.hostname)) {
    return href;
  }

  const asinMatch = url.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:\/|$)/i);
  if (asinMatch) {
    return `${url.protocol}//${url.hostname}/dp/${asinMatch[1].toUpperCase()}/ref=nosim?tag=${associateTag}`;
  }

  url.searchParams.set('tag', associateTag);
  return url.toString();
}

function visit(node) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === 'a') {
    const href = String(node.properties?.href ?? '');
    let isAffiliateLink = false;

    try {
      const url = new URL(href);
      isAffiliateLink = affiliateHostPattern.test(url.hostname) || url.searchParams.has('tag');
      if (affiliateHostPattern.test(url.hostname)) {
        node.properties.href = normalizeAmazonHref(href);
      }
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
