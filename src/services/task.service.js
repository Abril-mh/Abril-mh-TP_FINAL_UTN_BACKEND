import { taskRepository } from "../repositories/task.repository.js";
import { categoryRepository } from "../repositories/category.repository.js";

export const taskService = {
    createTask: async ({ title, description, userId, categoryId }) => {
        // Validar que la categoría exista y pertenezca al usuario
        const category = await categoryRepository.findByUser(userId)
            .then(cats => cats.find(c => c._id.toString() === categoryId));

        if (!category) throw new Error("Categoría no encontrada");

        return taskRepository.create({ title, description, user: userId, category: categoryId });
    },

    getTasksByUser: async (userId) => taskRepository.findByUser(userId),

    updateTask: async (taskId, userId, data) => {
        const task = await taskRepository.findById(taskId);
        if (!task || task.user.toString() !== userId) throw new Error("Tarea no encontrada o no autorizada");

        return taskRepository.update(taskId, data);
    },

    deleteTask: async (taskId, userId) => {
        const task = await taskRepository.findById(taskId);
        if (!task || task.user.toString() !== userId) throw new Error("Tarea no encontrada o no autorizada");

        return taskRepository.delete(taskId);
    },
};

