import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
    baseURL: `${API}/api/todos`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getAllTodos = () => api.get('')
export const getTodoById = (id) => api.get(`/${id}`)
export const createTodo = (todo) => api.post('', todo)
export const updateTodo = (id, todo) => api.put(`/${id}`, todo)
export const toggleTodo = (id) => api.patch(`/${id}/toggle`)
export const deleteTodo = (id) => api.delete(`/${id}`)
export const deleteCompleted = () => api.delete('/completed')
export const getTodosByStatus = (completed) => api.get(`/status?completed=${completed}`)
export const searchTodos = (keyword) => api.get(`/search?keyword=${keyword}`)