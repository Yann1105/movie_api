const Review = require('../models/review');
const Movie = require('../models/movie');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').populate('movie');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReview = async (req, res) => {
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    await Movie.findByIdAndUpdate(req.body.movie, { $push: { reviews: newReview._id } });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Suppression d'une critique par ID
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

// Mise à jour d'une critique par ID
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};


exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').populate('movie');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
