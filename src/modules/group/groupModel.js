import mongoose from 'mongoose';

const groupSchema = mongoose.Schema(
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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
  },
  { timestamps: {} },
);

export default mongoose.model('Group', groupSchema);
