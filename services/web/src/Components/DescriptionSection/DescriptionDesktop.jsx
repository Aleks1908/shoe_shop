/* eslint-disable react/prop-types */
import './description_section.css'

export const DescriptionSection = ({ selectedDescription, selectedCategory }) => {
    return (
      <div className="description_section">
        <h1>You are viewing {selectedCategory} category</h1>
        <p>{selectedDescription}</p>
      </div>
    );
  };