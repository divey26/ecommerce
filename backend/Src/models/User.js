const mongoose = require('mongoose');

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
  cart: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('FormData', formSchema);
