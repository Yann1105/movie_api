const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');
const errorHandler = require('./middlewares/errorHandler');
const helmet = require('helmet');
const redis = require('redis');

require('dotenv').config();

const app = express();
const redisClient = redis.createClient();

app.use(bodyParser.json());
app.use(helmet());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);   
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

// Middleware d'erreur
app.use(errorHandler);

redisClient.on('error', (err) => console.log('Redis client Error', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
