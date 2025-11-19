import { categoryService } from "../services/category.service.js";

export const categoryController = {
    create: (req, res, next) => {
        categoryService.createCategory({ ...req.body, userId: req.user.id })
            .then(category => res.status(201).json(category))
            .catch(next);
    },

    getAll: (req, res, next) => {
        categoryService.getCategoriesByUser(req.user.id)
            .then(categories => res.json(categories))
            .catch(next);
    },

    delete: (req, res, next) => {
        categoryService.deleteCategory(req.params.id, req.user.id)
            .then(() => res.json({ message: "Categoría eliminada" }))
            .catch(next);
    },
};

