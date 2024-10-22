// import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={styles.container}>
            <nav style={styles.nav}>
            <ul style={styles.navList}>
        <header style={styles.header}>
        <h1 style={styles.logo}>MyStream</h1></header>

      
        <li><Link to="/">Movies</Link></li>
        <li><Link to="/tv-shows">TV Shows</Link></li>
        <li><Link to="/animations">Animations</Link></li>
        <li><Link to="/trending">Trending</Link></li>
      </ul>
    </nav>
    </div>
  );
};

const styles = {
container:{
    fontFamily:'Geneva, sans-serif',
    BackgroundColor:'aquamarine',
},
header: {
    backgroundColor: '#00ced1',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    color: 'white',
  },
  logo: {
    fontSize: '24px',
  },
  nav: {
    backgroundColor: 'lightblue',
    padding: '10px',
    color: 'white',
    
  },
  navList: {
    gap: '20px',
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'space-around',
  },
};

export default Navbar;