import mongoose from 'mongoose';

const userBlogPostSchema = new mongoose.Schema({
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
    trim: true,
    lowercase: true
  },
  content: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  author: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  category: { 
    type: String, 
    default: 'Personal Experience',
    enum: [
      'Personal Experience',
      'Travel Diary',
      'Spiritual Journey',
      'Photo Story',
      'Local Discovery'
    ]
  },
  location: {
    place: { type: String, trim: true },
    district: { type: String, trim: true }
  },
  images: [{
    url: { type: String, required: true },
    caption: { type: String },
    order: { type: Number, default: 0 }
  }],
  featuredImage: {
    url: { type: String },
    alt: { type: String }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{
    name: { type: String },
    email: { type: String },
    content: { type: String },
    date: { type: Date, default: Date.now },
    approved: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

// Indexes
userBlogPostSchema.index({ slug: 1 });
userBlogPostSchema.index({ status: 1 });
userBlogPostSchema.index({ category: 1 });
userBlogPostSchema.index({ 'author.email': 1 });
userBlogPostSchema.index({ createdAt: -1 });

const UserBlogPost = mongoose.models.UserBlogPost || mongoose.model('UserBlogPost', userBlogPostSchema);

export default UserBlogPost;