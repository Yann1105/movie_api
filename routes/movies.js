const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middlewares/auth');

// Route pour obtenir tous les films
router.get('/', movieController.getMovies);

// Route pour créer un nouveau film, nécessite une authentification
router.post('/', auth, movieController.createMovie);

// Route pour obtenir un film par ID
router.get('/:id', movieController.getMovieById);

// Route pour obtenir des recommandations basées sur un ID de film
router.get('/recommendations/:id', movieController.getRecommendations);


// Route pour mettre à jour un film par ID
router.put('/:id', auth, movieController.updateMovie);

// Route pour supprimer un film par ID
router.delete('/:id', auth, movieController.deleteMovie);
// Route pour obtenir tous les films
router.get('/', movieController.getAllMovies);

module.exports = router;
