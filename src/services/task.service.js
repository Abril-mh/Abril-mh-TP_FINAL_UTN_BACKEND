import { taskRepository } from "../repositories/task.repository.js";
import { categoryRepository } from "../repositories/category.repository.js";

export const taskService = {
    createTask: async ({ title, description, userId, categoryId }) => {
        try {
            console.log("🔥 userId recibido:", userId);
            console.log("🔥 categoryId recibido (raw):", categoryId);

            // Limpiamos espacios por si acaso
            const cleanCategoryId = categoryId.trim();
            console.log("🔥 categoryId limpio:", cleanCategoryId);

            // Traemos todas las categorías del usuario
            const categories = await categoryRepository.findByUser(userId);
            console.log("🔥 Categorías encontradas por el usuario:", categories);

            // Buscamos la categoría por ID usando toString()
            const category = categories.find(c => c._id.toString() === cleanCategoryId);
            console.log("🔥 Categoría filtrada:", category);

            if (!category) {
                throw new Error("Categoría no encontrada");
            }

            // Creamos la tarea
            return taskRepository.create({
                title,
                description,
                user: userId,
                category: category._id // aseguramos que guarde ObjectId
            });

        } catch (error) {
            console.error("Error atrapado:", error);
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