import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
// import Search from "./pages/Search";
import Notifications from "./pages/notifications";
import Contact from "./pages/Contact/Contact";
import Display from "./pages/Display";
import Rentals from "./pages/Rental";
import Sales from "./pages/Sale";
import MyOrder from './pages/MyOrders';  // Make sure this path is correct

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/search" element={<Display />} />
        <Route path="/rental" element={<Rentals />} />
        <Route path="/sale" element={<Sales />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/my-orders" element={<MyOrder />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
