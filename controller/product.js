const Product = require("../model/product-model");

module.exports = {


        // Sort theo brand
        sort: async function(req, res) {
          await Product.find({brand: req.params.brand}, function(err, data) {
            res.render('pages/products.ejs', {
              title: 'Product',
              products: data,
              user: req.user
            });
          });
        },


        index: async function(req, res){
          await Product.find({}, function(err, data) {
            res.render('pages/products.ejs', {
              title: 'Product', 
              products: data,
              user: req.user,
            });
        });
      },
        
          // Thong tin san pham
          detail: async function(req, res) {
            await Product.findOne({name: req.params.name}, function(err, data) {
              res.render('pages/detail.ejs', {
                title: 'Detail',
                product: data,
                user: req.user
              });
            });
          },
          // Tim kiem san pham
          search: async function(req, res) {
            await Product.find({ $text: {$search: req.query.search}}, function(err, data) {
              res.render('pages/products.ejs', {
                title: 'Search',
                products: data,
                user: req.user
              });
            });
          }
};

