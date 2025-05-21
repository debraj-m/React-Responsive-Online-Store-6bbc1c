import React, { useState, useEffect } from "react";
import { categories } from "../data/products";

const FilterPanel = ({ 
  onCategoryChange, 
  onPriceChange, 
  onSortChange,
  onSearchChange,
  onStockChange,
  selectedCategory = "all",
  priceRange = [0, 1000],
  sortOption = "default",
  searchQuery = "",
  inStockOnly = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [minPrice, maxPrice] = priceRange;

  useEffect(() => {
    // Update local price state when props change
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handlePriceChange = (e, index) => {
    const newRange = [...localPriceRange];
    newRange[index] = Number(e.target.value);
    setLocalPriceRange(newRange);
  };

  const handlePriceApply = () => {
    onPriceChange(localPriceRange);
  };

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const clearFilters = () => {
    onCategoryChange("all");
    onPriceChange([0, 1000]);
    onSortChange("default");
    onSearchChange("");
    onStockChange(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      {/* Search Bar - Always Visible */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
        </div>
      </div>

      {/* Filter Toggle Button */}
      <div className="px-4 pb-2 flex justify-between items-center">
        <button
          onClick={toggleFilter}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </span>
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-blue-600"
        >
          Clear All
        </button>
      </div>

      {/* Expandable Filter Options */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    id={`category-${category.id}`}
                    name="category"
                    type="radio"
                    checked={selectedCategory === category.id}
                    onChange={() => onCategoryChange(category.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-3 text-sm text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1">
                <label htmlFor="min-price" className="sr-only">
                  Minimum Price
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="min-price"
                    className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Min"
                    value={localPriceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                  />
                </div>
              </div>
              <span className="text-gray-500">-</span>
              <div className="flex-1">
                <label htmlFor="max-price" className="sr-only">
                  Maximum Price
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="max-price"
                    className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Max"
                    value={localPriceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500">
                ${localPriceRange[0]}
              </span>
              <input
                type="range"
                min="0"
                max="1000"
                value={localPriceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="flex-1 mx-2 h-2 rounded-lg appearance-none bg-blue-200"
              />
              <span className="text-xs text-gray-500">
                ${localPriceRange[1]}
              </span>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePriceApply}
                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
            <select
              className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="default">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>

          {/* In Stock Only */}
          <div className="flex items-center">
            <input
              id="in-stock-only"
              name="in-stock-only"
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onStockChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="in-stock-only"
              className="ml-2 text-sm text-gray-700"
            >
              In Stock Only
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;