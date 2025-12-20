import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  hindiTitle: {
    type: String,
    trim: true
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  hindiDescription: {
    type: String,
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
    default: 'Kashidarshan',
    trim: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  category: { 
    type: String, 
    default: 'Pilgrimage Guide',
    enum: [
      'Pilgrimage Guide',
      'Temple History',
      'Travel Tips',
      'Cultural Insights',
      'Spiritual Significance',
      'Local Guide'
    ]
  },
  subCategory: {
    type: String,
    trim: true
  },
  readTime: { 
    type: String, 
    default: '5 min read',
    trim: true
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String, 
    default: 'draft',
    enum: ['draft', 'published']
  },
  keywords: [{ 
    type: String, 
    trim: true 
  }],
  image: {
    url: { 
      type: String, 
      trim: true
    },
    alt: { 
      type: String, 
      trim: true
    },
    caption: { 
      type: String, 
      trim: true
    }
  },
  images: [{
    url: { type: String, trim: true },
    alt: { type: String, trim: true },
    caption: { type: String, trim: true },
    order: { type: Number, default: 0 }
  }],
  location: {
    place: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, default: 'Uttar Pradesh', trim: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  languages: [{
    type: String,
    default: ['Hindi', 'English'],
    enum: ['Hindi', 'English', 'Marathi', 'Sanskrit']
  }],
  sections: [{
    type: {
      type: String,
      enum: ['html', 'intro', 'pilgrimage', 'history', 'temple', 'guide', 'conclusion', 'image'],
      default: 'html'
    },
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    rank: { type: Number },
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    features: [{ type: String, trim: true }],
    highlight: { type: Boolean, default: false },
    points: [{
      icon: { type: String, trim: true },
      title: { type: String, trim: true },
      description: { type: String, trim: true }
    }],
    imageUrl: { type: String, trim: true },
    imageAlt: { type: String, trim: true },
    imageCaption: { type: String, trim: true }
  }]
}, {
  timestamps: true
});

// यहाँ तीसरा parameter 'kashi' add करें - यह collection नाम set करेगा
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema, 'kashi');

export default BlogPost;