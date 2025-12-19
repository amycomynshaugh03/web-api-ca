import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import authenticate from '../../authenticate';



const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));


async function registerUser(req, res) {
    const { username, password } = req.body;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            success: false, 
            msg: 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.' 
        });
    }

    try {
        const existingUser = await User.findByUserName(username);
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'Username already exists.' });
        }

        await User.create(req.body);
        res.status(201).json({ success: true, msg: 'User successfully created.' });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }
    
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign(
    { username: user.username, _id: user._id },
    process.env.SECRET
);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

router.get('/favorites', authenticate, asyncHandler(async (req, res) => {
  res.json(req.user.favorites || []);
}));

router.post('/favorites', authenticate, asyncHandler(async (req, res) => {
  const movieId = req.body.movieId;
  if (!req.user.favorites.includes(movieId)) {
    req.user.favorites.push(movieId);
    await req.user.save();
  }
  res.json(req.user.favorites);
}));

router.delete('/favorites/:id', authenticate, asyncHandler(async (req, res) => {
    const movieId = Number(req.params.id); 
    req.user.favorites = req.user.favorites.filter(id => id !== movieId);
    await req.user.save();
    res.status(200).json(req.user.favorites);
}));

router.get('/playlist', authenticate, asyncHandler(async (req, res) => {
  res.json(req.user.playlist || []);
}));

router.post('/playlist', authenticate, asyncHandler(async (req, res) => {
  const movieId = req.body.movieId;
  if (!req.user.playlist.includes(movieId)) {
    req.user.playlist.push(movieId);
    await req.user.save();
  }
  res.json(req.user.playlist);
}));

router.delete('/playlist/:id', authenticate, asyncHandler(async (req, res) => {
  const movieId = Number(req.params.id); 
  req.user.playlist = req.user.playlist.filter(id => id !== movieId);
  await req.user.save();
  res.status(200).json(req.user.playlist);
}));



export default router;
