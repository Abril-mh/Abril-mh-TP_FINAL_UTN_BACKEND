import { taskService } from "../services/task.service.js";

export const taskController = {
    create: (req, res, next) => {
        taskService.createTask({ ...req.body, userId: req.user.id })
            .then(task => res.status(201).json(task))
            .catch(next);
    },

    getAll: (req, res, next) => {
        taskService.getTasksByUser(req.user.id)
            .then(tasks => res.json(tasks))
            .catch(next);
    },

    update: (req, res, next) => {
        taskService.updateTask(req.params.id, req.user.id, req.body)
            .then(task => res.json(task))
            .catch(next);
    },

    delete: (req, res, next) => {
        taskService.deleteTask(req.params.id, req.user.id)
            .then(task => res.json({ message: "Tarea eliminada" }))
            .catch(next);
    },
};
