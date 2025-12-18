import express from 'express';
import Review from './reviewModel';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/me', authenticate, asyncHandler(async (req, res) => {
    const reviews = await Review.find({ userId: new mongoose.Types.ObjectId(req.user._id) });
    res.status(200).json(reviews);
}));

router.put('/:id', authenticate, asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: "Review not found" });
    if (review.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: "Unauthorized" });
    }
    const updated = await Review.findByIdAndUpdate(
        req.params.id,
        { $set: { review: req.body.review } },
        { new: true }
    );
    res.status(200).json(updated);
}));

router.post('/', authenticate, asyncHandler(async (req, res) => {
    const reviewData = {
        movieId: Number(req.body.movieId),
        review: req.body.review,
        rating: Number(req.body.rating),
        userId: new mongoose.Types.ObjectId(req.user._id),
        username: req.user.username
    };
    const savedReview = await Review.create(reviewData);
    res.status(201).json(savedReview);
}));

router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: "Review not found" });
    if (review.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: "Unauthorized" });
    }
    await review.deleteOne();
    res.status(200).json({ msg: "Deleted" });
}));

export default router;