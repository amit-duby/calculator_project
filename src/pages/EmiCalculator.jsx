import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("2000000");
  const [interestRate, setInterestRate] = useState("14");
  const [loanPeriod, setLoanPeriod] = useState("30");
  const [frequency, setFrequency] = useState("monthly");
  const [monthlyResult, setMonthlyResult] = useState({
    emi: 0,
    total: 0,
    interest: 0,
  });
  const [yearlyResult, setYearlyResult] = useState({
    emi: 0,
    total: 0,
    interest: 0,
  });
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate);
    const n = parseFloat(loanPeriod);

    if (isNaN(P) || P < 100 || P > 100000000) {
      newErrors.loanAmount = "Amount must be between ₹100 and ₹10,00,00,000.";
      isValid = false;
    }
    if (isNaN(r) || r <= 0 || r > 30) { // Corrected max rate to 30% for consistency
      newErrors.interestRate =  "Annual Return must be between 0.1% and 30%.";
      isValid = false;
    }
    if (isNaN(n) || n <= 0 || n > 50) { // Corrected max period to 50 years for consistency
      newErrors.loanPeriod = "Duration must be between 1 and 50 years.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  /**
   * @param {number} P
   * @param {number} R
   * @param {number} N
   * @returns {{emi: number, total: number, interest: number}}
   */
  const calculateEmi = (P, R, N) => {
    if (R === 0) {
      const emi = P / N;
      const total = P;
      const interest = 0;

      return {
        emi: Math.round(emi),
        total: Math.round(total),
        interest: Math.round(interest),
      };
    }
    const onePlusR_pow_n = Math.pow(1 + R, N);

    const emi = (P * R * onePlusR_pow_n) / (onePlusR_pow_n - 1);

    const total = emi * N;

    const interest = total - P;

    return {
      emi: Math.round(emi),
      total: Math.round(total),
      interest: Math.round(interest),
    };
  };

  useEffect(() => {
    if (validateInputs()) { 
      const P = parseFloat(loanAmount);
      const years = parseFloat(loanPeriod);
      const annualRate = parseFloat(interestRate);

      if (frequency === "monthly" || frequency === "both") {
        const R_monthly = annualRate / 12 / 100;
        const months = years * 12;
        const result = calculateEmi(P, R_monthly, months);
        setMonthlyResult(result);
      } else {
        setMonthlyResult({ emi: 0, total: 0, interest: 0 });
      }

      if (frequency === "yearly" || frequency === "both") {
        const R_yearly = annualRate / 100;
        const result = calculateEmi(P, R_yearly, years);
        setYearlyResult(result);
      } else {
        setYearlyResult({ emi: 0, total: 0, interest: 0 });
      }
    } else {
     
      setMonthlyResult({ emi: 0, total: 0, interest: 0 });
      setYearlyResult({ emi: 0, total: 0, interest: 0 });
    }
  }, [loanAmount, interestRate, loanPeriod, frequency]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15 ) {
      setLoanAmount(value);
      setErrors((prev) => ({ ...prev, loanAmount: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        loanAmount: "Amount cannot exceed ₹100,000,000 or 15 digits.",
      }));
    }
  };

 
  const handleRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 30 && Number(value) >= 0)) {
      setInterestRate(value);
      setErrors((prev) => ({ ...prev, interestRate: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        interestRate: "Annual Return must be between 0.1% and 30%.",
      }));
    }
  };

  
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
      setLoanPeriod(value);
      setErrors((prev) => ({ ...prev, loanPeriod: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        loanPeriod: "Loan tenure between 1 and 50 years.",
      }));
    }
  };
  return (
    <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
        {/* Left Section: Introduction and Description */}
        <div className="px-1 py-6">
          <h1 className="text-2xl font-bold text-gray-900">EMI Calculator</h1>
          <p className="text-md text-gray-600 mt-2">
            Calculate your Equated Monthly Installments (EMI) for various loan
            types. Enter the loan amount, interest rate, and tenure to get
            instant results.
          </p>
        </div>

        {/* Right Section: Calculator Inputs and Results */}
        <div className="bg-secondary h-full rounded-xl flex flex-col">
          {/* Header for the Calculator */}
          <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
            <div className="flex justify-center items-center">
              <div className="space-y-1 mt-3 text-center">
                <p className="text-3xl tracking-wide font-semibold text-white">
                  EMI Calculator
                </p>
                <span className="text-gray-300 xl:text-md">
                  Plan Your Loan Payments
                </span>
              </div>
              {/* Rupee icon for visual flair (from previous component's style) */}
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
                  {/* Loan Amount */}
                  <div className="relative group">
                    <label
                      htmlFor="loanAmount"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Loan Amount (₹)
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${
                          errors.loanAmount
                            ? "border-borderColor shadow"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                    >
                      <label className="size-5 text-md font-normal text-gray-500">
                        ₹
                      </label>
                      <input
                        id="loanAmount"
                        type="number"
                        value={loanAmount}
                        onChange={handleAmountChange}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        placeholder="e.g. 500000"
                        min="0"
                      />
                    </div>
                     {errors.loanAmount && (
                      <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>
                    )}
                  </div>
                  <div className="relative group">
                    <label
                      htmlFor="interestRate"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Annual Interest Rate (%)
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${
                          errors.interestRate
                            ? "border-borderColor shadow"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                    >
                      <input
                        id="interestRate"
                        type="number"
                        value={interestRate}
                        onChange={handleRateChange}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        placeholder="e.g. 8.5"
                        min="0"
                        step="0.01"
                      />
                      <label className="size-5 text-md font-normal text-gray-500">
                        %
                      </label>
                    </div>
                     {errors.interestRate && (
                      <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
                    )}
                  </div>

                  {/* Loan Tenure */}
                  <div className="relative group">
                    <label
                      htmlFor="loanPeriod"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Loan Tenure (Years)
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${
                          errors.loanPeriod
                            ? "border-borderColor shadow"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                    >
                      <input
                        id="loanPeriod"
                        type="number"
                        value={loanPeriod}
                        onChange={handleYearChange}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        placeholder="e.g. 5"
                        min="0"
                      />
                      <label className="text-md font-normal text-gray-500">
                        years
                      </label>
                    </div>
                     {errors.loanPeriod && (
                      <p className="text-red-500 text-sm mt-1">{errors.loanPeriod}</p>
                    )}
                  </div>

                  {/* Payment Frequency */}
                  <div className="relative group">
                    <label
                      htmlFor="frequency"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Payment Frequency
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow
                    }`}
                    >
                      <select
                        id="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
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
                {/* Monthly EMI Results */}
                {(frequency === "monthly" || frequency === "both") && (
                  <div className="bg-IntColor p-6 rounded-lg shadow-inner mb-4">
                    <h3 className="text-primary mb-3 text-2xl font-extrabold text-center">
                      Monthly EMI
                    </h3>
                    <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-700 font-medium">EMI:</span>
                      <span className="text-green-700 font-semibold text-lg">
                        ₹{monthlyResult.emi.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-700 font-medium">
                        Total Interest:
                      </span>
                      <span className="text-green-700 font-semibold text-lg">
                        ₹{monthlyResult.interest.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between items-center py-2">
                      <span className="text-gray-700 font-medium">
                        Total Payment:
                      </span>
                      <span className="text-green-700 font-semibold text-lg">
                        ₹{monthlyResult.total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Yearly EMI Results */}
                {(frequency === "yearly" || frequency === "both") && (
                  <div className="bg-IntColor p-6 rounded-lg shadow-inner">
                    <h3 className="text-primary mb-3 text-2xl font-extrabold text-center">
                      Yearly EMI
                    </h3>
                    <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-700 font-medium">EMI:</span>
                      <span className="text-green-700 font-semibold text-lg">
                        ₹{yearlyResult.emi.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-700 font-medium">
                        Total Interest:
                      </span>
                      <span className="text-green-700 font-semibold text-lg">
                        ₹{yearlyResult.interest.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between items-center py-2">
                      <span className="text-gray-700 font-medium">
                        Total Payment:
                      </span>
                      <span className="text-green-700 font-semibold text-lg">
                        ₹{yearlyResult.total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;
