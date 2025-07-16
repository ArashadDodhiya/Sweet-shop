const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Nut-Based',
      'Vegetable-Based',
      'Milk-Based',
      'Chocolate',
      'Candy',
      'Pastry'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be at least 0']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add a quantity'],
    min: [0, 'Quantity must be at least 0']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Sweet', sweetSchema);