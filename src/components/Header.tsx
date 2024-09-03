import { useTheme } from "@config/ThemeContext";
import MoonIcon from '@icons/moon.svg';
import ResetIcon from '@icons/refresh.svg';
import SunIcon from '@icons/sun.svg';
import ToggleIcon from '@icons/toggle.svg';
import Image from 'next/image';
import { useState } from 'react';
import Download from "./Download";

interface HeaderProps {
  content:string;
  reset:()=> void;
}

const Header: React.FC<HeaderProps> = ({content, reset}) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className={`py-4 ${
        theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
      }`}
    >
      <div className="flex items-center justify-between px-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center space-x-7">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              quality={75}
            />
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <ToggleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Translation and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md flex items-center space-x-2 hidden md:block"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <MoonIcon />
            ) : (
              <SunIcon />
            )}
          </button>
           <button
          onClick={reset}

        >
         <ResetIcon/>
        </button>
          {/* <button className="hidden md:block">EN</button>
          <button className="hidden md:block">ES</button> */}
          <Download content={content} />
        </div>
      </div>
    </header>
  );
};

export default Header;
