import React from "react";
import Navbar from "./components/Navbar";
import ProductCatalog from "./components/ProductCatalog";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="mb-8">
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1543285198-3af15c4592ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMkJzaG9wcGluZyUyQmhlcm8lMkJpbWFnZSUyQndpdGglMkJvdmVybGFpZCUyQnRleHR8ZW58MHx8fHwxNzQ3ODE2NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="modern shopping hero image with overlaid text" />
              </div>
              <div className="relative bg-gray-900 bg-opacity-75 py-12 px-6 sm:py-16 sm:px-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                    Welcome to Our Store
                  </h1>
                  <p className="text-lg text-gray-300 mb-8">
                    Discover our curated collection of premium products
                  </p>
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(0 256) rotate(-90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 112 96 160 144 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "Electronics",
                  image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyQmNhdGVnb3J5JTJCdGh1bWJuYWlsfGVufDB8fHx8MTc0NzgxNjUzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
                  count: "24 items"
                },
                {
                  name: "Clothing",
                  image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyQmNhdGVnb3J5JTJCdGh1bWJuYWlsfGVufDB8fHx8MTc0NzgxNjUzNXww&ixlib=rb-4.1.0&q=80&w=1080",
                  count: "18 items"
                },
                {
                  name: "Accessories",
                  image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxhY2Nlc3NvcmllcyUyQmNhdGVnb3J5JTJCdGh1bWJuYWlsfGVufDB8fHx8MTc0NzgxNjUzNnww&ixlib=rb-4.1.0&q=80&w=1080",
                  count: "12 items"
                },
                {
                  name: "Home & Kitchen",
                  image: "https://images.unsplash.com/photo-1522444195799-478538b28823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxob21lJTJCYW5kJTJCa2l0Y2hlbiUyQmNhdGVnb3J5JTJCdGh1bWJuYWlsfGVufDB8fHx8MTc0NzgxNjUzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
                  count: "15 items"
                }
              ].map((category, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-300">{category.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Product Catalog */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">View:</span>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="48" width="160" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="48" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="48" y1="128" x2="208" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="128" x2="104" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="192" x2="120" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="184" cy="144" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="206.63" y1="166.63" x2="232" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
              </div>
            </div>
            <ProductCatalog />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white mt-12">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Shipping Info
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Newsletter
                </h3>
                <p className="mt-4 text-base text-gray-500">
                  Subscribe to get updates on new products and special offers.
                </p>
                <form className="mt-4">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-base text-gray-400 text-center">
                © 2023 Your Store. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default App;
