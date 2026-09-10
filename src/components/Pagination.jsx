const Pagination = ({handlePagination, totalPage, page}) => {
  return (
    <div className="pagination">
      <button
        className={page > 1 ? "pagination__next" : "paginatin__disable"}
        onClick={() => handlePagination(page - 1)}
      >
        ◀️
      </button>
      {[...Array(totalPage)].map((_, i) => {
        return (
          <button
            className={`page__number ${page === i + 1 ? "--selected" : ""}`}
            onClick={() => handlePagination(i + 1)}
            key={i}
          >
            {i + 1}
          </button>
        );
      })}
      <button
        className={page < totalPage ? "pagination__next" : "paginatin__disable"}
        onClick={() => handlePagination(page + 1)}
      >
        ▶️
      </button>
    </div>
  );
};

export default Pagination;
