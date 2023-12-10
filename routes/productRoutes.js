import express from 'express';
import {isAdmin, requireSignin} from '../middlewares/authMiddleware.js'
import {createProduct,
          getProductController,
          getSingleProductController,
          getphotoController,
          deleteProductController,
          updateProductController,
          filterProductsController,
          productCountController,
          productListController,
          searchProductController,
          relatedProductController
     } from '../controllers/productController.js'
import formidable from 'express-formidable'
const router = express.Router();

router.post("/create-product",requireSignin,isAdmin,formidable(), createProduct)
router.put("/update-product/:pid",requireSignin,isAdmin,formidable(), updateProductController)
router.get("/get-product", getProductController)
router.get("/get-product/:slug", getSingleProductController)
router.get("/product-photo/:pid", getphotoController)
router.delete("/delete-product/:pid", deleteProductController)
//filter product Route
router.post("/filter-product", filterProductsController)
router.get("/product-count", productCountController)
router.get("/product-list/:page", productListController)
//search controller
router.get("/search/:keyword", searchProductController)
//similar products
router.get('/related-product/:pid/:cid', relatedProductController)


export default router