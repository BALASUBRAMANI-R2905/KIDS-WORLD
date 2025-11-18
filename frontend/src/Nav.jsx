import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "./ProductContext";

const Nav = ({ products = [] }) => {
  const navigate = useNavigate();

  // ✅ FIX: You need BOTH searchQuery and setSearchQuery
  const { searchQuery, setSearchQuery } = useProducts();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    setSearchQuery(query); // global update
  };

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white border-gray-200 dark:bg-gray-800 shadow">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">

          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://t4.ftcdn.net/jpg/01/34/68/65/360_F_134686594_s4TLh4Vh6QplrTQnrHANQ7EJhCheaAtJ.jpg"
              className="h-16 w-16 rounded-full"
            />
            <span className="text-2xl font-semibold dark:text-white">KIDS WORLD</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center max-w-lg mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              style={{ width: "500px" }}
            />
            <button
              type="submit"
              className="py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg"
            >
              Search
            </button>
          </form>

          <div className="flex items-center space-x-2">
            <button onClick={() => navigate("/login")} className="text-gray-800 dark:text-white px-4 py-2 rounded-lg">
              LOGIN
            </button>
            <button onClick={() => navigate("/signin")} className="text-white bg-blue-700 px-4 py-2 rounded-lg">
              SIGN UP
            </button>
          </div>

          <div className="flex space-x-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/orderlist" className="hover:text-blue-600">Order List</Link>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Nav;
