import "./description_section.css";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const DescriptionSection = ({
  selectedDescription,
  selectedCategory,
}) => {
  return (
    <div className="description_section">
      <h1>{capitalizeFirstLetter(selectedCategory)}</h1>
      <div className="description_section--container">
        <p>{selectedDescription}</p>
      </div>
    </div>
  );
};
