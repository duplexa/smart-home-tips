import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft && !data.redirectTo))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 50);

  const items = posts
    .map((post) => {
      const url = new URL(post.data.canonicalPath ?? `/blog/${post.id}`, site).href;
      return `
        <item>
          <title><![CDATA[${post.data.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description><![CDATA[${post.data.description}]]></description>
          <pubDate>${post.data.date.toUTCString()}</pubDate>
        </item>`;
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>Smart Home Tips</title>
          <link>${site.href}</link>
          <description>UK smart-home buying guides, setup advice, and practical automation tips.</description>
          ${items}
        </channel>
      </rss>`,
    {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    },
  );
}
