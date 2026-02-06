import { useEffect, useState } from 'react';
import CourseCard from '../components/courses/CourseCard';
import CourseTabs from '../components/courses/CourseTabs';
import CoursesSkeleton from '../skeletons/CoursesSkeleton';

const Courses = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Dummy courses (matches backend model)
  const [courses] = useState([
    {
      id: '1',
      code: 'CSC 471',
      title: 'Artificial Intelligence',
      description: 'Introduction to AI concepts and applications',
    },
    {
      id: '2',
      code: 'CSC 472',
      title: 'Robotics',
      description: 'Study of robots, automation, and control systems',
    },
    {
      id: '3',
      code: 'CSC 473',
      title: 'Computer Graphics',
      description: 'Rendering, modeling, and visual computing',
    },
  ]);

  // Dummy registered courses (student courses)
  const [registeredIds, setRegisteredIds] = useState(['2']);

  const [activeTab, setActiveTab] = useState('all');

  // Register course
  const registerCourse = id => {
    setRegisteredIds(prev => [...prev, id]);
  };

  // Drop course
  const dropCourse = id => {
    setRegisteredIds(prev => prev.filter(courseId => courseId !== id));
  };

  const displayedCourses =
    activeTab === 'my'
      ? courses.filter(c => registeredIds.includes(c.id))
      : courses;

  if (loading) {
    return <CoursesSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Courses</h1>
        <p className="text-text-muted">
          View and manage your registered courses
        </p>
      </div>

      {/* Tabs */}
      <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Courses */}
      {displayedCourses.length === 0 ? (
        <div className="rounded-2xl bg-surface border border-border p-6 text-sm text-text-muted">
          No courses found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isRegistered={registeredIds.includes(course.id)}
              onRegister={registerCourse}
              onDrop={dropCourse}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
