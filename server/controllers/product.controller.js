const { log } = require("console");
const ProductModel = require("../models/product.model");
const fs = require("fs");

exports.createProduct = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Create a new product"
    #swagger.description = 'Endpoint to create a new product'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
       in:'formData',
       type:'file',
       required:true,
       description:'Image to upload to Firebase Storage and get its url'
    }
    #swagger.requestBody = {
       required:true,
       content:{
         "multipart/form-data":{
           schema:{
             $ref:"#components/schemas/NewProduct"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Product created successfully"
    }
   */

  try {
    const { name, category, description, price } = req.body;

    if (!req.file) {
      return res.status(404).json({ message: "Image is required" });
    }
    const image = req.file.firebaseURL;
    //File upload
    if (!name || !description || !category || !price || !image) {
      return res.status(404).json({ message: "All Fields is require" });
    }
    const newProduct = await ProductModel.create({
      name,
      category,
      description,
      price,
      image,
    });
    if (!newProduct) {
      res.status(404).json({ message: "cannot create product" });
    }
    res.status(200).json({ message: "Created Product.", newProduct });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    if (!products)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;

  if (!id)
    return res.status(404).json({ message: "Product id is not Provided" });
  try {
    const updateProduct = await ProductModel.findById(id);

    const { name, description, category, price, image } = req.body;
    if (!name || !description || !category || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    updateProduct.name = name;
    updateProduct.description = description;
    updateProduct.category = category;
    updateProduct.price = price;
    updateProduct.image = image;
    if (req.file) {
      // Delete Image File from folder
      const imagePath = (__dirname, updateProduct.cover);
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to delete image." });
        }
      });
      const { path } = req.file;
      updateProduct.cover = path;
    }
    await updateProduct.save();

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;

  try {
    const deletedProduct = await ProductModel.findById(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    await deletedProduct.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};
