const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const categoryRoutes = require('./Src/routes/categoryRoutes');
const productRoutes = require('./Src/routes/productRoutes');
const videoRoutes = require('./Src/routes/shortsRoutes'); // Import the video routes



dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Register section
const formSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  residence: [String],
  address: String,
  phone: String,
  prefix: { type: String, required: true },
  captcha: String,
  agreement: { type: Boolean, required: true },
});
const FormData = mongoose.model('FormData', formSchema);

// Validation schema using Joi
const formValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  residence: Joi.array().items(Joi.string()).optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  prefix: Joi.string().required(),
  captcha: Joi.string().required(),
  agreement: Joi.boolean().valid(true).required(),
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  console.log('Received request data:', req.body);
  const { email, password, firstname, lastname, residence, address, phone, prefix, captcha, agreement } = req.body;

  // Validate form data
  const { error } = formValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await FormData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new FormData({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      residence,
      address,
      phone,
      prefix,
      captcha,
      agreement,
    });

    await newUser.save();
    res.status(201).send({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Error saving form data' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await FormData.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
});
///////////////////////////////////////////////////////////////////////
// Variable to store the deadline
let deadline = null;

// API to set the deadline
app.post('/api/deadline', (req, res) => {
  deadline = req.body.deadline; // Save deadline sent from 'web'
  res.status(200).json({ message: 'Deadline saved successfully' });
});

// API to get the deadline
app.get('/api/deadline', (req, res) => {
  if (deadline) {
    res.status(200).json({ deadline });
  } else {
    res.status(404).json({ message: 'No deadline set' });
  }

});
  //////////////////////////////////////////
app.use('/api/cat', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/videos', videoRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
