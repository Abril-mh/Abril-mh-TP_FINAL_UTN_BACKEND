import { categoryRepository } from "../repositories/category.repository.js";

// Obtener todas las categorías
export async function getAllCategories(userId) {
    return await categoryRepository.findByUser(userId);
}

// se Crea categoría, jiji
export async function createCategory(data) {
    return await categoryRepository.create(data);
}

// Obtener categoría por ID
export async function getCategoryById(id) {
    return await categoryRepository.findById(id);
}

// Actualizar categoría
export async function updateCategory(id, data) {
    return await categoryRepository.update(id, data);
}

// Eliminar categoría
export async function deleteCategory(id) {
    return await categoryRepository.delete(id);
}