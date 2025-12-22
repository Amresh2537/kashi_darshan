export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap() {
  const baseUrl = 'https://www.kashidarshan.org';
  const currentDate = new Date();
  
  try {
    // Dynamically import to avoid build-time errors
    const { default: connectToDatabase } = await import('@/lib/mongodb');
    const { default: BlogPost } = await import('@/models/BlogPost');
    
    await connectToDatabase();
    
    // Fetch only required fields for performance
    const mainPosts = await BlogPost.find({ 
      status: 'published' 
    })
    .select('slug updatedAt')
    .sort({ updatedAt: -1 })
    .limit(500) // Limit to 500 posts for performance
    .lean();
    
    // Static pages with priority
    const staticPages = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/packages`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms-of-service`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ];

    // Main blog posts
    const mainBlogUrls = mainPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Optional: Categories pages if you have them
    const categories = ['pilgrimage-guide', 'temple-history', 'travel-tips', 'cultural-insights', 'spiritual-significance', 'local-guide'];
    const categoryUrls = categories.map(category => ({
      url: `${baseUrl}/blog/category/${category}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...staticPages, ...categoryUrls, ...mainBlogUrls];
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback to static pages if database fails
    return [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
  }
}