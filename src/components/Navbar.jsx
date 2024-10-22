// import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#00ced1',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/animations" style={styles.link}>Animations</Link>
      <Link to="/tv-shows" style={styles.link}>TV Shows</Link>
      <Link to="/trending" style={styles.link}>Trending</Link>
    </div>
  );
};

export default Navbar;
