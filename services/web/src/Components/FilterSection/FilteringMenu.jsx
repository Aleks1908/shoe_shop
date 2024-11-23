/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./filtering_menu.css";

const ColorCircle = ({ color, hexcolor, onClick, selected }) => {
  const handleColorClick = () => {
    onClick(color, hexcolor);
  };

  return (
    <div
      className={`color_option${selected ? " selected" : ""}`}
      style={{ backgroundColor: hexcolor }}
      onClick={handleColorClick}
    />
  );
};

const FilteringMenu = ({ onFilterClick }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedHexColor, setSelectedHexColor] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  useEffect(() => {
    handleFilterClick(); // Automatically trigger filtering on page load
  }, []);

  useEffect(() => {
    handleFilterClick(); // Automatically trigger filtering when color changes
  }, [selectedColor]);

  useEffect(() => {
    handleFilterClick(); // Automatically trigger filtering when price changes
  }, [minPrice, maxPrice]);

  const handleFilterClick = () => {
    onFilterClick(selectedColor, minPrice, maxPrice);
  };

  const handleColorClick = (color, hexcolor) => {
    setSelectedColor(color);
    setSelectedHexColor(hexcolor);
  };

  const handleResetFilters = () => {
    setSelectedColor("");
    setSelectedHexColor("");
    setMinPrice(0);
    setMaxPrice(200);
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = e.target.value ? Number(e.target.value) : "";

    if (newMinPrice === "") {
      setMinPrice(newMinPrice);
    } else if (newMinPrice >= maxPrice - priceGap) {
      setMinPrice(maxPrice - priceGap);
    } else if (newMinPrice < 0) {
      setMinPrice(0);
    } else {
      setMinPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = e.target.value ? Number(e.target.value) : ""; // Handle empty input

    if (newMaxPrice === "") {
      setMaxPrice(newMaxPrice);
    } else if (newMaxPrice <= minPrice + priceGap) {
      setMaxPrice(minPrice + priceGap);
    } else if (newMaxPrice > rangeInputMax) {
      setMaxPrice(rangeInputMax);
    } else {
      setMaxPrice(newMaxPrice);
    }
  };

  const rangeInputMax = 200;
  const priceGap = 1;

  const calculateRangeLeft = () => {
    return (minPrice / rangeInputMax) * 100 + "%";
  };

  const calculateRangeRight = () => {
    return 100 - (maxPrice / rangeInputMax) * 100 + "%";
  };

  return (
    <div className="filter_menu">
      <div className="color_menu">
        <div className="filter_title">
          <p>Filter by Color</p>
        </div>
        <div className="color_selection">
          <ColorCircle
            color="white"
            hexcolor="#b3b3b3"
            onClick={handleColorClick}
            selected={selectedHexColor === "#b3b3b3"}
          />
          <ColorCircle
            color="red"
            hexcolor="#db362a"
            onClick={handleColorClick}
            selected={selectedHexColor === "#db362a"}
          />
          <ColorCircle
            color="orange"
            hexcolor="#d47c17"
            onClick={handleColorClick}
            selected={selectedHexColor === "#d47c17"}
          />
          <ColorCircle
            color="yellow"
            hexcolor="#f0de3e"
            onClick={handleColorClick}
            selected={selectedHexColor === "#f0de3e"}
          />
          <ColorCircle
            color="green"
            hexcolor="#32c21f"
            onClick={handleColorClick}
            selected={selectedHexColor === "#32c21f"}
          />
          <ColorCircle
            color="blue"
            hexcolor="#1063e0"
            onClick={handleColorClick}
            selected={selectedHexColor === "#1063e0"}
          />
          <ColorCircle
            color="indigo"
            hexcolor="#330099"
            onClick={handleColorClick}
            selected={selectedHexColor === "#330099"}
          />
          <ColorCircle
            color="violet"
            hexcolor="#9410e0"
            onClick={handleColorClick}
            selected={selectedHexColor === "#9410e0"}
          />
          <ColorCircle
            color="black"
            hexcolor="#000"
            onClick={handleColorClick}
            selected={selectedHexColor === "#000"}
          />
        </div>
      </div>
      <div className="price_menu">
        <div className="filter_title">
          <p>Filter by Price</p>
        </div>
        <div className="price_input">
          <div className="field">
            <input
              type="number"
              className="input_min"
              name="minPrice"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
          <div className="field">
            <input
              type="number"
              className="input_max"
              name="maxPrice"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <div className="slider">
          <div
            className="progress"
            style={{ left: calculateRangeLeft(), right: calculateRangeRight() }}
          ></div>
          <div className="range_input">
            <input
              type="range"
              className="range_min"
              max={rangeInputMax}
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type="range"
              className="range_max"
              max={rangeInputMax}
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <div className="reset_button">
          <button onClick={handleResetFilters}>Reset Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilteringMenu;
