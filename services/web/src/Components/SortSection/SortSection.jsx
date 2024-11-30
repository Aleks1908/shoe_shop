/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import "./sort_section.css";
import { logoutUser } from "../Navigation/utils";
import { useState, useEffect } from "react";
import { getCookie } from "../Navigation/utils";

export const SortSection = ({ onSortClick }) => {
  const handleSortChange = (event) => {
    onSortClick(event.target.value);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [sessionID, setSessionID] = useState(null);

  useEffect(() => {
    const sessionCookie = getCookie("SessionID");
    setSessionID(sessionCookie);
  }, []);

  const handleCategoryClick = (category, description) => {
    // Include sessionID if needed
    console.log("SessionID:", sessionID);
    onCategoryClick(category, description);
  };

  return (
    <div className="sort_section">
      {isMobile && (
        <Fragment>
          {sessionID ? (
            <Fragment>
              {" "}
              <li className="category_option_desk">
                <a href="/register">REGISTER</a>
              </li>
              <li className="category_option_desk">
                <a href="/login">LOGIN</a>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="category_option_desk">
                <a href="" onClick={() => logoutUser(sessionID)}>
                  LOGOUT
                </a>
              </li>
            </Fragment>
          )}
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
