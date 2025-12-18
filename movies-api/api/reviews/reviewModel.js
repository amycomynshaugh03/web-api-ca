import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  movieId: { type: Number, required: true },
  username: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 3 },
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);