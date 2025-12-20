import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET() {
  try {
    console.log('Fetching blog posts...');
    await connectToDatabase();
    
    const posts = await BlogPost.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`Found ${posts.length} posts`);
    
    return NextResponse.json({ 
      success: true, 
      posts 
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('Error in GET /api/admin/blog:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

export async function POST(request) {
  try {
    console.log('Creating new blog post...');
    await connectToDatabase();
    
    const data = await request.json();
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    // Validate required fields
    if (!data.title || !data.description) {
      return NextResponse.json({ 
        success: false, 
        error: 'Title and description are required' 
      }, { status: 400 });
    }
    
    // Generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
        .substring(0, 100);
    }
    
    // Ensure slug is unique
    const existingPost = await BlogPost.findOne({ slug: data.slug });
    if (existingPost) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
    
    // Handle keywords - convert string to array if needed
    if (typeof data.keywords === 'string') {
      data.keywords = data.keywords.split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
    }
    
    // Handle sections - parse JSON string if needed
    if (typeof data.sections === 'string') {
      try {
        data.sections = JSON.parse(data.sections);
      } catch (e) {
        console.error('Error parsing sections:', e);
        data.sections = [];
      }
    }
    
    // Set default values
    if (!data.author) data.author = 'Kashidarshan';
    if (!data.date) data.date = new Date();
    
    const post = new BlogPost(data);
    await post.save();
    
    console.log('Post created successfully:', post._id);
    
    // Trigger sitemap regeneration (async - don't wait for it)
    try {
      fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/sitemap`, {
        method: 'GET'
      });
    } catch (sitemapError) {
      console.error('Error triggering sitemap:', sitemapError);
    }
    
    return NextResponse.json({ 
      success: true, 
      post,
      message: 'Blog post created successfully'
    }, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('Error in POST /api/admin/blog:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json({ 
        success: false, 
        error: 'Slug already exists. Please use a different slug.' 
      }, { status: 400 });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ 
        success: false, 
        error: errors.join(', ') 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}