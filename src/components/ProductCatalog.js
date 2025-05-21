import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import FilterPanel from "./FilterPanel";
import { products } from "../data/products";

const ProductCatalog = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLayout, setCurrentLayout] = useState("grid"); // grid or list

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter and sort products when filters change
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, sortOption, searchQuery, inStockOnly]);

  // Memoized filter function
  const filterProducts = useMemo(() => {
    return () => {
      let result = [...products];

      // Filter by category
      if (selectedCategory !== "all") {
        result = result.filter(product => product.category === selectedCategory);
      }

      // Filter by price range
      result = result.filter(
        product => product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Filter by stock status
      if (inStockOnly) {
        result = result.filter(product => product.inStock);
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
      }

      // Sort products
      switch (sortOption) {
        case "price-low-high":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          result.sort((a, b) => b.price - a.price);
          break;
        case "name-a-z":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-z-a":
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // Default sorting (featured)
          break;
      }

      setFilteredProducts(result);
    };
  }, [selectedCategory, priceRange, sortOption, searchQuery, inStockOnly]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleStockChange = (checked) => {
    setInStockOnly(checked);
  };

  const toggleLayout = () => {
    setCurrentLayout(currentLayout === "grid" ? "list" : "grid");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar / Filter Panel */}
        <div className="w-full md:w-1/4">
          <FilterPanel
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
            onStockChange={handleStockChange}
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            sortOption={sortOption}
            searchQuery={searchQuery}
            inStockOnly={inStockOnly}
          />
        </div>

        {/* Product Listing */}
        <div className="w-full md:w-3/4">
          {/* Layout toggle and product count */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
            <div className="flex space-x-2">
              <button
                onClick={toggleLayout}
                className={`p-2 rounded ${
                  currentLayout === "grid"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
                title="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="48" width="160" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="48" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="48" y1="128" x2="208" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </button>
              <button
                onClick={toggleLayout}
                className={`p-2 rounded ${
                  currentLayout === "list"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
                title="List View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="104" y1="104" x2="104" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="32" y1="104" x2="224" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded mt-4"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            // No results found
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="96" height="96"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h2>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 1000]);
                  setSortOption("default");
                  setSearchQuery("");
                  setInStockOnly(false);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            // Product Grid/List
            <div
              className={
                currentLayout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={currentLayout === "list" && "bg-white rounded-lg shadow-md overflow-hidden"}
                >
                  {currentLayout === "grid" ? (
                    <ProductCard product={product} />
                  ) : (
                    <div className="flex">
                      <div className="w-1/3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-48 w-full object-cover object-center"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center mb-2">
                              <span className="text-lg font-bold text-gray-900 mr-2">
                                ${product.price.toFixed(2)}
                              </span>
                              <div className="flex items-center">
                                <div className="flex items-center mr-2">
                                  <span className="text-yellow-400">★</span>
                                  <span className="ml-1 text-sm text-gray-600">
                                    {product.rating}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  ({product.reviews} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          {product.inStock ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              In Stock
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              Out of Stock
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <button
                          disabled={!product.inStock}
                          className={`px-4 py-2 rounded-md text-white font-medium ${
                            product.inStock
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-300 cursor-not-allowed"
                          }`}
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;