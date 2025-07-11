import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from "react-icons/fa";

function SIPCalculator() {
    const [tab, setTab] = useState('sip');
    const [sipAmount, setSipAmount] = useState('5000');
    const [sipYears, setSipYears] = useState('26');
    const [sipReturn, setSipReturn] = useState('12');
    const [sipResult, setSipResult] = useState(null);

    const [lumpAmount, setLumpAmount] = useState('5000');
    const [lumpYears, setLumpYears] = useState('26');
    const [lumpReturn, setLumpReturn] = useState('12');
    const [lumpResult, setLumpResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState({});

    useEffect(() => {
        if (tab === 'sip') {
            const handler = setTimeout(() => {
                calculateSIP();
            }, 500);
            return () => clearTimeout(handler);
        }
    }, [sipAmount, sipYears, sipReturn, tab]);

    useEffect(() => {
        if (tab === 'lumpsum') {
            const handler = setTimeout(() => {
                calculateLumpsum();
            }, 500);
            return () => clearTimeout(handler);
        }
    }, [lumpAmount, lumpYears, lumpReturn, tab]);

    const validateInputs = (type) => {
        let isValid = true;
        let currentErrors = {}; 
        if (type === 'sip') {
            const P = parseFloat(sipAmount);
            const n = parseFloat(sipYears);
            const r = parseFloat(sipReturn);

            if (isNaN(P) || P < 100 || P > 10000000) {
                currentErrors.sipAmount = "Monthly SIP Amount must be between ₹100 and ₹10,00,000.";
                isValid = false;
            }
            if (isNaN(n) || n <= 0 || n > 50) {
                currentErrors.sipYears = "Investment Duration must be between 1 and 50 years.";
                isValid = false;
            }
            if (isNaN(r) || r <= 0 || r > 30) {
                currentErrors.sipReturn = "Expected Annual Return must be between 0.1% and 30%.";
                isValid = false;
            }
            if (!isValid) setSipResult(null);
        } else if (type === 'lumpsum') {
            const P = parseFloat(lumpAmount);
            const n = parseFloat(lumpYears);
            const r = parseFloat(lumpReturn);

            if (isNaN(P) || P < 1000 || P > 10000000) {
                currentErrors.lumpAmount = "Lumpsum Amount must be between ₹1,000 and ₹1,00,00,000.";
                isValid = false;
            }
            if (isNaN(n) || n <= 0 || n > 50) {
                currentErrors.lumpYears = "Investment Duration must be between 1 and 50 years.";
                isValid = false;
            }
            if (isNaN(r) || r <= 0 || r > 30) {
                currentErrors.lumpReturn = "Expected Annual Return must be between 0.1% and 30%.";
                isValid = false;
            }
            if (!isValid) setLumpResult(null);
        }
        setErrorMessage(currentErrors);
        return isValid;
    };

    const calculateSIP = () => {
        if (!validateInputs('sip')) return;
        const P = parseFloat(sipAmount);
        const n = parseFloat(sipYears) * 12;
        const r = parseFloat(sipReturn) / 12 / 100;
        const futureValue = P * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
        setSipResult(futureValue.toFixed(2));
    };

    const calculateLumpsum = () => {
        if (!validateInputs('lumpsum')) return;
        const P = parseFloat(lumpAmount);
        const r = parseFloat(lumpReturn) / 100;
        const n = parseFloat(lumpYears);
        const futureValue = P * Math.pow(1 + r, n);
        setLumpResult(futureValue.toFixed(2));
    };

    const formatNumber = (num) => {
        if (num === null || isNaN(num) || num < 0) return '0';
        return parseFloat(num).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    };

    const handleSipAmountChange = (e) => {
  const value = e.target.value;
  if (value<=10000000 || value.length<=15) {
     setSipAmount(value);
    setErrorMessage((prev) => ({ ...prev, sipAmount: '' }));
  } else {
   setErrorMessage((prev) => ({ ...prev, sipAmount: "Sip Amount must be between ₹1,000 and ₹1,00,00,000." }));
  }
};

  const handleInvestmentDurationChange = (e) => {
  const value = e.target.value;
  if (value<=50) {
     setSipYears(value);
    setErrorMessage((prev) => ({ ...prev, sipYears: '' }));
  } else {
   setErrorMessage((prev) => ({ ...prev, sipYears: "Investment Duration must be between 1 and 50 years." }));
  }
};

 const handleAnnualReturnChange = (e) => {
  const value = e.target.value;
  if (value<=30) {
    setSipReturn(value);
    setErrorMessage((prev) => ({ ...prev, sipReturn: '' }));
  } else {
   setErrorMessage((prev) => ({ ...prev, sipReturn: "Expected Annual Return must be between 0.1% and 30%." }));
  }
};

// for lumpsum calculator 

    const handleLumpsumAmountChange = (e) => {
  const value = e.target.value;
  if (value<=10000000) {
    setLumpAmount(value);
    setErrorMessage((prev) => ({ ...prev, lumpAmount: '' }));
  } else {
   setErrorMessage((prev) => ({ ...prev, lumpAmount: "Lumpsum Amount must be between ₹1,000 and ₹1,00,00,000." }));
  }
};

  const handleLumpsumInvestmentDurationChange = (e) => {
  const value = e.target.value;
  if (value<=50) {
     setLumpYears(value);
    setErrorMessage((prev) => ({ ...prev, lumpYears: '' }));
  } else {
   setErrorMessage((prev) => ({ ...prev, lumpYears: "Investment Duration must be between 1 and 50 years." }));
  }
};

 const handleLumpsumAnnualReturnChange = (e) => {
  const value = e.target.value;
  if (value<=30) {
    setLumpReturn(value);
    setErrorMessage((prev) => ({ ...prev, lumpReturn: '' }));
  } else {
   setErrorMessage((prev) => ({ ...prev, lumpReturn: "Expected Annual Return must be between 0.1% and 30%." }));
  }
};
    return (
        <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-1 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">SIP Calculator</h1>
                    <p className="text-md text-gray-600 mt-2">
                        An SIP Calculator is a handy tool that allows investors to gauge the possible returns on their SIP mutual fund investment. By adding the investment amount, the period, and a probable rate of return allows the user to analyse possible returns and make a rational financial choice. Although actual returns will differ based on market conditions, the SIP calculator gives a sound estimate of how investments can increase and thus is a must-have tool for efficient financial planning.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-secondary h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center">
                                <p className="text-3xl tracking-wide font-semibold text-white">
                                    SIP Calculator
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
                            <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">Enter Details</h1>

                            {/* Tab Buttons */}
                            <div className="bg-IntColor rounded-xl p-6 shadow flex-grow">
                                <div className="flex justify-center gap-4 mb-6">
                                    <button
                                        className={`px-6 py-1.5 rounded-lg font-semibold text-lg transition-all duration-300 ${
                                            tab === 'sip' ? 'bg-primary text-white shadow-md' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                        }`}
                                        // Clear error object when switching tabs
                                        onClick={() => { setTab('sip'); setErrorMessage({}); setLumpResult(null); }}
                                    >
                                        SIP
                                    </button>
                                    <button
                                        className={`px-6 py-1.5 rounded-lg font-semibold text-lg transition-all duration-300 ${
                                            tab === 'lumpsum' ? 'bg-primary text-white shadow-md' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                        }`}
                                        // Clear error object when switching tabs
                                        onClick={() => { setTab('lumpsum'); setErrorMessage({}); setSipResult(null); }}
                                    >
                                        Lumpsum
                                    </button>
                                </div>

                                {tab === 'sip' && (
                                    <div className="grid grid-cols-1 gap-y-5">
                                        {/* Input: Monthly SIP Amount */}
                                        <div className="relative group">
                                            <label htmlFor="sipAmount" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                                Monthly SIP Amount (₹)
                                            </label>
                                            <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                                                errorMessage.sipAmount // Check if there's an error for sipAmount
                                                    ? "border-red-500 shadow-red-300"
                                                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                                <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                                <input
                                                    type="number"
                                                    id="sipAmount"
                                                    value={sipAmount}
                                                    onChange={handleSipAmountChange}
                                                    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                    min="100"
                                                    max="1000000"
                                                    placeholder="e.g., 5000"
                                                    aria-label="Monthly SIP Amount"
                                                />
                                            </div>
                                            {/* Display error message specific to sipAmount */}
                                            {errorMessage.sipAmount && <p className="text-red-500 text-sm mt-1">{errorMessage.sipAmount}</p>}
                                        </div>
                                        {/* Input: SIP Investment Duration */}
                                        <div className="relative group">
                                            <label htmlFor="sipYears" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                                Investment Duration (Years)
                                            </label>
                                            <div className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                                                errorMessage.sipYears // Check if there's an error for sipYears
                                                    ? "border-red-500 shadow-red-300"
                                                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                                <input
                                                    type="number"
                                                    id="sipYears"
                                                    value={sipYears}
                                                    onChange={handleInvestmentDurationChange}
                                                    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                    min="1"
                                                    max="50"
                                                    placeholder="e.g., 10"
                                                    aria-label="SIP Investment Duration"
                                                />
                                            </div>
                                            {/* Display error message specific to sipYears */}
                                            {errorMessage.sipYears && <p className="text-red-500 text-sm mt-1">{errorMessage.sipYears}</p>}
                                        </div>
                                        {/* Input: SIP Expected Annual Return */}
                                        <div className="relative group">
                                            <label htmlFor="sipReturn" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                                Expected Annual Return (%)
                                            </label>
                                            <div className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                                                errorMessage.sipReturn // Check if there's an error for sipReturn
                                                    ? "border-red-500 shadow-red-300"
                                                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                                <input
                                                    type="number"
                                                    id="sipReturn"
                                                    value={sipReturn}
                                                    onChange={(e) => handleAnnualReturnChange(e)}
                                                    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                    step="0.1"
                                                    min="0.1"
                                                    max="30"
                                                    placeholder="e.g., 12"
                                                    aria-label="SIP Expected Annual Return"
                                                />
                                            </div>
                                            {/* Display error message specific to sipReturn */}
                                            {errorMessage.sipReturn && <p className="text-red-500 text-sm mt-1">{errorMessage.sipReturn}</p>}
                                        </div>
                                    </div>
                                )}

                                {tab === 'lumpsum' && (
                                    <div className="grid grid-cols-1 gap-y-5">
                                        {/* Input: Lumpsum Amount */}
                                        <div className="relative group">
                                            <label htmlFor="lumpAmount" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                                Lumpsum Amount (₹)
                                            </label>
                                            <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                                                errorMessage.lumpAmount // Check if there's an error for lumpAmount
                                                    ? "border-red-500 shadow-red-300"
                                                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                                <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                                <input
                                                    type="number"
                                                    id="lumpAmount"
                                                    value={lumpAmount}
                                                    onChange={handleLumpsumAmountChange}
                                                    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                    min="1000"
                                                    max="10000000"
                                                    placeholder="e.g., 100000"
                                                    aria-label="Lumpsum Amount"
                                                />
                                            </div>
                                            {/* Display error message specific to lumpAmount */}
                                            {errorMessage.lumpAmount && <p className="text-red-500 text-sm mt-1">{errorMessage.lumpAmount}</p>}
                                        </div>
                                        {/* Input: Lumpsum Investment Duration */}
                                        <div className="relative group">
                                            <label htmlFor="lumpYears" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                                Investment Duration (Years)
                                            </label>
                                            <div className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                                                errorMessage.lumpYears // Check if there's an error for lumpYears
                                                    ? "border-red-500 shadow-red-300"
                                                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                                <input
                                                    type="number"
                                                    id="lumpYears"
                                                    value={lumpYears}
                                                    onChange={(e) => handleLumpsumInvestmentDurationChange(e)}
                                                    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                    min="1"
                                                    max="50"
                                                    placeholder="e.g., 5"
                                                    aria-label="Lumpsum Investment Duration"
                                                />
                                            </div>
                                            {/* Display error message specific to lumpYears */}
                                            {errorMessage.lumpYears && <p className="text-red-500 text-sm mt-1">{errorMessage.lumpYears}</p>}
                                        </div>
                                        {/* Input: Lumpsum Expected Annual Return */}
                                        <div className="relative group">
                                            <label htmlFor="lumpReturn" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                                Expected Annual Return (%)
                                            </label>
                                            <div className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                                                errorMessage.lumpReturn // Check if there's an error for lumpReturn
                                                    ? "border-red-500 shadow-red-300"
                                                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                                <input
                                                    type="number"
                                                    id="lumpReturn"
                                                    value={lumpReturn}
                                                    onChange={(e) => handleLumpsumAnnualReturnChange(e)}
                                                    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                    step="0.1"
                                                    min="0.1"
                                                    max="30"
                                                    placeholder="e.g., 15"
                                                    aria-label="Lumpsum Expected Annual Return"
                                                />
                                            </div>
                                            {/* Display error message specific to lumpReturn */}
                                            {errorMessage.lumpReturn && <p className="text-red-500 text-sm mt-1">{errorMessage.lumpReturn}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="mt-4 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
                            <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
                                <div className="text-center">
                                    <div className="space-y-4">
                                        {tab === 'sip' && (
                                            <>
                                                <div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                                                    <span className="text-lg font-semibold text-gray-700">Total Investment:</span>
                                                    <span className="text-xl font-bold text-green-700">
                                                        ₹ {formatNumber(parseFloat(sipAmount) * parseFloat(sipYears) * 12)}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                                                    <span className="text-lg font-semibold text-gray-700">Interest Earned:</span>
                                                    <span className="text-xl font-bold text-green-700">
                                                        ₹ {formatNumber(Math.max(0, sipResult - (parseFloat(sipAmount) * parseFloat(sipYears) * 12)))}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                                                    <span className="text-lg font-semibold text-gray-700">Total Value:</span>
                                                    <span className="text-xl font-bold text-green-700">
                                                        ₹ {formatNumber(sipResult)}
                                                    </span>
                                                </div>
                                            </>
                                        )}

                                        {tab === 'lumpsum' && (
                                            <>
                                                <div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                                                    <span className="text-lg font-semibold text-gray-700">Total Investment:</span>
                                                    <span className="text-xl font-bold text-green-700">
                                                        ₹ {formatNumber(parseFloat(lumpAmount))}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                                                    <span className="text-lg font-semibold text-gray-700">Interest Earned:</span>
                                                    <span className="text-xl font-bold text-green-700">
                                                        ₹ {formatNumber(Math.max(0, lumpResult - parseFloat(lumpAmount)))}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                                                    <span className="text-lg font-semibold text-gray-700">Total Value:</span>
                                                    <span className="text-xl font-bold text-green-700">
                                                        ₹ {formatNumber(lumpResult)}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-300 mt-6 text-center">
                                        * These are estimated values based on your inputs and assumed rates. Actual returns may vary.
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

export default SIPCalculator;