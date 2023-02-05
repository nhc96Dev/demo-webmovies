import React, { useEffect, useRef, useState } from "react";
import MovieCardSkeleton from "../components/loading/MovieCardSkeleton";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useSWRInfinite from "swr/infinite";
import Button from "../components/button/Button";

const itemPerPage = 20;
const MoviePageV2 = () => {
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

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data
    ? data.reduce((preValue, curValue) => preValue.concat(curValue.results), [])
    : [];
  const isLoading = !data && !error;

  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemPerPage);
  console.log("MoviePageV2 ~ isReachingEnd", isReachingEnd);

  useEffect(() => {
    if (filter) {
      setUrl(tmdbAPI.getMovieSearch(filter, moviePage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", moviePage));
    }
  }, [filter, moviePage]);

  return (
    <div className="pb-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search..."
            onKeyDown={handleEnterSearchMovie}
            defaultValue={filter}
          />
        </div>
        <button
          onClick={handleClickSearchMovie}
          className="p-4 text-white bg-primary"
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
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemPerPage).fill(0).map((item, index) => (
            <MovieCardSkeleton key={index}></MovieCardSkeleton>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button
          bgColor="secondary"
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-500" : ""}`}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePageV2;
