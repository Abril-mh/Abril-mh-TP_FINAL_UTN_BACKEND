import { taskRepository } from "../repositories/task.repository.js";
import { categoryRepository } from "../repositories/category.repository.js";

export const taskService = {
    createTask: async ({ title, description, userId, categoryId }) => {
        try {
            let category = null;

            // Si viene categoryId, buscamos la categoría. Si no, seguimos sin romper nada.
            if (categoryId) {
                const cleanCategoryId = categoryId.trim();

                const categories = await categoryRepository.findByUser(userId);
                category = categories.find(c => c._id.toString() === cleanCategoryId);
            }

            // Crear la tarea incluso si NO hay categoría
            const newTask = await taskRepository.create({
                title,
                description: description || "",
                user: userId,
                category: category ? category._id : null
            });

            return { success: true, data: newTask };

        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    getTasksByUser: async (userId) => taskRepository.findByUser(userId),

    updateTask: async (taskId, userId, data) => {
        const task = await taskRepository.findById(taskId);
        if (!task || task.user.toString() !== userId.toString()) {
            throw new Error("Tarea no encontrada o no autorizada");
        }
        return taskRepository.update(taskId, data);
    },

    deleteTask: async (taskId, userId) => {
        const task = await taskRepository.findById(taskId);
        if (!task || task.user.toString() !== userId.toString()) {
            throw new Error("Tarea no encontrada o no autorizada");
        }
        return taskRepository.delete(taskId);
    },
};