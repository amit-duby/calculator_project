import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency

function MutualFundCalculator() {
  const [tab, setTab] = useState("sip");
  const [sipAmount, setSipAmount] = useState("100000");
  const [sipYears, setSipYears] = useState("3");
  const [sipReturn, setSipReturn] = useState("10");
  const [sipResult, setSipResult] = useState(null);
  const [lumpAmount, setLumpAmount] = useState("100000");
  const [lumpYears, setLumpYears] = useState("3");
  const [lumpReturn, setLumpReturn] = useState("10");
  const [lumpResult, setLumpResult] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tab === "sip") {
      const handler = setTimeout(() => {
        calculateSIP();
      }, 500);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [sipAmount, sipYears, sipReturn, tab]);

  useEffect(() => {
    if (tab === "lumpsum") {
      const handler = setTimeout(() => {
        calculateLumpsum();
      }, 500);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [lumpAmount, lumpYears, lumpReturn, tab]);

  // SIP Calculation
  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const n = parseFloat(sipYears) * 12; // Convert years to months
    const r = parseFloat(sipReturn) / 12 / 100; // Convert annual return to monthly decimal

    // Ensure valid numbers before calculation
    if (isNaN(P) || isNaN(n) || isNaN(r) || P <= 0 || n <= 0 || r < 0) {
      setSipResult(0); // Set to 0 or null if inputs are invalid
      return;
    }

    // Future Value of an Annuity Due (payments at the beginning of the period)
    const futureValue = P * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
    setSipResult(futureValue.toFixed(2));
  };

  // Lumpsum Calculation
  const calculateLumpsum = () => {
    const P = parseFloat(lumpAmount);
    const r = parseFloat(lumpReturn) / 100;
    const n = parseFloat(lumpYears);

    // Ensure valid numbers before calculation
    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0 || r < 0) {
      setLumpResult(0); // Set to 0 or null if inputs are invalid
      return;
    }

    const futureValue = P * Math.pow(1 + r, n);
    setLumpResult(futureValue.toFixed(2));
  };

  const formatNumber = (num) => {
    if (num === null || isNaN(num)) return "";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setSipAmount(value);
      setErrors((prev) => ({ ...prev, sipAmount: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        sipAmount: "Amount cannot exceed ₹100,000,000 or 15 digits.",
      }));
    }
  };

  const handleRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
      // Changed max rate to 50%
      setSipReturn(value);
      setErrors((prev) => ({ ...prev, sipReturn: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        sipReturn: "Rate cannot exceed 50%.",
      }));
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 40 && Number(value) >= 0)) {
      // Changed max years to 40
      setSipYears(value);
      setErrors((prev) => ({ ...prev, sipYears: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        sipYears: "Investment tenure cannot exceed 40 years.", // Updated error message
      }));
    }
  };

  // lumpsum handlers
  const handleLumpsumAmountChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setLumpAmount(value);
      setErrors((prev) => ({ ...prev, lumpAmount: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lumpAmount: "Amount cannot exceed ₹100,000,000 or 15 digits.",
      }));
    }
  };

  const handleLumpsumRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
      // Changed max rate to 50%
      setLumpReturn(value);
      setErrors((prev) => ({ ...prev, lumpReturn: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lumpReturn: "Rate cannot exceed 50%.",
      }));
    }
  };

  const handleLumpsumYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 40 && Number(value) >= 0)) {
      // Changed max years to 40
      setLumpYears(value);
      setErrors((prev) => ({ ...prev, lumpYears: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lumpYears: "Investment tenure cannot exceed 40 years.", // Updated error message
      }));
    }
  };

  return (
    <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
        {/* Left Section: Introduction and Description */}
        <div className="px-1 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Mutual Fund Calculator
          </h1>
          <p className="text-md text-gray-600 mt-2">
            Estimate the future value of your Mutual Fund investments, whether
            through Systematic Investment Plans (SIPs) or Lumpsum investments.
            Plan your financial goals effectively with this calculator.
          </p>
        </div>

        {/* Right Section: Calculator Inputs and Results */}
        <div className="bg-gray-200 h-full rounded-xl flex flex-col">
          {/* Header for the Calculator */}
          <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
            <div className="flex justify-center items-center">
              <div className="space-y-1 mt-3 text-center">
                <p className="text-3xl tracking-wide font-semibold text-white">
                  Mutual Fund Calculator
                </p>
                <span className="text-gray-300 xl:text-md">
                  Plan your investments
                </span>
              </div>
              {/* Rupee icon for visual flair */}
              <div className="absolute top-2 2sm:right-20 right-4 lg:right-10 xl:right-20 2xl:right-45 md:right-30 opacity-15 bg-gray-400 border border-transparent rounded-full w-25 h-27 flex items-center justify-center">
                <FaRupeeSign size={60} className="text-white" />
              </div>
            </div>
          </div>

          {/* Input Fields Section */}
          <div className="flex-grow grid grid-cols-1 2sm:grid-cols-2 2sm:px-2 px-4 2sm:space-x-3 py-4 overflow-y-auto">
            <div className="mt-4 flex flex-col">
              <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">
                Enter Details
              </h1>

              {/* Tab Buttons */}

              <div className="bg-gray-50 rounded-xl p-6 shadow flex-grow">
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    className={`px-6 py-1.5 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      tab === "sip"
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                    onClick={() => {
                      setTab("sip");
                      setErrors({});
                    }} // Clear errors on tab change
                  >
                    SIP
                  </button>
                  <button
                    className={`px-6 py-1.5 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      tab === "lumpsum"
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                    onClick={() => {
                      setTab("lumpsum");
                      setErrors({});
                    }} // Clear errors on tab change
                  >
                    Lumpsum
                  </button>
                </div>

                {tab === "sip" && (
                  <div className="grid grid-cols-1 gap-y-5">
                    <div className="relative group">
                      <label
                        htmlFor="sipAmount"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Monthly SIP Amount (₹)
                      </label>
                      <div
                        className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                          errors.sipAmount
                            ? "border-red-500 shadow-red-300"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                      >
                        <label className="size-5 text-md font-normal text-gray-500">
                          ₹
                        </label>
                        <input
                          type="number"
                          id="sipAmount"
                          value={sipAmount}
                          onChange={handleAmountChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          min="1"
                          placeholder="e.g., 5000"
                          aria-label="Monthly SIP Amount"
                        />
                      </div>
                      {errors.sipAmount && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sipAmount}
                        </p>
                      )}
                    </div>

                    <div className="relative group">
                      <label
                        htmlFor="sipYears"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Investment Duration (Years)
                      </label>
                      <div
                        className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                          errors.sipYears
                            ? "border-red-500 shadow-red-300"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                      >
                        <input
                          type="number"
                          id="sipYears"
                          value={sipYears}
                          onChange={handleYearChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          min="1"
                          max="40" // Corrected max to 40
                          placeholder="e.g., 10"
                          aria-label="SIP Investment Duration"
                        />
                      </div>
                      {errors.sipYears && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sipYears}
                        </p>
                      )}
                    </div>
                    {/* Input: SIP Expected Annual Return */}
                    <div className="relative group">
                      <label
                        htmlFor="sipReturn"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Expected Annual Return (%)
                      </label>
                      <div
                        className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                          errors.sipReturn
                            ? "border-red-500 shadow-red-300" // Corrected border color for error
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                      >
                        <input
                          type="number"
                          id="sipReturn"
                          value={sipReturn}
                          onChange={handleRateChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          step="0.1"
                          min="0.1"
                          max="50" // Corrected max to 50
                          placeholder="e.g., 12"
                          aria-label="SIP Expected Annual Return"
                        />
                      </div>
                      {errors.sipReturn && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sipReturn}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {tab === "lumpsum" && (
                  <div className="grid grid-cols-1 gap-y-5">
                    <div className="relative group">
                      <label
                        htmlFor="lumpAmount"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Lumpsum Amount (₹)
                      </label>
                      <div
                        className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                          errors.lumpAmount
                            ? "border-red-500 shadow-red-300" // Corrected border color for error
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                      >
                        <label className="size-5 text-md font-normal text-gray-500">
                          ₹
                        </label>
                        <input
                          type="number"
                          id="lumpAmount"
                          value={lumpAmount}
                          onChange={handleLumpsumAmountChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          min="1"
                          placeholder="e.g., 100000"
                          aria-label="Lumpsum Amount"
                        />
                      </div>
                      {errors.lumpAmount && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lumpAmount}
                        </p>
                      )}
                    </div>
                    {/* Input: Lumpsum Investment Duration */}
                    <div className="relative group">
                      <label
                        htmlFor="lumpYears"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Investment Duration (Years)
                      </label>
                      <div
                        className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                          errors.lumpYears
                            ? "border-red-500 shadow-red-300" // Corrected border color for error
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                      >
                        <input
                          type="number"
                          id="lumpYears"
                          value={lumpYears}
                          onChange={handleLumpsumYearChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          min="1"
                          max="40" // Corrected max to 40
                          placeholder="e.g., 5"
                          aria-label="Lumpsum Investment Duration"
                        />
                      </div>
                      {errors.lumpYears && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lumpYears}
                        </p>
                      )}
                    </div>
                    {/* Input: Lumpsum Expected Annual Return */}
                    <div className="relative group">
                      <label
                        htmlFor="lumpReturn"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Expected Annual Return (%)
                      </label>
                      <div
                        className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                          errors.lumpReturn
                            ? "border-red-500 shadow-red-300" // Corrected border color for error
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                      >
                        <input
                          type="number"
                          id="lumpReturn"
                          value={lumpReturn}
                          onChange={handleLumpsumRateChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          step="0.1"
                          min="0.1"
                          max="50" // Corrected max to 50
                          placeholder="e.g., 15"
                          aria-label="Lumpsum Expected Annual Return"
                        />
                      </div>
                      {errors.lumpReturn && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lumpReturn}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="mt-4 flex flex-col">
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">
                Results
              </h1>
              <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
                {" "}
                {/* Added h-full here */}
                <div className="text-center">
                  <div className="space-y-4">
                    {tab === "sip" && (
                      <>
                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Investment Amount:
                          </span>
                          <span className="text-xl font-bold text-green-700">
                            ₹ {formatNumber(sipResult) || "0"}
                          </span>{" "}
                          {/* Changed "0.00" to "0" for cleaner display */}
                        </div>
                      </>
                    )}

                    {tab === "lumpsum" && (
                      <>
                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Investment Amount:
                          </span>
                          <span className="text-xl font-bold text-green-700">
                            ₹ {formatNumber(lumpResult) || "0"}
                          </span>{" "}
                          {/* Changed "0.00" to "0" for cleaner display */}
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-40 text-center">
                    * These are estimated values based on your inputs and
                    assumed rates. Actual returns may vary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MutualFundCalculator;
