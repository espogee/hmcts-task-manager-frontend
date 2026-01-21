import axios from 'axios';
import type {Task, CreateTaskRequest, UpdateTaskRequest} from '../types/Task';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskApi = {
    getAllTasks: async (): Promise<Task[]> => {
        const response = await api.get<Task[]>('');
        return response.data;
    },

    getTaskById: async (id: number): Promise<Task> => {
        const response = await api.get<Task>(`/${id}`);
        return response.data;
    },

    createTask: async (task: CreateTaskRequest): Promise<Task> => {
        const response = await api.post<Task>('', task);
        return response.data;
    },

    updateTask: async (id: number, task: UpdateTaskRequest): Promise<Task> => {
        const response = await api.put<Task>(`/${id}`, task);
        return response.data;
    },

    updateTaskStatus: async (id: number, status: string): Promise<Task> => {
        const response = await api.patch<Task>(`/${id}/status`, { status });
        return response.data;
    },

    deleteTask: async (id: number): Promise<void> => {
        await api.delete(`/${id}`);
    },
};