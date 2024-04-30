// ProductPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Handle adding product to cart
  };

  return (
    <div className="container mx-auto mt-8">
        <button onClick={() => navigate(-1)} className="text-blue-600 mb-0-8">Back to Home Page</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Image */}
        <div className="md:order-2">
          <img
            src="https://via.placeholder.com/400"
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
        </div>
        {/* Product Details */}
        <div className="md:order-1">
          <h1 className="text-3xl font-bold mb-4">Product Name</h1>
          <p className="text-gray-600 mb-4">Product Description</p>
          <span className="text-gray-600 mb-4">in stock : 100</span>
          <div className="flex items-center mb-4">
            <button
              onClick={handleDecreaseQuantity}
              className="bg-gray-300 px-3 py-1 rounded-full mr-2"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="bg-gray-300 px-3 py-1 rounded-full ml-2"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
