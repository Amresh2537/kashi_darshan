import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export const metadata = {
  title: 'कशीदर्शन | Pilgrimage Guides & Spiritual Insights',
  description: 'Complete guides to sacred places in Uttar Pradesh. Temple histories, pilgrimage tips, spiritual significance, and travel information for Kashi, Ayodhya, Mathura and more.',
  keywords: 'Kashi, pilgrimage, temples, Uttar Pradesh, spiritual travel, Hindu temples, travel guide, काशी, तीर्थ, मंदिर',
  openGraph: {
    title: 'कशीदर्शन | Your Guide to Sacred Uttar Pradesh',
    description: 'Explore sacred places with detailed guides and spiritual insights',
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

// Get categories with counts - Updated for Kashidarshan
async function getCategories() {
  try {
    await connectToDatabase();
    
    const categories = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const categoryIcons = {
      'Pilgrimage Guide': '🕌',
      'Temple History': '🏛️',
      'Travel Tips': '🧳',
      'Cultural Insights': '🎭',
      'Spiritual Significance': '🕉️',
      'Local Guide': '🗺️'
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

// Get popular destinations from Uttar Pradesh
async function getPopularDestinations() {
  return [
    { name: 'Kashi Vishwanath', slug: 'kashi-vishwanath', icon: '🕉️' },
    { name: 'Ayodhya Ram Mandir', slug: 'ayodhya-ram-mandir', icon: '🕌' },
    { name: 'Vrindavan', slug: 'vrindavan', icon: '🌸' },
    { name: 'Prayagraj Sangam', slug: 'prayagraj-sangam', icon: '🌊' },
    { name: 'Mathura', slug: 'mathura', icon: '🐚' },
    { name: 'Chitrakoot', slug: 'chitrakoot', icon: '⛰️' },
  ];
}

export default async function BlogHome() {
  // Fetch all data in parallel
  const [posts, categories, featuredPost, stats, popularDestinations] = await Promise.all([
    getBlogPosts(),
    getCategories(),
    getFeaturedPost(),
    getStats(),
    getPopularDestinations()
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-600 to-amber-600 text-white py-20 md:py-24 overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15 L25 25 L35 25 Z M30 25 L30 35' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg border border-white/30">
                धर्म की भूमि, संस्कृति की धरोहर
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
              कशीदर्शन
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-6 text-white/95">
              Uttar Pradesh Pilgrimage Guides
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore sacred temples, historical sites, and spiritual destinations across Uttar Pradesh with our comprehensive guides
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-10">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stats.total}</div>
                <div className="text-white/90 text-sm font-medium uppercase tracking-wide">Sacred Guides</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stats.categories}</div>
                <div className="text-white/90 text-sm font-medium uppercase tracking-wide">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">12+</div>
                <div className="text-white/90 text-sm font-medium uppercase tracking-wide">Jyotirlingas</div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form action="/blog/search" method="GET">
                <div className="relative group">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search temples, pilgrimages, or destinations..."
                    className="w-full px-6 py-4 pr-14 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all shadow-lg"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors shadow-md"
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
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700 font-semibold">Pilgrimage Guides</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Popular Destinations */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Popular Pilgrimage Destinations
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/blog/destination/${destination.slug}`}
                className="group bg-white hover:bg-orange-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {destination.icon}
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors text-sm leading-tight">
                  {destination.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Featured Destination
              </h2>
              <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-shadow duration-500">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-orange-600 to-amber-600 p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-6">🕉️</div>
                    <div className="text-white/90 text-sm uppercase tracking-widest font-semibold mb-4">
                      {featuredPost.location?.district || 'Sacred Site'}
                    </div>
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/30">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div className="md:w-3/5 p-10 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(featuredPost.date)}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredPost.readTime || '5 min read'}
                    </span>
                    {featuredPost.location?.place && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1 text-orange-600 font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {featuredPost.location.place}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  {featuredPost.hindiTitle && (
                    <h4 className="text-xl text-gray-700 mb-4 font-serif">
                      {featuredPost.hindiTitle}
                    </h4>
                  )}
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Explore Destination
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    {featuredPost.languages && featuredPost.languages.length > 0 && (
                      <div className="flex gap-2">
                        {featuredPost.languages.map(lang => (
                          <span key={lang} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Browse by Category
              </h2>
              <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-white hover:bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className="text-sm text-gray-600 font-medium">
                    {category.count} {category.count === 1 ? 'guide' : 'guides'}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="mb-20" id="all-articles">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Latest Guides
              </h2>
              <div className="w-24 h-1 bg-orange-600 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-gray-700 text-sm font-medium">Sort by:</label>
              <select 
                id="sort"
                className="border-2 border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white font-medium"
              >
                <option>Newest</option>
                <option>Most Popular</option>
                <option>Alphabetical</option>
                <option>By Location</option>
              </select>
            </div>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-200">
              <div className="text-7xl mb-6">🕉️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No guides yet</h3>
              <p className="text-gray-600 text-lg">
                We're preparing sacred guides for you. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200 overflow-hidden">
                  {post.image?.url && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.image.url}
                        alt={post.image.alt || post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {post.location?.place && (
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {post.location.place}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        post.category === 'Pilgrimage Guide' ? 'bg-orange-100 text-orange-800' :
                        post.category === 'Temple History' ? 'bg-blue-100 text-blue-800' :
                        post.category === 'Travel Tips' ? 'bg-green-100 text-green-800' :
                        post.category === 'Cultural Insights' ? 'bg-purple-100 text-purple-800' :
                        post.category === 'Spiritual Significance' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    {post.hindiTitle && (
                      <h4 className="text-gray-700 mb-3 font-serif line-clamp-1">
                        {post.hindiTitle}
                      </h4>
                    )}
                    <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-gray-500 text-sm font-medium">
                        {formatDate(post.date)}
                        {post.location?.district && (
                          <span className="ml-2 text-orange-600">
                            • {post.location.district}
                          </span>
                        )}
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 text-sm font-bold group"
                      >
                        Read More
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
        </section>

        {/* Popular Tags */}
        {posts.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Popular Topics
              </h2>
              <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
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
                  className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-md border-2 border-orange-200"
                >
                  #{keyword}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Subscription */}
        <section className="mb-16">
          <div className="relative bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}></div>
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 border border-white/30">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Spiritual Insights</h3>
              <p className="text-white/95 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Subscribe to our newsletter and receive the latest pilgrimage guides, temple histories, and spiritual news directly in your inbox
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-4 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    Subscribe Now
                  </button>
                </div>
                <p className="text-white/90 text-xs mt-4 font-medium">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Need Pilgrimage Assistance?</h3>
            <p className="text-white/95 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Our team of spiritual guides and travel experts can help you plan your perfect pilgrimage journey across Uttar Pradesh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Our Guides
              </Link>
              <Link 
                href="/plan-pilgrimage"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Plan Your Pilgrimage
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}