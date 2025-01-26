import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaShoppingCart, FaPaperPlane } from "react-icons/fa"; // Import FontAwesome icons
import "./Header.css";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="header bg-green-700 text-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo Section */}
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl flex flex-wrap">
            <span className="text-white">Agri</span>
            <span className="text-green-200">Tech</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/about" className="nav-link">
            <li>About</li>
          </Link>
          <Link to="/contact" className="nav-link">
            <li>Contact</li>
          </Link>

          {/* Orders Received with Icon */}
          <Link to="/notifications" className="nav-link flex items-center gap-2">
            <FaShoppingCart size={18} /> {/* Shopping Cart Icon */}
            <li>Orders Received</li>
          </Link>

          {/* Orders Sent with Icon */}
          <Link to="/my-orders" className="nav-link flex items-center gap-2">
            <FaPaperPlane size={18} /> {/* Paper Plane Icon */}
            <li>Orders Sent</li>
          </Link>

          {/* Shop Button with Dropdown */}
          <div className="shop-dropdown">
            <button className="dropdown-button">Shop</button>
            <div className="dropdown-menu">
              <Link to="/rental" className="dropdown-item">Rental</Link>
              <Link to="/sale" className="dropdown-item">Sale</Link>
            </div>
          </div>

          {/* Profile Section */}
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="nav-link">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
