import React from "react";
import "./Paginate.css";
const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <div className="pagination_data">
        {pageNumbers.map((number) => (
          <li key={number} className="page__item">
            <a
              onClick={() => paginate(number)}
              href="!#"
              className="page__link"
            >
              {number}
            </a>
          </li>
        ))}
      </div>
    </div>
  );
};
export default Pagination;
