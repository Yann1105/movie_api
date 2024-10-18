const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Définir la fonction hashPassword
const hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = crypto.randomBytes(16).toString('hex');

    try {
        const hashedPassword = await hashPassword(password, salt);
        const user = new User({ username, email, password: hashedPassword, salt });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const hashedPassword = await hashPassword(password, user.salt);
        if (hashedPassword !== user.password) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
