import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export const metadata = {
  title: 'Blog | Precision Tools Insights & Industry Guides',
  description: 'Expert articles, guides, and insights about precision tools, grinding vices, and manufacturing equipment from Tanex Industries.',
  keywords: 'precision tools blog, manufacturing guides, industrial equipment, CNC machining, tool room equipment',
  openGraph: {
    title: 'Blog | Tanex Industries - Precision Tools Insights',
    description: 'Expert articles and guides about precision manufacturing tools and equipment',
    type: 'website',
  },
};

// Fetch all published blog posts from MongoDB
async function getBlogPosts() {
  try {
    await connectToDatabase();
    
    const posts = await BlogPost.find({ 
      status: 'published' 
    })
    .sort({ createdAt: -1 })
    .lean();
    
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Get categories with counts
async function getCategories() {
  try {
    await connectToDatabase();
    
    const categories = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const categoryIcons = {
      'Industry Guide': '🏭',
      'Buying Guide': '🛒',
      'Maintenance': '🔧',
      'Technical': '⚙️',
      'Industry Trends': '📈',
      'Case Studies': '📊'
    };
    
    return categories.map(cat => ({
      name: cat._id,
      count: cat.count,
      icon: categoryIcons[cat._id] || '📝'
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get featured post
async function getFeaturedPost() {
  try {
    await connectToDatabase();
    
    const featuredPost = await BlogPost.findOne({ 
      status: 'published',
      featured: true 
    })
    .sort({ createdAt: -1 })
    .lean();
    
    return featuredPost;
  } catch (error) {
    console.error('Error fetching featured post:', error);
    return null;
  }
}

// Get stats
async function getStats() {
  try {
    await connectToDatabase();
    
    const totalPosts = await BlogPost.countDocuments({ status: 'published' });
    const categories = await BlogPost.distinct('category', { status: 'published' });
    
    return {
      total: totalPosts,
      categories: categories.length
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      total: 0,
      categories: 0
    };
  }
}

export default async function BlogHome() {
  // Fetch all data in parallel
  const [posts, categories, featuredPost, stats] = await Promise.all([
    getBlogPosts(),
    getCategories(),
    getFeaturedPost(),
    getStats()
  ]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-16 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.1) 50%, transparent 51%),
                             linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.1) 50%, transparent 51%)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
                Industry Insights & Guides
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Precision Tools
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mt-2">
                Knowledge Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert articles, technical guides, and industry insights about precision manufacturing tools, equipment, and best practices.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{stats.total}</div>
                <div className="text-gray-300 text-sm">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{stats.categories}</div>
                <div className="text-gray-300 text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">45+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form action="/blog/search" method="GET">
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search articles, guides, and insights..."
                    className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700 font-medium">Blog</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Featured Article
            </h2>
            <div key={featuredPost._id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-gray-900 to-blue-900 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-2">
                      {featuredPost.title.split(' ')[0].match(/\d+/)?.[0] || '10'}
                    </div>
                    <div className="text-white/80 text-sm uppercase tracking-wider">
                      {featuredPost.category.toUpperCase()}
                    </div>
                    <div className="mt-4">
                      <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-500 text-sm">{formatDate(featuredPost.date)}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Read Full Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <span className="text-gray-500 text-sm">
                      Industry Expert Guide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {category.count} {category.count === 1 ? 'article' : 'articles'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-16" id="all-articles">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Latest Articles
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Newest</option>
                <option>Most Read</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No articles yet</h3>
              <p className="mt-2 text-gray-500">
                Check back soon for new articles and insights.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                  {post.image?.url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image.url}
                        alt={post.image.alt || post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        post.category === 'Industry Guide' ? 'bg-orange-100 text-orange-800' :
                        post.category === 'Buying Guide' ? 'bg-blue-100 text-blue-800' :
                        post.category === 'Maintenance' ? 'bg-green-100 text-green-800' :
                        post.category === 'Technical' ? 'bg-purple-100 text-purple-800' :
                        post.category === 'Industry Trends' ? 'bg-indigo-100 text-indigo-800' :
                        post.category === 'Case Studies' ? 'bg-pink-100 text-pink-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">{formatDate(post.date)}</span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-semibold group"
                      >
                        Read more
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Popular Tags */}
        {posts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Popular Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {posts.slice(0, 10).flatMap(post => 
                Array.isArray(post.keywords) ? post.keywords : []
              )
              .filter((keyword, index, self) => 
                keyword && self.indexOf(keyword) === index
              )
              .slice(0, 15)
              .map((keyword, index) => (
                <Link 
                  key={index}
                  href={`/blog/tag/${keyword.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105"
                >
                  #{keyword}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-8 md:p-12 text-center text-white overflow-hidden mb-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Industry Insights</h3>
            <p className="text-blue-200 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter and receive the latest articles, technical guides, and industry news directly in your inbox.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-blue-300 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-blue-200 text-xs mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Expert Guidance?</h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Our team of precision tools experts is ready to help you choose the right equipment for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Professional Advice
            </Link>
            <a 
              href="tel:+919717400435"
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              Call +91 9717400435
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}