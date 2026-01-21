import { useState, useEffect } from 'react';
import type {Task, CreateTaskRequest, TaskStatus} from '../types/Task';

interface TaskFormProps {
    onSubmit: (task: CreateTaskRequest) => Promise<boolean>;
    editingTask?: Task | null;
    onCancel?: () => void;
}

const TaskForm = ({ onSubmit, editingTask, onCancel }: TaskFormProps) => {
    const [formData, setFormData] = useState<CreateTaskRequest>({
        title: '',
        description: '',
        status: 'TODO',
        dueDateTime: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            status: 'TODO',
            dueDateTime: '',
        });
        setErrors({});
    };

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                description: editingTask.description || '',
                status: editingTask.status,
                dueDateTime: editingTask.dueDateTime.slice(0, 16),
            });
        } else {
            resetForm();
        }
    }, [editingTask]);



    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.dueDateTime) {
            newErrors.dueDateTime = 'Due date/time is required';
        } else {
            const dueDate = new Date(formData.dueDateTime);
            if (dueDate < new Date()) {
                newErrors.dueDateTime = 'Due date/time must be in the future';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);
        const success = await onSubmit({
            ...formData,
            dueDateTime: new Date(formData.dueDateTime).toISOString(),
        });

        setSubmitting(false);
        if (success && !editingTask) {
            resetForm();
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCancel = () => {
        resetForm();
        onCancel?.();
    };

    const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter task title"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task description (optional)"
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>
                                {status.replace('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="dueDateTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date/Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        id="dueDateTime"
                        name="dueDateTime"
                        value={formData.dueDateTime}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.dueDateTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.dueDateTime && (
                        <p className="mt-1 text-sm text-red-600">{errors.dueDateTime}</p>
                    )}
                </div>

                <div className="flex gap-2 pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {submitting ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
                    </button>

                    {editingTask && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;