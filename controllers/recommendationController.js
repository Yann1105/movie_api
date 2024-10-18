exports.getRecommendations = async (req, res) => {
    try {
      // Trouver le film par ID
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // Trouver des films recommandés basés sur le genre
      const recommendations = await Movie.find({
        genre: movie.genre,
        _id: { $ne: movie._id }  // Exclure le film demandé
      }).limit(5);
  
      // Répondre avec les films recommandés en JSON
      res.json(recommendations);
    } catch (err) {
      res.status(500).json({ message: 'Server error: ' + err.message });
    }
  };
  