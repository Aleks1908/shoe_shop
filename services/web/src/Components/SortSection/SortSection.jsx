/* eslint-disable react/prop-types */
import './sort_section.css'

export const SortSection = ({onSortClick}) => {
    const handleSortChange = (event) => {
    onSortClick(event.target.value);
  }
        

  return (
      <div className="sort_section">
    <select id="sort_options" onChange={handleSortChange}>
      <option value="">Sort by:</option>
      <option value="alphabetical">Alphabetical a-z</option>
      <option value="alphabetical-rev">Alphabetical z-a</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-des">Price (High to Low)</option>
    </select>
  </div>
  )
}