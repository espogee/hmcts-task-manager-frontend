import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import type {Task, CreateTaskRequest} from './types/Task';
import { taskApi } from './services/Api.ts';


function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    //Fetch All Tasks
    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskApi.getAllTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to fetch tasks. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //Create New Task
    const handleCreateTask = async (taskData: CreateTaskRequest) => {
        setError(null);
        try {
            const newTask = await taskApi.createTask(taskData);
            setTasks([...tasks, newTask]);
            return true;
        } catch (err) {
            setError('Failed to create task. Please try again.');
            console.error(err);
            return false;
        }
    };

    const handleUpdateTask = async (id: number, taskData: Partial<Task>) => {
        setError(null);
        try {
            const updatedTask = await taskApi.updateTask(id, taskData);
            setTasks(tasks.map(t => t.id === id ? updatedTask : t));
            setEditingTask(null);
            return true;
        } catch (err) {
            setError('Failed to update task. Please try again.');
            console.error(err);
            return false;
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        setError(null);
        try {
            await taskApi.deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            setError('Failed to delete task. Please try again.');
            console.error(err);
        }
    };

    const handleStatusChange = async (id: number, status: string) => {
        setError(null);
        try {
            const updatedTask = await taskApi.updateTaskStatus(id, status);
            setTasks(tasks.map(t => t.id === id ? updatedTask : t));
        } catch (err) {
            setError('Failed to update task status. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        HMCTS Task Management System
                    </h1>
                    <p className="text-lg text-gray-600">
                        Manage your casework tasks efficiently
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <TaskForm
                            onSubmit={editingTask ?
                                (data) => handleUpdateTask(editingTask.id, data) :
                                handleCreateTask
                            }
                            editingTask={editingTask}
                            onCancel={() => setEditingTask(null)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <TaskList
                            tasks={tasks}
                            loading={loading}
                            onEdit={setEditingTask}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;