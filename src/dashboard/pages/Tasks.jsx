import { useEffect, useState } from 'react';
import TaskStats from '../components/tasks/TaskStats';
import AddTask from '../components/tasks/AddTask';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskCard from '../components/tasks/TaskCard';
import TasksSkeleton from '../../dashboard/skeletons/TasksSkeleton';

const Tasks = () => {
  // Dummy tasks data
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish CSC 471 assignment', completed: false },
    { id: 2, title: 'Read robotics ethics notes', completed: true },
    { id: 3, title: 'Prepare for quiz', completed: false },
    { id: 4, title: 'Revise algorithms', completed: true },
  ]);

  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Add task (dummy)
  const addTask = title => {
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);
  };

  // Toggle completed
  const toggleTask = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = id => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (loading) {
    return <TasksSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="text-text-muted">Manage your daily academic tasks</p>
      </div>

      {/* Stats */}
      <TaskStats tasks={tasks} />

      {/* Add task */}
      <AddTask onAdd={addTask} />

      {/* Filters */}
      <TaskFilters filter={filter} setFilter={setFilter} />

      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-6 text-sm text-text-muted">
          No tasks found for this filter.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
