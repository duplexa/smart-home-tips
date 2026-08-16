export const hubPaths = [
  '/best-smart-plugs-uk/',
  '/best-smart-light-bulbs-uk/',
  '/best-smart-doorbells-uk/',
  '/alexa-vs-google-home-uk/',
  '/matter-smart-home-uk/',
  '/home-assistant-starter-kit-uk/',
];

export const legacyRedirects: Record<string, string> = {
  '/blog/best-smart-plugs-uk-complete-buying-guide-and-top-recommenda': '/best-smart-plugs-uk/',
  '/blog/best-smart-plugs-uk-top-picks-for-home-automation': '/best-smart-plugs-uk/',
  '/blog/best-smart-plugs-for-alexa-complete-guide-to-voice-controlle': '/best-smart-plugs-uk/',
  '/blog/best-smart-plugs-for-your-home-automation-needs': '/best-smart-plugs-uk/',
  '/blog/best-smart-light-bulbs-uk-complete-guide-to-connected-lighti': '/best-smart-light-bulbs-uk/',
  '/blog/best-smart-light-bulbs-complete-guide-to-intelligent-lightin': '/best-smart-light-bulbs-uk/',
  '/blog/complete-smart-home-lighting-guide-transform-your-home-with-': '/best-smart-light-bulbs-uk/',
  '/blog/philips-hue-starter-kit-amazon-deals-complete-buying-guide': '/best-smart-light-bulbs-uk/',
  '/blog/philips-hue-vs-lifx-smart-bulbs-complete-comparison-guide': '/best-smart-light-bulbs-uk/',
  '/blog/ring-doorbell-vs-nest-doorbell-complete-comparison-review': '/best-smart-doorbells-uk/',
  '/blog/smart-doorbell-reviews-complete-guide-to-the-best-video-door': '/best-smart-doorbells-uk/',
  '/blog/ring-doorbell-pro-vs-nest-hello-complete-comparison-guide': '/best-smart-doorbells-uk/',
  '/blog/ring-video-doorbell-4-vs-nest-doorbell-battery-complete-comp': '/best-smart-doorbells-uk/',
  '/blog/alexa-vs-google-home-the-ultimate-smart-speaker-comparison': '/alexa-vs-google-home-uk/',
  '/blog/amazon-alexa-vs-google-nest-mini-complete-smart-speaker-comp': '/alexa-vs-google-home-uk/',
  '/blog/amazon-echo-vs-google-nest-hub-complete-smart-display-compar': '/alexa-vs-google-home-uk/',
  '/blog/amazon-echo-show-vs-google-nest-hub-complete-smart-display-c': '/alexa-vs-google-home-uk/',
  '/blog/amazon-echo-dot-vs-echo-show-8-complete-comparison-guide': '/alexa-vs-google-home-uk/',
  '/blog/best-smart-speakers-uk-complete-guide-to-finding-your-perfec': '/alexa-vs-google-home-uk/',
  '/blog/matter-smart-home-protocol-guide-everything-you-need-to-know': '/matter-smart-home-uk/',
  '/blog/smart-home-device-compatibility-matrix-your-complete-guide-t': '/matter-smart-home-uk/',
  '/blog/smart-home-compatibility-chart-complete-guide-to-device-inte': '/matter-smart-home-uk/',
  '/blog/smart-home-compatibility-checklist-essential-guide-for-seaml': '/matter-smart-home-uk/',
  '/blog/how-to-choose-smart-home-devices-for-perfect-compatibility': '/matter-smart-home-uk/',
  '/blog/home-assistant-the-ultimate-guide-to-smart-home-automation': '/home-assistant-starter-kit-uk/',
  '/blog/home-assistant-the-complete-guide-to-smart-home-automation': '/home-assistant-starter-kit-uk/',
  '/blog/home-assistant-the-complete-guide-to-smart-home-automation-i': '/home-assistant-starter-kit-uk/',
  '/blog/home-assistant-the-ultimate-guide-to-smart-home-automation-i': '/home-assistant-starter-kit-uk/',
  '/blog/openhab-vs-home-assistant-complete-comparison-guide-for-smar': '/home-assistant-starter-kit-uk/',
  '/blog/home-assistant-vs-openhab-performance-comparison-which-smart': '/home-assistant-starter-kit-uk/',
};

export function getRedirectTarget(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return legacyRedirects[normalized];
}
