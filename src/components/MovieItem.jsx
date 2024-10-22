import { useState } from 'react';
import MovieAPI from '../api/MovieAPI';
import TrailerModal from './TrailerModal';

const styles = {
  movieCard: {
    margin: '20px',
    padding: '10px',
    height:'100',
    width: '200px',
    backgroundColor: 'white',
    borderRadius: '8px',
    textAlign: 'center',
  },
  poster: {
    width: '100%',
    borderRadius: '8px',
  },
  
  overview: {
    fontSize: '12px',
    color: '#777',
    height: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#00ced1',
    color: 'white',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

const MovieItem = ( { movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handlePlayTrailer = () => {
    setShowTrailer(true);
  };

  return (
    <div style={styles.movieCard}>
      <img
        src={movie.poster_path ? `${MovieAPI.imageBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/150x220?text=No+Image'}
        alt={movie.title}
        style={styles.poster}
      />
      <h2>{movie.title}</h2>
      <p style={styles.overview}>{movie.overview}</p>
      <button style={styles.button} onClick={handlePlayTrailer}>
        Play Trailer
      </button>
      {showTrailer && (
        <TrailerModal movieId={movie.id} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
};

export default MovieItem;
