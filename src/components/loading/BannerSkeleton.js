import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const BannerSkeleton = () => {
  return (
    <div className="w-full h-full rounded-2xl relative cursor-grab">
      <LoadingSkeleton className="w-full h-full object-cover rounded-2xl"></LoadingSkeleton>
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">
          <LoadingSkeleton className="w-60 h-12"></LoadingSkeleton>
        </h2>

        <div className="flex items-center gap-x-3 mb-8">
          <span>
            <LoadingSkeleton className="w-20 h-10 rounded-lg"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-20 h-10 rounded-lg"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-20 h-10 rounded-lg"></LoadingSkeleton>
          </span>
        </div>

        <LoadingSkeleton className="w-32 h-12 rounded-lg"></LoadingSkeleton>
      </div>
    </div>
  );
};

export default BannerSkeleton;
