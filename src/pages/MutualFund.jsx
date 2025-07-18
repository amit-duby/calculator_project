import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import {
  ShieldCheck, FileText, Banknote, ListChecks, ScrollText, CheckCircle, HelpCircle, ChevronUp, ChevronDown, TrendingUp, DollarSign, PieChart, BarChart2, Lightbulb,
  UserCheck,
  Scale
} from 'lucide-react';
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
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const mfFaqs = [
    {
      q: "Q1: What is NAV (Net Asset Value) and how does it work?",
      a: "A1: NAV, or Net Asset Value, is the per-unit market value of a mutual fund scheme. It's calculated by dividing the total value of the fund's assets (minus liabilities) by the total number of outstanding units. NAV changes daily based on the market performance of the underlying securities in the fund's portfolio. When you invest, you buy units at the prevailing NAV; when you redeem, you sell units at the prevailing NAV."
    },
    {
      q: "Q2: Is SIP better than Lumpsum investment in mutual funds?",
      a: "A2: Both SIP and Lumpsum have their advantages. SIP is generally recommended for most investors, especially those new to the market, as it promotes disciplined investing and benefits from Rupee Cost Averaging, reducing the impact of market volatility. Lumpsum can yield higher returns if invested during market dips or corrections, but carries higher risk if timed incorrectly. For consistent income earners, SIP is often preferred."
    },
    {
      q: "Q3: What is an expense ratio in mutual funds?",
      a: "A3: The expense ratio is the annual fee charged by the Asset Management Company (AMC) for managing a mutual fund. It covers various operational expenses like fund management fees, administrative costs, marketing, etc. It's expressed as a percentage of the fund's average net assets. A lower expense ratio means a smaller portion of your returns is consumed by fees, potentially leading to higher net returns over time."
    },
    {
      q: "Q4: Are mutual fund gains taxable in India?",
      a: "A4: Yes, gains from mutual funds are taxable in India. The taxation depends on the type of fund (equity or debt) and the duration of your investment (short-term or long-term). Equity fund gains held for less than 1 year (STCG) are taxed at 15%, while those held for more than 1 year (LTCG) are taxed at 10% on gains exceeding ₹1 lakh per financial year. Debt fund gains held for less than 3 years (STCG) are added to your income and taxed as per your slab rate, while those held for more than 3 years (LTCG) are taxed at 20% with indexation benefit."
    },
    {
      q: "Q5: Can I lose money in mutual funds?",
      a: "A5: Yes, mutual funds are market-linked investments, and there is a possibility of losing money, especially if the underlying markets perform poorly. The value of your investment can go down as well as up. It's crucial to understand the risks associated with the fund type you choose and align it with your risk appetite."
    },
    {
      q: "Q6: What is diversification and why is it important in mutual funds?",
      a: "A6: Diversification is the strategy of spreading your investments across various asset classes, sectors, and securities to reduce risk. Mutual funds inherently offer diversification by investing in a basket of securities. This is important because it minimizes the impact of poor performance by a single security or sector on your overall portfolio, thus safeguarding your investment against concentrated risks."
    },
    {
      q: "Q7: How do I choose the right mutual fund for my goals?",
      a: "A7: Choosing the right mutual fund involves several steps: 1) Define your financial goals and investment horizon. 2) Assess your risk appetite. 3) Research fund categories (equity, debt, hybrid) that match your risk-return profile. 4) Look at factors like expense ratio, exit load, fund manager's experience, and consistent performance (not just past returns). 5) Consider consulting a financial advisor."
    },
    {
      q: "Q8: What is 'Rupee Cost Averaging'?",
      a: "A8: Rupee Cost Averaging (RCA) is a strategy, primarily associated with SIPs, where an investor invests a fixed amount regularly regardless of the market price. When prices are high, fewer units are bought; when prices are low, more units are bought. Over time, this averages out the cost of acquisition, potentially reducing the overall risk of investing a lump sum at a market peak and optimizing returns."
    },
    {
      q: "Q9: What is the difference between an actively managed fund and an index fund?",
      a: "A9: An actively managed fund aims to outperform the market index by using a fund manager's expertise to select stocks. It involves higher research costs and thus has a higher expense ratio. An index fund is a passively managed fund that aims to replicate the performance of a specific market index (e.g., Nifty 50) by investing in the same stocks in the same proportion. It generally has a lower expense ratio as it requires less active management."
    }
  ];
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

      <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className="container max-w-screen-xl mx-auto 3sm:px-10">

        {/* Main Heading */}
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            UniCX Mutual Fund Calculator: Plan Your Investments & Project Returns
          </h1>
        </section>

        {/* What are Mutual Funds? Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">What are Mutual Funds?</h2>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Mutual Funds are sophisticated yet accessible investment vehicles that play a crucial role in modern financial planning. At their core, a mutual fund pools money from multiple investors with a common investment objective. This collective corpus is then invested by professional fund managers in a diversified portfolio of various securities such as stocks, bonds, money market instruments, or other assets.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong>Professional Management:</strong> When you invest in a mutual fund, you're essentially entrusting your money to experienced financial professionals who continuously research, select, and monitor investments on your behalf.
            </li>
            <li>
              <strong>Inherent Diversification:</strong> Even with a small investment, mutual funds offer immediate diversification across numerous assets. This helps in spreading risk, as the performance of one asset might be offset by another, rather than putting all your eggs in one basket.
            </li>
          </ul>
          <p className="mt-4 text-gray-800 leading-relaxed">
            The <strong>UniCX Mutual Fund Calculator</strong> is your strategic partner in this investment journey. It's designed to demystify the potential growth of your investments, helping you project returns and plan effectively for your financial future, whether through Systematic Investment Plans (SIPs) or Lumpsum investments.
          </p>
        </section>

        {/* Why Invest in Mutual Funds? Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Why Invest in Mutual Funds?</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="mb-4 text-gray-800 leading-relaxed">
                Mutual funds have emerged as a preferred investment option for millions due to a multitude of benefits:
              </p>
              <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong className="flex items-start">
                    <TrendingUp size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Accessibility:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Easy way to invest in diversified portfolios.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <UserCheck size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Professional Expertise:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Benefit from seasoned fund managers.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <PieChart size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Diversification:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Reduce risk through a spread of investments.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <ListChecks size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Variety & Transparency:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Cater to different risk appetites and financial goals, regulated by SEBI.
                  </span>
                </li>
              </ul>
            </div>
            {/* Image for Benefits */}
            <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={mfBenefitsImage}
                alt="Benefits of investing in Mutual Funds - Professional Management, Diversification"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
                loading="lazy"
              /> */}
            </div>
          </div>
        </section>

        {/* How to Use the UniCX Mutual Fund Calculator Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">How to Use the UniCX Mutual Fund Calculator</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Our calculator is intuitive and user-friendly, allowing you to quickly estimate the potential returns on your mutual fund investments:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed mt-4">
                <li>
                  <strong>Select Investment Type:</strong> Choose between "Systematic Investment Plan (SIP)" for regular, periodic investments or "Lumpsum Investment" for a one-time investment.
                </li>
                <li>
                  <strong>Enter Investment Amount:</strong>
                  <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                    <li>For <strong>SIP</strong>: Input the fixed amount you plan to invest regularly (e.g., monthly).</li>
                    <li>For <strong>Lumpsum</strong>: Enter the single, one-time amount you wish to invest.</li>
                  </ul>
                </li>
                <li>
                  <strong>Enter Expected Annual Return (%):</strong> Provide the anticipated average annual return you expect from your chosen mutual fund scheme. <em>It's crucial to remember that this is an estimate; past performance does not guarantee future results, and actual returns can vary based on market conditions.</em>
                </li>
                <li>
                  <strong>Specify Investment Tenure (Years):</strong> Indicate the duration, in years, for which you plan to stay invested.
                </li>
                <li>
                  <strong>Calculate:</strong> Click the "Calculate Mutual Fund" button to instantly view your projected investment growth.
                </li>
              </ol>
              <h3 className="font-semibold text-xl mt-4 mb-2">The calculator will then provide you with:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Total Amount Invested:</strong> The cumulative sum of all your contributions (for SIP) or your initial one-time investment (for Lumpsum).
                </li>
                <li>
                  <strong>Total Value of Investment:</strong> The projected total worth of your investment at the end of the specified tenure.
                </li>
                <li>
                  <strong>Estimated Capital Gains:</strong> The projected profit earned from your investment (Total Value of Investment minus Total Amount Invested).
                </li>
              </ul>
            </div>
            {/* Image for How to Use */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={mfPurposeImage}
                alt="How to use UniCX Mutual Fund Calculator - Step by step guide"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                loading="lazy"
              /> */}
            </div>
          </div>
        </section>

        {/* Understanding Mutual Funds: Key Aspects Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Understanding Mutual Funds: Key Aspects</h2>
          <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
            To make informed investment decisions, familiarize yourself with the fundamental components of mutual funds:
          </p>

          <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
            <DollarSign size={18} className="mr-2 flex-shrink-0" /> Investment Methods
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong>Systematic Investment Plan (SIP):</strong> Investing a fixed amount at regular intervals. Benefits from <strong>Rupee Cost Averaging</strong> and helps in navigating market volatility. Ideal for long-term, disciplined investing.
            </li>
            <li>
              <strong>Lumpsum Investment:</strong> A single, one-time large investment. Can yield higher returns if invested when market conditions are favorable (e.g., during a market correction).
            </li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
            <PieChart size={18} className="mr-2 flex-shrink-0" /> Types of Mutual Funds (Based on Asset Class)
          </h3>
          <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
            Mutual funds categorize themselves based on where they primarily invest, catering to different risk-return profiles:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong>Equity Funds:</strong> Invest predominantly in company stocks. Higher risk, higher potential returns. Suitable for aggressive investors.
            </li>
            <li>
              <strong>Debt Funds:</strong> Invest in fixed-income securities. Lower risk than equity, stable returns. Suitable for conservative investors.
            </li>
            <li>
              <strong>Hybrid Funds:</strong> Invest in a mix of both equity and debt instruments. They aim to provide a balance between growth and stability.
            </li>
            <li>
              <strong>Solution-Oriented Funds:</strong> Designed for specific financial goals (e.g., Retirement Funds, Children's Funds).
            </li>
            <li>
              <strong>Index Funds & ETFs:</strong> Passive funds that track a specific market index.
            </li>
            <li>
              <strong>Fund of Funds (FoF):</strong> These schemes invest in other mutual fund schemes instead of directly in stocks or bonds.
            </li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
            <BarChart2 size={18} className="mr-2 flex-shrink-0" /> Key Charges & Metrics
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong>Expense Ratio:</strong> The annual fee charged by the fund house for managing the fund. A lower expense ratio generally means more of your returns stay with you.
            </li>
            <li>
              <strong>Entry Load:</strong> (Mostly abolished in India) A fee charged at the time of investment.
            </li>
            <li>
              <strong>Exit Load:</strong> A fee charged if you redeem units before a specified period.
            </li>
            <li>
              <strong>Net Asset Value (NAV):</strong> The per-unit market value of a mutual fund scheme. It fluctuates daily.
            </li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
            <Scale size={18} className="mr-2 flex-shrink-0" /> Taxation of Mutual Funds in India
          </h3>
          <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
            Understanding the tax implications is vital for calculating your effective returns:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong>Equity-Oriented Mutual Funds (where equity exposure is &ge; 65%):</strong>
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li><strong>Short-Term Capital Gains (STCG):</strong> If units are redeemed within 1 year, gains are taxed at a flat rate of <strong>15%</strong>.</li>
                <li><strong>Long-Term Capital Gains (LTCG):</strong> If units are redeemed after 1 year, gains exceeding <strong>₹1 lakh</strong> in a financial year are taxed at <strong>10%</strong> without indexation benefit. Gains up to ₹1 lakh are exempt.</li>
              </ul>
            </li>
            <li>
              <strong>Debt-Oriented Mutual Funds (and other non-equity funds):</strong>
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li><strong>Short-Term Capital Gains (STCG):</strong> If units are redeemed within 3 years, gains are added to your total income and taxed as per your applicable <strong>income tax slab rate</strong>.</li>
                <li><strong>Long-Term Capital Gains (LTCG):</strong> If units are redeemed after 3 years, gains are taxed at <strong>20%</strong> with the benefit of <strong>indexation</strong>.</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Who Can Benefit from the UniCX Mutual Fund Calculator? */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Who Can Benefit from the UniCX Mutual Fund Calculator?</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
                <p className="text-gray-800 text-[15px] leading-relaxed">
                    The UniCX Mutual Fund Calculator is an invaluable tool for a wide spectrum of investors:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                        <strong>First-Time Investors:</strong> To understand how mutual funds can grow their money.
                    </li>
                    <li>
                        <strong>Seasoned Investors:</strong> To model various scenarios and refine their investment strategy.
                    </li>
                    <li>
                        <strong>Financial Planners:</strong> As a quick tool for client discussions and projections.
                    </li>
                    <li>
                        <strong>Goal-Oriented Savers:</strong> Planning for retirement, children's education, down payment for a house, or other significant financial milestones.
                    </li>
                    <li>
                        <strong>Anyone seeking to understand the potential returns of their mutual fund investments over different periods.</strong>
                    </li>
                </ul>
            </div>
            {/* Image for Who Can Benefit */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
                {/* <img
                    src={mfWhoCanBenefitImage}
                    alt="Who can use UniCX Mutual Fund Calculator - Diverse investors"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                    loading="lazy"
                /> */}
            </div>
          </div>
        </section>

        {/* Key Considerations & Important Notes Regarding Mutual Funds */}
        <section className="mt-10">
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-red-700 mb-3 flex items-center">
              <Lightbulb size={20} className="mr-3 mt-1 flex-shrink-0" />
              Key Considerations & Important Notes Regarding Mutual Funds
            </h2>
            <p className="text-red-800 text-[15px] leading-relaxed mb-4">
              <strong><em className="text-xl">RISK WARNING: MUTUAL FUND INVESTMENTS ARE SUBJECT TO MARKET RISKS, READ ALL SCHEME RELATED DOCUMENTS CAREFULLY.</em></strong>
            </p>
            {/* Image for Important Considerations (If available) */}
            {/* <img
                src={mfConsiderationsImage}
                alt="Important Considerations for Mutual Fund Investments"
                className="w-auto h-16 mx-auto my-4"
                loading="lazy"
            /> */}
            <ul className="list-none space-y-2 text-red-700 text-[15px] leading-relaxed">
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Market Risks:
                </strong>
                <span className="block ml-6 -mt-1">
                  Returns from mutual funds are not guaranteed and are directly linked to market performance. There is always a possibility of losing capital.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Past Performance is Not Future Guarantee:
                </strong>
                <span className="block ml-6 -mt-1">
                  Always remember that a fund's historical performance is not an indicator or guarantee of its future results.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Investment Horizon & Risk Appetite:
                </strong>
                <span className="block ml-6 -mt-1">
                  Align your investment with your financial goals (long-term for equity) and understand your personal risk tolerance before choosing a fund type.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Due Diligence:
                </strong>
                <span className="block ml-6 -mt-1">
                  Thoroughly research the fund's objectives, fund manager's experience, expense ratio, exit load, and read the Scheme Information Document (SID) carefully before investing.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Regular Review:
                </strong>
                <span className="block ml-6 -mt-1">
                  Periodically review your portfolio to ensure it aligns with your goals and rebalance if necessary.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Frequently Asked Questions (FAQs) about Mutual Funds
          </h2>
          <div className="space-y-2">
            {mfFaqs.map((faq, i) => (
              <div
                key={i}
                className={`py-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === i ? "bg-blue-50 rounded-lg " : ""
                }`}
              >
                <button
                  className={`flex justify-between items-center px-3 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg py-3 ${
                    openFAQ !== i ? "border border-gray-300 " : ""
                  }`}
                  onClick={() => toggleFAQ(i)}
                  aria-expanded={openFAQ === i ? "true" : "false"}
                  aria-controls={`faq-answer-${i}`}
                >
                  <p className="font-semibold text-gray-800">{faq.q}</p>
                  {openFAQ === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <p
                  id={`faq-answer-${i}`}
                  className={`text-gray-800 text-md font-normal px-3 ${
                    openFAQ === i ? "max-h-[500px] opacity-100 py-2 " : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="pt-6 border-t mt-10">
          <p className="text-sm text-gray-500">
            The UniCX Mutual Fund Calculator is an invaluable tool for anyone looking to understand, plan, and grow their wealth through mutual fund investments. It empowers you to visualize the potential returns of your SIPs and lumpsum investments, making your financial planning more precise and effective.
            <br/><br/>
            This Mutual Fund Calculator and the information provided are developed and maintained by{" "}
            <strong>UniCX (UniconsultX Solutions Private Limited)</strong> to help
            users understand Mutual Fund calculations. While we strive for accuracy, the information is for illustrative
            purposes only and should not be considered financial advice. For personalized financial advice
            or specific product details, always consult with a qualified financial advisor.
          </p>
        </section>

      </div>
    </section>
    </div>
  );
}

export default MutualFundCalculator;