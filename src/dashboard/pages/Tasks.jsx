import { useEffect, useState } from 'react';
import TaskStats from '../components/tasks/TaskStats';
import AddTask from '../components/tasks/AddTask';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskCard from '../components/tasks/TaskCard';
import TasksSkeleton from '../../dashboard/skeletons/TasksSkeleton';
import api from '../../api/axios';

const Tasks = () => {
  // task list - used for rendering filtering, toggling
  const [tasks, setTasks] = useState([]);

  // task stats - for heder stats
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        setLoading(true);

        // fetch tasks
        const tasksRes = await api.get('/tasks');
        const taskList = tasksRes.data;

        const totalTasks = taskList.length;
        const completedTasks = taskList.filter(task => task.completed).length;

        const pendingTasks = totalTasks - completedTasks;

        // save tasks
        setTasks(taskList);

        // save stats separately
        setTaskStats({
          totalTasks,
          completedTasks,
          pendingTasks,
        });
      } catch (error) {
        console.error('Task stats error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTaskStats();
  }, []);

  // Add task
  const addTask = async title => {
    try {
      const res = await api.post('/tasks', { title });

      // add new task returned from backend
      setTasks(prev => [res.data, ...prev]);

      // Update stats
      setTaskStats(prev => ({
        totalTasks: prev.totalTasks + 1,
        completedTasks: prev.completedTasks,
        pendingTasks: prev.pendingTasks + 1,
      }));
    } catch (error) {
      console.error('Add task error', error);
    }
  };

  // toggle taks
  const toggleTask = async id => {
    try {
      const res = await api.patch(`/tasks/${id}`);

      setTasks(prev => prev.map(task => (task._id === id ? res.data : task)));

      // Recalculate stats
      setTaskStats(prev => {
        const completedTasks = tasks
          .filter(t => (t._id === id ? res.data.completed : t.completed))
          .filter(t => t).length;

        const totalTasks = prev.totalTasks;
        const pendingTasks = totalTasks - completedTasks;

        return {
          totalTasks,
          completedTasks,
          pendingTasks,
        };
      });
    } catch (error) {
      console.error('Toggle task error', error);
    }
  };

  // delete task
  const deleteTask = async id => {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks(prev => prev.filter(task => task._id !== id));

      // Update stats
      setTaskStats(prev => {
        const totalTasks = prev.totalTasks - 1;
        const completedTasks = tasks.find(t => t._id === id)?.completed
          ? prev.completedTasks - 1
          : prev.completedTasks;

        const pendingTasks = totalTasks - completedTasks;

        return {
          totalTasks,
          completedTasks,
          pendingTasks,
        };
      });
    } catch (error) {
      console.error('Delete task error', error);
    }
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
      <TaskStats taskStats={taskStats} />

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
              key={task._id}
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
