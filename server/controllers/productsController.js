
const asyncHandler = require('express-async-handler')
const Product = require("../model/productsModel")
const { cloudinary } = require('../utils/cloudinary');


//@Desc     Register Product
//@Route    POST /api/products/register-products
//@Access   Public
const registerProduct = asyncHandler(async (req, res) => {
  const { name, price, category, amount, image } = req.body;

  if (!name || !price || !category || !amount || !image) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    // Check if Product exists
    const productExists = await Product.findOne({ name });

    if (productExists) {
      res.status(400);
      throw new Error('Product already exists');
    }

    // Create Product
    const newProduct = new Product({
      name,
      price,
      category,
      amount,
      image
    });

    const product = await newProduct.save();

    if (product) {
      res.status(201).json({
        _id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        amount: product.amount,
        image: product.image
      });
    } else {
      res.status(400);
      throw new Error('Invalid Product data');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
});



//@Desc     Get data product
//@Route    GET /api/products/all-product
//@Access   Private
const allProduct = asyncHandler(async(req,res)=>{
  const product = await Product.find()
  res.json(product)
  
})


//@Desc     Get data product
//@Route    GET /api/all/:category
//@Access   Private
const getProduct = async (req, res) => {
  const { name } = req.params;
  let products = {};

  try {
    if (name === "all") {
      products = await Product.find();
    } else {
      products = await Product.find({ category: name });
    }

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ status: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'Error retrieving products', error });
  }
};


//@Desc     update Product
//@Route    PUT /api/products/update-product/
//@Access   private
const updateProduct = asyncHandler (async (req,res)=>{
  
  const {id} = req.params;
  const { name, price, category, amount} = req.body;

  const product = await Product.findOne({_id: id })

  if (product) {

    try {
      await Product.updateOne(
        {
          _id: id,
        },
        {
          $set:{
            name:name,
            price:price,
            category:category,
            amount:amount
          },
        }
      );
      
      res.status(201).json({
        _id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        amount: product.amount,
        status: "verified"
      })
  
    } catch (error) {
  
      res.json({ status: "Something Went Wrong" });
    }

  }else{
    res.status(200).json({ status: "product Not Exists!!" });
  }
  
  res.status(201).json({
    _id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    amount: product.amount,
    status: "verified"
  })
})



//@Desc     delete Product
//@Route    DELETE /api/products/delete-products/:id
//@Access   private
const deleteProduct = asyncHandler ( async (req,res)=>{
  const {id} = req.params;
  const idProduct = await Product.findById(id)

  if (!idProduct) {
    res.status(400)
    throw new Error('Product not found')
  }else{
  await idProduct.remove();
  res.status(200).json({ status: "Eliminado"})
  }

  
})


//@Desc     delete Product
//@Route    DELETE /api/products/imgProduct
//@Access   private
const imgProduct = asyncHandler ( async (req,res)=>{
  try {
    const {url} = req.body;
    console.log(url);
    const uploadResponse = await cloudinary.uploader.upload(url, {
      upload_preset: 'siac',
  });
  console.log(uploadResponse);
  res.status(200).json({ msg: 'File uploaded sucessfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({err: 'something went wrong'})
  }
  
  // const idProduct = await Product.findById(id)

  
})





module.exports = {
  registerProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  allProduct,
  imgProduct
}