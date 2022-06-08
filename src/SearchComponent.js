import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchComponent = ({ handleSubmit, searchTerm, setsearchTerm }) => {
  return (
    <form className="huge-form" onSubmit={handleSubmit}>
      <div className="some-form">
        <input
          type="text"
          className="form-input"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
