import React from 'react';

const OrderSuccessPage = () => {
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Successful</h2>
      <p className="mb-2">Thank you for your order!</p>
      <p className="mb-2">We have received your order and it is being processed.</p>
      <p className="mb-2">An email confirmation has been sent to your email address.</p>
      <div className="mb-4">
        <p className="font-bold">Your order details:</p>
        <ul className="list-disc pl-4">
          <li>Order Number: 123456789</li>
          <li>Order Date: April 30, 2024</li>
          <li>Total Amount: ₦25,500.00</li>
          {/* Add more order details as needed */}
        </ul>
      </div>
      <p className="mb-2">Thank you for shopping with us!</p>
    </div>
  );
};

export default OrderSuccessPage;
