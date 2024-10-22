 import { createContext, useState, useEffect } from 'react';
import { fetchMovies, fetchGenres, fetchTrailer, } from '../api/MovieAPI';

export const MovieContext = createContext();

export const MovieProvider = ( children ) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data.genres));
   searchMovies();
  }, []);

  const searchMovies = (query = '') => {
    fetchMovies(query).then((data) => setMovies(data.results));
  };

  const showSuggestions = (query) => {
    if (query.length > 2) {
      fetchMovies(query).then((data) => setSuggestions(data.results));
    } else {
      setSuggestions([]);
    }
  };

  const playTrailer = (movieId) => {
    fetchTrailer(movieId).then((data) => {
      const trailer = data.results.find((video) => video.type === 'Trailer');
      if (trailer) {
        setCurrentTrailer(trailer.key);
      }
    });
  };

  return (
    <MovieContext.Provider
      value={{ movies, genres, currentTrailer, searchMovies, showSuggestions, playTrailer, suggestions }}
    >
        {children}   
    </MovieContext.Provider>
  );
};
 