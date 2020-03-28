import mongoose from 'mongoose';
import { ProductSchema } from '../models/products';

const Product = mongoose.model('products', ProductSchema);

//Lay ra danh sach product
export const getProducts = (req, res) => {
  Product.find({}, (err, product) => {
    if (err) {
      res.send(err)
    }
    res.render('product/index', { products: product });
  });
}

export const getUser = (req, res) => {
  Product.find({}, (err, product) => {
    if (err) {
      res.send(err)
    }
    res.render('product/user', { products: product });
  });
}

export const getUserFix = (req, res) => {
  Product.find({}, (err, product) => {
    if (err) {
      res.send(err)
    }
    res.render('/', { products: product });
  });
}
// Them san pham
export const addProduct = (req, res, next) => {
  var model = new Product();
  model.name = req.body.name;
  model.price = req.body.price;
  model.description = req.body.description;
  console.log(model.description);
  model.image = req.file.path.replace('public', '');

  model.save(function (err) {
    if (err) {
      res.send("Luu khong thanh cong")
    }
    res.redirect('/products');
  });
}

export const formAddProduct = (req, res) => {
  res.render('product/add-form', {});
}

// Edit
export const editProduct = (req, res) => {
  Product.findOne({ _id: req.params.pId }, function (err, product) {

    if (err) {
      res.send('id khong ton tai');
    }
    res.render('product/edit-form', { product: product });
  });
}
export const saveEdit = (req, res) => {

  Product.findOne({ _id: req.body.id }, function (err, model) {
    model.name = req.body.name;
    model.price = req.body.price;
    model.description = req.body.description;
    if (req.file != null) {
      model.image = req.file.path.replace('public', '');
    }

    model.save(function (err) {
      if (err) {
        res.send('Luu khong thanh cong');
      }

      res.redirect('/products');
    })
  })
}
// xóa product

export const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.pId }, function (err) {
    if (err) {
      res.send('Xoa khong thanh cong');
    }
    res.redirect('/products');
  });
}



export const editDetail = (req, res) => {
  Product.findOne({ _id: req.params.pId }, function (err, product) {

    if (err) {
      res.send('id khong ton tai');
    }
    res.render('product/detail', { product: product });
  });
}