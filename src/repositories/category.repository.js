import Category from "../models/Category.model.js";

export const categoryRepository = {
    create: (data) => Category.create(data),

    findByUser: (userId) => Category.find({ user: userId }),

    delete: (id) => Category.findByIdAndDelete(id),

    findById: (id) => Category.findById(id),

    update: (id, data) => Category.findByIdAndUpdate(id, data, { new: true }),
};
