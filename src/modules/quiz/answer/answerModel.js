import mongoose from 'mongoose';

const answerSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
    ],
    note: {
      type: String,
      required: false,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: {} },
);

export default mongoose.model('Answer', answerSchema);
