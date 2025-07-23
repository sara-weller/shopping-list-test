const express = require('express');
const router = express.Router();
const client = require('../elasticClient');

// POST /orders - Save a new order
router.post('/', async (req, res) => {
  try {
    const { fullName, address, email, products } = req.body;

    // Validate required fields
    if (!fullName || !address || !email || !products) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Index the order in Elasticsearch
    const response = await client.index({
      index: 'orders',
      document: {
        fullName,
        address,
        email,
        products,
        createdAt: new Date()
      }
    });

    res.status(201).json({ message: 'Order saved', id: response._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;