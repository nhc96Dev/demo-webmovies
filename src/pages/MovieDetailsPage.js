import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCardSkeleton from "../components/loading/MovieCardSkeleton";
import MovieCard from "../components/movie/MovieCard";
import MovieList from "../components/movie/MovieList";
import { fetcher, tmdbAPI } from "../config";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { title, poster_path, backdrop_path, genres, overview } = data;

  return (
    <div className="pb-10">
      <div className="w-full h-[400px] lg:h-[600px] relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-black overlay bg-opacity-60 rounded-2xl"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[200px] lg:h-[400px] max-w-[260px] lg:max-w-[800px] mx-auto -mt-[120px] lg:-mt-[200px] relative z-10 mb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-6 text-3xl font-bold text-center text-white lg:mb-10 lg:text-5xl">
        {title}
      </h1>
      {genres && genres.length > 0 && (
        <div className="flex flex-wrap items-center justify-center mb-6 lg:mb-10 gap-x-3 gap-y-3">
          {genres.map((item) => (
            <span
              className="border rounded px-[14px] py-[6px] lg:px-4 lg:py-2 border-primary text-primary whitespace-nowrap"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[800px] mx-auto mb-6 lg:mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

const MovieCredits = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);

  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  const moviesCast = cast.slice(0, 10);

  return (
    <div className="py-6 lg:py-10 page-container">
      <h2 className="mb-6 lg:mb-10 text-[22px] font-medium text-center lg:text-3xl">
        Casts
      </h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {moviesCast.length > 0 &&
            moviesCast.map((item) => (
              <SwiperSlide key={item.id}>
                <div key={item.id} className="cast-item rounded-xl">
                  <img
                    src={tmdbAPI.imageOriginal(item.profile_path)}
                    alt=""
                    className="w-full h-[220px] lg:h-[400px] object-cover rounded-xl mb-3"
                  />
                  <h3 className="text-lg font-medium lg:text-xl">
                    {item.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

const MovieVideos = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;

  return (
    <div className="py-6 lg:py-10 page-container">
      <div className="flex flex-col gap-5 lg:gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id}>
            <h3 className="inline-block px-3 py-2 mb-3 text-base font-medium lg:text-xl lg:p-3 lg:mb-5 bg-secondary">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="1280"
                height="725"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Youtube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MovieSimilar = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  const isLoading = !data;

  return (
    <div className="py-6 lg:py-10 page-container">
      <h2 className="mb-6 lg:mb-10 text-[22px] lg:text-3xl font-medium">
        Similar movies
      </h2>

      <div className="movie-list">
        {isLoading && (
          <>
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
            </Swiper>
          </>
        )}

        {!isLoading && (
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            {results.length > 0 &&
              results.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
