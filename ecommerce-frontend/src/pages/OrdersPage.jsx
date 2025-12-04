import React from "react";

export default function OrdersPage() {
  // نموذج طلبات ثابتة مؤقتًا
  const orders = [
    {
      id: 101,
      date: "2025-12-01",
      total: 59.97,
      status: "Shipped",
    },
    {
      id: 102,
      date: "2025-11-25",
      total: 29.99,
      status: "Processing",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded bg-white shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
