import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    name: {
      type: String,
      required: true,
      unique: false,
      match: /^[A-Z][a-z]{1,15}\s[A-Z][a-z]{1,15}$/,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^\+[0-9]{11,12}$/,
    },
    password: {
      type: String,
      required: true,
    },
    codewarsId: {
      type: String,
      required: true,
    },
    codewarsAnalytics: {
      type: Array,
      required: true,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: false,
      },
    ],
  },
  { timestamps: {} },
);

export default mongoose.model('User', userSchema);
