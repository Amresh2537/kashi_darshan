// src/app/robots.txt/route.js
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://www.kashidarshan.org/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}