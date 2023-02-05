import React, { Fragment } from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <Banner></Banner>
      <section className="pb-10 movies-layout lg:pb-14 page-container">
        <h2 className="mb-6 text-[22px] font-bold text-white capitalize lg:mb-10 lg:text-3xl">
          Now playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="pb-10 movies-layout lg:pb-14 page-container">
        <h2 className="mb-6 text-[22px] font-bold text-white capitalize lg:mb-10">
          Top rated movies
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="pb-10 movies-layout lg:pb-14 page-container">
        <h2 className="mb-6 text-[22px] font-bold text-white capitalize lg:mb-10">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
