import { notFound } from 'next/navigation';
import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    await connectToDatabase();
    
    const categories = await BlogPost.distinct('category', { status: 'published' });
    
    return categories.map(category => ({
      category: category.toLowerCase().replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch posts by category
async function getPostsByCategory(categorySlug) {
  try {
    await connectToDatabase();
    
    // Convert slug back to category name
    const categoryName = categorySlug.replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const posts = await BlogPost.find({ 
      category: categoryName,
      status: 'published' 
    })
    .sort({ createdAt: -1 })
    .lean();
    
    return {
      category: categoryName,
      posts: posts || []
    };
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return {
      category: '',
      posts: []
    };
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const data = await getPostsByCategory(category);
  
  if (!data.category || data.posts.length === 0) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    };
  }
  
  return {
    title: `${data.category} Articles | Tanex Industries Blog`,
    description: `Browse all ${data.category.toLowerCase()} articles and guides from Tanex Industries. Expert insights on precision tools and manufacturing.`,
    keywords: `${data.category}, precision tools, manufacturing guides, industrial equipment`
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const data = await getPostsByCategory(category);
  
  if (!data.category || data.posts.length === 0) {
    notFound();
  }

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
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                  Blog
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700 font-medium">
                {data.category}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {data.category}
            </h1>
            <p className="text-xl text-gray-300">
              {data.posts.length} expert {data.posts.length === 1 ? 'article' : 'articles'} on precision tools and manufacturing
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Posts Grid */}
          {data.posts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No articles in this category yet</h3>
              <p className="mt-2 text-gray-500">
                Check back soon for new {data.category.toLowerCase()} articles.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.posts.map((post) => (
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

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}