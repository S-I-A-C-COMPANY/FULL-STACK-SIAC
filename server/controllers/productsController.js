
const asyncHandler = require('express-async-handler')
const Product = require("../model/productsModel")

const { cloudinary } = require('../utils/cloudinary');
const Category = require('../model/categoryModel');


//@Desc     Register Product
//@Route    POST /api/products/register-products
//@Access   Public
const registerProduct = asyncHandler(async (req, res) => {
  const { name, price, category, image } = req.body;

  if (!name || !price || !category || !image) {
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
      image
    });

    const product = await newProduct.save();

    if (product) {
      res.status(201).json({
        _id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
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
//@Route    GET /api/all/:category
//@Access   Private
const getProduct = async (req, res) => {
  
  let products = {};

  try {
 
      products = await Product.find();
    

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
const updateProducto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image } = req.body;

  try {
    // Verificar si hay otro producto con el mismo nombre
    const existingProduct = await Product.findOne({ name: name, _id: { $ne: id } });
    if (existingProduct) {
      return res.status(400).json({ status: 'Error', message: 'Ya existe otro producto con el mismo nombre' });
    }

    // Construir el objeto de actualización con los campos correspondientes
    const updateFields = {
      name: name,
      price: price,
      category: category,
      image: image
    };

    // Actualizar el producto en la base de datos utilizando el modelo Product
    await Product.updateOne({ _id: id }, { $set: updateFields });

    res.status(200).json({ status: 'Actualizado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Something Went Wrong' });
  }
});



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


const uploadCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
    }

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const existingCategory = await Category.findOne({ name: capitalizedName });
    if (existingCategory) {
      return res.status(409).json({ error: 'La categoría ya existe' });
    }

    const category = new Category({ name: capitalizedName });
    await category.save();

    res.json({ message: 'Categoría creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
});

const allCategories = asyncHandler(async(req,res)=>{
  
  let category = {};

  try {
 
    category = await Category.find();
    

    if (category.length > 0) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ status: 'Category Not Founds' });
    }
  } catch (error) {
    
    res.status(500).json({ status: 'Error retrieving categories', error });
  }
})

const delCategories = asyncHandler(async(req,res)=>{
  const {id} = req.params;

  const idCategory = await Category.findById(id)

  if (!idCategory) {
    res.status(400)
    throw new Error('Category not found')
  }else{
  await idCategory.remove();
  res.status(200).json({ status: "Eliminado"})
  }
})

module.exports = {
  registerProduct,
  getProduct,
  updateProducto,
  deleteProduct,
  imgProduct,
  allCategories,
  uploadCategory,
  delCategories
}