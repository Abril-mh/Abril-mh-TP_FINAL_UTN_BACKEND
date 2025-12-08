import { taskService } from "../services/task.service.js";

export const taskController = {
    create: (req, res, next) => {
        taskService.createTask({ ...req.body, userId: req.user._id })
            .then(result => {
                if (!result.success) {
                    return res.status(400).json(result);
                }
                return res.status(201).json(result);
            })
            .catch(next);
    },

    getAll: (req, res, next) => {
        taskService.getTasksByUser(req.user._id)
            .then(tasks => res.json(tasks))
            .catch(next);
    },

    update: (req, res, next) => {
        taskService.updateTask(req.params.id, req.user._id, req.body)
            .then(task => res.json(task))
            .catch(next);
    },

    delete: (req, res, next) => {
        taskService.deleteTask(req.params.id, req.user._id)
            .then(() => res.json({ message: "Tarea eliminada" }))
            .catch(next);
    },
};
