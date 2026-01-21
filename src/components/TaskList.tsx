import type {Task, TaskStatus} from '../types/Task';

interface TaskListProps {
    tasks: Task[];
    loading: boolean;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: string) => void;
}

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }: TaskListProps) => {
    const getStatusColor = (status: TaskStatus): string => {
        switch (status) {
            case 'TODO':
                return 'bg-gray-100 text-gray-800';
            case 'IN_PROGRESS':
                return 'bg-blue-100 text-blue-800';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDateTime = (dateTimeStr: string): string => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isOverdue = (dueDateTime: string): boolean => {
        return new Date(dueDateTime) < new Date();
    };

    const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Loading tasks...</div>
                </div>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col justify-center items-center h-64 text-gray-500">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-lg">No tasks yet</p>
                    <p className="text-sm">Create your first task to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Tasks ({tasks.length})
            </h2>

            <div className="space-y-4">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {task.title}
                                </h3>
                                {task.description && (
                                    <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                                )}
                            </div>

                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                {task.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className={isOverdue(task.dueDateTime) && task.status !== 'COMPLETED' ? 'text-red-600 font-medium' : ''}>
                                    Due: {formatDateTime(task.dueDateTime)}
                                    {isOverdue(task.dueDateTime) && task.status !== 'COMPLETED' && ' (Overdue)'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                            <select
                                value={task.status}
                                onChange={(e) => onStatusChange(task.id, e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>
                                        {status.replace('_', ' ')}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => onEdit(task)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(task.id)}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;