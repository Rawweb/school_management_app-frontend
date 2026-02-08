import studentImg from '../../assets/student.svg';

const WelcomeCard = () => {
  const storedStudent = localStorage.getItem('student');
  const student = storedStudent ? JSON.parse(storedStudent) : null;
  // Full readable date
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary p-6 md:p-8 text-white">
      <div className="relative z-10 flex items-center justify-between">
        {/* LEFT */}
        <div className="max-w-2xl space-y-1">
          {/* Date */}
          <span className="text-xs text-white/70">{today}</span>

          {/* Greeting */}
          <h2 className="text-2xl  md:text-3xl font-semibold flex items-center gap-1">
            Welcome back, {student.name}!
          </h2>

          {/* Student info */}
          <div className="text-sm text-white/70 flex items-center gap-2">
            <p>
              <span className="font-medium">{student.matricNumber}</span>
            </p>
            <p>
              <span className="font-medium">{student.email}</span>
            </p>
          </div>

          {/* Description */}
          <p className="pt-2 text-sm md:text-base text-white/70">
            View your courses, take quizzes, and track your progress.
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-end">
          <img
            src={studentImg}
            alt="Student illustration"
            className="h-36 lg:h-40 w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
