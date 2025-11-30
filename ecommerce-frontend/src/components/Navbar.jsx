import { useState } from "react";
import { Menu, X, ShoppingCart, Search, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [cartCount] = useState(3); 
  const [search, setSearch] = useState("");
  const [auto, setAuto] = useState([]);

  const suggestions = ["iPhone", "Samsung", "Laptop", "Headphones"];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) return setAuto([]);
    setAuto(suggestions.filter((i) => i.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <div className={`${dark ? "dark" : ""}`}>
      
      <nav className="bg-gray-900 text-white dark:bg-gray-800 sticky top-0 z-50 shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          {/* Logo */}
          <h1 className="text-3xl font-extrabold tracking-wide text-red-500">
            M3 <span className="text-white">Shop</span>
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
              <div className="absolute top-12 bg-white w-full rounded-lg shadow-lg py-2 text-gray-900">
                {auto.map((item, index) => (
                  <div
                    key={index}
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
            <li className="hover:text-red-400 cursor-pointer">Home</li>
            <li className="hover:text-red-400 cursor-pointer">Products</li>
            <li className="hover:text-red-400 cursor-pointer">Cart</li>
            <li className="hover:text-red-400 cursor-pointer">Orders</li>
          </ul>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">

            {/* Account */}
            <div className="relative group cursor-pointer">
              <span className="hover:text-red-400">Account</span>
              <div className="absolute right-0 hidden group-hover:block bg-white text-gray-900 w-40 shadow-lg rounded-md mt-2 p-2">
                <p className="p-2 hover:bg-gray-200 rounded">Login</p>
                <p className="p-2 hover:bg-gray-200 rounded">Register</p>
              </div>
            </div>

            {/* Dark Mode */}
            <div
              onClick={() => setDark(!dark)}
              className="cursor-pointer hover:text-red-400"
            >
              {dark ? <Sun size={24} /> : <Moon size={24} />}
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer hover:text-red-400">
              <ShoppingCart size={28} />
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
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
            <p className="text-lg hover:text-red-400">Home</p>
            <p className="text-lg hover:text-red-400">Products</p>
            <p className="text-lg hover:text-red-400">Cart</p>
            <p className="text-lg hover:text-red-400">Orders</p>
            <p className="text-lg hover:text-red-400">Login</p>
            <p className="text-lg hover:text-red-400">Register</p>
          </div>
        )}
      </nav>
    </div>
  );
}
