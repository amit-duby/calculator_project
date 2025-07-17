import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from "react-icons/fa";
import { ChevronDown, ChevronUp, TrendingUp, HandCoins, DollarSign, Target, Clock, ShieldCheck, HelpCircle } from 'lucide-react'; // Added icons for SIP context
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

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the minimum amount I can invest in a SIP?",
      a: "Most mutual funds allow you to start a SIP with as little as ₹500 per month. Some funds may have slightly higher minimums."
    },
    {
      q: "Is SIP a guaranteed return investment?",
      a: "No, SIPs are not guaranteed returns. They are market-linked investments, and returns depend on the performance of the underlying mutual fund scheme. However, rupee cost averaging helps mitigate volatility over the long term."
    },
    {
      q: "Can I stop or pause my SIP anytime?",
      a: "Yes, most mutual funds allow you to stop or pause your SIP at any time without penalty, though you may need to submit a request with a few days' notice."
    },
    {
      q: "What is Rupee Cost Averaging?",
      a: "Rupee cost averaging is a strategy where you invest a fixed amount regularly, regardless of market fluctuations. This means you buy more units when prices are low and fewer when prices are high, averaging out your purchase cost over time."
    },
    {
      q: "How is SIP different from a lump sum investment?",
      a: "A lump sum is a one-time, large investment, while a SIP involves regular, smaller investments over time. SIPs are ideal for managing market volatility, while lump sums may perform better in a consistently rising market if timed correctly."
    },
  ];
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
          <div className="space-y-12 text-gray-800 text-[15px] leading-relaxed">

      {/* Main Title & Intro - Using the HRA "updates" style for prominence */}
      <section className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
        <h1 className="text-3xl font-bold text-blue-700 mb-3 flex items-center gap-2">
          <TrendingUp size={24} className="flex-shrink-0" />
          UniCX SIP Calculator: <strong>Grow Your Wealth Systematically</strong>
        </h1>
        <p className="text-blue-800 mb-4">
          Welcome to the UniCX Free Online SIP Calculator! Systematic Investment Plans (SIPs) are a popular and disciplined way to invest in mutual funds, helping you build wealth over time by investing a fixed amount regularly. Our calculator simplifies the process of estimating your potential returns, empowering you to plan your financial future effectively.
        </p>
      </section>

      {/* Placeholder for the SIP Calculator Component */}
      <section className="sip-calculator-section p-6 bg-white rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculate Your SIP Returns & Plan Your Investments</h2>
        <p className="text-gray-700 mb-6">
          <em>(Your actual SIP Calculator component with input fields and results will be displayed here.)</em>
        </p>
        {/* Placeholder example for your calculator, replace this with your actual component */}
      </section>

      {/* What is a Systematic Investment Plan (SIP)? - Standard section style */}
      <section>
        <h2 className="text-2xl font-bold mb-3">What is a Systematic Investment Plan (SIP)?</h2>
        <p className="mb-4">
          A <strong>Systematic Investment Plan (SIP)</strong> is an investment method offered by mutual funds, allowing investors to make regular, fixed payments (e.g., monthly, quarterly) into a chosen mutual fund scheme. It's akin to a recurring deposit, but for mutual funds, and it enables investors to participate in the stock market without requiring a large lump sum.
        </p>
        <p className="mb-4">
          SIPs are designed to instill financial discipline and mitigate market volatility through a strategy called <strong>Rupee Cost Averaging</strong>. They have become immensely popular as they make investing in dynamic markets accessible to everyone, irrespective of their income level, by allowing them to start with small, manageable amounts.
        </p>
        <p>
          This method fosters a habit of regular saving and investing, proving to be a powerful tool for long-term wealth creation, especially when leveraging the benefit of compounding.
        </p>
      </section>

      {/* How Does a SIP Work? - Standard section style */}
      <section>
        <h2 className="text-2xl font-bold mb-3">How Does a SIP Work? (The Power of Rupee Cost Averaging)</h2>
        <p className="mb-4">
          Instead of investing a large sum at once (lump sum), a SIP allows you to invest smaller, regular amounts. Here’s how it typically works and why it's effective:
        </p>
        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>
            <strong>Fixed Investment:</strong> You decide on a fixed amount (e.g., ₹1,000, ₹5,000, ₹10,000) you want to invest at a regular interval (e.g., monthly, quarterly).
          </li>
          <li>
            <strong>Regular Purchases:</strong> On a pre-determined date, your chosen amount is automatically debited from your bank account and invested into your selected mutual fund scheme.
          </li>
          <li>
            <strong>Varying Units:</strong> Because market prices (Net Asset Value - NAV) fluctuate, your fixed investment buys a different number of units each time:
            <ul className="list-disc list-inside ml-4">
              <li>When NAV is high, you buy fewer units.</li>
              <li>When NAV is low, you buy more units.</li>
            </ul>
          </li>
          <li>
            <strong>Rupee Cost Averaging:</strong> Over time, this averages out your purchase cost per unit. You end up buying more units when prices are low and fewer when prices are high, which can result in a lower average cost per unit compared to a lump sum investment, especially in volatile markets.
          </li>
        </ol>
      </section>

      {/* Key Benefits of Investing through SIP - Using the NPS/HRA Card Style */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">Key Benefits of Investing through SIP</h2>
        <p className="mb-4">
          SIPs offer several compelling advantages, making them a robust choice for your wealth creation journey:
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <HandCoins size={20} className="flex-shrink-0" /> Financial Discipline:
            </h3>
            <p className="text-sm text-gray-600">Instills a habit of regular saving and investing.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <DollarSign size={20} className="flex-shrink-0" /> Rupee Cost Averaging:
            </h3>
            <p className="text-sm text-gray-600">Reduces the risk of market timing by averaging out the purchase cost of units over time.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <TrendingUp size={20} className="flex-shrink-0" /> Power of Compounding:
            </h3>
            <p className="text-sm text-gray-600">Allows your returns to generate further returns, leading to significant wealth creation over the long term. Even small, regular investments can grow into substantial sums.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <Clock size={20} className="flex-shrink-0" /> Flexibility:
            </h3>
            <p className="text-sm text-gray-600">You can choose your investment amount, frequency, and stop or pause your SIPs as needed (subject to scheme rules).</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <HandCoins size={20} className="flex-shrink-0" /> Affordability:
            </h3>
            <p className="text-sm text-gray-600">Start investing with amounts as low as ₹500 per month, making it accessible to a wider range of investors.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <Target size={20} className="flex-shrink-0" /> Goal-Oriented Investing:
            </h3>
            <p className="text-sm text-gray-600">Easily link your SIPs to specific financial goals like buying a house, children's education, or retirement planning.</p>
          </div>
        </div>
      </section>

      {/* How to Use the UniCX Free Online SIP Calculator - Standard ordered list style */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">How to Use the UniCX Free Online SIP Calculator</h2>
        <p className="mb-4">
          Our UniCX SIP Calculator makes estimating your potential returns simple and quick. Follow these steps to see your wealth growth potential:
        </p>
        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>
            <strong>Monthly Investment (₹):</strong> Enter the fixed amount you plan to invest regularly (e.g., monthly).
          </li>
          <li>
            <strong>Investment Period (Years):</strong> Specify the total number of years you intend to continue your SIP.
          </li>
          <li>
            <strong>Expected Annual Return (%):</strong> Input your assumed annual rate of return from your mutual fund investments. This is an assumed figure, as actual returns depend on market performance.
          </li>
          <li>
            <strong>Click "Calculate":</strong> The calculator will instantly display your "Invested Amount" and "Estimated Returns."
          </li>
        </ol>
      </section>

      {/* Understanding Your SIP Calculator Results - Standard section with example box */}
      <section className=''>
        <h2 className="text-2xl font-bold mb-3">Understanding Your SIP Calculator Results</h2>
        <p className="mb-4">
          Once you input your details, our calculator provides a clear breakdown of your potential SIP growth:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>
            <strong>Total Invested Amount:</strong> This is the cumulative sum of all your monthly investments over the specified investment period.
          </li>
          <li>
            <strong>Estimated Returns:</strong> This is the projected profit you might earn on your total invested amount, based on the expected annual return you entered.
          </li>
          <li>
            <strong>Total Value (Corpus):</strong> This is the sum of your "Total Invested Amount" and "Estimated Returns," representing the estimated total value of your investment at the end of the period.
          </li>
        </ul>

        <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded shadow-sm mt-6">
          <p className="text-gray-700 mb-2">
            📊 <strong>Example Calculation:</strong>
          </p>
          <p className="text-blue-700 font-semibold">
            Monthly Investment: <strong>₹5,000</strong>
          </p>
          <p className="text-blue-700 font-semibold">
            Investment Period: <strong>10 Years</strong>
          </p>
          <p className="text-blue-700 font-semibold">
            Expected Annual Return: <strong>12%</strong>
          </p>
          <p className="text-blue-800 font-bold text-lg mt-2">
            Estimated Invested Amount: <strong>₹6,00,000</strong>
          </p>
          <p className="text-blue-800 font-bold text-lg">
            Estimated Returns: <strong>₹5,62,491</strong>
          </p>
          <p className="text-blue-800 font-bold text-lg">
            Estimated Total Value (Corpus): <strong>₹11,62,491</strong>
          </p>
        </div>
      </section>

      {/* Important SIP Considerations & Tips - Standard list style */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">Important SIP Considerations & Tips</h2>
        <p className="mb-4">
          While SIPs are an excellent investment tool, keep these points in mind for optimal results:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-lg">Realistic Expectations:</strong> Expected returns are assumptions. Actual returns are subject to market risks and fund performance.
          </li>
          <li>
            <strong className="text-lg">Long-Term Horizon:</strong> SIPs deliver the best results when allowed to compound over a long period (5+ years).
          </li>
          <li>
            <strong className="text-lg">Fund Selection:</strong> Choose mutual funds carefully based on your financial goals, risk appetite, and past performance (though past performance is not indicative of future results).
          </li>
          <li>
            <strong className="text-lg">Regular Review:</strong> Periodically review your SIPs and portfolio to ensure they align with your goals and make adjustments if necessary.
          </li>
          <li>
            <strong className="text-lg">Inflation:</strong> Factor in inflation when setting financial goals, as it erodes the purchasing power of money over time.
          </li>
          <li>
            <strong className="text-lg">Taxation:</strong> Returns from mutual funds are subject to taxation (Capital Gains Tax). Consult a tax advisor for specific guidance.
          </li>
          <li>
            <strong className="text-lg">Emergency Fund:</strong> Ensure you have an adequate emergency fund before starting SIPs.
          </li>
        </ul>
      </section>

      {/* Advantages of Using the UniCX SIP Calculator - Using the NPS/HRA Card Style */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">Advantages of Using the UniCX SIP Calculator</h2>
        <p className="mb-4">
          Leveraging our <strong>free online SIP calculator</strong> offers significant benefits for accurate investment planning:
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <Clock size={20} className="flex-shrink-0" /> Quick Estimates:
            </h3>
            <p className="text-sm text-gray-600">Instantly see potential returns for various investment scenarios.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <Target size={20} className="flex-shrink-0" /> Simplify Complex Calculations:
            </h3>
            <p className="text-sm text-gray-600">Our tool handles the compounding effect, making projections easy to understand.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <HandCoins size={20} className="flex-shrink-0" /> Goal-Based Planning:
            </h3>
            <p className="text-sm text-gray-600">Helps you set realistic SIP amounts and durations to achieve your financial goals.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <HelpCircle size={20} className="flex-shrink-0" /> User-Friendly Interface:
            </h3>
            <p className="text-sm text-gray-600">Designed for ease of use, even for individuals new to investing.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
              <ShieldCheck size={20} className="flex-shrink-0" /> Empowerment:
            </h3>
            <p className="text-sm text-gray-600">Provides clear data to make informed investment decisions.</p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQs) about SIP - Interactive section */}
      <section>
        <h2 className="text-2xl font-bold mb-3">
          Frequently Asked Questions (FAQs) about SIP
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`py-2 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
                openFAQ === i ? "bg-blue-50 rounded-lg shadow-md border border-blue-200" : ""
              }`}
              onClick={() => toggleFAQ(i)}
            >
              <div
                className={`flex justify-between items-center px-3 ${
                  openFAQ !== i ? "border border-gray-300 rounded-lg py-3" : ""
                }`}
              >
                <p className="font-semibold">{faq.q}</p>
                {openFAQ === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              <p
                className={`text-gray-800 text-md font-normal px-3 ${
                  openFAQ === i ? "max-h-[500px] opacity-100 py-2" : "max-h-0 opacity-0"
                }`}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* UniCX Expert Support & Resources - Consistent styling */}
      <section id="contact" className="">
        <h2 className="text-2xl font-bold mb-3">
          Beyond Calculations: UniCX - Your Partner in Financial Growth
        </h2>
        <p className="mb-4">
          At <strong>UniconsultX Solutions Private Limited (UniCX)</strong>, our
          commitment extends beyond providing a powerful SIP calculator. We
          understand that effective wealth creation requires comprehensive support and strategic planning. That's
          why we offer <strong>expert financial services</strong> to help you achieve your investment goals.
        </p>
        <h3 className="font-semibold text-xl mt-4 mb-2">
          Our Expert Financial Services Include:
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Investment Advisory:</strong> Personalized guidance on mutual funds, stocks, and other investment avenues.
          </li>
          <li>
            <strong>Financial Planning:</strong> Holistic plans to manage your income, expenses, savings, and investments for long-term goals.
          </li>
          <li>
            <strong>Retirement Planning:</strong> Strategies to build a robust corpus for a secure post-retirement life.
          </li>
          <li>
            <strong>Tax Planning & Optimization:</strong> Advice on minimizing tax liabilities through smart investments.
          </li>
          <li>
            <strong>Portfolio Management:</strong> Regular review and rebalancing of your investments.
          </li>
        </ul>
        <p className="mt-4">
          <strong>Start Your Investment Journey with UniCX:</strong> We are dedicated to being your
          reliable source for all things financial planning and investment. Explore our website for more
          in-depth articles, common FAQs, and the latest market updates. Partner with UniCX for peace of mind in your wealth creation journey.
        </p>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
            Get Expert Investment Consultation
          </button>
        </div>
      </section>

      {/* Footer note - Consistent styling */}
      <footer className="pt-6 border-t mt-6">
        <p className="text-sm text-gray-500">
          This SIP calculator and information is developed and maintained by{" "}
          <strong>UniCX (UniconsultX Solutions Private Limited)</strong> to help
          users estimate potential returns from Systematic Investment Plans as per general market principles.
          For personalized investment advice, specific fund recommendations, or complex financial planning,
          always consult with a qualified financial advisor or{" "}
          <a href="#contact" className="text-blue-600 hover:underline">
            contact UniCX directly
          </a>
          . Investment in mutual funds is subject to market risks. Please read the offer document carefully before investing.
        </p>
      </footer>
    </div>
        </div>
    );
}

export default SIPCalculator;