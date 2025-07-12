import mongoose from 'mongoose';
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();

const QuestionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    maxlength: 120 
  },
  body: { 
    type: String, 
    required: true 
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  isAnswered: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// AI-powered tag suggestion hook
QuestionSchema.pre('save', async function(next) {
  if (!this.isModified('body')) return next();
  
  try {
    const tags = await mongoose.model('Tag').find();
    const bodyTokens = tokenizer.tokenize(this.body);
    const suggestedTags = [];
    
    tags.forEach(tag => {
      const tagTokens = tokenizer.tokenize(tag.name);
      const intersection = bodyTokens.filter(token => 
        tagTokens.includes(token.toLowerCase())
      );
      
      if (intersection.length >= 2) {
        suggestedTags.push(tag._id);
      }
    });
    
    if (suggestedTags.length > 0) {
      this.tags = [...new Set([...this.tags, ...suggestedTags])];
    }
  } catch (err) {
    console.error('Tag suggestion error:', err);
  }
  
  next();
});

export default mongoose.model('Question', QuestionSchema);