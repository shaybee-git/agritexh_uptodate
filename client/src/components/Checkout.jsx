import { useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout({ listing, closeCheckout }) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    startDate: "",  // For rent listings
    endDate: "",    // For rent listings
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if start date is valid
    if (name === "startDate" && new Date(value) < new Date()) {
      setError("Start date cannot be in the past.");
      return;
    }

    // Check if end date is valid
    if (name === "endDate" && new Date(value) < new Date(formValues.startDate)) {
      setError("End date cannot be before the start date.");
      return;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setError(null); // Reset error when valid input is detected
  };

  // Calculate the total price for rent listings
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (listing.type === "rent" && formValues.startDate && formValues.endDate) {
      const startDate = new Date(formValues.startDate);
      const endDate = new Date(formValues.endDate);
      const timeDifference = endDate - startDate;
      const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
      totalPrice = daysDifference * (listing.offer ? listing.discountPrice : listing.regularPrice);
    }
    return totalPrice;
  };

  const sendNotification = async (recipientId, listingId) => {
    const url = "http://localhost:5000/api/notifications";
    const totalPrice = calculateTotalPrice(); // Get the calculated total price

    // Prepare notification data
    const notificationData = {
      recipient: recipientId,
      sender: currentUser._id,
      listing: listingId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      emailAddress: formValues.emailAddress,
      phone: formValues.phone,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      totalPrice,
      listingDetails: {
        name: listing.name,
        price: listing.type === "rent" ? totalPrice : listing.regularPrice,
        description: listing.description,
        type: listing.type,
        imageUrls: listing.imageUrls,
      },
    };

    // Add startDate and endDate only for rent listings
    if (listing.type === "rent") {
      notificationData.startDate = new Date(formValues.startDate).toISOString();
      notificationData.endDate = new Date(formValues.endDate).toISOString();
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(notificationData),
      });

      const responseBody = await response.text();
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseBody);
        } catch (e) {
          errorData = { firstName: "Failed to send notification" };
        }
        throw new Error(errorData.firstName || "Failed to send notification");
      }

      const data = JSON.parse(responseBody);
      return data;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.firstName.trim()) return;

    // Check if form values are valid
    if (new Date(formValues.startDate) < new Date()) {
      setError("Start date cannot be in the past.");
      return;
    }
    if (formValues.endDate && new Date(formValues.endDate) < new Date(formValues.startDate)) {
      setError("End date cannot be before the start date.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Log form values to ensure dates are included for rent listings
      console.log("Form Values", formValues);

      await sendNotification(listing.userRef, listing._id);
      setFormValues({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        startDate: "",  // Reset start date for rent listings
        endDate: "",    // Reset end date for rent listings
      });

      alert("Message sent successfully!");
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">
            Checkout
          </h2>
        </div>

        <div className="mt-12">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-300">01</h3>
              <h3 className="text-xl font-bold text-gray-800 mt-1">
                Personal Details
              </h3>
            </div>

            <div className="md:col-span-2">
              <form>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First name"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last name"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      name="emailAddress"
                      value={formValues.emailAddress}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Phone number"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-300">02</h3>
              <h3 className="text-xl font-bold text-gray-800 mt-1">
                Shopping Address
              </h3>
            </div>

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Street address"
                      name="address"
                      value={formValues.address}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={formValues.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Zip Code"
                      name="zipCode"
                      value={formValues.zipCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>

                  {/* Rent specific date inputs */}
                  {listing.type === "rent" && (
                    <>
                      <div>
                        <input
                          type="date"
                          placeholder="Start Date"
                          name="startDate"
                          value={formValues.startDate}
                          onChange={handleInputChange}
                          className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          placeholder="End Date"
                          name="endDate"
                          value={formValues.endDate}
                          onChange={handleInputChange}
                          className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-slate-700 mt-5 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
