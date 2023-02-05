import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white select-none movie-card rounded-2xl bg-slate-800">
      <img
        src={tmdbAPI.imageW500(poster_path)}
        alt=""
        className="w-full h-[220px] lg:h-[250px] object-cover rounded-xl mb-4 lg:mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-2 text-lg font-bold lg:mb-3 lg:text-xl">{title}</h3>
        <div className="flex items-center justify-between mb-5 text-sm opacity-50 lg:mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button
          className="w-full"
          bgColor="primary"
          onClick={() => navigate(`/movies/${id}`)}
        >
          Watch now
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
export default MovieCard;
