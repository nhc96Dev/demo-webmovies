export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "6e1723fb3ef14dae3303742c9589daa3";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  getGenreMovie: () =>
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
  imageOriginal: (path) => `https://image.tmdb.org/t/p/original/${path}`,
  imageW500: (path) => `https://image.tmdb.org/t/p/w500/${path}`,
};
