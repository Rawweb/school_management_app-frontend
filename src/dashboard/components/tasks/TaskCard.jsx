import { RiDeleteBin2Fill } from 'react-icons/ri';

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex justify-between gap-4">
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <p
          className={`text-sm ${
            task.completed ? 'line-through text-text-muted' : ''
          }`}
        >
          {task.title}
        </p>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-xs text-red-500 hover:underline"
      >
        <RiDeleteBin2Fill className='size-5 hover:text-red-400 transition-colors' />
      </button>
    </div>
  );
};

export default TaskCard;
