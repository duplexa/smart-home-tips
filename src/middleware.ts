import { defineMiddleware } from 'astro:middleware';
import { getRedirectTarget } from './lib/hubs';

const canonicalHost = 'smarthomestips.com';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const redirectTarget = getRedirectTarget(url.pathname);

  if (redirectTarget) {
    url.pathname = redirectTarget;
    return Response.redirect(url, 301);
  }

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
