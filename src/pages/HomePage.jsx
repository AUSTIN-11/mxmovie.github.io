import { useEffect, useState } from 'react';
// import SearchBar from '../components/SearchBar';
import MovieAPI from '../api/MovieAPI';

import MovieItem from '../components/MovieItem';

const styles = {
  container: {
    margin: 0,
    marginTop:'-20px',
    backgroundColor: 'aquamarine',
    padding: '0px',
  },
  header: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#00ced1',
    borderRadius: '8px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    margin: '0 5px',
    padding: '10px 15px',
    backgroundColor: '#00ced1',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log('dooooooo');
      const data = await MovieAPI.fetchMovies(currentPage);
console.log(data.results);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    };
    fetchMovies();
  }, [currentPage]);

  return (
    <div style={styles.container}>
      
      <h2 style={styles.header}>Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {movies.map(movie => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
      
      <div style={styles.pagination}>
        {currentPage > 1 && (
          <button
            style={styles.button}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            style={styles.button}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
