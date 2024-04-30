// ProfilePage.tsx
const ProfilePage = () => {
    // Dummy data for placed orders
    const orders = [
      { id: 1, date: "2024-04-29", total: 50, status: "Delivered" },
      { id: 2, date: "2024-04-25", total: 30, status: "In Transit" },
      { id: 3, date: "2024-04-20", total: 25, status: "Pending" },
    ];
  
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <div className="flex flex-col">
          {/* Profile Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <p>Name: John Doe</p>
              <p>Email: john@example.com</p>
              {/* Add more profile information as needed */}
            </div>
          </div>
          {/* Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-2">My Orders</h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 shadow-md rounded-lg mb-4"
              >
                <p>Order ID: {order.id}</p>
                <p>Date: {order.date}</p>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  