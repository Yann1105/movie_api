const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middlewares/auth');

// Route pour obtenir des recommandations basées sur un ID de film
router.get('/recommendations/:id', auth, movieController.getRecommendations);

module.exports = router;
