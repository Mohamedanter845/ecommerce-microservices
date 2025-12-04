import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [cartCount] = useState(3);
  const [search, setSearch] = useState("");
  const [auto, setAuto] = useState([]);
  const navigate = useNavigate();

  const suggestions = ["iPhone", "Samsung", "Laptop", "Headphones"];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) return setAuto([]);
    setAuto(suggestions.filter((i) => i.toLowerCase().includes(value.toLowerCase())));
  };

  const handleSuggestionClick = (item) => {
    setSearch(item);
    setAuto([]);
    setOpen(false);
    navigate(`/products?search=${encodeURIComponent(item)}`); // تفترض فلترة حسب البحث في صفحة المنتجات
  };

  const toggleDark = () => {
    setDark((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <nav className="bg-gray-900 text-white dark:bg-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold tracking-wide text-red-500">
            <Link to="/" onClick={() => setOpen(false)}>
              M3 <span className="text-white">Shop</span>
            </Link>
          </h1>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-col flex-1 mx-6 relative">
            <div className="flex w-full bg-white rounded-lg overflow-hidden shadow-md">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full py-2 px-4 text-gray-800 outline-none"
              />
              <button className="bg-red-600 px-4 flex items-center justify-center hover:bg-red-700">
                <Search className="text-white" size={20} />
              </button>
            </div>

            {/* Suggestions */}
            {auto.length > 0 && (
              <div className="absolute top-12 bg-white w-full rounded-lg shadow-lg py-2 text-gray-900 z-50">
                {auto.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-red-400" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-red-400" onClick={() => setOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-red-400" onClick={() => setOpen(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-red-400" onClick={() => setOpen(false)}>
                Orders
              </Link>
            </li>
            <li className="relative group cursor-pointer">
              <span className="hover:text-red-400">Account</span>
              <div className="absolute right-0 hidden group-hover:block bg-white text-gray-900 w-40 shadow-lg rounded-md mt-2 p-2">
                <Link
                  to="/login"
                  className="block p-2 hover:bg-gray-200 rounded"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block p-2 hover:bg-gray-200 rounded"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </div>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dark Mode */}
            <div onClick={toggleDark} className="cursor-pointer hover:text-red-400">
              {dark ? <Sun size={24} /> : <Moon size={24} />}
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer hover:text-red-400">
              <Link to="/cart" onClick={() => setOpen(false)}>
                <ShoppingCart size={28} />
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* Mobile Items */}
        {open && (
          <div className="md:hidden bg-gray-800 p-4 space-y-4 shadow-lg">
            <Link to="/" onClick={() => setOpen(false)} className="block text-lg hover:text-red-400">
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="block text-lg hover:text-red-400"
            >
              Products
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="block text-lg hover:text-red-400">
              Cart
            </Link>
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="block text-lg hover:text-red-400"
            >
              Orders
            </Link>
            <Link to="/login" onClick={() => setOpen(false)} className="block text-lg hover:text-red-400">
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="block text-lg hover:text-red-400"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
