import { categoryRepository } from "../repositories/category.repository.js";

export const categoryService = {
    createCategory: async ({ name, userId }) => categoryRepository.create({ name, user: userId }),
    getCategoriesByUser: async (userId) => categoryRepository.findByUser(userId),
    deleteCategory: async (categoryId, userId) => {
        const category = await categoryRepository.findByUser(userId)
            .then(cats => cats.find(c => c._id.toString() === categoryId));

        if (!category) throw new Error("Categoría no encontrada o no autorizada");

        return categoryRepository.delete(categoryId);
    },
};

