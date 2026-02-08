import { useState, useEffect } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import ThemeToggle from '../ui/ThemeToggle';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 font-semibold transition-all duration-300
        ${
          scrolled
            ? 'bg-bg/80 backdrop-blur border-b border-border shadow-sm'
            : ''
        }
      `}
    >
      <div className="container flex gap-4 items-center justify-between h-24">
        {/* logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <img
            src={logo}
            alt="School Logo"
            className="h-7 w-7 group-hover:scale-110 transition-transform"
          />
          <h1 className="font-bold text-primary text-xl group-hover:text-primary-hover">
            CampusHub
          </h1>
        </div>

        {/* desktop navigations */}
        <div className="hidden md:flex gap-4 lg:gap-10">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-text-muted hover:text-text transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* login button */}
          <Link
            to="/login"
            className="hidden md:block bg-primary text-white px-4 py-2 hover:bg-primary-hover transition-colors"
          >
            Login
          </Link>

          {/* theme toggle */}
          <ThemeToggle />

          {/* mobile menu button */}
          <button
            className="md:hidden text-text hover:text-primary-hover"
            onClick={() => setIsOpen(prev => !prev)}
          >
            {isOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
          </button>
        </div>
      </div>

      {/* mobile navigations */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-6 px-6 py-6 bg-bg border-b border-border">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-muted hover:text-text transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* mobile login button */}
          <Link
            to="/login"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
