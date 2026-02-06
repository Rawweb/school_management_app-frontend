import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-xl p-4 flex gap-3"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm"
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary-hover transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
