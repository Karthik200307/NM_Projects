import React, { useRef } from 'react';
import './Header.css';

const Header = () => {
  // Create a reference for the Explore Menu section
  const menuRef = useRef(null);

  const scrollToMenu = () => {
    // Scroll to the Explore Menu section
    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similar pain, it dictates what is rightfully owed in the architecture.</p>
        {/* Button that will scroll to the menu */}
        <button onClick={scrollToMenu}>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
