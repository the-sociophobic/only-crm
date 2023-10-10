import React from 'react';
import { Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { get, post, put } from '../../queries/utils'

export interface Task {
    id: string;
    creator: string;
    type: string;
    progress: number;
    description: string;
    status: string;
}

const TaskPanel: React.FC<{ task: Task; onTaskStatusChange: (taskId: string, status: string) => void }> = ({ task, onTaskStatusChange }) => {
    const handlePause = async () => {
        try {
            await get(`/tasks/${task.id}/pause/`);
            onTaskStatusChange(task.id, 'paused');
        } catch (error) {
            console.error('Error pausing task:', error);
        }
    };

    const handleResume = async () => {
        try {
            await get(`/tasks/${task.id}/resume/`);
            onTaskStatusChange(task.id, 'in_progress');
        } catch (error) {
            console.error('Error resuming task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await get(`/tasks/${task.id}/delete/`);
            onTaskStatusChange(task.id, 'deleted');
        } catch (error) {
            console.error('Error resuming task:', error);
        }
    };

    const status = getStatus(task);

    return (
        <Card className="task-panel">
            <Card.Header className="d-flex justify-content-between">
                <div>{task.id}</div>
                <div>{task.type}</div>
            </Card.Header>

            <Card.Body>
                <p className="text-center">{status}</p>

                <ProgressBar
                    className="task-progress"
                    now={getProgressPercent(task)}
                    label={task.description}
                    variant="progressbar" 
                />

                <div className="task-footer d-flex justify-content-between">

                    <Button
                        onClick={() => handlePause}
                        disabled={status !== 'in_progress' && status !== 'paused'}
                    >
                        {status === 'paused' ? 'Resume' : 'Pause'}
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

// Helper to get display status
function getStatus(task: Task) {
    if (task.status === 'completed') return 'Completed';
    if (task.status === 'pending') return 'Pending';
    if (task.status === 'paused') return 'Paused';
    if (task.status === 'resumed') return 'Paused';

    return task.status;
}

function getProgressPercent(task: Task) {
    if (task.status === 'completed') {
        return 100;
    }

    if (task.status === 'pending') {
        return 0;
    }

    return task.progress * 100;
}

export default TaskPanel;