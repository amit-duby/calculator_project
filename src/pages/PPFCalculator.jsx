import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency

function PPFCalculator() {
  // State variables to store user inputs and calculated results
  const [perPeriodDeposit, setPerPeriodDeposit] = useState("10000");
  const [tenure, setTenure] = useState("15"); // Default tenure in years
  const [interestRate, setInterestRate] = useState("7.1"); // Current PPF interest rate (as of Q1 FY2025-26)
  const [investmentFrequency, setInvestmentFrequency] = useState("annual"); // 'annual', 'monthly', 'quarterly', 'half-yearly'

  const [maturityAmount, setMaturityAmount] = useState(0); // Calculated maturity amount
  const [totalInvestment, setTotalInvestment] = useState(0); // Calculated total investment
  const [totalInterest, setTotalInterest] = useState(0); // Calculated total interest earned
  const [errors, setErrors] = useState({}); // State for error messages

  // Helper to format numbers with Indian locale
  const formatNumber = (num) => {
    if (num === null || isNaN(num)) return "0.00";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // Core function to calculate PPF maturity and interest using Future Value of Annuity Due
  const calculatePPF = () => {
    const P = parseFloat(perPeriodDeposit);
    const T = parseFloat(tenure);
    const R = parseFloat(interestRate);

    const rate = R / 100; // Annual interest rate (decimal)
    let effectiveAnnualInvestment = 0;

    // Determine the effective annual investment based on frequency
    switch (investmentFrequency) {
      case "monthly":
        effectiveAnnualInvestment = P * 12;
        break;
      case "quarterly":
        effectiveAnnualInvestment = P * 4;
        break;
      case "half-yearly":
        effectiveAnnualInvestment = P * 2;
        break;
      case "annual":
      default: // Default to annual if no match
        effectiveAnnualInvestment = P;
        break;
    }

    const annuityFactor = (Math.pow(1 + rate, T) - 1) / rate;
    const calculatedMaturity =
      effectiveAnnualInvestment * annuityFactor * (1 + rate);

    const calculatedTotalInvestment = effectiveAnnualInvestment * T;
    const calculatedTotalInterest =
      calculatedMaturity - calculatedTotalInvestment;

    // Update state with calculated values, rounded to two decimal places
    setMaturityAmount(parseFloat(calculatedMaturity.toFixed(2)));
    setTotalInvestment(parseFloat(calculatedTotalInvestment.toFixed(2)));
    setTotalInterest(parseFloat(calculatedTotalInterest.toFixed(2)));
  };

  useEffect(() => {
    calculatePPF();
  }, [perPeriodDeposit, tenure, interestRate, investmentFrequency]); // Dependencies for recalculation

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setPerPeriodDeposit(value);
      setErrors((prev) => ({ ...prev, perPeriodDeposit: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        perPeriodDeposit: "Amount cannot exceed ₹100,000,000 or 15 digits.",
      }));
    }
  };

  const handleRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
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
      setTenure(value);
      setErrors((prev) => ({ ...prev, tenure: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        tenure: "Investment tenure cannot exceed 40 years.",
      }));
    }
  };

  return (
    <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
        <div className="px-1 py-6">
          <h1 className="text-2xl font-bold text-gray-900">PPF Calculator</h1>
          <p className="text-md text-gray-600 mt-2">
            Calculate the maturity amount and interest earned on your Public
            Provident Fund (PPF) investments.
          </p>
        </div>
        <div className="bg-secondary h-full rounded-xl flex flex-col">
          <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
            <div className="flex justify-center items-center">
              <div className="space-y-1 mt-3 text-center">
                <p className="text-3xl tracking-wide font-semibold text-white">
                  PPF Calculator
                </p>
                <span className="text-gray-300 xl:text-md">
                  Plan Your Savings
                </span>
              </div>
              {/* Rupee icon for visual flair */}
              <div className="absolute top-2 2sm:right-20 right-4 lg:right-10 xl:right-20 2xl:right-45 md:right-30 opacity-15 bg-gray-400 border border-transparent rounded-full w-25 h-27 flex items-center justify-center">
                <FaRupeeSign size={60} className="text-white" />
              </div>
            </div>
          </div>

          {/* Input Fields Section */}
          <div className="flex-grow grid grid-cols-1 2sm:grid-cols-2 2sm:space-x-2 2sm:px-2 px-4 py-4 overflow-y-auto">
            <div className="mt-4 flex flex-col">
              <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">
                Enter Details
              </h1>
              <div className="bg-IntColor rounded-xl p-6 shadow flex-grow">
                <div className="grid grid-cols-1 gap-y-5">
                  {/* Deposit Amount Input (per period) */}
                  <div className="relative group">
                    <label
                      htmlFor="perPeriodDeposit"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Deposit Amount (₹)
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${
                                              errors.perPeriodDeposit
                                                ? "border-borderColor shadow"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}
                    >
                      <label className="size-5 text-md font-normal text-gray-500">
                        ₹
                      </label>
                      <input
                        type="number"
                        id="perPeriodDeposit"
                        name="perPeriodDeposit"
                        value={perPeriodDeposit}
                        onChange={handleAmountChange}
                        min="0"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        placeholder="e.g., 10000 (for monthly)"
                        aria-label="Deposit Amount per period"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Total annual investment must be between ₹500 and
                      ₹1,50,000.
                    </p>
                  </div>

                  {/* Tenure Input */}
                  <div className="relative group">
                    <label
                      htmlFor="tenure"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Investment Tenure (Years)
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${
                                              errors.tenure
                                                ? "border-borderColor shadow"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}
                    >
                      <input
                        type="number"
                        id="tenure"
                        name="tenure"
                        value={tenure}
                        onChange={handleYearChange}
                        min="15"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        placeholder="e.g., 15"
                        aria-label="Investment Tenure in years"
                      />
                      <label className="text-md font-normal text-gray-500">
                        years
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 15 years (extendable in 5-year blocks)
                    </p>
                  </div>

                  {/* Interest Rate Input */}
                  <div className="relative group">
                    <label
                      htmlFor="interestRate"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Current Interest Rate (%)
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow
                                        }`}
                    >
                      <input
                        type="number"
                        id="interestRate"
                        name="interestRate"
                        value={7.1}
                        readOnly
                        onChange={(e) => setInterestRate(e.target.value)}
                        step="0.1"
                        min="0"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        placeholder="e.g., 7.1"
                        aria-label="Current Interest Rate"
                      />
                      <label className="size-5 text-md font-normal text-gray-500">
                        %
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Rates are revised quarterly by the government.
                    </p>
                  </div>

                  {/* Investment Frequency Selector */}
                  <div className="relative group">
                    <label
                      htmlFor="investmentFrequency"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Investment Frequency
                    </label>
                    <div className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                      <select
                        id="investmentFrequency"
                        name="investmentFrequency"
                        value={investmentFrequency}
                        onChange={(e) => setInvestmentFrequency(e.target.value)}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        aria-label="Investment Frequency"
                      >
                        <option value="annual">Annual</option>
                        <option value="half-yearly">Half-Yearly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Select how often you make your deposits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="mt-4 flex flex-col">
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">
                Results
              </h1>
              <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
                {/* {errorMessage && (
                                    <p className="text-red-500 text-center mb-4 font-semibold">{errorMessage}</p>
                                )} */}
                <div className="text-center space-y-4">
                  <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                    <span className="text-lg font-semibold text-gray-700">
                      Total Investment:
                    </span>
                    <span className="text-xl font-bold text-green-700">
                      ₹{formatNumber(totalInvestment)}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                    <span className="text-lg font-semibold text-gray-700">
                      Total Interest Earned:
                    </span>
                    <span className="text-xl font-bold text-green-700">
                      ₹{formatNumber(totalInterest)}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between items-center bg-IntColor p-5 rounded-lg shadow-md">
                    <span className="text-xl font-semibold text-gray-700">
                      PPF Maturity Amount:
                    </span>
                    <span className="text-2xl font-extrabold text-green-700">
                      ₹{formatNumber(maturityAmount)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  * This calculator provides an estimate. Actual returns may
                  vary based on government policy changes, rounding rules, and
                  specific bank calculations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PPFCalculator;
