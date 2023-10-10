import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { get, post, put } from '../queries/utils'
import useStore from '../hooks/useStore';
import TaskPanel, { Task } from '../components/Tasks/TaskPanel';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const currentCreator = useStore(state => state.currentCreator);
  useEffect(() => {
    checkForUpdates();
    const interval = setInterval(() => {
      checkForUpdates();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentCreator]);

  const handleTaskStatusChange = (taskId: string, status: string) => {
    setTasks(prevTasks => {
      if (status === 'deleted') {
        // Filter out deleted task
        return prevTasks.filter(task => task.id !== taskId);
      } else {
        // Update status of existing task
        return prevTasks.map(task =>
          task.id === taskId ? { ...task, status } : task
        );
      }
    });
  };

  async function checkForUpdates() {
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  }

  async function fetchTasks() {
    try {
      const data = await get(`/${currentCreator?.creator_id}/tasks/`);
      return data
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  return (
    <>

      <h1>Tasks</h1>

      <section className="task-container">

        {tasks.map(task => (
          <TaskPanel key={task.id} task={task} onTaskStatusChange={handleTaskStatusChange} />
        ))}

      </section>

    </>
  )
};

export default Tasks;
