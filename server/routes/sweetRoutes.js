const express = require('express');
const {
  getSweets,
  getSweet,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweets
} = require('../controllers/sweetController');

const router = express.Router();

router.route('/')
  .get(getSweets)
  .post(createSweet);

router.route('/:id')
  .get(getSweet)
  .put(updateSweet)
  .delete(deleteSweet);

router.route('/:id/purchase')
  .patch(purchaseSweet);

router.route('/:id/restock')
  .patch(restockSweet);

router.route('/search')
  .get(searchSweets);

module.exports = router;