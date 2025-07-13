import React, { useState, useEffect } from 'react'; 
import { FaRupeeSign } from "react-icons/fa"; 

function LumpsumCalculator() {
    const [amount, setAmount] = useState('10000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('3');
    const [futureValue, setFutureValue] = useState('0.00'); 
    const [gain, setGain] = useState('0.00'); 
    const [errors, setErrors] = useState({}); 
    const validateInputs = () => {
        let newErrors = {};
        let isValid = true;
        const P = parseFloat(amount);
        const r = parseFloat(rate);
        const n = parseFloat(years);
        if (isNaN(P) || P < 100 || P > 10000000) {
            newErrors.amount = "Amount must be between ₹100 and ₹1,00,00,000.";
            isValid = false;
        }
        if (isNaN(r) || r <= 0 || r > 30) {
            newErrors.rate = "Annual Return must be between 0.1% and 30%.";
            isValid = false;
        }
        if (isNaN(n) || n <= 0 || n > 50) {
            newErrors.years = "Duration must be between 1 and 50 years.";
            isValid = false;
        }
        setErrors(newErrors); 
        return isValid;
    };
    const calculateLumpsum = () => {
        if (!validateInputs()) {
            setFutureValue('0.00');
            setGain('0.00');
            return;
        }
        const P = parseFloat(amount);
        const r = parseFloat(rate) / 100; 
        const n = parseFloat(years);
        const FV = P * Math.pow(1 + r, n);
        setFutureValue(FV.toFixed(2));
        setGain((FV - P).toFixed(2));
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            calculateLumpsum();
        }, 300); 

        return () => clearTimeout(handler);
    }, [amount, rate, years]);

    const formatNumber = (num) => {
        if (num === null || isNaN(num) || num === '') return '0.00';
        return parseFloat(num).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };

const handleLumpsumAmountChange = (e) => {
  const value = e.target.value;
  if (value<=10000000 || value.length<=15) {
     setAmount(value);
   setErrors((prev) => ({ ...prev, amount: '' }));
  } else {
  setErrors((prev) => ({ ...prev,amount: "Amount must be between ₹100 and ₹1,00,00,000." }));
  }
};

const handleLumpsumRateChange = (e) => {
  const value = e.target.value;
  if (value<=30) {
    setRate(value);
   setErrors((prev) => ({ ...prev, rate: '' }));
  } else {
  setErrors((prev) => ({ ...prev, rate: "Annual Return must be between 0.1% and 30%." }));
  }
};

const handleLumpsumYearsChange = (e) => {
  const value = e.target.value;
  if (value<=50) {
   setYears(value);
   setErrors((prev) => ({ ...prev, years: '' }));
  } else {
  setErrors((prev) => ({ ...prev, years: "Duration must be between 1 and 50 years." }));
  }
};
    return (
        <div className="container w-full h-full px-5 2sm:px-2 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-1.5 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Lumpsum Mutual Fund Calculator</h1>
                    <p className="text-md text-gray-600 mt-2">
                        Estimate the future value and potential gain of your one-time lumpsum investment in mutual funds.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-secondary h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center">
                                <p className="text-3xl tracking-wide font-semibold text-white">
                                    Lumpsum Calculator
                                </p>
                                <span className="text-gray-300 xl:text-md">
                                    Project your one-time investment growth
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
                            <div className="bg-IntColor rounded-xl p-6 shadow flex-grow">
                                <div className="grid grid-cols-1 gap-y-5">
                                    
                                    <div className="relative group">
                                        <label htmlFor="amount" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Investment Amount (₹):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                                            errors.amount 
                                                ? "border-red-500 shadow-red-300"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                            <input
                                                type="number"
                                                id="amount"
                                                value={amount}
                                                onChange={(e) =>handleLumpsumAmountChange(e)}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="100"
                                                max="10000000"
                                                placeholder="e.g., 100000"
                                                aria-label="Investment Amount"
                                            />
                                        </div>
                                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                                    </div>

                                    {/* Input: Expected Annual Return (%) */}
                                    <div className="relative group">
                                        <label htmlFor="rate" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Expected Annual Return (%):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                                            errors.rate // Check for error on 'rate' field
                                                ? "border-red-500 shadow-red-300"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <input
                                                type="number"
                                                id="rate"
                                                value={rate}
                                                onChange={(e) => handleLumpsumRateChange(e)} // Direct update, validation in useEffect
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0.1"
                                                max="30"
                                                step="0.1"
                                                placeholder="e.g., 12"
                                                aria-label="Expected Annual Return"
                                            />
                                            <label className="size-5 text-md font-normal text-gray-500">%</label>
                                        </div>
                                        {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
                                    </div>

                                    {/* Input: Investment Duration (Years) */}
                                    <div className="relative group">
                                        <label htmlFor="years" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Investment Duration (Years):
                                        </label>
                                        <div className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                                            errors.years // Check for error on 'years' field
                                                ? "border-red-500 shadow-red-300"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <input
                                                type="number"
                                                id="years"
                                                value={years}
                                                onChange={(e) => handleLumpsumYearsChange(e)} 
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="1"
                                                max="50"
                                                placeholder="e.g., 5"
                                                aria-label="Investment Duration in Years"
                                            />
                                        </div>
                                        {errors.years && <p className="text-red-500 text-sm mt-1">{errors.years}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="mt-4 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
                            <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
                                <div className="text-center">
                                    <div className="space-y-4">
                                        <div className="flex flex-col justify-between items-center bg-IntColor px-3 py-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Initial Investment:</span>
                                            <span className="text-md font-bold text-green-700">₹ {formatNumber(amount)}</span>
                                        </div>
                                        <div className="flex flex-col justify-between items-center bg-IntColor py-4 px-2 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Estimated Gain:</span>
                                            <span className="text-md font-bold text-green-700">₹ {formatNumber(gain)}</span>
                                        </div>
                                        <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Total Value:</span>
                                            <span className="text-md font-bold text-green-700">₹ {formatNumber(futureValue)}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 mt-6 text-center">
                                    * This calculation provides an estimate. Actual returns may vary based on market performance, expense ratios, and tax implications.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LumpsumCalculator;