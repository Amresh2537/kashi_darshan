'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    hindiTitle: '',
    slug: '',
    description: '',
    hindiDescription: '',
    metaDescription: '',
    metaKeywords: '',
    author: 'Kashidarshan',
    date: new Date().toISOString().split('T')[0],
    category: 'Pilgrimage Guide',
    subCategory: '',
    readTime: '5 min read',
    featured: false,
    status: 'draft',
    keywords: '',
    image: {
      url: '',
      alt: '',
      caption: ''
    },
    images: [],
    location: {
      place: '',
      district: '',
      state: 'Uttar Pradesh',
      coordinates: {
        lat: '',
        lng: ''
      }
    },
    languages: ['Hindi', 'English'],
    sections: JSON.stringify([{
      type: 'html',
      content: ''
    }], null, 2)
  });
  
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Category options for Kashidarshan
  const categoryOptions = [
    'Pilgrimage Guide',
    'Temple History',
    'Travel Tips',
    'Cultural Insights',
    'Spiritual Significance',
    'Local Guide'
  ];

  // Location states for Uttar Pradesh/Kashidarshan region
  const upDistricts = [
    'Varanasi', 'Prayagraj', 'Ayodhya', 'Mathura', 'Vrindavan',
    'Haridwar', 'Rishikesh', 'Badrinath', 'Kedarnath', 'Gangotri',
    'Yamunotri', 'Chitrakoot', 'Naimisharanya'
  ];

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);
  };

// In your fetchPosts function, update it like this:
const fetchPosts = async () => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('Fetching posts from API...');
    const response = await fetch('/api/admin/blog');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', data);
    
    if (data.success) {
      setPosts(data.posts || []);
    } else {
      throw new Error(data.error || 'Failed to load posts');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    setError(`Error: ${error.message}. Please check if API is running.`);
    setPosts([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('');
    
    try {
      // Validate form
      if (!formData.title || !formData.description) {
        throw new Error('Title and description are required');
      }

      // Auto-generate slug if empty
      const finalSlug = formData.slug.trim() || generateSlug(formData.title);
      
      // Auto-generate meta description if empty
      const finalMetaDescription = formData.metaDescription.trim() || 
        formData.description.substring(0, 160);
      
      // Auto-generate meta keywords if empty
      const finalMetaKeywords = formData.metaKeywords.trim() || 
        formData.keywords;

      // Parse keywords from comma-separated string
      const keywordsArray = formData.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      const url = editingId 
        ? `/api/admin/blog/${editingId}`
        : '/api/admin/blog';
      
      const method = editingId ? 'PUT' : 'POST';
      
      // Prepare data for Kashidarshan
      const submissionData = {
        title: formData.title,
        hindiTitle: formData.hindiTitle,
        slug: finalSlug,
        description: formData.description,
        hindiDescription: formData.hindiDescription,
        metaDescription: finalMetaDescription,
        metaKeywords: finalMetaKeywords,
        author: formData.author,
        date: formData.date,
        category: formData.category,
        subCategory: formData.subCategory,
        readTime: formData.readTime,
        featured: formData.featured,
        status: formData.status,
        keywords: keywordsArray,
        image: formData.image,
        images: formData.images,
        location: formData.location,
        languages: formData.languages
      };
      
      // Parse sections if it's a string
      if (typeof formData.sections === 'string') {
        try {
          submissionData.sections = JSON.parse(formData.sections);
        } catch (e) {
          throw new Error('Invalid JSON in sections field');
        }
      } else {
        submissionData.sections = formData.sections;
      }
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      // Parse the response
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error(`Server error: Invalid JSON response (${response.status})`);
      }
      
      if (!response.ok) {
        // Handle different error response formats
        let errorMessage = 'Failed to save post';
        
        if (data?.error) {
          if (typeof data.error === 'object') {
            // If error is an object, extract messages
            const errorMessages = Object.values(data.error).join(', ');
            errorMessage = `Validation error: ${errorMessages}`;
          } else if (typeof data.error === 'string') {
            errorMessage = data.error;
          }
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (data?.errors) {
          // Handle Mongoose validation errors
          const errors = Array.isArray(data.errors) 
            ? data.errors.join(', ')
            : JSON.stringify(data.errors);
          errorMessage = `Validation errors: ${errors}`;
        }
        
        throw new Error(errorMessage || `Failed to save: ${response.status}`);
      }
      
      if (data.success) {
        setSuccess(editingId ? 'Post updated successfully!' : 'Post created successfully!');
        
        // Reset form
        setFormData({
          title: '',
          hindiTitle: '',
          slug: '',
          description: '',
          hindiDescription: '',
          metaDescription: '',
          metaKeywords: '',
          author: 'Kashidarshan',
          date: new Date().toISOString().split('T')[0],
          category: 'Pilgrimage Guide',
          subCategory: '',
          readTime: '5 min read',
          featured: false,
          status: 'draft',
          keywords: '',
          image: {
            url: '',
            alt: '',
            caption: ''
          },
          images: [],
          location: {
            place: '',
            district: '',
            state: 'Uttar Pradesh',
            coordinates: {
              lat: '',
              lng: ''
            }
          },
          languages: ['Hindi', 'English'],
          sections: JSON.stringify([{
            type: 'html',
            content: ''
          }], null, 2)
        });
        setEditingId(null);
        
        // Refresh posts
        await fetchPosts();
        
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error(data.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error.message);
      
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title || '',
      hindiTitle: post.hindiTitle || '',
      slug: post.slug || '',
      description: post.description || '',
      hindiDescription: post.hindiDescription || '',
      metaDescription: post.metaDescription || post.description?.substring(0, 160) || '',
      metaKeywords: post.metaKeywords || post.keywords || '',
      author: post.author || 'Kashidarshan',
      date: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      category: post.category || 'Pilgrimage Guide',
      subCategory: post.subCategory || '',
      readTime: post.readTime || '5 min read',
      featured: post.featured || false,
      status: post.status || 'draft',
      keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : (post.keywords || ''),
      image: post.image || { url: '', alt: '', caption: '' },
      images: post.images || [],
      location: post.location || {
        place: '',
        district: '',
        state: 'Uttar Pradesh',
        coordinates: { lat: '', lng: '' }
      },
      languages: post.languages || ['Hindi', 'English'],
      sections: JSON.stringify(post.sections || [{
        type: 'html',
        content: ''
      }], null, 2)
    });
    setEditingId(post._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
    
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to delete: ${response.status}`);
      }
      
      if (data.success) {
        setSuccess('Post deleted successfully!');
        await fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError(error.message);
    }
  };


  
  const handleStatusToggle = async (post) => {
    try {
      const newStatus = post.status === 'published' ? 'draft' : 'published';
      
      const response = await fetch(`/api/admin/blog/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to update: ${response.status}`);
      }
      
      if (data.success) {
        setSuccess(`Post ${newStatus} successfully!`);
        await fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      setError(error.message);
    }
  };

  const handleFeaturedToggle = async (post) => {
    try {
      const newFeatured = !post.featured;
      
      const response = await fetch(`/api/admin/blog/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newFeatured })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to update: ${response.status}`);
      }
      
      if (data.success) {
        setSuccess(`Post ${newFeatured ? 'featured' : 'unfeatured'} successfully!`);
        await fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
      setError(error.message);
    }
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(term) ||
      post.description?.toLowerCase().includes(term) ||
      post.category?.toLowerCase().includes(term) ||
      (post.keywords && Array.isArray(post.keywords) && 
       post.keywords.some(keyword => keyword.toLowerCase().includes(term)))
    );
  });

  // Stats
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    featured: posts.filter(p => p.featured).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <span className="mt-3 text-gray-600">Loading blog posts from MongoDB...</span>
            <p className="text-sm text-gray-500 mt-2">Checking connection to database</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="text-orange-600">कशीदर्शन</span> Blog Admin
              </h1>
              <p className="text-gray-600 mt-2">
                Manage pilgrimage guides, temple histories, and spiritual content • {process.env.NODE_ENV === 'development' ? 'Development Mode' : 'Production'}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{stats.total} total</span> • 
                <span className="text-green-600 mx-2">{stats.published} published</span> • 
                <span className="text-yellow-600 mx-2">{stats.drafts} drafts</span> • 
                <span className="text-orange-600 mx-2">{stats.featured} featured</span>
              </div>
            </div>
          </div>
          
          {/* Alerts */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{success}</span>
              </div>
            </div>
          )}
          
          {/* Search Bar */}
          <div className="max-w-md mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? '✏️ Edit Blog Post' : '📝 Create New Blog Post'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        title: newTitle,
                        // Auto-generate slug if empty
                        slug: prev.slug ? prev.slug : generateSlug(newTitle)
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder="e.g., Complete Guide to Kashi Vishwanath Temple"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (Hindi)
                  </label>
                  <input
                    type="text"
                    value={formData.hindiTitle}
                    onChange={(e) => setFormData({...formData, hindiTitle: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., काशी विश्वनाथ मंदिर का संपूर्ण मार्गदर्शक"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder="complete-guide-to-kashi-vishwanath-temple"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly version. Auto-generated from English title.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (English) *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="3"
                    required
                    placeholder="Brief description in English..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Hindi)
                  </label>
                  <textarea
                    value={formData.hindiDescription}
                    onChange={(e) => setFormData({...formData, hindiDescription: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="2"
                    placeholder="Brief description in Hindi..."
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {categoryOptions.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub Category
                    </label>
                    <input
                      type="text"
                      value={formData.subCategory}
                      onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Jyotirlinga, Shaktipeeth"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="kashi, temple, pilgrimage, varanasi"
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="5 min read"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">📍 Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place Name *
                  </label>
                  <input
                    type="text"
                    value={formData.location.place}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, place: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder="e.g., Kashi Vishwanath Temple"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <select
                    value={formData.location.district}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, district: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select District</option>
                    {upDistricts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.location.coordinates.lat}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        coordinates: {
                          ...formData.location.coordinates,
                          lat: parseFloat(e.target.value) || ''
                        }
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="25.3176"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.location.coordinates.lng}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        coordinates: {
                          ...formData.location.coordinates,
                          lng: parseFloat(e.target.value) || ''
                        }
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="83.0058"
                  />
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-800">🔍 SEO Optimization</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="2"
                  placeholder="Auto-generated from description if empty (max 160 characters)"
                  maxLength="160"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="kashi vishwanath temple, varanasi, pilgrimage guide"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">🖼️ Featured Image</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={formData.image.url}
                  onChange={(e) => setFormData({
                    ...formData,
                    image: { ...formData.image, url: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://example.com/kashi-temple.jpg"
                />
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    placeholder="Image alt text"
                    value={formData.image.alt}
                    onChange={(e) => setFormData({
                      ...formData,
                      image: { ...formData.image, alt: e.target.value }
                    })}
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Image caption"
                    value={formData.image.caption}
                    onChange={(e) => setFormData({
                      ...formData,
                      image: { ...formData.image, caption: e.target.value }
                    })}
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Status & Settings */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Post</span>
              </label>
              
              <label className="flex items-center">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Languages:</span>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes('Hindi')}
                    onChange={(e) => {
                      const langs = e.target.checked 
                        ? [...formData.languages, 'Hindi']
                        : formData.languages.filter(lang => lang !== 'Hindi');
                      setFormData({...formData, languages: langs});
                    }}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Hindi</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes('English')}
                    onChange={(e) => {
                      const langs = e.target.checked 
                        ? [...formData.languages, 'English']
                        : formData.languages.filter(lang => lang !== 'English');
                      setFormData({...formData, languages: langs});
                    }}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">English</span>
                </label>
              </div>
            </div>
            
            {/* Sections Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Sections (JSON with HTML Support)
              </label>
              <div className="text-xs text-gray-500 mb-2">
                JSON array of sections with HTML content. Example: 
                <code className="bg-gray-100 px-1 ml-1">
                  [{"{type: 'html', content: '<h2>Title</h2><p>Your HTML content here</p>'}"}]
                </code>
              </div>
              <textarea
                value={formData.sections}
                onChange={(e) => setFormData({...formData, sections: e.target.value})}
                className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="10"
                placeholder={`[
  {
    "type": "html",
    "content": "<h2>Introduction</h2><p>Your HTML content here</p>"
  },
  {
    "type": "html", 
    "content": "<h2>History</h2><p>More HTML content</p>"
  }
]`}
              />
            </div>
            
            {/* Form Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              >
                {editingId ? 'Update Post' : 'Create Post'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      title: '',
                      hindiTitle: '',
                      slug: '',
                      description: '',
                      hindiDescription: '',
                      metaDescription: '',
                      metaKeywords: '',
                      author: 'Kashidarshan',
                      date: new Date().toISOString().split('T')[0],
                      category: 'Pilgrimage Guide',
                      subCategory: '',
                      readTime: '5 min read',
                      featured: false,
                      status: 'draft',
                      keywords: '',
                      image: {
                        url: '',
                        alt: '',
                        caption: ''
                      },
                      images: [],
                      location: {
                        place: '',
                        district: '',
                        state: 'Uttar Pradesh',
                        coordinates: {
                          lat: '',
                          lng: ''
                        }
                      },
                      languages: ['Hindi', 'English'],
                      sections: JSON.stringify([{
                        type: 'html',
                        content: ''
                      }], null, 2)
                    });
                    setEditingId(null);
                    setError(null);
                  }}
                  className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                📚 Blog Posts ({filteredPosts.length})
              </h2>
              <button
                onClick={fetchPosts}
                className="text-sm text-orange-600 hover:text-orange-800"
                title="Refresh"
              >
                Refresh
              </button>
            </div>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No blog posts found</h3>
              <p className="mt-2 text-gray-500">
                {searchTerm ? 'Try adjusting your search' : 'Create your first blog post above'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {post.title}
                            </div>
                            {post.featured && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-md">
                            /blog/{post.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          post.category === 'Pilgrimage Guide' ? 'bg-orange-100 text-orange-800' :
                          post.category === 'Temple History' ? 'bg-blue-100 text-blue-800' :
                          post.category === 'Travel Tips' ? 'bg-green-100 text-green-800' :
                          post.category === 'Cultural Insights' ? 'bg-purple-100 text-purple-800' :
                          post.category === 'Spiritual Significance' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {post.location?.place || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {post.location?.district || ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-orange-600 hover:text-orange-900 text-sm font-medium"
                          >
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleStatusToggle(post)}
                            className={`text-sm font-medium ${
                              post.status === 'published' 
                                ? 'text-yellow-600 hover:text-yellow-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {post.status === 'published' ? 'Unpublish' : 'Publish'}
                          </button>
                          
                          <button
                            onClick={() => handleFeaturedToggle(post)}
                            className={`text-sm font-medium ${
                              post.featured 
                                ? 'text-orange-600 hover:text-orange-900' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {post.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          
                          <button
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            className="text-green-600 hover:text-green-900 text-sm font-medium"
                          >
                            View
                          </button>
                          
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}