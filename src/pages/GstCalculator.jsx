// import React, { useEffect, useState } from "react";
// import { FaRupeeSign } from "react-icons/fa";
// import gstlogo from "../assets/gst_image.jpg";
// import gsttype from "../assets/gstType.webp";
// function GstCalculator() {
//   const [show, setShow] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const [cost, setCost] = useState("100");
//   const [gst, setGst] = useState([]);
//   const [error, setError] = useState("");
//   const [supplyType, setSupplyType] = useState("Inter-state");
//   const rates = [0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];
//   const [gstAmount, setGstAmount] = useState(0);
//   const [cgstAmount, setCgstAmount] = useState(0);
//   const [sgstAmount, setSgstAmount] = useState(0);
//   const [igstAmount, setIgstAmount] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // GST calculation logic
//   const toggleShow = () => setShowAll(!showAll);
//   useEffect(() => {
//     const costNum = parseFloat(cost) || 0;
//     const gstNum = parseFloat(gst) || 0;

//     // GST Exclusive
//     const gstAmt = (costNum * gstNum) / 100;
//     const totalAmt = costNum + gstAmt;

//     // GST Inclusive
//     const basePrice = (costNum * 100) / (100 + gstNum);
//     const gstInclusive = costNum - basePrice;

//     const cgst = show ? gstAmt / 2 : gstInclusive / 2;
//     const sgst = show ? gstAmt / 2 : gstInclusive / 2;
//     const igst = show ? gstAmt : gstInclusive;

//     if (show) {
//       setGstAmount(gstAmt.toFixed(2));
//       setTotalAmount(totalAmt.toFixed(2));
//     } else {
//       setGstAmount(gstInclusive.toFixed(2));
//       setTotalAmount(basePrice.toFixed(2));
//     }

//     setCgstAmount(cgst.toFixed(2));
//     setSgstAmount(sgst.toFixed(2));
//     setIgstAmount(igst.toFixed(2));
//     if (!gst && rates?.length > 0) {
//       setGst(rates[0]);
//     }
//   }, [cost, gst, show, rates]);

//   const handleCostChange = (e) => {
//     const value = e.target.value;

//     // Allow empty string (user clearing input)
//     if (value === "") {
//       setCost("");
//       setError("");
//       return;
//     }

//     // Ensure it's a number
//     if (!/^\d+$/.test(value)) {
//       setError("Only numbers are allowed");
//       return;
//     }

//     // Check for 15 digit limit
//     if (value.length > 15) {
//       setError("Value must be between 1 and 10000000000");
//       return;
//     }

//     setCost(value);
//     setError("");
//   };

//   return (
//     <div className="container px-2 py-4 w-full h-full mx-auto">
//       <div className="grid lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] 2xl:grid-cols-[700px_1fr] grid-cols-1 gap-2 px-10">
//        {/* <div> */}
//          {/* <div className="space-y-6 text-gray-700 leading-relaxed"> */}
//       {/* Intro */}
//      <div className="text-gray-800 max-w-3xl mx-auto leading-relaxed space-y-10">

//       {/* Section 1: What is GST */}
//       <section>
//         <h2 className="text-3xl font-semibold flex items-center gap-2">
//           🧾 What is GST?
//         </h2>
//         <p className="mt-2">
//           Goods and Services Tax (GST) is a unified indirect tax levied on the supply of goods and services across India. Introduced on <strong>July 1, 2017</strong>, it replaced multiple cascading taxes like VAT, excise duty, and service tax. GST brings transparency and consistency in the taxation system, making compliance easier for businesses and individuals.
//         </p>
//       </section>

//       {/* Section 2: Why Use a GST Calculator */}
//       <section>
//         <h2 className="text-3xl font-semibold flex items-center gap-2">
//           🧠 Why Use a GST Calculator?
//         </h2>
//         <ul className="list-disc list-inside mt-3 space-y-2">
//           <li>✅ Quickly calculate GST-inclusive or exclusive prices.</li>
//           <li>✅ Get an accurate breakdown of <abbr title="Central Goods and Services Tax">CGST</abbr>, <abbr title="State Goods and Services Tax">SGST</abbr>, or <abbr title="Integrated Goods and Services Tax">IGST</abbr>.</li>
//           <li>✅ Useful for invoices, billing, and tax compliance.</li>
//         </ul>
//       </section>

//       {/* Section 3: GST Types */}
//       <section>
//         <h2 className="text-3xl font-semibold flex items-center gap-2">
//           📦 Types of GST in India
//         </h2>
//         <div className="grid md:grid-cols-2 gap-4 mt-4">
//           <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
//             <h3 className="text-lg font-bold mb-1">📘 CGST</h3>
//             <p>Levied by the Central Government on intra-state sales.</p>
//           </div>
//           <div className="bg-green-50 p-4 rounded-xl shadow-sm">
//             <h3 className="text-lg font-bold mb-1">📗 SGST</h3>
//             <p>Levied by the State Government on intra-state sales.</p>
//           </div>
//           <div className="bg-yellow-50 p-4 rounded-xl shadow-sm">
//             <h3 className="text-lg font-bold mb-1">📙 IGST</h3>
//             <p>Charged by the Central Government for inter-state transactions.</p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
//             <h3 className="text-lg font-bold mb-1">📒 UTGST</h3>
//             <p>Applies to Union Territories where SGST is not applicable.</p>
//           </div>
//         </div>
//       </section>

//       {/* Section 4: How to Use the Calculator */}
//       <section>
//         <h2 className="text-3xl font-semibold flex items-center gap-2">
//           🛠️ How to Use the GST Calculator
//         </h2>
//         <ol className="list-decimal list-inside mt-3 space-y-2">
//           <li>Enter the base price (amount before or after tax).</li>
//           <li>Select <strong>Add GST</strong> or <strong>Remove GST</strong>.</li>
//           <li>Pick the appropriate GST rate (5%, 12%, 18%, or 28%).</li>
//           <li>Choose supply type – <strong>Intra-state</strong> or <strong>Inter-state</strong>.</li>
//           <li>View the final amount and the tax breakdown.</li>
//         </ol>
//       </section>

//       {/* Section 5: Example */}
//       <section>
//         <h2 className="text-3xl font-semibold flex items-center gap-2">
//           📊 Example Calculation
//         </h2>
//         <p>
//           Let’s say the product price is ₹1,000 and the applicable GST is 18%. If you choose to <strong>add GST</strong>, the total will be ₹1,180 — where ₹180 is the GST. For <strong>intra-state</strong> supply, it’s split as ₹90 CGST and ₹90 SGST. For <strong>inter-state</strong>, it will be ₹180 IGST.
//         </p>
//       </section>

//       {/* Section 6: FAQs */}
//       <section>
//         <h2 className="text-3xl font-semibold flex items-center gap-2">
//           ❓ Frequently Asked Questions
//         </h2>

//         <div className="space-y-6 mt-4">
//           <div>
//             <p className="font-semibold">1. Is GST charged on all goods and services?</p>
//             <p>Not all. Items like petrol, diesel, alcohol, and electricity are currently excluded from GST.</p>
//           </div>
//           <div>
//             <p className="font-semibold">2. Can this calculator be used for professional billing?</p>
//             <p>Yes, this calculator is ideal for quick GST estimation. For legal compliance, use GST-compliant invoicing software.</p>
//           </div>
//           <div>
//             <p className="font-semibold">3. What if I want to remove GST from a price?</p>
//             <p>Just choose “Remove GST” and enter the total amount. The calculator will extract the base price and tax portions automatically.</p>
//           </div>
//         </div>
//       </section>

//       {/* Section 7: Last Updated */}
//       <section className="text-sm text-gray-500 border-t pt-4">
//         <p><strong>Last Updated:</strong> July 2025</p>
//         <p>
//           Source:{" "}
//           <a
//             href="https://www.gst.gov.in/"
//             target="_blank"
//             rel="noreferrer"
//             className="underline text-blue-600 hover:text-blue-800"
//           >
//             Official GST Portal
//           </a>
//         </p>
//       </section>
//     </div>
//     {/* </div> */}

//         {/* Right Card: Main Calculator Area */}
//         <div className="bg-secondary  rounded-xl h-[60rem] ">
//           {" "}
//           {/* Added flex flex-col to enable vertical stacking and flex-grow on children */}
//           <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
//             <div className="flex justify-center items-center">
//               <div className="space-y-1 mt-3">
//                 <p className="text-3xl tracking-wide font-semibold text-white">
//                   GST Calculator
//                 </p>
//                 <span className="text-gray-300 xl:text-md">
//                   Simple, accurate tax calculation
//                 </span>
//               </div>
//               {/* Rupee icon with improved visibility */}
//               <div className="absolute top-2 2sm:right-20 right-4 lg:right-10 xl:right-20 2xl:right-45 md:right-30 opacity-15 bg-gray-400 border border-transparent rounded-full w-25 h-27 flex items-center justify-center">
//                 <FaRupeeSign size={60} className="text-white" />
//               </div>
//             </div>
//           </div>
//           {/* Calculator Input and Results Section - Using flex-grow to fill remaining vertical space */}
//           <div className="flex-grow grid 2sm:grid-cols-2  2sm:px-2 px-4 2sm:space-x-3 py-2 ">

//             <div className="mt-4 flex flex-col">
//               {" "}
//               {/* flex-col to stack its children vertically */}
//               <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">
//                 Enter Details
//               </h1>
//               <div className="bg-IntColor rounded-xl px-8 pt-4 2sm:pb-0 pb-15 flex-grow flex flex-col ">
//                 {" "}
//                 {/* flex-grow to fill available space, py-4 for internal padding */}
//                 <div>
//                   {" "}
//                   {/* Grouping top elements */}
//                   <div className="grid mt-2">
//                     <label className="py-3.5 px-0.5 text-gray-800 font-semibold">
//                       Amount (₹)
//                     </label>

//                     <div
//                       className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
//         ${
//           error
//             ? "border-borderColor shadow-red-300"
//             : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
//         }
//       `}
//                     >
//                       <label className="size-5 text-md font-normal text-gray-500">
//                         ₹
//                       </label>
//                       <input
//                         type="number"
//                         inputMode="numeric"
//                         value={cost}
//                         onChange={handleCostChange}
//                         className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
//                         placeholder="0.00"
//                         min="0"
//                       />
//                     </div>
//                     {error && (
//                       <p className="text-red-500 text-xs mt-1">{error}</p>
//                     )}
//                   </div>
//                   <div className="grid  mt-7">
//                     <label className="py-2 text-gray-800 font-semibold capitalize">
//                       Calculation Type
//                     </label>
//                     <div className="flex justify-between items-center gap-2 py-2 rounded-lg w-full">
//                       <div
//                         className={`${
//                           show
//                             ? "bg-primary text-white"
//                             : "bg-gray-200 text-gray-700"
//                         } rounded-lg w-full py-3 flex justify-center items-center cursor-pointer transition-colors duration-200`}
//                         onClick={() => setShow(true)}
//                       >
//                         <span className="text-[12px] font-medium">Add GST</span>
//                       </div>
//                       <div
//                         className={`${
//                           !show
//                             ? "bg-primary text-white"
//                             : "bg-gray-200 text-gray-700"
//                         } rounded-lg w-full py-3 flex justify-center items-center cursor-pointer transition-colors duration-200`}
//                         onClick={() => setShow(false)}
//                       >
//                         <span className="text-[12px] font-medium">
//                           Extract GST
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="grid mt-4">
//                     <label className="py-3 text-gray-800 font-semibold">
//                       GST Rate <span className="text-gray-600 px-1">(%)</span>
//                     </label>
//                     <div className="flex flex-wrap w-full gap-2 mt-2">
//                       {rates?.map((rate, index) => {
//                         const isVisible = showAll || index < 5;
//                         const isActive = gst === rate;
//                         return (
//                           isVisible && (
//                             <div
//                               key={index}
//                               onClick={() => setGst(rate)}
//                               className={`flex-1 min-w-[70px] h-9 border border-gray-300 cursor-pointer flex justify-center items-center ${
//                                 isActive
//                                   ? "bg-primary text-white"
//                                   : "bg-white text-gray-800 hover:border-primary"
//                               } rounded-lg text-sm font-medium transition-colors duration-200`}
//                             >
//                               {rate}%
//                             </div>
//                           )
//                         );
//                       })}
//                     </div>
//                     {rates.length > 5 && (
//                       <div className="mt-4 px-0.5">
//                         <button
//                           onClick={toggleShow}
//                           className="text-sm font-medium cursor-pointer text-primary underline hover:text-blue-800"
//                         >
//                           {showAll ? "Show Less" : "Show More"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="grid mt-2">
//                   <label className="text-gray-800 py-4 px-0.5 font-semibold">
//                     Supply-Type
//                   </label>
//                   <select
//                     className="w-full p-3 border rounded-xl border-gray-300 text-gray-700 font-medium outline-0"
//                     value={supplyType}
//                     onChange={(e) => setSupplyType(e.target.value)}
//                   >
//                     <option value="Inter-state">Inter-state</option>
//                     <option value="Intra-state">Intra-state</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             {/* Results Section */}
//             <div className="mt-4 ">
//               {" "}
//               {/* flex-col to stack its children vertically */}
//               <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">
//                 Results
//               </h1>
//               <div className="text-white rounded-lg px-5 py-6 bg-primary flex-grow flex flex-col  space-y-4">
//                 {" "}
//                 {/* flex-grow to fill available space, py-6 for internal padding */}
//                 <div className="flex flex-col  items-center bg-green-50 p-4 rounded-lg shadow-sm ">
//                   {" "}
//                   {/* Top part of results */}
//                   <h1 className="text-lg font-semibold text-gray-700">
//                     {" "}
//                     {/* Increased font size and added margin */}
//                     Total Amount
//                   </h1>
//                   <p className="text-xl font-bold text-green-700">
//                     <span>₹</span> {totalAmount}
//                   </p>{" "}
//                   {/* Increased font size and weight */}
//                 </div>
//                 <div className="flex flex-col space-y-4">
//                   {" "}
//                   {/* Added margin-top */}
//                   <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
//                     <p className="text-lg font-semibold text-gray-700">
//                       Original Amount
//                     </p>{" "}
//                     {/* Adjusted color and font size */}
//                     <p className="text-xl font-bold text-green-700">
//                       <span>₹</span> {parseFloat(cost).toFixed(2)}
//                     </p>{" "}
//                     {/* Ensure cost is formatted */}
//                   </div>
//                   <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
//                     <p className="text-lg font-semibold text-gray-700">
//                       {" "}
//                       GST Amount
//                     </p>
//                     <p className="text-xl font-bold text-green-700">
//                       ₹ {gstAmount}
//                     </p>
//                   </div>
//                   <p className="font-semibold text-md  text-gray-400 mt-2 ">
//                     Breackdown
//                   </p>
//                   <div className="border-b border-gray-600 "></div>
//                   {/* <div className="flex justify-between py-1">
//                     <p className="text-gray-400 text-sm font-normal"> GST Amount</p>
//                     <p className="font-semibold text-md text-white">₹ {gstAmount}</p>
//                   </div> */}
//                   {supplyType === "Intra-state" && (
//                     <div className="space-y-4 mt-2">
//                       <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
//                         <p className="text-lg font-semibold text-gray-700">
//                           CGST (50%)
//                         </p>
//                         <p className="text-xl font-bold text-green-700">
//                           ₹ {cgstAmount}
//                         </p>
//                       </div>
//                       <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
//                         <p className="text-lg font-semibold text-gray-700">
//                           SGST (50%)
//                         </p>
//                         <p className="text-xl font-bold text-green-700">
//                           ₹ {sgstAmount}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                   {supplyType === "Inter-state" && (
//                     <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
//                       <p className="text-lg font-semibold text-gray-700">
//                         IGST (100%)
//                       </p>
//                       <p className="text-xl font-bold text-green-700">
//                         ₹ {igstAmount}
//                       </p>
//                     </div>
//                   )}
//                   <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
//                     <p className="text-lg font-semibold text-gray-700">
//                       GST RATE
//                     </p>
//                     <p className="text-xl font-bold text-green-700">{gst}%</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GstCalculator;

// second paragraph

import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import gstlogo from "../assets/gst_image.jpg";
import gsttype from "../assets/gstType.webp";
function GstCalculator() {
  const [show, setShow] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [cost, setCost] = useState("100");
  const [gst, setGst] = useState(["0.00"]);
  const [error, setError] = useState("");
  const [supplyType, setSupplyType] = useState("Inter-state");
  const rates = [0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];
  const [gstAmount, setGstAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [igstAmount, setIgstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // GST calculation logic
  const toggleShow = () => setShowAll(!showAll);
  useEffect(() => {
    const costNum = parseFloat(cost) || 0;
    const gstNum = parseFloat(gst) || 0;

    // GST Exclusive
    const gstAmt = (costNum * gstNum) / 100;
    const totalAmt = costNum + gstAmt;

    // GST Inclusive
    const basePrice = (costNum * 100) / (100 + gstNum);
    const gstInclusive = costNum - basePrice;

    const cgst = show ? gstAmt / 2 : gstInclusive / 2;
    const sgst = show ? gstAmt / 2 : gstInclusive / 2;
    const igst = show ? gstAmt : gstInclusive;

    if (show) {
      setGstAmount(gstAmt.toFixed(2));
      setTotalAmount(totalAmt.toFixed(2));
    } else {
      setGstAmount(gstInclusive.toFixed(2));
      setTotalAmount(basePrice.toFixed(2));
    }

    setCgstAmount(cgst.toFixed(2));
    setSgstAmount(sgst.toFixed(2));
    setIgstAmount(igst.toFixed(2));
    if (!gst && rates?.length > 0) {
      setGst(rates[0]);
    }
  }, [cost, gst, show, rates]);

  const handleCostChange = (e) => {
    const value = e.target.value;

    // Allow empty string (user clearing input)
    if (value === "") {
      setCost("");
      setError("");
      return;
    }

    // Ensure it's a number
    if (!/^\d+$/.test(value)) {
      setError("Only numbers are allowed");
      return;
    }

    // Check for 15 digit limit
    if (value.length > 15) {
      setError("Value must be between 1 and 10000000000");
      return;
    }

    setCost(value);
    setError("");
  };

  return (
    <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className=" container max-w-screen-xl mx-auto  3sm:px-10    ">
        <h1 className="text-2xl font-bold text-gray-800 mb-10">
          GST Calculator
        </h1>

        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0  ">
          {/* Left - Calculator Section */}
          <div className="rounded-lg px-0 pr-6 py-0   pb-15 w-full max-w-[40rem] opacity-85">
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Amount (₹)
              </label>
              <div
                className={`flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 ${
                  error
                    ? "border-red-400 shadow-sm"
                    : "border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                }`}
              >
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  type="number"
                  inputMode="numeric"
                  value={cost}
                  onChange={handleCostChange}
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            {/* Calculation Type */}
            <div className="my-8">
              <label className="block text-gray-800 font-semibold mb-2">
                Calculation Type
              </label>
              <div className="flex 3sm:flex-row flex-col gap-3 mr-7 ">
                <button
                  onClick={() => setShow(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                    show ? "bg-primary text-white " : "bg-gray-200 text-gray-700 "
                  } transition-transform duration-300 hover:scale-105 `}
                >
                  Adding GST
                </button>
                <button
                  onClick={() => setShow(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                    !show
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }  transition-transform duration-300 hover:scale-105 `}
                >
                  Exclusive GST
                </button>
              </div>
            </div>

            {/* GST Rate Selection */}
{/* GST Rate Selection */}
<div className="my-8">
  <label className="block text-gray-800 font-semibold mb-2">
    GST Rate (%)
  </label>
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-y-2">
    {rates.map((rate, index) => {
      const isVisible = showAll || index < 11;
      const isActive = parseFloat(gst) === rate;
      return (
        isVisible && (
          <button
            key={index}
            onClick={() => setGst(rate)}
            className={`py-2 rounded-lg border text-sm font-medium text-center  max-w-[80%] transition-transform duration-300 hover:scale-105 ${
              isActive
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-800 hover:border-primary"
            }`}
          >
            {rate}%
          </button>
        )
      );
    })}
  </div>
  {/* Show more/less button */}
  {/* {rates.length > 11 && (
    <button
      onClick={toggleShow}
      className="mt-3 text-sm text-primary underline hover:text-blue-700"
    >
      {showAll ? "Show Less" : "Show More"}
    </button>
  )} */}
</div>


            {/* Supply Type */}
            <div className="mt-9">
              <label className="block text-gray-800 font-semibold mb-2">
                Supply Type
              </label>
              <div className="mr-7">
              <select
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium outline-none shadow-2boxShadow "
                value={supplyType}
                onChange={(e) => setSupplyType(e.target.value)}
              >
                <option value="Inter-state">Inter-state</option>
                <option value="Intra-state">Intra-state</option>
              </select>
            </div>
            </div>
          </div>

          {/* Right - Result Section */}
          <div className="rounded-lg px-6 py-6 shadow-boxShadow bg-white w-full  ">
            {/* <div className="flex justify-between items-center my-4 bg-blue-800 py-4 px-10 rounded ">
              <h2 className="text-md font-semibold text-gray-100">
                Total Amount
              </h2>
              <p className="text-md font-semibold text-gray-100">
                ₹ {totalAmount}
              </p>
            </div> */}
           <div className="mt-5">
            <div className="space-y-4">
              <div className="flex justify-between border-b-2 py-3 border-gray-300">
                <span className="text-gray-700">Original Amount</span>
                <span className="font-semibold text-gray-700">
                  ₹ {parseFloat(cost).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">GST Amount</span>
                <span className="font-semibold text-gray-700">
                  ₹ {gstAmount}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t-2 border-gray-300">
                <p className="text-sm text-gray-600 font-semibold mb-3">
                  Breakdown
                </p>

                {supplyType === "Intra-state" ? (
                  <>
                    <div className="flex justify-between space-y-4 border-b-2 mt-1 border-gray-300">
                      <span className="text-gray-700">CGST (50%)</span>
                      <span className="font-semibold text-gray-700">
                        ₹ {cgstAmount}
                      </span>
                    </div>
                    <div className="flex justify-between border-b-2 py-4 border-gray-300">
                      <span className="text-gray-700">SGST (50%)</span>
                      <span className="font-semibold text-gray-700">
                        ₹ {sgstAmount}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between border-b-2 border-gray-300 py-2">
                    <span className="text-gray-700">IGST (100%)</span>
                    <span className="font-semibold text-gray-700">
                      ₹ {igstAmount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between mt-4 border-b-2 py-2 border-gray-300">
                  <span className="text-gray-700">GST Rate</span>
                  <span className="font-semibold text-gray-700">{gst}%</span>
                </div>
                 <div className="flex justify-between items-center mt-10 bg-green-600 py-4 px-10 rounded ">
              <h2 className="text-md font-semibold text-gray-100 uppercase">
                Total Amount
              </h2>
              <p className="text-md font-semibold text-gray-100 uppercase">
                ₹ {totalAmount}
              </p>
            </div>
            </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Additional Section */}
        <div className="mt-10">
          <h2 className="text-md font-normal text-gray-600">
            Goods and Services Tax (GST) is an indirect tax imposed in India
            which is levied on the supply of goods and services. GST is a
            comprehensive, multi-stage, destination based tax levied on every
            value addition. GST came into effect on 1st July 2017 and replaced
            most indirect taxes in the country. Under GST goods and services are
            divided into distinct tax rates such as 0%, 5%, 12%, 18%, and 28%.
            However, some products such as petroleum products, alcoholic drinks,
            and electricity are not taxed under GST. These products are taxed
            separately by the individual state governments, as per the previous
            tax regime.
          </h2>
        </div>
      </div>
    </section>
  );
}

export default GstCalculator;
