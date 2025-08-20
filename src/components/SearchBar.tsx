import React from "react";
import { useProducts } from "../hooks/useProducts";

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm, sortOrder, setSortOrder } = useProducts();

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4 justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded flex-1"
      />
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className="border p-2 rounded">
        <option value="asc">Title Ascending</option>
        <option value="desc">Title Descending</option>
      </select>
    </div>
  );
};

export default SearchBar;
