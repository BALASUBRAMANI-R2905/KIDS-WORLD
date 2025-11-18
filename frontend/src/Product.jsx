import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./ProductContext";

const Product = ({ selectedFilters = {} }) => {
  const navigate = useNavigate();

  // ⬇ Get products + global search query from context
  const { allProducts, searchQuery } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!Array.isArray(allProducts)) {
      setFilteredProducts([]);
      return;
    }

    const { general = [], brand = [], size = [], colour = [], price = [], discount = [] } =
      selectedFilters;

    const filtered = allProducts.filter((product) => {
      // ⬅ GLOBAL SEARCH FILTER (no URL search)
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery))
        return false;

      // filters
      if (general.length && !general.includes(product.general)) return false;
      if (brand.length && !brand.includes(product.brand)) return false;
      if (size.length && !size.includes(product.size)) return false;
      if (colour.length && !colour.includes(product.colour)) return false;

      if (price.length) {
        const pass = price.some((range) => {
          const [min, max] =
            range === "1000+" ? [1000, Infinity] : range.split("-").map(Number);
          return product.price >= min && product.price <= max;
        });
        if (!pass) return false;
      }

      if (discount.length) {
        const pass = discount.some((range) => {
          if (range === "10-30%" && product.discount >= 10 && product.discount <= 30)
            return true;
          if (range === "40-70%" && product.discount >= 40 && product.discount <= 70)
            return true;
          if (range === "80%+" && product.discount >= 80) return true;
          return false;
        });
        if (!pass) return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [allProducts, selectedFilters, searchQuery]);

  return (
    <div className="p-4 flex flex-wrap gap-6 justify-center">
      {filteredProducts.length === 0 && (
        <p className="text-gray-500 text-lg">No products found.</p>
      )}

      {filteredProducts.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          className="w-64 border rounded shadow cursor-pointer hover:shadow-lg"
        >
          
            {product.discount && (
            <span className="bg-red-200 text-red-700 font-semibold px-2 py-1 rounded text-sm">
                {product.discount}% OFF
              </span>
            )}
          <img
            src={product.images?.[0] || "https://via.placeholder.com/150"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t"
          />

          <div className="p-3">
            <h5 className="font-bold text-lg">{product.name}</h5>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.general}</p>
            <p>Colour: {product.colour}</p>
            <p>Size: {product.size}</p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-bold">₹{product.price}</span>
              {product.originalprice && (
                <span className="line-through text-gray-500">
                  ₹{product.originalprice}
                </span>
              )}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
