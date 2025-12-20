import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import UserBlogPost from '@/models/UserBlogPost';

export default async function sitemap() {
  const baseUrl = 'https://www.kashidarshan.org';
  
  try {
    await connectToDatabase();
    
    const [mainPosts, userPosts] = await Promise.all([
      BlogPost.find({ status: 'published' }).select('slug updatedAt').lean(),
      UserBlogPost.find({ status: 'approved' }).select('slug updatedAt').lean()
    ]);
    
    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/user/blog/submit`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];
    
    // Main blog posts
    const mainBlogUrls = mainPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
    
    // User blog posts
    const userBlogUrls = userPosts.map(post => ({
      url: `${baseUrl}/stories/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
    
    return [...staticPages, ...mainBlogUrls, ...userBlogUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if database fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
    ];
  }
}