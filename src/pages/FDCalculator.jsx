import React, { useState, useEffect } from 'react'; // Import useEffect
import { FaRupeeSign } from "react-icons/fa";

function FDCalculator() {
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('5');
    const [time, setTime] = useState('2');
    const [frequency, setFrequency] = useState('1');
    const [result, setResult] = useState(null);
    const [errors, setErrors] = useState({});

    const calculateFD = () => {
       
        const P = parseFloat(principal);
        const R = parseFloat(rate) / 100;
        const T = parseFloat(time);
        const n = parseInt(frequency);
        const maturityAmount = P * Math.pow(1 + R / n, n * T);
        const interestEarned = maturityAmount - P;

        setResult({
            maturityAmount: maturityAmount.toFixed(2),
            interestEarned: interestEarned.toFixed(2),
            principal: P.toFixed(2),
        });
    };

    useEffect(() => {
        calculateFD();
    }, [principal, rate, time, frequency]);

    const formatNumber = (num) => {
        if (num === null || isNaN(num)) return '0.00';
        return parseFloat(num).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };
 // Loan Amount Validation
const handleAmountChange = (e) => {
  const value = e.target.value;
  if (value.length <= 15 ) {
   setPrincipal(value);
    setErrors((prev) => ({ ...prev, principal: '' }));
  } else {
    setErrors((prev) => ({
      ...prev,
      principal: 'Amount cannot exceed ₹100,000,000 or 15 digits.',
    }));
  }
};

// Interest Rate Validation
const handleRateChange = (e) => {
  const value = e.target.value;
  if (value === '' || (Number(value) <= 30 && Number(value) >= 0)) {
    setRate(value);
    setErrors((prev) => ({ ...prev, rate: '' }));
  } else {
    setErrors((prev) => ({ ...prev, rate: 'Rate cannot exceed 50%' }));
  }
};

// Loan Tenure (Years) Validation
const handleYearChange = (e) => {
  const value = e.target.value;
  if (value === '' || (Number(value) <= 50 && Number(value) >= 0)) {
    setTime(value);
    setErrors((prev) => ({ ...prev, time: '' }));
  } else {
    setErrors((prev) => ({ ...prev, time: 'Loan tenure cannot exceed 30 years' }));
  }
};
    return (
        <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-1 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Fixed Deposit (FD) Calculator</h1>
                    <p className="text-md text-gray-600 mt-2">
                        Estimate the maturity amount and interest earned on your Fixed Deposit investments.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-secondary h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center">
                                <p className="text-3xl tracking-wide font-semibold text-white">
                                    FD Calculator
                                </p>
                                <span className="text-gray-300 xl:text-md">
                                    Calculate your FD returns
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
                            <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">Enter Details</h1>
                            <div className="bg-IntColor rounded-xl p-6  shadow flex-grow">
                                <div className="grid grid-cols-1 gap-y-5">
                                    {/* Input: Deposit Amount */}
                                    <div className="relative group">
                                        <label htmlFor="principal" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Deposit Amount (₹):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${errors.principal?"border-borderColor shadow":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"}
                                        }`}>
                                            <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                            <input
                                                type="number"
                                                id="principal"
                                                value={principal}
                                                onChange={handleAmountChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                placeholder="e.g., 100000"
                                                aria-label="Deposit Amount"
                                            />
                                        </div>
                                    </div>

                                    {/* Input: Annual Interest Rate */}
                                    <div className="relative group">
                                        <label htmlFor="rate" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Annual Interest Rate (%):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                             ${errors.rate?"border-borderColor shadow":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <input
                                                type="number"
                                                id="rate"
                                                value={rate}
                                                onChange={handleRateChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                step="0.01"
                                                placeholder="e.g., 6.5"
                                                aria-label="Annual Interest Rate"
                                            />
                                            <label className="size-5 text-md font-normal text-gray-500">%</label>
                                        </div>
                                    </div>

                                    {/* Input: Time Period */}
                                    <div className="relative group">
                                        <label htmlFor="time" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Time Period (in years):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${errors.time?"border-borderColor shadow":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"}
                                        }`}>
                                            <input
                                                type="number"
                                                id="time"
                                                value={time}
                                                onChange={handleYearChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                placeholder="e.g., 5"
                                                aria-label="Time Period in years"
                                            />
                                            <label className="text-md font-normal text-gray-500">years</label>
                                        </div>
                                    </div>

                                    {/* Input: Compounding Frequency */}
                                    <div className="relative group">
                                        <label htmlFor="frequency" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Compounding Frequency:
                                        </label>
                                        <div className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                                            <select
                                                id="frequency"
                                                value={frequency}
                                                onChange={(e) => setFrequency(e.target.value)}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                aria-label="Compounding Frequency"
                                            >
                                                <option value="1">Yearly</option>
                                                <option value="2">Half-Yearly</option>
                                                <option value="4">Quarterly</option>
                                                <option value="12">Monthly</option>
                                            </select>
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="mt-4 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
                            <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">

                                {result && (
                                    <div className="text-center">
                                        <div className="space-y-4">
                                            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                                <span className="text-lg font-semibold text-gray-700">Principal Amount:</span>
                                                <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.principal)}</span>
                                            </div>
                                            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                                <span className="text-lg font-semibold text-gray-700">Interest Earned:</span>
                                                <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.interestEarned)}</span>
                                            </div>
                                            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                                <span className="text-lg font-semibold text-gray-700">Maturity Amount:</span>
                                                <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.maturityAmount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                              
                                
                                <p className="text-sm text-gray-500 mt-4 text-center">
                                    * This calculator provides an estimate. Actual returns may vary based on bank policies, tax deductions, and specific terms and conditions. Consult your bank for precise details.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FDCalculator;