import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import connectToDatabase from './mongodb';
import BlogPost from '@/models/BlogPost';
import UserBlogPost from '@/models/UserBlogPost';

export async function generateSitemap() {
  try {
    await connectToDatabase();
    
    const baseUrl = 'https://www.kashidarshan.org';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Fetch all published posts
    const [mainPosts, userPosts] = await Promise.all([
      BlogPost.find({ status: 'published' }).select('slug updatedAt').lean(),
      UserBlogPost.find({ status: 'approved' }).select('slug updatedAt').lean()
    ]);
    
    // Static pages
    const staticPages = [
      '',
      '/blog',
      '/user/blog/submit',
      '/about',
      '/contact',
      '/privacy-policy',
      '/terms-of-service'
    ];
    
    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;
    
    // Add static pages
    staticPages.forEach(page => {
      sitemap += `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>\n`;
    });
    
    // Add main blog posts
    mainPosts.forEach(post => {
      const lastmod = post.updatedAt 
        ? new Date(post.updatedAt).toISOString().split('T')[0]
        : currentDate;
      
      sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });
    
    // Add user blog posts
    userPosts.forEach(post => {
      const lastmod = post.updatedAt 
        ? new Date(post.updatedAt).toISOString().split('T')[0]
        : currentDate;
      
      sitemap += `  <url>
    <loc>${baseUrl}/stories/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
    });
    
    sitemap += '</urlset>';
    
    // Save sitemap to public directory
    const publicDir = join(process.cwd(), 'public');
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }
    
    writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully!');
    
    // Generate robots.txt
    const robotsTxt = `# https://www.kashidarshan.org/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-news.xml

# Crawl-delay: 10
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Claude-Web
Disallow: /`;
    
    writeFileSync(join(publicDir, 'robots.txt'), robotsTxt);
    console.log('✅ Robots.txt generated successfully!');
    
    return true;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return false;
  }
}