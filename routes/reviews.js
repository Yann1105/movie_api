const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middlewares/auth');

router.get('/', reviewController.getReviews);
router.post('/', auth, reviewController.createReview);
// Route pour mettre à jour une critique par ID
router.put('/:id', auth, reviewController.updateReview);

// Route pour supprimer une critique par ID
router.delete('/:id', auth, reviewController.deleteReview);
// Route pour obtenir toutes les critiques
router.get('/', reviewController.getAllReviews);

module.exports = router;
