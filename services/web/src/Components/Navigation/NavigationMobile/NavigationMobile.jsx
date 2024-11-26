/* eslint-disable react/prop-types */
import { useState } from "react";
import logo from "../../../Assets/logo.png";
import "./navigation_mobile.css";
import { AiOutlineFilter } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import FilteringMenu from "../../FilterSection/FilteringMenu";
import { SortSection } from "../../SortSection/SortSection";
import { useLocation } from "react-router-dom";

export const NavigationMobile = ({ handleFilterClick, handleSortClick }) => {
  const [filterClass, setFilterClass] = useState("filter-not-visible");
  const [sortClass, setSortClass] = useState("sort-not-visible");
  const location = useLocation();

  console.log(location);

  const openFilter = () => {
    if (filterClass === "filter-visible") {
      setFilterClass("filter-not-visible");
      setSortClass("sort-not-visible");
    } else {
      setFilterClass("filter-visible");
      setSortClass("sort-not-visible");
    }
  };
  const openSort = () => {
    if (sortClass === "sort-visible") {
      setFilterClass("filter-not-visible");
      setSortClass("sort-not-visible");
    } else {
      setFilterClass("filter-not-visible");
      setSortClass("sort-visible");
    }
  };

  return (
    <div className="full_navigation">
      <div className="navigation">
        <div className="navigation_buttons">
          {location.pathname === "/" ? (
            <div onClick={openFilter} className="filterIcon">
              <AiOutlineFilter />
            </div>
          ) : (
            <div className="filterIcon"></div>
          )}
          <div className="title">
            <a href="/">
              <img src={logo} alt="" className="logo" />
            </a>
          </div>

          {location.pathname === "/" ? (
            <div onClick={openSort} className="sortIcon">
              <FiMenu />
            </div>
          ) : (
            <div className="filterIcon"></div>
          )}
        </div>

        {location.pathname === "/" && (
          <div className={filterClass}>
            <FilteringMenu onFilterClick={handleFilterClick} />
          </div>
        )}
        <div className={sortClass}>
          <SortSection onSortClick={handleSortClick} />
        </div>
      </div>
    </div>
  );
};
