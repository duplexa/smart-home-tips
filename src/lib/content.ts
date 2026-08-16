import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const categories = [
  {
    slug: 'buying-guides',
    label: 'Buying Guides',
    description: 'UK-focused device roundups, comparisons, and budget picks for people ready to choose.',
    keywords: ['best', 'buying', 'deals', 'amazon', 'under', 'vs', 'comparison', 'reviews', 'starter kit', 'bundle'],
  },
  {
    slug: 'security',
    label: 'Security',
    description: 'Doorbells, cameras, locks, alarms, privacy settings, and safer smart-home setup.',
    keywords: ['security', 'camera', 'doorbell', 'lock', 'alarm', 'privacy', 'smoke', 'garage'],
  },
  {
    slug: 'lighting',
    label: 'Lighting',
    description: 'Smart bulbs, switches, scenes, colour, motion sensors, and lighting automation.',
    keywords: ['lighting', 'light', 'bulb', 'switch', 'hue', 'lifx', 'scene', 'motion'],
  },
  {
    slug: 'heating-energy',
    label: 'Heating & Energy',
    description: 'Smart thermostats, energy monitoring, winter prep, and lower-running-cost automation.',
    keywords: ['thermostat', 'energy', 'heating', 'winter', 'power', 'consumption', 'efficiency'],
  },
  {
    slug: 'wifi-hubs',
    label: 'Wi-Fi & Hubs',
    description: 'Mesh Wi-Fi, Zigbee, Z-Wave, Matter, Home Assistant, hubs, and network reliability.',
    keywords: ['wifi', 'wi-fi', 'mesh', 'zigbee', 'z-wave', 'matter', 'hub', 'home assistant', 'homebridge', 'openhab', 'network'],
  },
  {
    slug: 'setup-automation',
    label: 'Setup & Automation',
    description: 'Planning, installation, routines, renters, seniors, maintenance, and troubleshooting.',
    keywords: ['setup', 'automation', 'install', 'installation', 'routine', 'troubleshooting', 'maintenance', 'renovation', 'compatibility'],
  },
];

export function getPostCategory(post: BlogPost) {
  const haystack = `${post.data.title} ${post.data.description} ${(post.data.tags ?? []).join(' ')}`.toLowerCase();
  return categories.find((category) => category.keywords.some((keyword) => haystack.includes(keyword))) ?? categories[categories.length - 1];
}

export function isBuyerIntentPost(post: BlogPost) {
  const title = post.data.title.toLowerCase();
  return ['best', 'vs', 'review', 'comparison', 'buying', 'deals', 'amazon', 'under', 'starter kit', 'bundle'].some((term) =>
    title.includes(term),
  );
}

export function hasAffiliateLinks(post: BlogPost) {
  return /amazon\.(co\.uk|com)|tag=smarthomestip/i.test(post.body ?? '');
}

export function getExcerpt(post: BlogPost, maxLength = 155) {
  if (post.data.description.length <= maxLength) return post.data.description;
  return `${post.data.description.slice(0, maxLength - 1).trim()}...`;
}

export function getTableOfContents(post: BlogPost) {
  return Array.from((post.body ?? '').matchAll(/^##\s+(.+)$/gm))
    .slice(0, 8)
    .map((match) => {
      const text = match[1].replace(/[#*_`[\]]/g, '').trim();
      const slug = text
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      return { text, slug };
    });
}

export function getRelatedPosts(currentPost: BlogPost, posts: BlogPost[], limit = 4) {
  const category = getPostCategory(currentPost).slug;

  return posts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => ({
      post,
      score: (getPostCategory(post).slug === category ? 2 : 0) + (isBuyerIntentPost(post) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf())
    .slice(0, limit)
    .map(({ post }) => post);
}
