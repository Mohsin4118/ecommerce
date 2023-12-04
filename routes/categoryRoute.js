import express from 'express';
import {isAdmin, requireSignin} from '../middlewares/authMiddleware.js'
import { categoryController,
      createCategoryController,
      updateCategoryController,
      getSingleCategoryController,
      deleteCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//create category
router.post('/create-category', requireSignin, isAdmin, createCategoryController)
//update category
router.put('/update-category/:cid', requireSignin, isAdmin, updateCategoryController)

//get All Categories
router.get('/get-categories', categoryController)

//get single Category
router.get("/single-category/:slug", getSingleCategoryController)

//delete Category Coontroller
router.delete("/delete-categories/:id",requireSignin, isAdmin, deleteCategoryController)

export default router