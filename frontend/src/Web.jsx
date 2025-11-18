import { useState, useEffect } from "react";
import Nav from "./Nav";
import Product from "./Product";
import Footer from "./Footer";
import Carousel from "./Carousel";
import Filterside from "./Filterslide";

import { useProducts } from "./ProductContext";   // <-- FIXED

const Web = ({ setp, p }) => {
  const { setAllProducts } = useProducts();        // <-- FIXED

  const [products, setProducts] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({
    general: [],
    brand: [],
    size: [],
    colour: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    general: [],
    brand: [],
    size: [],
    colour: [],
    price: [],
    discount: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
          setAllProducts(data);       // <-- store globally
          updateAvailableFilters(data, selectedFilters);

        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
          setAllProducts(data.products);
          updateAvailableFilters(data.products, selectedFilters);

        } else {
          console.error("Unexpected format:", data);
        }

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      updateAvailableFilters(products, selectedFilters);
    }
  }, [products, selectedFilters]);

  const updateAvailableFilters = (productList, filters) => {
    const filtered = productList.filter((product) => {
      if (filters.general.length > 0 && !filters.general.includes(product.general)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
      if (filters.colour.length > 0 && !filters.colour.includes(product.colour)) return false;
      return true;
    });

    const generalSet = new Set();
    const brandSet = new Set();
    const sizeSet = new Set();
    const colourSet = new Set();

    filtered.forEach((p) => {
      if (p.general) generalSet.add(p.general);
      if (p.brand) brandSet.add(p.brand);
      if (p.size) sizeSet.add(p.size);
      if (p.colour) colourSet.add(p.colour);
    });

    setAvailableFilters({
      general: [...generalSet],
      brand: [...brandSet],
      size: [...sizeSet],
      colour: [...colourSet],
    });
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  return (
    <div>
      <Nav setp={setp} p={p} />
      <Carousel />

      <div className="flex gap-6 px-6 py-6">
        <Filterside
          filters={availableFilters}
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <div className="flex-1">
          <Product selectedFilters={selectedFilters} /> {/* FIXED */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Web;
