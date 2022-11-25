import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import BannerSkeleton from "../loading/BannerSkeleton";

const Banner = () => {
  const { data: genresData } = useSWR(tmdbAPI.getGenreMovie, fetcher);
  const genres = genresData?.genres;

  const { data, error } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || {};

  return (
    <section className="banner h-[500px] mb-14 page-container overflow-hidden">
      {isLoading && <BannerSkeleton></BannerSkeleton>}

      {!isLoading && (
        <Swiper grabCursor={"true"} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <BannerItem item={item} genres={genres}></BannerItem>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </section>
  );
};

const BannerItem = ({ item, genres }) => {
  const navigate = useNavigate();
  const { title, backdrop_path, id, genre_ids } = item;

  return (
    <div className="w-full h-full rounded-2xl relative cursor-grab">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.3)] rounded-2xl"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className="w-full h-full object-cover rounded-2xl object-top"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>

        <GenresDetailsMovie
          genre_ids={genre_ids}
          genres={genres}
        ></GenresDetailsMovie>

        <Button bgColor="primary" onClick={() => navigate(`/movies/${id}`)}>
          Watch now
        </Button>
      </div>
    </div>
  );
};

const GenresDetailsMovie = ({ genre_ids, genres }) => {
  const genresArray = [];
  for (const genreId of genre_ids) {
    for (const genre of genres) {
      if (genreId === genre.id) {
        genresArray.push(genre.name);
      }
    }
  }
  return (
    <div className="flex items-center gap-x-3 mb-8">
      {genresArray.map((item, index) => (
        <span key={index} className="px-4 py-2 border border-white rounded-md">
          {item}
        </span>
      ))}
    </div>
  );
};

export default Banner;
