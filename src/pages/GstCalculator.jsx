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
import { ChevronDown, ChevronUp, AlertCircle, Clock, CheckCircle } from "lucide-react";
import gstlogo from "../assets/gstlogo.png";
import gsttype from "../assets/gsttypes.png";
import critical from "../assets/criticalupdates.png";
import calculator from "../assets/GstCalculator.png"
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

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (i) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const faqs = [
    {
      q: "What are the major GST changes effective July 2025?",
      a: "From July 1, 2025, GSTR-3B will be hard-locked based on auto-populated data from GSTR-1/1A/IFF, meaning manual edits for outward supply liability will no longer be allowed. A strict three-year time limit for filing all GST returns (GSTR-1, 3B, etc.) is also now in effect. The new E-Way Bill 2.0 portal has also been launched for improved stability and real-time synchronization.",
    },
    {
      q: "Why is GSTR-3B becoming non-editable from July 2025?",
      a: "This change aims to ensure greater consistency between GSTR-1 (sales data) and GSTR-3B (tax payment summary), reducing discrepancies, curbing fraudulent Input Tax Credit (ITC) claims, and moving towards a more digitally governed and accurate GST ecosystem.",
    },
    {
      q: "What is the new 3-year time limit for filing GST returns?",
      a: "Effective July 1, 2025, any GST return (including GSTR-1, GSTR-3B, GSTR-9) that is more than three years past its original due date will be permanently blocked from filing on the GST portal. Taxpayers with pending returns older than this limit were advised to clear them by June 30, 2025.",
    },
    {
      q: "Is the UniCX GST calculator updated for 2025 with the latest rules?",
      a: "Yes. UniCX is committed to keeping this calculator and all our resources fully updated in line with current Indian GST rules, latest notifications, and all applicable slab rates to ensure accuracy for 2025 and beyond.",
    },
    {
      q: "What are the current GST slab rates in India?",
      a: "The primary GST slab rates are 0%, 5%, 12%, 18%, and 28%. Specific goods and services fall under different slabs. It's important to note that discussions are ongoing regarding potential rationalization of these slabs, including the possible removal of the 12% bracket. Some essential items are exempt from GST.",
    },
    {
      q: "What is Input Tax Credit (ITC) under GST?",
      a: "<strong>Input Tax Credit (ITC)</strong> is a fundamental mechanism under GST that allows businesses to claim credit for the GST paid on purchases of goods or services used in the course or furtherance of business. This reduces the overall tax burden by avoiding the cascading effect of taxes.",
    },
  ];

  return (
    <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className=" container max-w-screen-xl mx-auto  3sm:px-10    ">
       
        <section className="my-3">
           <h1 className="text-4xl font-medium text-gray-900 mb-5">
          GST Calculator
        </h1>
        <p className="mb-8">
           The <strong>GST Calculator</strong> by <strong>UniCX</strong>, your
          trusted partner from <strong>UniconsultX Solutions Private Limited</strong>,
          allows you to calculate Goods and Services Tax (GST) accurately and
          instantly. Whether you're issuing invoices, checking product pricing,
          or needing to understand your tax breakdown, this
          <strong> free online tool</strong> simplifies your GST computations
          and ensures compliance with Indian tax laws.
        </p>
      </section>
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
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-y-2 gap-x-1.5 mr-7">
    {rates.map((rate, index) => {
      const isVisible = showAll || index < 11;
      const isActive = parseFloat(gst) === rate;
      return (
        isVisible && (
          <button
            key={index}
            onClick={() => setGst(rate)}
            className={`py-2 rounded-lg border text-sm font-medium text-center  w-full transition-transform duration-300 hover:scale-105 ${
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
        <div className="mt-10 ">
         
  <div className="space-y-12 text-gray-800 text-[15px] leading-relaxed  ">
      {/* Intro - Expanded */}
      <section className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm  ">
        <h2 className="text-2xl font-bold text-blue-700 mb-3 gap-2 flex items-center">
         {/* <img
          src={critical}
          alt="Critical GST Updates - Announcement icon"
          className="w-8 h-8 rounded-full flex-shrink-0" 
        /> */}
         <AlertCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
          Important GST Updates: What's New from July 2025!
        </h2>
        
        
        <p className="text-blue-800 mb-4">
          The <strong>GST framework in India</strong> has undergone significant
          procedural updates effective <strong>July 1, 2025</strong>. It is
          crucial for all taxpayers to understand and adapt to these changes to
          maintain compliance and avoid penalties.
        </p>
        <ul className="list-inside space-y-8 text-blue-700">
          <li>
            <strong className="flex items-start">
              <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
              GSTR-3B Auto-Locking:
            </strong>
            <span className="block ml-6 -mt-1">
              From the <strong>July 2025 tax period</strong> (to be filed in August),
              your <strong>GSTR-3B</strong> will be <strong>hard-locked</strong> based on
              auto-populated data from <strong>GSTR-1, GSTR-1A, or IFF</strong>. Manual
              editing of outward supply liability will no longer be permitted.
              Ensure your <strong>GSTR-1/IFF</strong> is accurate, and use{" "}
              <strong>GSTR-1A</strong> for any corrections *before* filing
              GSTR-3B.
            </span>
          </li>
          <li>
            <strong className="flex items-start">
              <Clock size={18} className="mr-2 mt-1 flex-shrink-0" />
              Strict 3-Year Time Limit for Returns:
            </strong>
            <span className="block ml-6 -mt-1">
              A <strong>strict three-year deadline</strong> is now enforced for filing
              all GST returns (<strong>GSTR-1, 3B, 4, 5, 5A, 6, 7, 8, 9</strong>) from their
              original due dates. Returns older than this limit were permanently
              blocked from <strong>July 1, 2025</strong>. Ensure all past compliance is up
              to date to avoid loss of Input Tax Credit (ITC) or penalties.
            </span>
          </li>
          <li>
            <strong className="flex items-start">
              <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
              New E-Way Bill Portal 2.0:
            </strong>
            <span className="block ml-6 -mt-1">
              The <strong>E-Way Bill 2.0 portal</strong> (accessible at{" "}
              <a
                href="https://ewaybill2.gst.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ewaybill2.gst.gov.in
              </a>
              ) has been launched for enhanced stability, uninterrupted access, and
              real-time synchronization of data with the existing portal. Your
              existing credentials work on both.
            </span>
          </li>
          <li>
            <strong className="flex items-start">
              <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
              12% GST Slab Review:
            </strong>
            <span className="block ml-6 -mt-1">
              The GST Council is actively discussing a major revamp, potentially
              <strong>removing the 12% GST slab</strong> and redistributing items
              between the 5% and 18% brackets. Stay tuned for official announcements, as
              this could significantly impact various goods and services.
            </span>
          </li>
        </ul>
        <p className="text-blue-800 mt-4 font-semibold">
          UniCX is here to help you navigate these changes! For personalized guidance,{" "}
          <a href="#contact" className="text-blue-700 hover:underline">
            contact our GST experts
          </a>.
        </p>

      </section>

      {/* What is GST - Expanded */}
      <section > 
        
          
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4  ">
            
            <div className="">
              <h2 className="text-2xl font-bold mb-3">
            What is Goods and Services Tax (GST) in India?
          </h2>
              <p>
            <strong>GST (Goods and Services Tax)</strong> is a landmark unified,
            indirect tax system introduced in India on{" "}
            <strong>July 1, 2017</strong>. It marked a significant reform,
            replacing a multitude of cascading indirect taxes such as{" "}
            <strong>Value Added Tax (VAT)</strong>,{" "}
            <strong>Service Tax</strong>, <strong>Excise Duty</strong>, and more.
            GST is levied at each step of the supply chain on the "supply" of
            goods and services and is ultimately borne by the final consumer,
            creating a "One Nation, One Tax" regime across India.
          </p>
          <p>
            As a <strong>comprehensive, multi-stage, destination-based tax</strong>,
            GST aims to streamline taxation, reduce complexity, and foster
            economic growth by eliminating the tax-on-tax effect through the robust{" "}
            <strong>Input Tax Credit (ITC)</strong> mechanism. Goods and services
            are primarily categorized into <strong>five distinct GST slabs</strong>:{" "}
            <strong>0%, 5%, 12%, 18%, and 28%</strong>, although some products
            like petroleum, alcoholic drinks, and electricity are not taxed under
            GST and fall under the purview of individual state governments.
          </p>
            </div>
            <div className="flex justify-center items-center  mt-[-18px] max-h-[300px]  rounded cursor-pointer hover:scale-102 transition-transform duration-300 "> 
          <img
            src={gstlogo}
            alt="GST India Logo | Goods and Services Tax explained"
            className=" w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain" 
          />
        </div>
          </div>
          
        
        
      </section>

      {/* Types of GST - Expanded */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">
          Types of GST in India: CGST, SGST, IGST, UTGST Explained
        </h2>
        <p className="mb-4">
          Understanding the <strong>four types of GST</strong> is crucial for
          accurate tax computation and compliance, as they apply depending on
          the nature and location of the supply:
        </p>
        {/* The "Abstract Interconnectedness" image you liked */}
       
        <div className="grid lg:grid-cols-2 "> 
           <div className="flex justify-center items-center py-4 rounded-2xl ">
          <img
            src={gsttype}
            alt="Abstract minimalist graphic representing interconnectedness of GST types"
            className="w-full max-w-lg object-contain h-auto max-h-[400px] xl:max-h-[400px] " 
          />
        </div>
          <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg">CGST (Central GST)</h3>
            <p className="text-sm text-gray-600">
              <strong>Central Goods and Services Tax</strong>. Collected by the{" "}
              <strong>Central Government</strong> for{" "}
              <strong>intra-state (within the same state/UT)</strong> supply of
              goods and services. Governed by the CGST Act and is charged along
              with SGST (or UTGST).
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg">SGST (State GST)</h3>
            <p className="text-sm text-gray-600">
              <strong>State Goods and Services Tax</strong>. Collected by the{" "}
              <strong>State Government</strong> for{" "}
              <strong>intra-state (within the same state/UT)</strong> supply of
              goods and services. Governed by the respective SGST Act and is
              charged along with CGST.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg">IGST (Integrated GST)</h3>
            <p className="text-sm text-gray-600">
              <strong>Integrated Goods and Services Tax</strong>. Collected by
              the <strong>Central Government</strong> on{" "}
              <strong>inter-state (between different states/UTs)</strong>{" "}
              supply of goods and services, as well as on{" "}
              <strong>imports</strong>. The collected IGST is then distributed
              among the respective states.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg">UTGST (Union Territory GST)</h3>
            <p className="text-sm text-gray-600">
              <strong>Union Territory Goods and Services Tax</strong>.
              Applicable on the supply of goods or services within any of{" "}
              <strong>India's eight Union Territories</strong>. Collected along
              with CGST, similar to SGST.
            </p>
          </div>
          </div>
        </div>
      </section>
          
        {/* </div> */}
        
       
   

      {/* How to Use This Calculator - Expanded */}
      <section className="">
       
        <h2 className="text-2xl font-bold mb-3">
          How to Use the UniCX Free Online GST Calculator
        </h2>
         <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
          <div className="">
        <p>
          Our <strong>user-friendly GST calculator</strong> simplifies complex
          tax computations. Follow these simple steps to get{" "}
          <strong>accurate results instantly</strong>:
        </p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            <strong>Enter the Price:</strong> Input the base price of your
            goods or services in the designated "Amount" field.
          </li>
          <li>
            <strong>Select Calculation Type:</strong> Choose whether the price
            you entered is "Inclusive of Tax" (to extract GST) or "Exclusive of
            Tax" (to add GST).
          </li>
          <li>
            <strong>Choose GST Rate:</strong> Select the applicable GST rate
            (e.g., 5%, 12%, 18%, or 28%) from the available options. This
            corresponds to the tax slab for your specific product or service.
          </li>
          <li>
            <strong>Pick Supply Type (if applicable):</strong> Indicate if the
            supply is Inter-state or Intra-state. Our calculator intelligently
            determines the <strong>CGST, SGST</strong>, or <strong>IGST</strong> components.
          </li>
          <li>
            <strong>View Instant Breakdown:</strong> The calculator will
            automatically display a clear breakdown of the total amount, GST
            amount, and the net amount, helping you understand your tax
            liabilities.
          </li>
        </ol>
        </div>


<div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300 "> 
          <img
            src={calculator}
            alt="GST India Logo | Goods and Services Tax explained"
            className=" w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain " 
          />
        </div>
        </div>
      </section>

      {/* Example Box - Expanded with Formulas */}
      <section className=''>
        <h2 className="text-2xl font-bold mb-3">
          GST Calculation Formulas & Practical Examples
        </h2>
        <p>
          While our <strong>UniCX GST Calculator</strong> automates everything,
          understanding the underlying formulas can provide deeper insights into
          your tax liabilities:
        </p>
            <h3 className="font-semibold text-xl mt-4 mb-2">
              1. When the Price is Exclusive of GST (Adding GST):
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>GST Amount</strong> = (Value of Supply x GST%) / 100
              </li>
              <li>
                <strong>Price to be Charged</strong> = Value of Supply + GST Amount
              </li>
            </ul>

            <h3 className="font-semibold text-xl mt-4 mb-2">
              2. When the Price is Inclusive of GST (Removing GST):
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>GST Amount</strong> = Value of Supply – [Value of Supply x
                {`{100 / (100 + GST%)}`}]
              </li>
              <li>
                <strong>Original Price (Pre-GST)</strong> = Value of Supply - GST
                Amount
              </li>
            </ul>
         
        <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
          <p className="text-gray-700 mb-2">
            🧮 <strong>Simple Calculation Example:</strong>
          </p>
          <p className="text-green-700 font-semibold">
            Original Amount (Exclusive of GST): <strong>₹1,000</strong>
          </p>
          <p className="text-green-700 font-semibold">
            Applicable GST Rate: <strong>18%</strong>
          </p>
          <p className="text-green-700 font-semibold">
            Calculated GST (18% of ₹1,000): <strong>₹180</strong>
          </p>
          <p className="text-primary font-bold text-lg">
            Total Amount (Inclusive of GST): <strong>₹1,180</strong>
          </p>
        </div>

        <p className="mt-4">
          <strong>Impact of GST across the Supply Chain:</strong> GST's{" "}
          <strong>Input Tax Credit (ITC) mechanism</strong> significantly
          reduces the cascading effect of taxes (tax on tax), benefiting{" "}
          <strong>manufacturers, wholesalers, and retailers</strong>, and
          ultimately leading to potentially lower prices for the{" "}
          <strong>end consumer</strong>.
        </p>

      </section>

      {/* Who Can Benefit from the UniCX GST Calculator? - Maintained */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">
          Who Can Benefit from the UniCX GST Calculator?
        </h2>
        <p>
          Our <strong>GST calculator</strong> is a versatile tool designed to
          assist a wide range of users in accurately managing their GST-related
          calculations:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Small business owners & startups:</strong> For accurate
            invoicing and expense tracking.
          </li>
          <li>
            <strong>Freelancers and service providers:</strong> To easily
            determine service charges inclusive or exclusive of GST.
          </li>
          <li>
            <strong>Retailers and e-commerce sellers:</strong> For precise
            product pricing and tax compliance.
          </li>
          <li>
            <strong>Manufacturers and Wholesalers:</strong> To calculate GST
            payable at each stage of the supply chain and manage Input Tax
            Credit effectively.
          </li>
          <li>
            <strong>Customers:</strong> To verify the final GST charges on
            purchases.
          </li>
          <li>
            <strong>Accountants & Tax Professionals:</strong> As a quick
            verification tool for clients' GST computations.
          </li>
        </ul>
      </section>

      {/* Advantages of GST Calculator - NEW Section */}
      <section className=''>
        <h2 className="text-2xl font-bold mb-3">
          Advantages of Using the UniCX GST Calculator
        </h2>
        <p>
          Leveraging our <strong>free online GST calculator</strong> offers
          significant benefits for individuals and businesses alike:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Accuracy Guaranteed:</strong> Automated calculations
            eliminate the common errors associated with manual tax computations,
            ensuring precise GST calculations for invoicing, pricing, and tax
            filings.
          </li>
          <li>
            <strong>Significant Time Savings:</strong> Get instant results,
            freeing up valuable time that can be redirected to core business
            activities and strategic planning.
          </li>
          <li>
            <strong>Simplifies Complexity:</strong> Easily bifurcate between
            CGST, SGST, and IGST components, providing clarity in your tax
            breakdown.
          </li>
          <li>
            <strong>Aids Budgeting & Pricing:</strong> Quickly determine net or
            gross product prices based on GST rates, which is essential for
            effective financial planning and competitive pricing.
          </li>
          <li>
            <strong>Ensures Compliance:</strong> Helps you stay on top of your
            GST liabilities and prevents potential penalties due to calculation
            errors.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Designed for ease of use,
            even for individuals without extensive tax knowledge, making GST
            accessible to everyone.
          </li>
        </ul>
      </section>

      {/* Tip box - Maintained */}
      <section className="">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
          <p className="text-sm text-yellow-700">
            <strong>UniCX Tip:</strong> For B2B invoices, always display both
            CGST and SGST (or IGST for inter-state supplies) clearly. This helps
            your clients accurately claim their <strong>Input Tax Credit (ITC)</strong>,
            which is a cornerstone of the GST regime. Remember the new GSTR-3B
            locking rules for July 2025!
          </p>
        </div>
      </section>

      {/* UniCX Expert Support & Resources - NEW Section */}
      <section id="contact" className="">
        <h2 className="text-2xl font-bold mb-3">
          Beyond Calculations: UniCX - Your Partner in GST Compliance & Growth
        </h2>
        <p>
          At <strong>UniconsultX Solutions Private Limited (UniCX)</strong>, our
          commitment extends beyond providing a powerful GST calculator. We
          understand that <strong>GST is a dynamic and evolving tax regime</strong>,
          and navigating its complexities requires more than just tools. That's
          why we offer <strong>comprehensive support and resources</strong> to
          ensure your business remains compliant and leverages GST for
          sustainable growth.
        </p>
        <h3 className="font-semibold text-xl mt-4 mb-2">
          Our Expert GST Services Include:
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>GST Registration Guidance:</strong> Seamless assistance
            with obtaining your <strong>Goods and Services Tax Identification Number (GSTIN)</strong>.
          </li>
          <li>
            <strong>GST Return Filing Support:</strong> Expert help with
            accurate and timely filing of various GST returns (e.g., GSTR-1,
            GSTR-3B), keeping in mind the new 3-year time limit and GSTR-3B
            auto-locking.
          </li>
          <li>
            <strong>Input Tax Credit (ITC) Optimization:</strong> Strategies
            to maximize your ITC claims, reducing your overall tax liability and
            ensuring compliance with the latest rules.
          </li>
          <li>
            <strong>GST Advisory & Consulting:</strong> Personalized advice on
            complex GST issues, ensuring your business adheres to the latest
            regulations and avoids pitfalls, including guidance on new e-way
            bill procedures.
          </li>
          <li>
            <strong>GST Audit & Reconciliation:</strong> Support for GST audits
            and reconciling your books with GST records.
          </li>
          <li>
            <strong>Educational Resources:</strong> Access to informative
            articles, FAQs, and timely updates on GST laws and amendments.
          </li>
        </ul>
        <p className="mt-4">
          <strong>Stay Ahead with UniCX:</strong> We are dedicated to being your
          reliable source for all things GST. Explore our website for more
          in-depth articles, common FAQs, and the latest updates from the GST
          Council. Partner with UniCX for peace of mind in your GST journey.
        </p>
        <div className="mt-6 text-center">
          <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
            Get Expert GST Consultation
          </button>
        </div>
      </section>

      {/* FAQs - Maintained with updated Q&A */}
        <section>
      <h2 className="text-2xl font-bold mb-3">
        Frequently Asked Questions (FAQs) about GST
      </h2>
      <div className=" ">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`py-2  cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${ // Added duration for smoother background change
              openFAQ === i ? "bg-blue-50 rounded-lg " : ""
            }`}
            onClick={() => toggleFAQ(i)}
          >
            <div
              className={`flex justify-between items-center px-3  ${
                openFAQ !== i ? "border border-gray-300 rounded-lg py-3" : ""
              }`}
            >
              <p className="font-semibold">{faq.q}</p>
              {openFAQ === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {/* Added transition classes to the answer paragraph */}
            <p
              className={`text-gray-800 text-md font-normal px-3  ${
                openFAQ === i ? "max-h-[500px] opacity-100 py-2 " : "max-h-0 opacity-0"
              }`}
            >
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>

      {/* Footer note - Maintained */}
      <section className="pt-6 border-t mt-6">
        <p className="text-sm text-gray-500">
          This GST calculator and information is developed and maintained by{" "}
          <strong>UniCX (UniconsultX Solutions Private Limited)</strong> to help
          users simplify Goods and Services Tax computations as per current
          Indian tax laws. For complex tax situations or personalized advice,
          always consult with a qualified tax professional or{" "}
          <a href="#contact" className="text-blue-600 hover:underline">
            contact UniCX directly
          </a>
          .
        </p>
      </section>
    </div>
        </div>
      </div>
    </section>
  );
}

export default GstCalculator;
