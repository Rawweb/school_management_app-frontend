import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex items-center justify-center border border-border bg-surface p-2 text-text hover:bg-bg transition"
    >
      {theme === 'dark' ? (
        <FiSun className="size-5" />
      ) : (
        <FiMoon className="size-5" />
      )}
    </button>
  );
}
