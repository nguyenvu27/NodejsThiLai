var express = require('express');
var router = express.Router();
import mongoose from 'mongoose';
import { ProductSchema } from '../models/products';

const Product = mongoose.model('products', ProductSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, (err, product) => {
    if (err) {
      res.send(err)
    }
    res.render('index', { products: product });
  });
});

module.exports = router;
