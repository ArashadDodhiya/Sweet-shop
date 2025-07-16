const Sweet = require('../models/Sweet');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
exports.getSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single sweet
// @route   GET /api/sweets/:id
// @access  Public
exports.getSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return next(
        new ErrorResponse(`Sweet not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new sweet
// @route   POST /api/sweets
// @access  Public
exports.createSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json({
      success: true,
      data: sweet
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update sweet
// @route   PUT /api/sweets/:id
// @access  Public
exports.updateSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!sweet) {
      return next(
        new ErrorResponse(`Sweet not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete sweet
// @route   DELETE /api/sweets/:id
// @access  Public
exports.deleteSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return next(
        new ErrorResponse(`Sweet not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Purchase sweet
// @route   PATCH /api/sweets/:id/purchase
// @access  Public
exports.purchaseSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return next(
        new ErrorResponse(`Sweet not found with id of ${req.params.id}`, 404)
      );
    }

    if (sweet.quantity < quantity) {
      return next(
        new ErrorResponse(`Not enough stock available. Only ${sweet.quantity} left`, 400)
      );
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Restock sweet
// @route   PATCH /api/sweets/:id/restock
// @access  Public
exports.restockSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return next(
        new ErrorResponse(`Sweet not found with id of ${req.params.id}`, 404)
      );
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Public
exports.searchSweets = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (err) {
    next(err);
  }
};