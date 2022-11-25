import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

const itemsPerPage = 20;
const Pagination = ({ data, setMoviePage }) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data?.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.total_results;
    setItemOffset(newOffset);
    setMoviePage(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      className="pagination"
    />
  );
};

Pagination.propTypes = {
  data: PropTypes.object,
  setMoviePage: PropTypes.func,
};

export default Pagination;
