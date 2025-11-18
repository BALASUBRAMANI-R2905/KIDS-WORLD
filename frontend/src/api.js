const API = "http://localhost:8000";

export const getProducts = async () => {
  const res = await fetch(`${API}/products`);
  return res.json();
};
