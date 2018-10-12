import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: {
      type: String,
      required: false,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    variants: [
      {
        name: { type: String, required: true },
        correct: { type: Boolean, required: true },
      },
    ],
    answerType: {
      type: String,
      required: true,
      enum: ['text', 'radio', 'checkbox'],
    },
    reward: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: {} },
);

export default mongoose.model('Question', questionSchema);
