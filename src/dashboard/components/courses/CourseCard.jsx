const CourseCard = ({ course, isRegistered, onRegister, onDrop }) => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-5 flex flex-col justify-between">
      {/* Content */}
      <div>
        <p className="text-xs text-text-muted mb-1">{course.code}</p>

        <h3 className="font-semibold mb-2">{course.title}</h3>

        <p className="text-sm text-text-muted">{course.description}</p>
      </div>

      {/* Action */}
      <div className="mt-4">
        {isRegistered ? (
          <button
            onClick={() => onDrop(course.id)}
            className="w-full py-2 text-sm rounded-lg border border-border hover:bg-surface-hover"
          >
            Drop Course
          </button>
        ) : (
          <button
            onClick={() => onRegister(course.id)}
            className="w-full py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary-hover"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
