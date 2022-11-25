import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-2xl p-3 bg-slate-800 text-white h-full select-none">
      <LoadingSkeleton className="w-full h-[250px] object-cover rounded-xl mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton className="w-full h-5"></LoadingSkeleton>
        </h3>

        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSkeleton className="w-10 h-3"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-6 h-3"></LoadingSkeleton>
          </span>
        </div>

        <LoadingSkeleton className="w-full h-12 rounded-lg"></LoadingSkeleton>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
