import logo from '../assets/images/logo-black.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LogoIcon } from './icons/icons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="header">
        <div className="header__content">
          <div className="header__logo">
            <Link to="/characters">
              <LogoIcon />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav nav">
              <li className="nav__menu-item"><Link to="/characters">Characters</Link></li>
              <li className="nav__menu-item"><Link to="/locations">Locations</Link></li>
              <li className="nav__menu-item"><Link to="/episodes">Episodes</Link></li>
            </ul>
          </nav>
          <button className={`burger-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <nav className={`header__nav mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul className="header__nav mobile-menu__items">
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li><Link to="/episodes">Episodes</Link></li>
        </ul>
      </nav>
    </>
  );
}