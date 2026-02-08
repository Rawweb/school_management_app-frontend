import { useEffect, useState } from 'react';
import CourseCard from '../components/courses/CourseCard';
import CourseTabs from '../components/courses/CourseTabs';
import CoursesSkeleton from '../skeletons/CoursesSkeleton';
import api from '../../api/axios';

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [registeredIds, setRegisteredIds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError('');

        const [coursesRes, registeredRes] = await Promise.all([
          api.get('/courses'),
          api.get('/courses/registered'),
        ]);

        if (ignore) return;

        const normalizedCourses = (coursesRes.data || []).map(course => ({
          ...course,
          id: course._id,
        }));

        const registeredCourseIds = (registeredRes.data || []).map(
          course => course._id
        );

        setCourses(normalizedCourses);
        setRegisteredIds(registeredCourseIds);
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || err.message || 'Server error');
        }
        console.error('Courses fetch error', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchCourses();

    return () => {
      ignore = true;
    };
  }, []);

  const [activeTab, setActiveTab] = useState('all');

  // Register course
  const registerCourse = async id => {
    try {
      const res = await api.post('/courses/register', { courseId: id });
      const registeredId = res.data?._id || id;

      setRegisteredIds(prev =>
        prev.includes(registeredId) ? prev : [registeredId, ...prev]
      );

      setCourses(prev =>
        prev.some(course => course.id === registeredId)
          ? prev
          : [{ ...res.data, id: registeredId }, ...prev]
      );
    } catch (err) {
      console.error('Register course error', err);
      setError(err.response?.data?.message || err.message || 'Server error');
    }
  };

  // Drop course
  const dropCourse = async id => {
    try {
      await api.delete(`/courses/drop/${id}`);
      setRegisteredIds(prev => prev.filter(courseId => courseId !== id));
    } catch (err) {
      console.error('Drop course error', err);
      setError(err.response?.data?.message || err.message || 'Server error');
    }
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

      {error && (
        <div className="rounded-2xl bg-surface border border-border p-4 text-sm text-red-500">
          {error}
        </div>
      )}

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
