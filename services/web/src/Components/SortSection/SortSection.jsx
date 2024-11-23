/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import "./sort_section.css";

export const SortSection = ({ onSortClick }) => {
  const handleSortChange = (event) => {
    onSortClick(event.target.value);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <div className="sort_section">
      {isMobile && (
        <Fragment>
          {" "}
          <li className="category_option_desk">
            <a href="/register">REGISTER</a>
          </li>
          <li className="category_option_desk">
            <a href="/login">LOGIN</a>
          </li>
        </Fragment>
      )}

      <select id="sort_options" onChange={handleSortChange}>
        <option value="">Sort by:</option>
        <option value="alphabetical">Alphabetical a-z</option>
        <option value="alphabetical-rev">Alphabetical z-a</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-des">Price (High to Low)</option>
      </select>
    </div>
  );
};
