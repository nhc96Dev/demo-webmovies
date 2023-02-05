import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

const itemsPerPage = 20;
const Pagination = ({ data, setMoviePage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data?.total_results / itemsPerPage));
  }, [data, itemOffset]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [itemOffset]);

  const handlePageClick = (event) => {
    setMoviePage(event.selected + 1);
    const newOffset = (event.selected * itemsPerPage) % data?.total_results;
    setItemOffset(newOffset);
  };

  if (!data?.total_results) return null;
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className="pagination"
      activeLinkClassName="text-primary font-bold"
      marginPagesDisplayed={1}
      forcePage={itemOffset / itemsPerPage}
    />
  );
};

Pagination.propTypes = {
  data: PropTypes.object,
  setMoviePage: PropTypes.func,
};

export default Pagination;
