import React, { useEffect, useState } from "react";
import { useCart } from "./Carddetails"; // your cart context
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Payment = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, moveToSaveForLater, saveForLater, moveToCart } = useCart();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Fullname: "",
    Address: "",
    City: "",
    Pincode: "",
    ContactNumber: "",
    payment: "COD",
    cardNumber: "",
    upiId: "",
    addressType: "Home",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load saved addresses
  useEffect(() => {
    const saved = localStorage.getItem("addresses");
    if (saved) setSavedAddresses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  // TOTALS
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const totalOriginalPrice = cart.reduce((sum, item) => sum + (item.originalprice || item.price || 0) * (item.quantity || 1), 0);
  const totalDiscount = totalOriginalPrice - totalPrice;
  const totalAmount = totalPrice;

  // Handlers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveAddress = () => {
    const { Fullname, Address, City, Pincode, ContactNumber, addressType } = form;
    if (!Fullname || !Address || !City || !Pincode || !ContactNumber) {
      alert("⚠️ Please fill all address fields!");
      return;
    }

    const newAddress = {
      id: Date.now(),
      name: Fullname,
      mobile: ContactNumber,
      fullAddress: `${Address}, ${City}, ${Pincode}`,
      addressType,
    };

    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddress(newAddress);
    setShowForm(false);

    // Reset only address fields
    setForm({
      ...form,
      Fullname: "",
      Address: "",
      City: "",
      Pincode: "",
      ContactNumber: "",
    });
  };

  // Estimated delivery range
  const getEstimatedDeliveryRange = () => {
    const today = new Date();
    const minDelivery = new Date(today);
    const maxDelivery = new Date(today);

    minDelivery.setDate(minDelivery.getDate() + 3);
    maxDelivery.setDate(maxDelivery.getDate() + 5);

    [minDelivery, maxDelivery].forEach((date) => {
      if (date.getDay() === 6) date.setDate(date.getDate() + 2);
      if (date.getDay() === 0) date.setDate(date.getDate() + 1);
    });

    return `${minDelivery.toLocaleDateString(undefined, { day: "numeric", month: "short" })} - ${maxDelivery.toLocaleDateString(undefined, { day: "numeric", month: "short" })}`;
  };

  const validatePayment = () => {
    const cardNumber = form.cardNumber.replace(/\s+/g, "");
    const upiId = form.upiId.trim();

    if (form.payment === "Card" && !/^\d{16}$/.test(cardNumber)) {
      alert("⚠️ Please enter a valid 16-digit card number!");
      return false;
    }

    if (form.payment === "UPI" && !/^[\w.-]+@[\w]+$/.test(upiId)) {
      alert("⚠️ Please enter a valid UPI ID!");
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (loading) return;
    if (!selectedAddress) {
      alert("⚠️ Please select or add a delivery address!");
      return;
    }
    if (cart.length === 0) {
      alert("⚠️ Your cart is empty!");
      return;
    }
    if (!validatePayment()) return;

    const orderDetails = {
      id: Date.now(),
      products: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        brand: item.brand,      // ✅ include brand
      images: item.images,
      })),
      address: selectedAddress,
      paymentMethod: form.payment,
      totalAmount,
      orderDate: new Date().toISOString(),
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!res.ok) throw new Error("Failed to save order");

      clearCart();
      setOrderPlaced(true);
      setTimeout(() => navigate("/orderlist"), 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS PAGE
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-green-700 text-xl font-semibold">
        <p>✅ Order placed successfully!</p>
        <p className="text-gray-600 mt-2">Redirecting to your orders...</p>
      </div>
    );
  }

  // MAIN PAGE
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl px-4 mt-10">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col gap-8">
          {/* DELIVERY ADDRESS */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4 uppercase">
              Delivery Address
            </h3>
            <div className="space-y-4 mb-6">
              {savedAddresses.length === 0 ? (
                <p className="text-gray-600">
                  No saved addresses. Please add one below.
                </p>
              ) : (
                savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`border p-4 rounded-md ${
                      selectedAddress?.id === addr.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300"
                    }`}
                  >
                    <p className="font-medium">
                      {addr.name} ({addr.addressType})
                    </p>
                    <p className="text-gray-600 text-sm">{addr.fullAddress}</p>
                    <p className="text-gray-600 text-sm mb-2">
                      Mobile: {addr.mobile}
                    </p>

                    <button
                      onClick={() => setSelectedAddress(addr)}
                      className={`px-4 py-2 rounded text-white font-medium ${
                        selectedAddress?.id === addr.id
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`}
                    >
                      {selectedAddress?.id === addr.id
                        ? "Delivering Here"
                        : "Deliver Here"}
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add New Address */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
            >
              {showForm ? "Cancel" : "Add New Address"}
            </button>

            {showForm && (
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="Fullname"
                  placeholder="Full Name"
                  value={form.Fullname}
                  onChange={handleChange}
                  className="border p-2 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <input
                  name="ContactNumber"
                  placeholder="Mobile Number"
                  value={form.ContactNumber}
                  onChange={handleChange}
                  className="border p-2 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <input
                  name="Pincode"
                  placeholder="Pincode"
                  value={form.Pincode}
                  onChange={handleChange}
                  className="border p-2 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <input
                  name="City"
                  placeholder="City / District / Town"
                  value={form.City}
                  onChange={handleChange}
                  className="border p-2 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <textarea
                  name="Address"
                  placeholder="House No., Building, Street, Area"
                  value={form.Address}
                  onChange={handleChange}
                  className="border p-2 rounded focus:ring-2 focus:ring-orange-400 outline-none sm:col-span-2"
                />

                <div className="flex gap-4 sm:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="addressType"
                      value="Home"
                      checked={form.addressType === "Home"}
                      onChange={handleChange}
                    />{" "}
                    Home
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="addressType"
                      value="Office"
                      checked={form.addressType === "Office"}
                      onChange={handleChange}
                    />{" "}
                    Office
                  </label>
                </div>

                <button
                  type="button"
                  onClick={saveAddress}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md sm:col-span-2"
                >
                  Save & Deliver Here
                </button>
              </form>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Order Summary ({cart.length} items)
            </h3>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const discountAmount = (item.originalprice || 0) - (item.price || 0);
                  return (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
                    >
                      <img
                        src={item.images?.[0] || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <div className="flex-1 sm:ml-4 mt-3 sm:mt-0">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">Brand: {item.brand || "N/A"}</p>
                        <div className="text-gray-900 font-medium mt-1">
                          ₹{item.price.toLocaleString()}
                          {discountAmount > 0 && (
                            <>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{item.originalprice.toLocaleString()}
                              </span>
                              <span className="text-sm text-green-600 ml-2">
                                ({item.discount}% off)
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item._id, item.quantity - 1)
                                : removeFromCart(item._id)
                            }
                            className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-5 flex-col sm:flex-row">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-4 py-2.5"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => moveToSaveForLater(item._id)}
                          className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg px-4 py-2.5"
                        >
                          Save For Later
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Saved For Later */}
          {saveForLater.length > 0 && (
            <div className="bg-white shadow-md rounded-md p-6 mt-8">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                Saved For Later ({saveForLater.length})
              </h3>

              {saveForLater.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
                >
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div className="flex-1 sm:ml-4 mt-3 sm:mt-0">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">Brand: {item.brand || "N/A"}</p>
                    <p className="text-gray-900 font-medium mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-5 flex-col sm:flex-row">
                    <button
                      onClick={() => moveToCart(item._id)}
                      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-4 py-2.5"
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAYMENT SECTION */}
          <div className="bg-white shadow-md rounded-md p-6 mb-10">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">
              Select Payment Method
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={form.payment === "COD"}
                  onChange={handleChange}
                />{" "}
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={form.payment === "Card"}
                  onChange={handleChange}
                />{" "}
                Debit / Credit Card
              </label>
              {form.payment === "Card" && (
                <input
                  name="cardNumber"
                  placeholder="Enter Card Number"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className="border p-2 rounded mt-2"
                />
              )}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={form.payment === "UPI"}
                  onChange={handleChange}
                />{" "}
                UPI / Net Banking
              </label>
              {form.payment === "UPI" && (
                <input
                  name="upiId"
                  placeholder="Enter UPI ID"
                  value={form.upiId}
                  onChange={handleChange}
                  className="border p-2 rounded mt-2"
                />
              )}
            </div>
            <button
              onClick={handleOrder}
              disabled={cart.length === 0 || loading}
              className={`w-full mt-5 py-2 rounded text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — PRICE DETAILS */}
        {cart.length > 0 && (
          <div className="bg-white shadow-sm rounded-md p-6 w-full lg:w-96 h-fit sticky top-24 self-start">
            <h3 className="text-base font-semibold text-gray-700 border-b pb-2 mb-4 uppercase">
              Price Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>
                  Price ({cart.reduce((a, c) => a + c.quantity, 0)} item
                  {cart.length > 1 ? "s" : ""})
                </span>
                <span>₹{totalOriginalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>− ₹{totalDiscount.toLocaleString()}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <p className="text-green-600 text-sm mt-2 font-medium">
                You will save ₹{totalDiscount > 0 ? totalDiscount.toLocaleString() : 0} on this order
              </p>  

              <hr />

              {/* Estimated Delivery */}
              {selectedAddress && (
                <p className="text-sm text-orange-700 mt-2 font-semibold">
                  📦 Estimated Delivery: {getEstimatedDeliveryRange()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
