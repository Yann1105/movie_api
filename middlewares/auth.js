const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extraire le token de l'en-tête Authorization
  const token = req.headers['authorization']?.replace('Bearer ', '');

  // Vérifier si le token est fourni
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter les données décodées du token à la requête
    req.user = decoded;
    
    // Passer au prochain middleware ou route
    next();
  } catch (error) {
    // Gérer les erreurs de validation du token
    res.status(401).json({ message: 'Invalid token.' });
  }
};
