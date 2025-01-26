// import { useEffect, useState } from "react";
// import ListingItem from "../components/ListingItem";

// // Search Page
// export default function Search() {
//   const [loading, setLoading] = useState(false);
//   const [rentalListings, setRentalListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [showMoreRentals, setShowMoreRentals] = useState(false);
//   const [showMoreSales, setShowMoreSales] = useState(false);

//   useEffect(() => {
//     const fetchListings = async () => {
//       setLoading(true);

//       // Fetch rental listings
//       const rentalRes = await fetch(`/api/listing/get?type=rent`);
//       const rentalData = await rentalRes.json();
//       if (rentalData.length > 8) {
//         setShowMoreRentals(true);
//       } else {
//         setShowMoreRentals(false);
//       }
//       setRentalListings(rentalData);

//       // Fetch sale listings
//       const saleRes = await fetch(`/api/listing/get?type=sale`);
//       const saleData = await saleRes.json();
//       if (saleData.length > 8) {
//         setShowMoreSales(true);
//       } else {
//         setShowMoreSales(false);
//       }
//       setSaleListings(saleData);

//       setLoading(false);
//     };

//     fetchListings();
//   }, []);

//   const onShowMoreClick = async (type) => {
//     if (type === "rent") {
//       const startIndex = rentalListings.length;
//       const res = await fetch(
//         `/api/listing/get?type=rent&startIndex=${startIndex}`
//       );
//       const data = await res.json();
//       if (data.length < 9) {
//         setShowMoreRentals(false);
//       }
//       setRentalListings([...rentalListings, ...data]);
//     } else if (type === "sale") {
//       const startIndex = saleListings.length;
//       const res = await fetch(
//         `/api/listing/get?type=sale&startIndex=${startIndex}`
//       );
//       const data = await res.json();
//       if (data.length < 9) {
//         setShowMoreSales(false);
//       }
//       setSaleListings([...saleListings, ...data]);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="flex flex-col">
//         <div className="flex-1">
//           <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
//             Rental Listings:
//           </h1>
//           <div className="p-7 flex flex-wrap gap-4">
//             {!loading && rentalListings.length === 0 && (
//               <p className="text-xl text-slate-700">
//                 No rental listings found!
//               </p>
//             )}
//             {loading && (
//               <p className="text-xl text-slate-700 text-center w-full">
//                 Loading...
//               </p>
//             )}
//             {!loading &&
//               rentalListings &&
//               rentalListings.map((listing) => (
//                 <ListingItem key={listing._id} listing={listing} />
//               ))}
//             {showMoreRentals && (
//               <button
//                 onClick={() => onShowMoreClick("rent")}
//                 className="text-green-700 hover:underline p-7 text-center w-full"
//               >
//                 Show more rentals
//               </button>
//             )}
//           </div>

//           <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
//             Sale Listings:
//           </h1>
//           <div className="p-7 flex flex-wrap gap-4">
//             {!loading && saleListings.length === 0 && (
//               <p className="text-xl text-slate-700">No sale listings found!</p>
//             )}
//             {loading && (
//               <p className="text-xl text-slate-700 text-center w-full">
//                 Loading...
//               </p>
//             )}
//             {!loading &&
//               saleListings &&
//               saleListings.map((listing) => (
//                 <ListingItem key={listing._id} listing={listing} />
//               ))}
//             {showMoreSales && (
//               <button
//                 onClick={() => onShowMoreClick("sale")}
//                 className="text-green-700 hover:underline p-7 text-center w-full"
//               >
//                 Show more sales
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
