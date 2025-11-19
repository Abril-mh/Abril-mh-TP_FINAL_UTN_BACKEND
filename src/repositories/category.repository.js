import Category from "../models/Category.model.js";

export const categoryRepository = {
    create: (data) => Category.create(data),

    findByUser: (userId) => Category.find({ user: userId }),

    delete: (id) => Category.findByIdAndDelete(id),
};

