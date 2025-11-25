import { taskRepository } from "../repositories/task.repository.js";
import { categoryRepository } from "../repositories/category.repository.js";

export const taskService = {
    createTask: async ({ title, description, userId, categoryId }) => {
        try {
            const cleanCategoryId = categoryId.trim();

            const categories = await categoryRepository.findByUser(userId);
            const category = categories.find(c => c._id.toString() === cleanCategoryId);

            if (!category) {
                return { success: false, message: "Categoría no encontrada" };
            }

            const newTask = await taskRepository.create({
                title,
                description,
                user: userId,
                category: category._id
            });

            return { success: true, data: newTask };

        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    getTasksByUser: async (userId) => taskRepository.findByUser(userId),

    updateTask: async (taskId, userId, data) => {
        const task = await taskRepository.findById(taskId);
        if (!task || task.user.toString() !== userId) {
            throw new Error("Tarea no encontrada o no autorizada");
        }
        return taskRepository.update(taskId, data);
    },

    deleteTask: async (taskId, userId) => {
        const task = await taskRepository.findById(taskId);
        if (!task || task.user.toString() !== userId) {
            throw new Error("Tarea no encontrada o no autorizada");
        }
        return taskRepository.delete(taskId);
    },
};