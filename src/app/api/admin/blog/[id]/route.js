import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function PUT(request, context) {
  try {
    const { params } = context;
    const id = params.id;
    
    console.log(`Updating blog post with ID: ${id}`);
    await connectToDatabase();
    
    const data = await request.json();
    console.log('Update data:', JSON.stringify(data, null, 2));
    
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
    
    const post = await BlogPost.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return NextResponse.json({ 
        success: false, 
        error: 'Blog post not found' 
      }, { status: 404 });
    }
    
    console.log('Post updated successfully:', post._id);
    
    // Trigger sitemap regeneration (async)
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
      message: 'Blog post updated successfully'
    });
    
  } catch (error) {
    console.error('Error in PUT /api/admin/blog/[id]:', error);
    
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
    }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { params } = context;
    const id = params.id;
    
    console.log(`Deleting blog post with ID: ${id}`);
    await connectToDatabase();
    
    const post = await BlogPost.findByIdAndDelete(id);
    
    if (!post) {
      return NextResponse.json({ 
        success: false, 
        error: 'Blog post not found' 
      }, { status: 404 });
    }
    
    console.log('Post deleted successfully:', id);
    
    // Trigger sitemap regeneration (async)
    try {
      fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/sitemap`, {
        method: 'GET'
      });
    } catch (sitemapError) {
      console.error('Error triggering sitemap:', sitemapError);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in DELETE /api/admin/blog/[id]:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// For dynamic routes in Next.js 13+
export async function generateStaticParams() {
  return [];
}