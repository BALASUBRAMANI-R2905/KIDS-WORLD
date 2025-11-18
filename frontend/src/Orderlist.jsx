// src/Orderlist.jsx
import React, { useEffect, useState } from "react";
import { getEstimatedDelivery } from "./utils/delivery";

const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/orders");
        const data = await res.json();
        setOrders(data.reverse()); // latest orders first
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading orders...</p>;
  if (!orders.length) return <p className="p-4 text-center">No orders placed yet.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded mb-4 bg-white shadow-sm">
          <h3 className="font-semibold text-blue-800">
            Order Date: {new Date(order.orderDate).toLocaleString()}
          </h3>
          <p className="text-gray-700">
            Estimated Delivery: {getEstimatedDelivery(order.orderDate)}
          </p>

          <div className="mt-2">
            <h4 className="font-medium">Delivery Address:</h4>
            <p>{order.address?.name || "N/A"}</p>
            <p>{order.address?.fullAddress || "N/A"}</p>
          </div>

          <div className="mt-2">
            <h4 className="font-medium">Products:</h4>
            {order.products?.map((item) => (
              <div key={item._id} className="flex gap-4 items-center border-b py-2">
                <img
                   src={item.images?.[0] || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">Brand: {item.brand || "N/A"}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium">
                    Price: ₹{item.price?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            )) || <p>No products found.</p>}
          </div>

          <p className="mt-2 font-semibold">
            Total: ₹{order.totalAmount?.toLocaleString() || "0"}
          </p>
          <p>Payment Method: {order.paymentMethod || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default Orderlist;
