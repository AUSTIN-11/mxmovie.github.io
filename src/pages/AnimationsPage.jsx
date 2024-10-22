import { useEffect, useState } from 'react';
import MovieAPI from '../api/MovieAPI';
import MovieItem from '../components/MovieItem';

const styles = {
  container: {
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


const AnimationsPage = () => {
  const [animations, setAnimations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAnimations = async () => {
      const data = await MovieAPI.fetchAnimations(currentPage);
      setAnimations(data.results);
      setTotalPages(data.total_pages);
    };
    fetchAnimations();
  }, [currentPage]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Animations</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {animations.map(animation => (
          <MovieItem key={animation.id} movie={animation} />
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

export default AnimationsPage;
