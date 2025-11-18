import React from "react";
import { useCart } from "./Carddetails";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

const Addcard = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    saveForLater,
    moveToSaveForLater,
    moveToCart,
    removeFromSaveForLater,
  } = useCart();

  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Nav />

      {/* CART SECTION */}
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold mb-4">
          My Cart ({cart.length})
        </h2>

        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        <div className="flex flex-col gap-4">
          {cart.map((p) => {
            const discountAmount = ((p.originalprice - p.price) * p.quantity).toFixed(2);
            return (
              <div
                key={p._id}
                className="w-full bg-white shadow-md rounded-md p-4 flex gap-4 items-center"
              >
                <img
                  src={p.images?.[0] || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-green-600 mt-1">Brand: {p.brand}</p>

                  <div className="mt-2 text-sm">
                    <p>
                      Price: <span className="font-bold">₹{p.price}</span>
                      {p.originalprice && (
                        <>
                          <span className="line-through text-gray-400 ml-2">
                            ₹{p.originalprice}
                          </span>
                          <span className="text-red-500 ml-2">
                            ({p.discount}% OFF)
                          </span>
                        </>
                      )}
                    </p>
                    <p>Discount: − ₹{discountAmount}</p>
                    <p>Total: ₹{(p.price * p.quantity).toFixed(1)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(p._id, p.quantity - 1)}
                      className="px-2 border rounded disabled:opacity-50"
                      disabled={p.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-2">{p.quantity}</span>
                    <button
                      onClick={() => updateQuantity(p._id, p.quantity + 1)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => moveToSaveForLater(p._id)}
                    className="text-blue-600 hover:underline"
                  >
                    Save for Later
                  </button>
                  <button
                    onClick={() => removeFromCart(p._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CART SUMMARY */}
        {cart.length > 0 && (
          <div className="mt-5 flex flex-col gap-2">
            <p className="font-semibold text-lg">
              Cart Total: ₹{totalPrice.toFixed(1)}
            </p>
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/payment")}
                className="bg-yellow-600 px-4 py-2 rounded text-white hover:bg-green-700"
              >
                PAYMENT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SAVE FOR LATER SECTION */}
      <div className="w-full max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Saved for Later ({saveForLater.length})
        </h2>

        {saveForLater.length === 0 && (
          <p className="text-gray-500">No items saved for later.</p>
        )}

        <div className="flex flex-col gap-4">
          {saveForLater.map((p) => (
            <div
              key={p._id}
              className="w-full bg-white shadow-md rounded-md p-4 flex gap-4 items-center"
            >
              <img
                src={p.images?.[0] || "https://via.placeholder.com/150"}
                alt={p.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-lg font-bold mt-2">₹{p.price}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => moveToCart(p._id)}
                  className="text-green-600 hover:underline"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromSaveForLater(p._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Addcard;
