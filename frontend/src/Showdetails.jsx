import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./Carddetails";
import Nav from "./Nav";
import Footer from "./Footer";

const Showdetails = ({ materials, setmaterials }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [size, setSize] = useState("");

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setImageIndex(0);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    if (!product?.images?.length) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [product]);

  if (!product) return <div className="text-center p-10">Loading...</div>;

  // ✅ Add to Cart
  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    navigate("/addcard");
  };

  // ✅ Buy Now
  const handleBuyNow = () => {
    addToCart({ ...product, quantity: 1 });
    navigate("/payment");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 p-8 bg-white rounded-lg shadow-lg mt-6">
        {/* 🖼️ Left: Product Image + Buttons */}
        <div className="flex flex-col gap-4">
          <div
            className="w-96 h-96 border rounded-md overflow-hidden cursor-zoom-in relative"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={
                product.images?.[imageIndex] ||
                "https://via.placeholder.com/300?text=No+Image"
              }
              alt={product.name}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                zoom ? "scale-125" : "scale-100"
              }`}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-20 h-20 object-cover border rounded-md cursor-pointer ${
                  imageIndex === idx ? "border-yellow-500" : "border-gray-300"
                }`}
                onClick={() => setImageIndex(idx)}
              />
            ))}
          </div>

          {/* Buttons below image */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-orange-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md"
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>

        {/* 🧾 Right: Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-sm mt-1">
            General: {product.general}
          </p>
          <p className="text-gray-600 text-sm mt-2">Brand: {product.brand}</p>
          <p className="text-pink-600 text-sm mt-2">Colour: {product.colour}</p>
          <p className="text-gray-600 text-sm mt-2">Size: {product.size}</p>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₹
              {size
                ? product.sizecost?.[Number(size)] ?? product.price
                : product.price}
            </span>
            {product.originalprice && (
              <span className="line-through text-gray-500 text-lg">
                ₹{product.originalprice}
              </span>
            )}
            {product.discount && (
              <span className="text-green-600 text-lg font-semibold">
                {product.discount}% off
              </span>
            )}
          </div>

          <hr className="my-4" />

          {/* Material Toggle */}
          <button
            onClick={() => setmaterials(!materials)}
            className="flex items-center justify-between w-full bg-gray-100 px-4 py-2 mt-4 rounded-md hover:bg-gray-200 transition"
          >
            <span className="font-semibold text-gray-800">
              Material Details
            </span>
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
                materials ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              materials ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gray-50 border rounded-md p-4 hover:bg-gray-100 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-2">Material Details</h2>
              <p className="text-gray-600 text-sm mt-1">
                Sales Package: {product.salespackage}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Style Code: {product.stylecode}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Brand Color: {product.brandcolor}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Label Size: {product.labelsize}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Ideal For: {product.idealfor}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Primary Product: {product.primaryproduct}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Secondary Product: {product.secondaryproduct}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Primary Color: {product.primarycolor}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Fabric: {product.fabric}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Occasion: {product.occasion}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Suitable For: {product.suitablfor}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Fabric Care: {product.fabriccare}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Pattern: {product.pattern}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          {/* 👕 Size Selection */}
          <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select Size
            </h2>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSize("0")}
                className="px-4 py-2 border border-gray-400 rounded-md hover:border-blue-500 hover:text-blue-600 transition"
              >
                0 - 6 Months
              </button>
              <button
                onClick={() => setSize("1")}
                className="px-4 py-2 border border-gray-400 rounded-md hover:border-blue-500 hover:text-blue-600 transition"
              >
                6 - 9 Months
              </button>
              <button
                onClick={() => setSize("2")}
                className="px-4 py-2 border border-gray-400 rounded-md hover:border-blue-500 hover:text-blue-600 transition"
              >
                9 - 12 Months
              </button>
              <button
                onClick={() => setSize("3")}
                className="px-4 py-2 border border-gray-400 rounded-md hover:border-blue-500 hover:text-blue-600 transition"
              >
                1 - 2 Years
              </button>
            </div>

            <p className="text-sm text-blue-500 mt-4">
              *Sizes are approximate and based on standard kidswear charts.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Showdetails;
