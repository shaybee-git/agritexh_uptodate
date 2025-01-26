import { useState } from "react";

export default function Reservation({ listing, calculateCost }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  // Calculate the reservation cost based on the dates
  const handleDateChange = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const cost =
      days * (listing.offer ? listing.discountPrice : listing.regularPrice);
    setTotalCost(cost);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800">Reservation Details</h3>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label>
            Start Date:
            <input
              type="date"
              className="block w-full p-2 border rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input
              type="date"
              className="block w-full p-2 border rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleDateChange}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Calculate Cost
      </button>

      {totalCost > 0 && (
        <p className="mt-2 text-lg font-semibold">
          Total Cost: ${totalCost.toLocaleString()}
        </p>
      )}
    </div>
  );
}
