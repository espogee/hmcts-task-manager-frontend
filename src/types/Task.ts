export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    dueDateTime: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskRequest {
    title: string;
    description?: string;
    status: TaskStatus;
    dueDateTime: string;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDateTime?: string;
}

export interface UpdateTaskStatusRequest {
    status: TaskStatus;
}