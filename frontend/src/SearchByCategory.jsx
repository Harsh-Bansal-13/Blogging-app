import React, { useState } from "react";

const SearchByCategory = ({ handleSearch }) => {
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(category);
    setCategory(""); // Optional: Clear input after search
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by category"
          value={category}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchByCategory;
