import React, { useState } from "react";

export default function CartPage() {
  // هنا ممكن تخزن حالة الكارت محليًا أو تستخدم Context لو موجود
  const [cartItems, setCartItems] = useState([
    // نموذج بيانات مؤقتة
    { id: 1, name: "Product 1", price: 9.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 19.99, quantity: 1 },
  ]);

  // تعديل الكمية
  function updateQuantity(id, newQty) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  }

  // حذف منتج من الكارت
  function removeItem(id) {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }

  // حساب المجموع
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="border p-1 w-16"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 font-bold text-xl">Total: ${total.toFixed(2)}</div>
          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
