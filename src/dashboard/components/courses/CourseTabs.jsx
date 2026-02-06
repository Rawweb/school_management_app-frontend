
const CourseTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setActiveTab('all')}
        className={`px-4 py-2 rounded-lg text-sm border ${
          activeTab === 'all'
            ? 'bg-primary text-white border-primary'
            : 'bg-surface border-border text-text-muted hover:text-text'
        }`}
      >
        All Courses
      </button>

      <button
        onClick={() => setActiveTab('my')}
        className={`px-4 py-2 rounded-lg text-sm border ${
          activeTab === 'my'
            ? 'bg-primary text-white border-primary'
            : 'bg-surface border-border text-text-muted hover:text-text'
        }`}
      >
        My Courses
      </button>
    </div>
  );
};

export default CourseTabs;
