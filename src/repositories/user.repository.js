import User from "../models/User.js";

export const userRepository = {
    create: (data) => User.create(data),

    find: (filters) => User.find(filters),

    findById: (id) => User.findById(id),

    findByEmail: (email) => User.findOne({ email }),

    update: (id, data) => User.findByIdAndUpdate(id, data, { new: true }),

    delete: (id) => User.findByIdAndDelete(id),
};

