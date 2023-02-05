import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import BackToTopButton from "../components/BackToTopButton";
import MovieCardSkeleton from "../components/loading/MovieCardSkeleton";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import Pagination from "../utils/Pagination";

const MoviePage = () => {
  const [moviePage, setMoviePage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", moviePage));

  const inputRef = useRef();
  const handleClickSearchMovie = () => {
    setFilter(inputRef.current.value);
    setMoviePage(1);
  };
  const handleEnterSearchMovie = (e) => {
    if (e.key === "Enter") {
      setFilter(e.target.value);
      setMoviePage(1);
    }
  };

  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;
  useEffect(() => {
    if (filter) {
      setUrl(tmdbAPI.getMovieSearch(filter, moviePage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", moviePage));
    }
  }, [filter, moviePage]);
  const movies = data?.results || [];

  return (
    <div className="pb-10 page-container">
      <div className="flex mb-[30px] lg:mb-10">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            className="w-full p-3 text-white outline-none rounded-l-md lg:p-4 bg-slate-800"
            placeholder="Type here to search..."
            onKeyDown={handleEnterSearchMovie}
            defaultValue={filter}
          />
        </div>
        <button
          onClick={handleClickSearchMovie}
          className="px-3 text-white rounded-r-md lg:px-4 bg-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-[30px] lg:gap-10 lg:grid-cols-4">
          {new Array(20).fill(0).map((item, index) => (
            <MovieCardSkeleton key={index}></MovieCardSkeleton>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-[30px] lg:gap-10 lg:grid-cols-4">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-6 lg:mt-10">
        <Pagination data={data} setMoviePage={setMoviePage}></Pagination>
      </div>

      <BackToTopButton></BackToTopButton>
    </div>
  );
};

export default MoviePage;
