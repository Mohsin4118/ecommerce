import { response } from "express"
import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            res.status(401).send({
                success: false,
                message: 'name is required'
            })
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            res.status(200).send({
                success: false,
                message: 'Category already exists'
            })
        }

        const category = await categoryModel({name,  slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error creating category",
            error
        })
    }
}

//update category controller
    export const updateCategoryController = async (req,res)=>{
    try {
        const {name} = req.body
        const {cid} = req.params
        const updateCategory = await categoryModel.findByIdAndUpdate(cid,{name, slug: slugify(name)}, {new: true})
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updateCategory
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error updating category',
            error
        })
    }

    }

//Get All categories
export const categoryController = async (req, res)=>{
try {
    const category = await categoryModel.find({})
    res.status(200).send({
        success: true,
        message: "All category lists",
        category
    })
} catch (error) {
    consaole.log(error)
    res.status(500).send({
        success: false,
        message: 'error fetching catrgories',
        error
    })
}
}


//single category controller
export const getSingleCategoryController = async (req, res)=>{
    try {
        const {id} = req.params
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error fetching single category",
            error
        })
    }
}

//Delete category Controller
export const deleteCategoryController = async (req, res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category Deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Cannot delete category",
            error
        })
    }
}