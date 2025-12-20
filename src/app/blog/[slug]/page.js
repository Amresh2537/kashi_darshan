import { notFound } from 'next/navigation';
import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// Increment views count
async function incrementViews(slug) {
  try {
    await connectToDatabase();
    await BlogPost.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    );
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

// Get blog post by slug
async function getBlogPost(slug) {
  try {
    await connectToDatabase();
    
    const post = await BlogPost.findOne({ 
      slug,
      status: 'published' 
    }).lean();
    
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Get related posts
async function getRelatedPosts(currentPost) {
  try {
    await connectToDatabase();
    
    const relatedPosts = await BlogPost.find({
      _id: { $ne: currentPost._id },
      status: 'published',
      $or: [
        { category: currentPost.category },
        { 'location.district': currentPost.location?.district },
        { keywords: { $in: currentPost.keywords || [] } }
      ]
    })
    .limit(3)
    .sort({ createdAt: -1 })
    .lean();
    
    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  // Await params first
  const { slug } = await params;
  
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Page Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | कशीदर्शन`,
    description: post.metaDescription || post.description,
    keywords: post.metaKeywords || post.keywords?.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image?.url ? [{ url: post.image.url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image?.url ? [post.image.url] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  // Await params first
  const { slug } = await params;
  
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  // Increment views (don't await - run in background)
  incrementViews(slug);
  
  // Get related posts
  const relatedPosts = await getRelatedPosts(post);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Render sections
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'html':
        return (
          <div 
            key={index}
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        );
        
      case 'intro':
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{section.title || 'Introduction'}</h3>
            <div 
              className="prose prose-blue"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );
        
      case 'history':
        return (
          <div key={index} className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📜</span>
              <h3 className="text-2xl font-bold text-gray-900">{section.title || 'Historical Background'}</h3>
            </div>
            <div 
              className="prose prose-amber"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );
        
      case 'pilgrimage':
        return (
          <div key={index} className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🕌</span>
              <h3 className="text-2xl font-bold text-gray-900">{section.title || 'Pilgrimage Guide'}</h3>
            </div>
            <div 
              className="prose prose-green"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );
        
      case 'temple':
        return (
          <div key={index} className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🕉️</span>
              <h3 className="text-2xl font-bold text-gray-900">{section.title || 'Temple Architecture'}</h3>
            </div>
            <div 
              className="prose prose-purple"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );
        
      case 'guide':
        return (
          <div key={index} className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🗺️</span>
              <h3 className="text-2xl font-bold text-gray-900">{section.title || 'Visitor Guide'}</h3>
            </div>
            {section.points && section.points.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {section.points.map((point, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-1">{point.icon || '✓'}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{point.title}</h4>
                        <p className="text-gray-600">{point.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {section.content && (
              <div 
                className="prose prose-indigo mt-6"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </div>
        );
        
      case 'conclusion':
        return (
          <div key={index} className="bg-gray-50 border-l-4 border-gray-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{section.title || 'Conclusion'}</h3>
            <div 
              className="prose prose-gray"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );
        
      case 'image':
        return (
          <div key={index} className="my-8">
            {section.imageUrl && (
              <div className="relative w-full h-96 rounded-xl overflow-hidden mb-4">
                <img
                  src={section.imageUrl}
                  alt={section.imageAlt || 'Image'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {section.imageCaption && (
              <p className="text-center text-gray-500 text-sm italic">
                {section.imageCaption}
              </p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-amber-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-saffron-700 hover:text-saffron-900 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/blog" className="text-saffron-700 hover:text-saffron-900 transition-colors">
                  Pilgrimage Guides
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700 font-medium truncate max-w-xs md:max-w-md">
                {post.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <article className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    post.category === 'Pilgrimage Guide' ? 'bg-saffron-100 text-saffron-800' :
                    post.category === 'Temple History' ? 'bg-blue-100 text-blue-800' :
                    post.category === 'Travel Tips' ? 'bg-green-100 text-green-800' :
                    post.category === 'Cultural Insights' ? 'bg-purple-100 text-purple-800' :
                    post.category === 'Spiritual Significance' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.category}
                  </span>
                  
                  {post.subCategory && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {post.subCategory}
                    </span>
                  )}
                  
                  {post.featured && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <span className="text-gray-500 text-sm">
                    {formatDate(post.date)}
                  </span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">
                    {post.readTime || '5 min read'}
                  </span>
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              {post.hindiTitle && (
                <h2 className="text-2xl md:text-3xl text-gray-700 mb-6 font-serif border-r-4 border-saffron-500 pr-4">
                  {post.hindiTitle}
                </h2>
              )}
              
              {/* Location Info */}
              {post.location?.place && (
                <div className="flex items-center gap-2 mb-6 p-4 bg-amber-50 rounded-lg">
                  <span className="text-saffron-600">📍</span>
                  <div>
                    <div className="font-medium text-gray-900">{post.location.place}</div>
                    {post.location.district && (
                      <div className="text-sm text-gray-600">
                        {post.location.district}, {post.location.state || 'Uttar Pradesh'}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Featured Image */}
              {post.image?.url && (
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                  <img
                    src={post.image.url}
                    alt={post.image.alt || post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm">
                      {post.image.caption}
                    </div>
                  )}
                </div>
              )}
              
              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {post.description}
                </p>
                {post.hindiDescription && (
                  <p className="text-xl text-gray-700 leading-relaxed mt-4 font-serif">
                    {post.hindiDescription}
                  </p>
                )}
              </div>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl mb-8">
                <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-600 font-bold">
                  {post.author?.charAt(0) || 'K'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author || 'Kashidarshan'}</div>
                  <div className="text-sm text-gray-500">Pilgrimage Guide & Spiritual Expert</div>
                </div>
              </div>
              
              {/* Content Sections */}
              <div className="mt-12">
                {post.sections && post.sections.length > 0 ? (
                  post.sections.map((section, index) => renderSection(section, index))
                ) : (
                  <div className="prose prose-lg max-w-none">
                    <p>Content coming soon...</p>
                  </div>
                )}
              </div>
              
              {/* Keywords/Tags */}
              {post.keywords && post.keywords.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((keyword, index) => (
                      <Link
                        key={index}
                        href={`/blog/tag/${keyword.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        #{keyword}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Languages Available */}
              {post.languages && post.languages.length > 0 && (
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Available in:</span>
                  <div className="flex gap-2">
                    {post.languages.map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
            
            {/* Share Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Share this guide</h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <span>📘</span> Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <span>🐦</span> Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <span>🔗</span> Copy Link
                </button>
              </div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost._id}
                      href={`/blog/${relatedPost.slug}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                    >
                      {relatedPost.image?.url && (
                        <div className="h-40 overflow-hidden">
                          <img
                            src={relatedPost.image.url}
                            alt={relatedPost.image.alt || relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            relatedPost.category === 'Pilgrimage Guide' ? 'bg-saffron-100 text-saffron-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {relatedPost.category}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {formatDate(relatedPost.date)}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Bio */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-600 text-2xl font-bold mx-auto mb-4">
                  {post.author?.charAt(0) || 'K'}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{post.author || 'Kashidarshan Team'}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Spiritual guide and pilgrimage expert with years of experience exploring sacred sites across Uttar Pradesh.
                </p>
                <button className="w-full py-2 bg-saffron-100 text-saffron-700 rounded-lg font-medium hover:bg-saffron-200 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
            
            {/* Table of Contents */}
            {post.sections && post.sections.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-6">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Table of Contents</h3>
                <nav>
                  <ul className="space-y-2">
                    {post.sections
                      .filter(section => section.title)
                      .map((section, index) => (
                        <li key={index}>
                          <a 
                            href={`#section-${index}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-saffron-600 text-sm transition-colors"
                          >
                            <span className="text-saffron-500">•</span>
                            {section.title}
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                </nav>
              </div>
            )}
            
            {/* Popular Destinations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Popular Destinations</h3>
              <div className="space-y-3">
                {[
                  { name: 'Kashi Vishwanath', icon: '🕉️' },
                  { name: 'Ayodhya Ram Mandir', icon: '🕌' },
                  { name: 'Vrindavan', icon: '🌸' },
                  { name: 'Prayagraj Sangam', icon: '🌊' },
                  { name: 'Mathura', icon: '🐚' },
                ].map((dest, index) => (
                  <Link
                    key={index}
                    href={`/blog/destination/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">{dest.icon}</span>
                    <span className="text-gray-700">{dest.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-2xl p-6 mt-6 text-white">
              <h3 className="font-bold text-lg mb-3">Get Pilgrimage Updates</h3>
              <p className="text-saffron-100 text-sm mb-4">
                Subscribe for latest guides and spiritual insights.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg mb-3 text-gray-900"
              />
              <button className="w-full py-2 bg-white text-saffron-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Blog */}
      <div className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-saffron-600 hover:text-saffron-800 font-medium"
          >
            ← Back to all pilgrimage guides
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for build time
export async function generateStaticParams() {
  try {
    await connectToDatabase();
    
    const posts = await BlogPost.find({ 
      status: 'published' 
    }).select('slug').lean();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}