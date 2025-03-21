const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

//register user
exports. registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    //validation:check if all fields are filled
    if (!fullname || !email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try {
        //check if email already exists
        const existsUser = await
        User.findOne({ email });
        if (existsUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        //create new user
        const user = await User.create({
            fullname,
            email,
            password,
        });
        res.status(201).json({
            id:user._id,
            user,
            token: generateToken(user._id)
        })
    }
    catch (error) {
        res.status(500).json({ msg: 'Error registering user', error: error.message });
    }
};

//login user 

exports. loginUser = async (req, res) => {
    const { email, password } = req.body;
    //validation:check if all fields are filled
    if (!email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try {
        //check if email exists
        const user = await User
        .findOne({ email });
        if (!user||!(await user.comparePassword(password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        res.status(200).json({
            id:user._id,
            user,
            token: generateToken(user._id)
        });
     }
        catch (error) {
            res.status(500).json({ msg: 'Login Error', error: error.message });
        }
    };

//get user info 
exports. getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error getting user info', error: error.message });
    }
};
    