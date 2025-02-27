const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    movie:{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
    rating: { type:Number, required: true, min:1, max:10},
    comment:String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Review',reviewSchema);
