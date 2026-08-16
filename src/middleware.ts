import { defineMiddleware } from 'astro:middleware';

const canonicalHost = 'smarthomestips.com';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  if (url.pathname === '/sitemap.xml') {
    return context.redirect('/sitemap-index.xml', 301);
  }

  if (url.hostname === `www.${canonicalHost}` || url.protocol !== 'https:') {
    url.protocol = 'https:';
    url.hostname = canonicalHost;
    return Response.redirect(url, 301);
  }

  return next();
});
