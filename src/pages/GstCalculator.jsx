import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
function GstCalculator() {
  const [show, setShow] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [cost, setCost] = useState("");
  const [gst, setGst] = useState([]);
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
    <div className="container px-2 py-4 w-full h-full mx-auto">
      <div className="grid lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] 2xl:grid-cols-[700px_1fr] grid-cols-1 gap-2">
        {/* Left Card: Information */}
        <div className="px-1.5 py-6 border border-amber-500">
          {" "}
          {/* Added vertical padding for consistency */}
          <h1 className="text-3xl font-semibold w-60 mb-4">
            GST Calculator
          </h1>{" "}
          {/* Added margin-bottom */}
          <span className="text-md text-gray-600">
            The Goods and Services Tax (GST) is a landmark indirect tax reform
            implemented in India on July 1st, 2017. Designed to create a "One
            Nation, One Tax" regime, GST replaced a multitude of indirect taxes
            previously levied by both central and state governments. This
            comprehensive, multi-stage, destination-based tax is applied to the
            supply of goods and services, ensuring tax is collected cumulatively
            at the final stage of consumption.
          </span>
        </div>

        {/* Right Card: Main Calculator Area */}
        <div className="bg-secondary h-full rounded-xl flex flex-col pb-5">
          {" "}
          {/* Added flex flex-col to enable vertical stacking and flex-grow on children */}
          <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
            <div className="flex justify-center items-center">
              <div className="space-y-1 mt-3">
                <p className="text-3xl tracking-wide font-semibold text-white">
                  GST Calculator
                </p>
                <span className="text-gray-300 xl:text-md">
                  Simple, accurate tax calculation
                </span>
              </div>
              {/* Rupee icon with improved visibility */}
              <div className="absolute top-2 2sm:right-20 right-4 lg:right-10 xl:right-20 2xl:right-45 md:right-30 opacity-15 bg-gray-400 border border-transparent rounded-full w-25 h-27 flex items-center justify-center">
                <FaRupeeSign size={60} className="text-white" />
              </div>
            </div>
          </div>
          {/* Calculator Input and Results Section - Using flex-grow to fill remaining vertical space */}
          <div className="flex-grow grid 2sm:grid-cols-2  2sm:px-2 px-4 2sm:space-x-3 py-4 overflow-y-auto ">
            {" "}
            {/* overflow-y-auto for internal scrolling if content is too long */}
            {/* Enter Details Section */}
            <div className="mt-4 flex flex-col">
              {" "}
              {/* flex-col to stack its children vertically */}
              <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">
                Enter Details
              </h1>
              <div className="bg-IntColor rounded-xl px-8 pt-4 pb-16 flex-grow flex flex-col justify-between">
                {" "}
                {/* flex-grow to fill available space, py-4 for internal padding */}
                <div>
                  {" "}
                  {/* Grouping top elements */}
                  <div className="grid">
                    <label className="py-3.5 px-0.5 text-gray-800 font-semibold">
                      Amount (₹)
                    </label>

                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
        ${
          error
            ? "border-borderColor shadow-red-300"
            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
        }
      `}
                    >
                      <label className="size-5 text-md font-normal text-gray-500">
                        ₹
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={cost}
                        onChange={handleCostChange}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        placeholder="0.00"
                        min="0"
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}
                  </div>
                  <div className="grid py-2">
                    <label className="py-2 text-gray-800 font-semibold capitalize">
                      Calculation Type
                    </label>
                    <div className="flex justify-between items-center gap-2 py-2 rounded-lg w-full">
                      <div
                        className={`${
                          show
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-700"
                        } rounded-lg w-full py-2 flex justify-center items-center cursor-pointer transition-colors duration-200`}
                        onClick={() => setShow(true)}
                      >
                        <span className="text-[10px] font-medium">Add GST</span>
                      </div>
                      <div
                        className={`${
                          !show
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-700"
                        } rounded-lg w-full py-2 flex justify-center items-center cursor-pointer transition-colors duration-200`}
                        onClick={() => setShow(false)}
                      >
                        <span className="text-[10px] font-medium">
                          Extract GST
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid">
                    <label className="py-3 text-gray-800 font-semibold">
                      GST Rate <span className="text-gray-600 px-1">(%)</span>
                    </label>
                    <div className="flex flex-wrap w-full gap-2">
                      {rates?.map((rate, index) => {
                        const isVisible = showAll || index < 5;
                        const isActive = gst === rate;
                        return (
                          isVisible && (
                            <div
                              key={index}
                              onClick={() => setGst(rate)}
                              className={`flex-1 min-w-[70px] h-9 border border-gray-300 cursor-pointer flex justify-center items-center ${
                                isActive
                                  ? "bg-primary text-white"
                                  : "bg-white text-gray-800 hover:border-primary"
                              } rounded-lg text-sm font-medium transition-colors duration-200`}
                            >
                              {rate}%
                            </div>
                          )
                        );
                      })}
                    </div>
                    {rates.length > 5 && (
                      <div className="mt-4 px-0.5">
                        <button
                          onClick={toggleShow}
                          className="text-sm font-medium cursor-pointer text-primary underline hover:text-blue-800"
                        >
                          {showAll ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid py-2">
                  <label className="text-gray-800 py-4 px-0.5 font-semibold">
                    Supply-Type
                  </label>
                  <select
                    className="w-full p-3 border rounded-xl border-gray-300 text-gray-700 font-medium outline-0"
                    value={supplyType}
                    onChange={(e) => setSupplyType(e.target.value)}
                  >
                    <option value="Inter-state">Inter-state</option>
                    <option value="Intra-state">Intra-state</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Results Section */}
            <div className="mt-4 flex flex-col">
              {" "}
              {/* flex-col to stack its children vertically */}
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">
                Results
              </h1>
              <div className="text-white rounded-lg px-5 py-6 bg-primary flex-grow flex flex-col justify-between space-y-4">
                {" "}
                {/* flex-grow to fill available space, py-6 for internal padding */}
                <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
                  {" "}
                  {/* Top part of results */}
                  <h1 className="text-lg font-semibold text-gray-700">
                    {" "}
                    {/* Increased font size and added margin */}
                    Total Amount
                  </h1>
                  <p className="text-xl font-bold text-green-700">
                    <span>₹</span> {totalAmount}
                  </p>{" "}
                  {/* Increased font size and weight */}
                </div>
                <div className="flex flex-col space-y-4">
                  {" "}
                  {/* Added margin-top */}
                  <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
                    <p className="text-lg font-semibold text-gray-700">
                      Original Amount
                    </p>{" "}
                    {/* Adjusted color and font size */}
                    <p className="text-xl font-bold text-green-700">
                      <span>₹</span> {parseFloat(cost).toFixed(2)}
                    </p>{" "}
                    {/* Ensure cost is formatted */}
                  </div>
                  <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold text-gray-700">
                      {" "}
                      GST Amount
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      ₹ {gstAmount}
                    </p>
                  </div>
                  <p className="font-semibold text-md  text-gray-400 mt-2 ">
                    Breackdown
                  </p>
                  <div className="border-b border-gray-600 "></div>
                  {/* <div className="flex justify-between py-1">
                    <p className="text-gray-400 text-sm font-normal"> GST Amount</p>
                    <p className="font-semibold text-md text-white">₹ {gstAmount}</p>
                  </div> */}
                  {supplyType === "Intra-state" && (
                    <div className="space-y-4 mt-2">
                      <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
                        <p className="text-lg font-semibold text-gray-700">
                          CGST (50%)
                        </p>
                        <p className="text-xl font-bold text-green-700">
                          ₹ {cgstAmount}
                        </p>
                      </div>
                      <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
                        <p className="text-lg font-semibold text-gray-700">
                          SGST (50%)
                        </p>
                        <p className="text-xl font-bold text-green-700">
                          ₹ {sgstAmount}
                        </p>
                      </div>
                    </div>
                  )}
                  {supplyType === "Inter-state" && (
                    <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
                      <p className="text-lg font-semibold text-gray-700">
                        IGST (100%)
                      </p>
                      <p className="text-xl font-bold text-green-700">
                        ₹ {igstAmount}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm ">
                    <p className="text-lg font-semibold text-gray-700">
                      GST RATE
                    </p>
                    <p className="text-xl font-bold text-green-700">{gst}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GstCalculator;
