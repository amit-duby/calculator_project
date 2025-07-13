import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

function MutualFundCalculator() {
  const [tab, setTab] = useState("sip"); // 'sip' or 'lumpsum'

  // SIP State
  const [sipAmount, setSipAmount] = useState("1000"); // Changed default to 1000 for realistic SIP
  const [sipYears, setSipYears] = useState("10"); // Changed default years
  const [sipReturn, setSipReturn] = useState("12"); // Changed default return
  const [sipResult, setSipResult] = useState(null); // Stores object { investedAmount, estimatedReturn, totalValue }

  // Lumpsum State
  const [lumpAmount, setLumpAmount] = useState("50000"); // Changed default to 50000 for realistic Lumpsum
  const [lumpYears, setLumpYears] = useState("10"); // Changed default years
  const [lumpReturn, setLumpReturn] = useState("12"); // Changed default return
  const [lumpResult, setLumpResult] = useState(null); // Stores object { investedAmount, estimatedReturn, totalValue }

  const [errors, setErrors] = useState({});

  // --- Validation Logic ---
  const validateInputs = (type) => {
    let isValid = true;
    let currentErrors = {};

    if (type === "sip") {
      const P = parseFloat(sipAmount);
      const n = parseFloat(sipYears);
      const r = parseFloat(sipReturn);

      if (isNaN(P) || P < 100 || P > 10000000) {
        currentErrors.sipAmount =
          "Monthly SIP Amount must be between ₹100 and ₹1,00,00,000.";
        isValid = false;
      }
      if (isNaN(n) || n <= 0 || n > 50) {
        currentErrors.sipYears = "Investment Duration must be between 1 and 50 years.";
        isValid = false;
      }
      if (isNaN(r) || r < 0.1 || r > 30) {
        // Changed min to 0.1% for consistency, max 30%
        currentErrors.sipReturn =
          "Expected Annual Return must be between 0.1% and 30%.";
        isValid = false;
      }
    } else if (type === "lumpsum") {
      const P = parseFloat(lumpAmount);
      const n = parseFloat(lumpYears);
      const r = parseFloat(lumpReturn);

      if (isNaN(P) || P < 1000 || P > 10000000) {
        currentErrors.lumpAmount =
          "Lumpsum Amount must be between ₹1,000 and ₹1,00,00,000.";
        isValid = false;
      }
      if (isNaN(n) || n <= 0 || n > 50) {
        currentErrors.lumpYears = "Investment Duration must be between 1 and 50 years.";
        isValid = false;
      }
      if (isNaN(r) || r < 0.1 || r > 30) {
        // Changed min to 0.1% for consistency, max 30%
        currentErrors.lumpReturn =
          "Expected Annual Return must be between 0.1% and 30%.";
        isValid = false;
      }
    }
    setErrors(currentErrors); // Update the errors state
    return isValid;
  };

  // --- SIP Calculation & Effect ---
  const calculateSIP = () => {
    if (!validateInputs("sip")) {
      setSipResult(null); // Clear result if inputs are invalid
      return;
    }

    const P = parseFloat(sipAmount); // Monthly investment
    const years = parseFloat(sipYears);
    const annualRate = parseFloat(sipReturn);

    // Convert annual rate to monthly decimal
    const r = annualRate / 12 / 100;
    // Convert years to total months
    const n = years * 12;

    // Total invested amount
    const investedAmount = P * n;

    // Future Value of an Annuity Due (payments at the beginning of the period)
    let futureValue;
    if (r === 0) {
      // Handle 0% interest rate separately
      futureValue = investedAmount;
    } else {
      futureValue = P * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
    }

    const estimatedReturn = futureValue - investedAmount;

    setSipResult({
      investedAmount: Math.round(investedAmount),
      estimatedReturn: Math.round(estimatedReturn),
      totalValue: Math.round(futureValue),
    });
  };

  useEffect(() => {
    // Debounce the calculation
    const handler = setTimeout(() => {
      if (tab === "sip") {
        calculateSIP();
      }
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [sipAmount, sipYears, sipReturn, tab]);

  // --- Lumpsum Calculation & Effect ---
  const calculateLumpsum = () => {
    if (!validateInputs("lumpsum")) {
      setLumpResult(null); // Clear result if inputs are invalid
      return;
    }

    const P = parseFloat(lumpAmount);
    const r = parseFloat(lumpReturn) / 100;
    const n = parseFloat(lumpYears);

    // Compound interest formula: A = P(1 + r)^n
    let futureValue = P * Math.pow(1 + r, n);
    const estimatedReturn = futureValue - P;

    setLumpResult({
      investedAmount: Math.round(P),
      estimatedReturn: Math.round(estimatedReturn),
      totalValue: Math.round(futureValue),
    });
  };

  useEffect(() => {
    // Debounce the calculation
    const handler = setTimeout(() => {
      if (tab === "lumpsum") {
        calculateLumpsum();
      }
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [lumpAmount, lumpYears, lumpReturn, tab]);

  // --- Formatting Helper ---
  const formatNumber = (num) => {
    if (num === null || isNaN(num)) return "0";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty string to clear input, but keep within bounds for actual numbers
    if (value === "" || (/^\d+$/.test(value) && value.length <= 15)) {
      setSipAmount(value);
      setErrors((prev) => ({ ...prev, sipAmount: "" }));
    } else if (value.length > 15) {
      setErrors((prev) => ({
        ...prev,
        sipAmount: "Amount cannot exceed 15 digits.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        sipAmount: "Invalid input. Please enter a number.",
      }));
    }
  };

  const handleRateChange = (e) => {
    const value = e.target.value;
    // Allow empty string, and numbers between 0 and 30 (inclusive of 0.1 for min validation)
    if (value === "" || (Number(value) <= 30 && Number(value) >= 0)) {
      setSipReturn(value);
      setErrors((prev) => ({ ...prev, sipReturn: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        sipReturn: "Expected Annual Return must be between 0.1% and 30%.",
      }));
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    // Allow empty string, and numbers between 0 and 50 (inclusive of 1 for min validation)
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
      setSipYears(value);
      setErrors((prev) => ({ ...prev, sipYears: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        sipYears: "Investment Duration must be between 1 and 50 years.",
      }));
    }
  };

  // lumpsum handlers
  const handleLumpsumAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value.length <= 15)) {
      setLumpAmount(value);
      setErrors((prev) => ({ ...prev, lumpAmount: "" }));
    } else if (value.length > 15) {
      setErrors((prev) => ({
        ...prev,
        lumpAmount: "Amount cannot exceed 15 digits.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lumpAmount: "Invalid input. Please enter a number.",
      }));
    }
  };

  const handleLumpsumRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 30 && Number(value) >= 0)) {
      setLumpReturn(value);
      setErrors((prev) => ({ ...prev, lumpReturn: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lumpReturn: "Expected Annual Return must be between 0.1% and 30%.",
      }));
    }
  };

  const handleLumpsumYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
      setLumpYears(value);
      setErrors((prev) => ({ ...prev, lumpYears: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lumpYears: "Investment Duration must be between 1 and 50 years.",
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
                          min="100" // Set min attribute
                          max="10000000" // Set max attribute
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
                          max="50" // Corrected max to 50
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
                          max="30" // Corrected max to 30
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
                          min="1000" // Set min attribute
                          max="10000000" // Set max attribute
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
                          max="50" // Corrected max to 50
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
                          max="30" // Corrected max to 30
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
                    {tab === "sip" && sipResult && (
                      <>
                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Invested Amount:
                          </span>
                          <span className="text-xl font-bold text-green-700">
                            ₹ {formatNumber(sipResult.investedAmount)}
                          </span>
                        </div>
                        <div className="flex flex-col justify-between items-center bg-yellow-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Estimated Returns:
                          </span>
                          <span className="text-xl font-bold text-yellow-700">
                            ₹ {formatNumber(sipResult.estimatedReturn)}
                          </span>
                        </div>
                        <div className="flex flex-col justify-between items-center bg-blue-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Total Value:
                          </span>
                          <span className="text-xl font-bold text-blue-700">
                            ₹ {formatNumber(sipResult.totalValue)}
                          </span>
                        </div>
                      </>
                    )}

                    {tab === "lumpsum" && lumpResult && (
                      <>
                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Invested Amount:
                          </span>
                          <span className="text-xl font-bold text-green-700">
                            ₹ {formatNumber(lumpResult.investedAmount)}
                          </span>
                        </div>
                        <div className="flex flex-col justify-between items-center bg-yellow-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Estimated Returns:
                          </span>
                          <span className="text-xl font-bold text-green-700">
                            ₹ {formatNumber(lumpResult.estimatedReturn)}
                          </span>
                        </div>
                        <div className="flex flex-col justify-between items-center bg-blue-50 p-4 rounded-lg shadow-sm">
                          <span className="text-lg font-semibold text-gray-700">
                            Total Value:
                          </span>
                          <span className="text-xl font-bold text-green-700">
                            ₹ {formatNumber(lumpResult.totalValue)}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Display placeholder if no result yet */}
                    {((tab === "sip" && !sipResult) ||
                      (tab === "lumpsum" && !lumpResult)) && (
                      <div className="text-white text-lg">
                        Enter your investment details to see the results.
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mt-5 text-center">
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