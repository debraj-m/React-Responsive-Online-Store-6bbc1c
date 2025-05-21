import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(item.id, newQuantity);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="42.34" y1="42.34" x2="213.66" y2="213.66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            onClick={handleDecrement}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center border-none focus:ring-0 focus:outline-none p-0 text-gray-900"
          />
          <button
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>

        <p className="text-sm font-medium text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleRemove}
          className="text-sm font-medium text-red-600 hover:text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;