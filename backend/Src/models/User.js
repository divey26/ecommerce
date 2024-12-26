const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

module.exports = User;
