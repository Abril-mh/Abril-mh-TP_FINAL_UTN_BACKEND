import Task from "../models/Task.js";

export const taskRepository = {
    create: (data) => Task.create(data),

    findByUser: (userId) => Task.find({ user: userId }).populate("category"),

    findById: (id) => Task.findById(id),

    update: (id, data) => Task.findByIdAndUpdate(id, data, { new: true }),

    delete: (id) => Task.findByIdAndDelete(id),
};

