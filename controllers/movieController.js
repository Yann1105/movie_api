const Movie = require('../models/movie');
const { set, get } = require('../utils/inMemoryCache');

exports.getMovies = async (req, res) => {
  try {
    const cacheKey = 'movies';
    const cachedMovies = get(cacheKey);

    if (cachedMovies) {
      return res.json(cachedMovies);
    }

    try {
      const moviesFromDB = await Movie.find().populate('reviews');
      set(cacheKey, moviesFromDB, 3600); // TTL: 1 hour
      res.json(moviesFromDB);
    } catch (dbError) {
      res.status(500).json({ message: 'Database error: ' + dbError.message });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Error creating movie: ' + err.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('reviews');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const recommendations = await Movie.find({
      genre: movie.genre,
      _id: { $ne: movie._id }
    }).limit(5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
// Delete movie 
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

// Mise à jour d'un film par ID
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};


exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('reviews');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
