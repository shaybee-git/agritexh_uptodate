import { useState } from "react";
import { useSelector } from "react-redux";

export default function ReversationCheckout({ listing, closeCheckout }) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const sendNotification = async (recipientId, listingId) => {
    const url = "http://localhost:5000/api/notifications";
    console.log("Sending notification to:", url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
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

          listingDetails: {
            name: listing.name,
            price: listing.offer ? listing.discountPrice : listing.regularPrice,
            description: listing.description,
            type: listing.type,
            imageUrls: listing.imageUrls,
          },
        }),
      });

      const responseBody = await response.text();
      console.log("Response body:", responseBody);

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
      console.log("Notification sent:", data);
      return data;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.firstName.trim()) return;

    setLoading(true);
    setError(null);

    try {
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
      });
      console.log(setFormValues);

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
                </div>
                <button
                  type="submit"
                  className="bg-slate-700 mt-5 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={closeCheckout} className="text-white p-2 bg-blue-700">
          Back to Products
        </button>
      </div>
    </div>
  );
}
