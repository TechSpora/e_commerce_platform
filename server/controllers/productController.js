const Product = require('../models/Product');

exports.list = async (req, res) => {
  const products = await Product.find().limit(100);
  res.json(products);
};

exports.get = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
};

// Admin-only
exports.create = async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
};

exports.update = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
