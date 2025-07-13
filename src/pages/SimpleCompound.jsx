import React, { useState, useEffect } from 'react'; 
import { FaRupeeSign } from "react-icons/fa"; 

function SimpleCompound() {
    const [activeTab, setActiveTab] = useState('simple');
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('4');
    const [time, setTime] = useState('2');

    const [compoundings, setCompoundings] = useState('1'); 

   
    const [result, setResult] = useState(null);
    const [errors, setErrors] = useState({});

      const validateInputs = () => {
        let newErrors = {};
        let isValid = true;
        const P = parseFloat(principal);
        const r = parseFloat(rate);
        const n = parseFloat(time);
        if (isNaN(P) || P < 100 || P > 10000000) {
            newErrors.amount = "Amount must be between ₹100 and ₹1,00,00,000.";
            isValid = false;
        }
        if (isNaN(r) || r <= 0 || r > 100) {
            newErrors.rate = "Annual Return must be between 0.1% and 100%.";
            isValid = false;
        }
        if (isNaN(n) || n <= 0 || n > 100) {
            newErrors.years = "Duration must be between 1 and 100 years.";
            isValid = false;
        }
        setErrors(newErrors); 
        return isValid;
    };
    const formatNumber = (num) => {
        if (num === null || isNaN(num) || num === '') return '0.00';
        return parseFloat(num).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };

    const calculateInterest = () => {
       if (!validateInputs()) {
            setResult(null); 
            return;
        }

        const P = parseFloat(principal);
        const R = parseFloat(rate);
        const T = parseFloat(time);
        if (activeTab === 'simple') {
            const SI = (P * R * T) / 100;
            const total = P + SI;

            setResult({
                type: 'simple',
                principal: P.toFixed(2),
                interest: SI.toFixed(2),
                total: total.toFixed(2),
            });
        } else { // activeTab === 'compound'
            const n = parseInt(compoundings);
           

            const r = R / 100;
            const A = P * Math.pow(1 + r / n, n * T);
            const CI = A - P;

            setResult({
                type: 'compound',
                principal: P.toFixed(2),
                interest: CI.toFixed(2),
                total: A.toFixed(2),
            });
        }
    };

    // Use useEffect to trigger calculation automatically on input changes or tab changes
    useEffect(() => {
        
        if (principal && rate && time) {
            calculateInterest();
        } else {
            setResult(null); 
             
        }
    }, [principal, rate, time, compoundings, activeTab]); 

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) <= 100 && Number(value) >= 0)) {
      setTime(value);
      setErrors((prev) => ({ ...prev, time: '' }));
    } else {
      setErrors((prev) => ({ ...prev, time: 'Age cannot be more than 50' }));
    }
  };

  // Rate input handler
  const handleRateChange = (e) => {
    const value = e.target.value;
    if (value === ''|| (Number(value) <= 100 && Number(value) >= 0)) {
      setRate(value);
      setErrors((prev) => ({ ...prev, rate: '' }));
    } else {
      setErrors((prev) => ({ ...prev, rate: 'Rate cannot be more than 50%' }));
    }
  };

  // Amount input handler
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if ( value.length <= 15) {
      setPrincipal(value);
      setErrors((prev) => ({ ...prev, principal: '' }));
    } else {
      setErrors((prev) => ({
        ...prev,
        principal: 'Amount cannot be more than 10 characters',
      }));
    }
  };

    return (
        <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-1 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Simple & Compound Interest Calculator</h1>
                    <p className="text-md text-gray-600 mt-2">
                        Compare and calculate Simple Interest and Compound Interest for your investments or loans.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-secondary h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center ">
                                <p className="text-3xl tracking-wide font-semibold text-white ">
                                    Interest Calculator
                                </p>
                                <span className="text-gray-300 xl:text-md">
                                    Simple vs. Compound
                                </span>
                            </div>
                            {/* Rupee icon for visual flair */}
                            <div className="absolute top-2 2sm:right-20 right-4 lg:right-10 xl:right-20 2xl:right-45 md:right-30 opacity-15 bg-gray-400 border border-transparent rounded-full w-25 h-27 flex items-center justify-center ">
                                <FaRupeeSign size={60} className="text-white" />
                            </div>
                        </div>
                    </div>
                    {/* Input Fields Section */}
                    <div className="flex-grow grid grid-cols-1 2sm:grid-cols-2 2sm:px-2 px-4 py-4 space-x-3 overflow-y-auto">
                        <div className="mt-4 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">Enter Details</h1>
                            <div className="bg-IntColor rounded-xl p-6 shadow flex-grow">
                              <div className="flex flex-col 2xl:flex-row 2xl:justify-center gap-2 mb-3">
                        <button
                            onClick={() => {
                                setActiveTab('simple');
                                setResult(null); 
                                // setErrors({}); 
                            }}
                            className={`px-2 py-2.5 rounded-xl text-md font-semibold transition-colors duration-200 w-full 
                                ${activeTab === 'simple' ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                            `}
                        >
                            Simple Interest
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('compound');
                                setResult(null); 
                                // setErrors({}); 
                            }}
                            className={`px-2 py-2.5 w-full rounded-xl text-md font-semibold transition-colors duration-200
                                ${activeTab === 'compound' ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                            `}
                        >
                            Compound Interest
                        </button>
                    </div>
                                <div className="grid grid-cols-1 gap-y-5">
                                    {/* Input: Principal Amount */}
                                    <div className="relative group">
                                        <label htmlFor="principal" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Principal Amount (₹):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                             ${errors.principal?"border-borderColor shadow":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                            <input
                                                type="number"
                                                id="principal"
                                                value={principal}
                                                onChange={handleAmountChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                placeholder="e.g., 50000"
                                                aria-label="Principal Amount"
                                            />
                                        </div>
                                          {errors.principal && <p className="text-red-500 text-sm mt-1">{errors.principal}</p>}
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
                                                placeholder="e.g., 7.5"
                                                aria-label="Annual Interest Rate"
                                            />
                                            <label className="size-5 text-md font-normal text-gray-500">%</label>
                                        </div>
                                         {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
                                    </div>

                                    {/* Input: Time (Years) */}
                                    <div className="relative group">
                                        <label htmlFor="time" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Time Period (in Years):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                             ${errors.time?"border-borderColor shadow":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <input
                                                type="number"
                                                id="time"
                                                value={time}
                                                onChange={handleAgeChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                placeholder="e.g., 10"
                                                aria-label="Time Period in Years"
                                            />
                                            <label className="text-md font-normal text-gray-500">years</label>
                                        </div>
                                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                                    </div>

                                    {/* Compound-Specific Input */}
                                    {activeTab === 'compound' && (
                                        <div className="relative group">
                                            <label htmlFor="compoundings" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                                Compoundings per Year:
                                            </label>
                                            <div className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                                                <select
                                                    id="compoundings"
                                                    value={compoundings}
                                                    onChange={(e) => setCompoundings(e.target.value)}
                                                    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                    aria-label="Compoundings per Year"
                                                >
                                                    <option value="1">Yearly</option>
                                                    <option value="2">Half-Yearly</option>
                                                    <option value="4">Quarterly</option>
                                                    <option value="12">Monthly</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Result Section */}
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
                                                <span className="text-lg font-semibold text-gray-700">Total Interest Earned:</span>
                                                <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.interest)}</span>
                                            </div>
                                            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                                <span className="text-lg font-semibold text-gray-700">Total Value:</span>
                                                <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.total)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                               
                                  
                             
                                <p className="text-sm text-gray-500 mt-4 text-center">
                                    * This calculator provides an estimate. Actual returns may vary based on specific terms, taxation, and financial institution policies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SimpleCompound;