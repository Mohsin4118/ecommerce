import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'

//Create Products
export const createProduct = async (req, res)=>{
try {
const {name, description, price, category, quantity, shipping } = req.fields
const {photo} = req.files

switch(true){
case !name: 
return res.status(500).send({error: "name is required"})
case !quantity: 
return res.status(500).send({error: "quantity is required"})
case !description: 
return res.status(500).send({error: "description is required"})
case !price: 
return res.status(500).send({error: "price is required"})
case !category: 
return res.status(500).send({error: "category is required"})
case shipping !== '1' && shipping !== '0':
return res.status(500).send({ error: "Invalid value for shipping. Use 'Yes' or 'No'" });
case photo && photo.size > 1000000: 
return res.status(500).send({error: "photo is required and should be less then 1MB"})
}


const products = new productModel({...req.fields, slug: slugify(name)})

// Convert 'Yes' or 'No' strings to boolean (true or false)
products.shipping = shipping === '1' ? true : false;

if(photo){
    products.photo.data =fs.readFileSync(photo.path)
    products.photo.contentType = photo.type
    await products.save()
    res.status(201).send({
        success: true,
        message: "Product Created successfully",
        products
    })
}
} catch (error) {
console.log(error)
res.status(500).send({
    success: false,
    message: "Cannot Create Product",
    error
})
}
}


//Get All Product Controller
export const getProductController = async (req, res) => {
    try {
    const product = await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1})
    res.status(200).send({
        success: true,
        message: "products succefully fetched",
        productCount: product.length,
        product
    })    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in fetching products",
            error
        })
    }
}

//Get single Product
export const getSingleProductController = async (req, res)=> {
    try {
        const product = await productModel.findOne({slug: req.params.slug}).populate("category").select("-photo")
        res.status(200).send({
            success: true,
            message: "successfully retrieved product",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while getting single Product",
            error
        })
    }
}

//Get Photo Controller
export const getphotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('content-type', product.photo.contentType)
            return res.status(200).send( product.photo.data)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error While getting Photo",
            error
        })
    }
}

//delete product controller
export const deleteProductController = async (req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error deleting product",
            error
        })
    }
}

//Update product Controller
export const updateProductController = async (req, res)=>{
    try {
        const {name, description, price, category, shipping } = req.fields
        const {photo} = req.files
        console.log("in update controller")
        switch(true){
        case !name: 
        return res.status(500).send({error: "name is required"})
        // case !slug: 
        // return res.status(500).send({error: "slug is required"})
        case !description: 
        return res.status(500).send({error: "description is required"})
        case !price: 
        return res.status(500).send({error: "price is required"})
        case !category: 
        return res.status(500).send({error: "category is required"})
        case !shipping: 
        return res.status(500).send({error: "shipping is required"})
        case photo && photo.size > 1000000: 
        return res.status(500).send({error: "photo is required and should be less then 1MB"})
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug: slugify(name)}, {new: true})
        if(photo){
            products.photo.data =fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
            await products.save()
            res.status(201).send({
                success: true,
                message: "Product updated successfully",
                products
            })
        }
        } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Cannot Update Product",
            error
        })
        }
}

// Filter Product Controller
export const filterProductsController = async (req, res) => {
    try {
      const { radio, checked } = req.body;
      let arg = {};
  
      if (checked.length > 0) {
        // Assuming 'category' is a property of the product model
        arg.category = { $in: checked }; // Use $in for an array of categories
      }
  
      if (radio && radio.length === 2) {
        arg.price = { $gte: radio[0], $lte: radio[1] };
      }
  
      const products = await productModel.find(arg);
      
      res.status(200).send({
        success: true,
        message: 'Filtered products successfully',
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: 'Error in filtering products',
        error,
      });
    }
  };
  
// product Count Controller
export const productCountController = async (req, res)=>{
try {
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
        success: true,
        message: "product Count Successfully",
        total
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        success: false,
        message: "Error in Product Count",
        error
    })
}
}

//product list based on controller
export const productListController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page -1) * perPage)
            .limit(perPage)
            .sort({createdAt: -1})
            res.status(200).send({
                success: true,
                products
            })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error
        })
    }
}

//search product controler
export const searchProductController = async (req,res) => {
    try {
        const {keyword} = req.params
        const result = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        })
        .select("-photo")
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error while searching products",
            error
        })
    }
}

//Get related products
export const relatedProductController = async (req, res) => {
    try {
        const {pid, cid} = req.params
        const product = await productModel.find({
            category: cid,
            _id: {$ne: pid}
        }).select("-photo").limit(3).populate("category")

        res.status(200).send({
            success: true,
            message: "successfully fetched related products",
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in fetching similar products"
        })
    }
}