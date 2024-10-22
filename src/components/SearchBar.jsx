import { useEffect, useState } from 'react';
import TrailerModal from './TrailerModal';
import MovieAPI from '../api/MovieAPI';
import MovieItem from './MovieItem';

const SearchBar = ({setSearchValue}) => {
  const apiKey = '05610017862c67bf8901d8212280511f'; // Move to a config file if necessary
  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  const searchUrl = 'https://api.themoviedb.org/3/search/movie';
  const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrailer, setShowTrailer] =useState(false);
  const [genre, setGenre] = useState('');
  const [currentPage, ] = useState(1);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch genres and initial movies
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      let url = `${baseUrl}&page=${currentPage}`;
      if (searchQuery) {
        url = `${searchUrl}?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
      }
      if (genre) {
        url += `&with_genres=${genre}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearchInput = async (event) => {
    const query = event.target.value.trim();
    setSearchValue(query);
    setSearchQuery(query);
    if (query.length > 2) {
        fetchMovies();
      const response = await fetch(`${searchUrl}?api_key=${apiKey}&query=${query}`);
      const data = await response.json();
      setSuggestions(data.results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
    setSuggestions([]); // Clear suggestions on search
  };

  const handleSuggestionClick = (movie) => {
    setSearchQuery(movie.title);
    setSuggestions([]);
    fetchMovies();
  };

  
  const handlePlayTrailer = () => {
    setShowTrailer(true);
  };

  return (
    <div style={styles.container}>
      <section style={styles.searchBar}>
      <form onSubmit={handleSearchSubmit} style={styles.searchBar}>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} style={styles.select}>
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          placeholder="Search for movies..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
      </section>
      {suggestions.length > 0 && (
        <ul style={styles.suggestionsList}>
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              style={styles.suggestionItem}
              onClick={() => handleSuggestionClick(movie)}
            >
               
              <img src={movie.poster_path ? `${MovieAPI.imageBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/150x220?text=No+Image'}
               alt={movie.title}
               style={styles.suggestionsImage} />
              {movie.title}
            </li>
          ))}
        </ul>
      )}
      <div>
      
        {movies.length > 0 && (
       
       <div style={styles.resultsContainer}>
       {/* <h2 className='results'  style={styles.results}>Search Results:</h2>      */}
            {
              movies?.map((movie) => {
                return  <MovieItem  key={movie.id} movie={movie} />
              })
            }
            
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  moviesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    // gap: '20px',
    justifyContent: 'center',
  },
  movieItem: {
    width: '250px',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  movieImage: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  overview: {
    fontSize: '12px',
    color: '#777',
    height: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  videoPlayer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  trailer: {
    width: '800px',
    height: '450px',
  },
 
  container: { 
    padding: '0px',
    marginTop: '-20px',
    backgroundColor: 'aquamarine',
    borderRadius: '8px',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  select: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  input: {
    marginRight: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    
  },
  button: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  suggestionsList: {
    marginTop: '10px',
    padding: '0',
    listStyleType: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  suggestionsImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    
  },
  suggestionItem: {
    padding: '5px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  resultsContainer: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  movieCard: {
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
    gap: '10px',
    position: 'relative',
  },
  
};
   // <div key={movie.id} style={styles.moviesGrid}>
              //   <div style={styles.movieItem}>
              //   <img src={movie.poster_path ? `${MovieAPI.imageBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/150x220?text=No+Image'}
              //  alt={movie.title}
              //  style={styles.movieImage} />

              //   <h3>{movie.title}</h3>
              //   <p style={styles.overview}> {movie.overview}</p>
              //   <p>Rating: {movie.vote_average}</p>
              //   <button style={styles.button} onClick={handlePlayTrailer}>
              //   Play Trailer
              //   </button>
              //   {showTrailer && (
              //   <TrailerModal movieId={movie.id} onClose={() => setShowTrailer(false)} />
              //   )}
              //   </div>
              // </div>
export default SearchBar;
