// src/api/MovieAPI.jsx
const apiKey = '05610017862c67bf8901d8212280511f';
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const animationsUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
const searchUrl = 'https://api.themoviedb.org/3/search/movie';
const tvShowsUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

const MovieAPI = {
  // Fetch general movies (paged)
  fetchMovies: async (page = 1) => {
    try {
      const response = await fetch(`${baseUrl}&page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  },

  // Fetch animations (paged)
  fetchAnimations: async (page = 1) => {
    try {
      const response = await fetch(`${animationsUrl}&page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching animations:', error);
    }
  },

  // Fetch trending movies of the week (paged)
  fetchTrending: async (page = 1) => {
    try {
      const response = await fetch(`${trendingUrl}&page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  },

  // Fetch popular TV shows (paged)
  fetchTVShows: async (page = 1) => {
    try {
      const response = await fetch(`${tvShowsUrl}&page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  },

  // Fetch movie genres
  fetchGenres: async () => {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      return data.genres; // returns an array of genres
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  },

  // Search movies by title
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(`${searchUrl}?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`);
      const data = await response.json();
      return data.results; // returns search results
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  },

  // Base URL for movie posters
  imageBaseUrl,
};

export default MovieAPI;
