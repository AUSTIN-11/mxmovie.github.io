import { useEffect, useState } from 'react';

const styles = {
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  },
  content: {
    width: '80%',
    maxWidth: '800px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
  },
  videoPlayer: {
    width: '100%',
    height: '450px',
  },
  closeButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=05610017862c67bf8901d8212280511f`
        );
        const data = await response.json();
        const trailer = data.results.find((video) => video.type === 'Trailer');
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };
    fetchTrailer();
  }, [movieId]);


  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.content} onClick={(e) => e.stopPropagation()}>
        {trailerUrl ? (
          <iframe
            title="Movie Trailer"
            src={trailerUrl}
            style={styles.videoPlayer}
            allowFullScreen
          ></iframe>
        ) : (
          <p>Trailer not available.</p>
        )}
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TrailerModal;



 