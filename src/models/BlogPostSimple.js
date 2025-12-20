import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  metaKeywords: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    default: 'Tanex Industries',
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Industry Guide',
      'Buying Guide', 
      'Maintenance',
      'Technical',
      'Industry Trends',
      'Case Studies'
    ],
    default: 'Industry Guide'
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  
  // Image fields
  image: {
    url: String,
    alt: String,
    caption: String
  },
  
  // Allow multiple images
  images: [{
    url: String,
    alt: String,
    caption: String,
    order: Number
  }],
  
  keywords: [{
    type: String,
    trim: true
  }],
  sections: [{
    type: {
      type: String,
      enum: ['html', 'intro', 'manufacturer', 'section', 'conclusion', 'image'],
      default: 'html'
    },
    content: String,
    rank: Number,
    name: String,
    features: [String],
    highlight: Boolean,
    title: String,
    points: [{
      icon: String,
      title: String,
      description: String
    }],
    imageUrl: String,
    imageAlt: String,
    imageCaption: String
  }]
}, {
  timestamps: true // This automatically adds createdAt and updatedAt
});

// Add indexes
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ status: 1 });
blogPostSchema.index({ featured: 1 });
blogPostSchema.index({ createdAt: -1 });

// NO MIDDLEWARE - Simple export
export default mongoose.models.BlogPostSimple || mongoose.model('BlogPostSimple', blogPostSchema);