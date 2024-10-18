const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true } // Ajout du champ salt
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
    const hashedPassword = await hashPassword(candidatePassword, this.salt);
    return hashedPassword === this.password;
};

module.exports = mongoose.model('User', userSchema);
