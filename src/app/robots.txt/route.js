// src/app/robots.txt/route.js
export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you

Sitemap: https://kashidarshan.com/sitemap.xml

# Googlebot specific
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Other search engines
User-agent: Bingbot
Allow: /
Crawl-delay: 2
  `.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}