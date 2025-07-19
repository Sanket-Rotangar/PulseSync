
import mongoose from 'mongoose';


const AnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  questionType: {
    type: String,
    required: true,
    enum: ['emoji-scale', 'slider', 'toggle', 'star-rating', 'radio-group', 'checkbox-group', 'open-ended'],
    trim: true,
  },
  answer: { 
    type: mongoose.Schema.Types.Mixed, 
    required: function() { return !this.skipped; } 
  },
  skipped: {
    type: Boolean,
    default: false,
  },
}, { _id: true });


const EmployeeResponseSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  answers: {
    type: [AnswerSchema],
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  }
}, { _id: false });

// Main survey response
const SurveyResponseSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  responses: {
    type: [EmployeeResponseSchema],
    default: [],
  },
}, { timestamps: true, collection: 'SurveyResponse' });

const SurveyResponse = mongoose.model('SurveyResponse', SurveyResponseSchema);
const Survey = mongoose.model('survey', AnswerSchema );
export 
{
  SurveyResponse,
 Survey 
};