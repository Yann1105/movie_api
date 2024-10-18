const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
        title:{type: String, required: true },
        genre: {type: String, required: true },
        releaseDate:{ type: Date, required:true},
        director:String,
        cast: [String],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
        averageRating:{ type: Number, default: 0}
    });
module.exports = mongoose.model('Movie', movieSchema);
