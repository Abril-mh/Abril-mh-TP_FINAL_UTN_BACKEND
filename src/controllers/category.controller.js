import { getAllCategories,createCategory,getCategoryById,updateCategory,deleteCategory } from "../services/category.service.js";

export const categoryController = {

    async getAll(req, res, next) {
        try {
            const categories = await getAllCategories(req.res._id);
            res.json(categories);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const category = await getCategoryById(req.params.id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    },

async create(req, res, next) {
    try {
        const { name } = req.body;
        const newCategory = await createCategory({
            name,
            user: req.user._id  
        });
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
},

    async update(req, res, next) {
        try {
            const updated = await updateCategory(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            await deleteCategory(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};