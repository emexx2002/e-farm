// CartPage.tsx
const CartPage = () => {
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Card */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="w-20 h-20 object-cover rounded-lg mx-auto mb-4"
            />
            <div className="text-center mb-2">Product Name</div>
            <div className="text-center text-gray-600">Price: $10</div>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Remove
              </button>
            </div>
          </div>
          {/* Repeat the above product card for each product in the cart */}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <span className="text-lg font-bold">Total:</span> $50
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    );
  };
  
  export default CartPage;
  