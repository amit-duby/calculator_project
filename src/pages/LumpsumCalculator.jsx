import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Target,
  PieChart,
  Lightbulb,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  XCircle,
  Home,
  Square,
  Hammer,
  Paintbrush,
  Maximize,
  RefreshCcw,
  FileText,
  Banknote,
  CreditCard,
  Users,
  Cake,
  Scale, // Some icons might not be directly used but were in previous lists, including for consistency
} from "lucide-react";
function LumpsumCalculator() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("3");
  const [futureValue, setFutureValue] = useState("0.00");
  const [gain, setGain] = useState("0.00");
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
      setFutureValue("0.00");
      setGain("0.00");
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
    if (num === null || isNaN(num) || num === "") return "0.00";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const handleLumpsumAmountChange = (e) => {
    const value = e.target.value;
    if (value <= 10000000 || value.length <= 15) {
      setAmount(value);
      setErrors((prev) => ({ ...prev, amount: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        amount: "Amount must be between ₹100 and ₹1,00,00,000.",
      }));
    }
  };

  const handleLumpsumRateChange = (e) => {
    const value = e.target.value;
    if (value <= 30) {
      setRate(value);
      setErrors((prev) => ({ ...prev, rate: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        rate: "Annual Return must be between 0.1% and 30%.",
      }));
    }
  };

  const handleLumpsumYearsChange = (e) => {
    const value = e.target.value;
    if (value <= 50) {
      setYears(value);
      setErrors((prev) => ({ ...prev, years: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        years: "Duration must be between 1 and 50 years.",
      }));
    }
  };
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const lumpsumFaqs = [
    {
      q: "Q1: What is a lump sum mutual fund investment?",
      a: "A1: A lump sum mutual fund investment is a one-time, single payment of a significant amount into a mutual fund scheme, rather than investing smaller amounts periodically (like an SIP).",
    },
    {
      q: "Q2: How is lump sum mutual fund return calculated?",
      a: 'A2: The calculator estimates returns using the compound interest formula: $A = P (1 + r)^t$, where A is the maturity amount, P is the principal, r is the expected annual return rate, and t is the tenure. <span class="font-bold text-red-600">Actual returns are market-dependent and not guaranteed.</span>',
    },
    {
      q: "Q3: Is lump sum better than SIP?",
      a: 'A3: Neither is definitively "better"; they suit different scenarios. Lump sum can yield higher returns if invested at a market low. SIP is better for averaging costs over time (Rupee Cost Averaging) and managing market volatility. Your choice depends on market conditions, risk appetite, and fund availability.',
    },
    {
      q: "Q4: What are the risks of lump sum investing?",
      a: "A4: The primary risk is market timing. If you invest a large sum just before a market downturn, your investment value can drop significantly, taking time to recover. Mutual funds are also subject to general market risks.",
    },
    {
      q: "Q5: When is a good time for lump sum investment in mutual funds?",
      a: "A5: A lump sum investment is generally considered suitable when market valuations are perceived to be low (e.g., after a significant market correction) or if you have a very long investment horizon and can ride out volatility. However, predicting market lows is extremely difficult.",
    },
    {
      q: "Q6: Are returns from lump sum mutual fund investments guaranteed?",
      a: 'A6: <span class="font-bold text-red-600">No, returns from mutual fund investments are NOT guaranteed.</span> They are subject to market risks, and the value of your investment can go up or down. The calculator provides estimates based on an expected rate, not a guarantee.',
    },
    {
      q: "Q7: How are gains from mutual funds taxed in India?",
      a: 'A7:\n<span class="font-bold">Equity-Oriented Funds:</span> Long Term Capital Gains (LTCG) over ₹1 Lakh in a financial year are taxed at 10% (after 1 year holding). Short Term Capital Gains (STCG) are taxed at 15% (less than 1 year holding).\n<span class="font-bold">Debt Funds & Others:</span> For investments made on or after April 1, 2023, all gains are taxed as per your applicable income tax slab rate.',
    },
  ];

  return (
    <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className="container max-w-screen-xl mx-auto  3sm:px-10 ">
        {/* Main Heading */}
        {/* <div className="border"> */}
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            Lump Sum Mutual Fund Calculator
          </h1>
          <p className="mb-8">
           A
              <span className="">
                Lump Sum Mutual Fund Investment
              </span>
              refers to a one-time, significant investment made into a chosen
              mutual fund scheme. Unlike a Systematic Investment Plan (SIP)
              where you invest a fixed amount periodically, a lump sum involves
              deploying all your capital at once. This approach is typically
              chosen when an investor has a substantial sum available, such as a
              bonus, inheritance, maturity proceeds from another investment, or
              funds from a property sale.
          </p>
        </section>
        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0 ">
          <div className=" rounded-lg px-0 pr-6 py-0   pb-15 w-full max-w-[40rem] opacity-85">
            <div className="relative group">
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
              >
                Investment Amount (₹):
              </label>
              <div
                className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                  errors.amount
                    ? "border-red-500 shadow-red-300"
                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                }`}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => handleLumpsumAmountChange(e)}
                  className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                  min="100"
                  max="10000000"
                  placeholder="e.g., 100000"
                  aria-label="Investment Amount"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Input: Expected Annual Return (%) */}
            <div className="relative group">
              <label
                htmlFor="rate"
                className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
              >
                Expected Annual Return (%):
              </label>
              <div
                className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                  errors.rate // Check for error on 'rate' field
                    ? "border-red-500 shadow-red-300"
                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                }`}
              >
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
                <label className="size-5 text-md font-normal text-gray-500">
                  %
                </label>
              </div>
              {errors.rate && (
                <p className="text-red-500 text-sm mt-1">{errors.rate}</p>
              )}
            </div>

            {/* Input: Investment Duration (Years) */}
            <div className="relative group">
              <label
                htmlFor="years"
                className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
              >
                Investment Duration (Years):
              </label>
              <div
                className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                  errors.years // Check for error on 'years' field
                    ? "border-red-500 shadow-red-300"
                    : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                }`}
              >
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
              {errors.years && (
                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
              )}
            </div>
          </div>
          {/* Results Section */}

          <div className="rounded-lg px-6 py-6 shadow-boxShadow bg-white w-full  ">
            <div className="text-center">
              <div className="space-y-4">
                <div className="flex justify-between border-b-2 py-3 border-gray-300">
                  <span className="text-gray-700">Initial Investment:</span>
                  <span className="font-semibold text-gray-700">
                    ₹ {formatNumber(amount)}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-3 border-gray-300">
                  <span className=" text-gray-700">Estimated Gain:</span>
                  <span className=" font-semibold text-gray-700">
                    ₹ {formatNumber(gain)}
                  </span>
                </div>
                <div className="flex  justify-between border-b-2 border-gray-300  py-3 ">
                  <span className=" text-gray-700">Total Value:</span>
                  <span className="font-semibold text-gray-700">
                    ₹ {formatNumber(futureValue)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-6 text-center">
              * This calculation provides an estimate. Actual returns may vary
              based on market performance, expense ratios, and tax implications.
            </p>
          </div>
        </div>

        <div className="mt-10">
            <div className="space-y-12 text-gray-800 text-[15px] leading-relaxed ">
          {/* What is a Lump Sum Mutual Fund Investment? Section */}
          <section className="">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Lump Sum Mutual Fund Investment?</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center"> {/* Grid for text and image */}
            <div>
              <p className="mb-4 text-gray-700 leading-relaxed">
                A <span className="font-bold ">Lump Sum Mutual Fund Investment</span> refers to a one-time, significant investment made into a chosen mutual fund scheme. Unlike a Systematic Investment Plan (SIP) where you invest a fixed amount periodically, a lump sum involves deploying all your capital at once. This approach is typically chosen when an investor has a substantial sum available, such as a bonus, inheritance, maturity proceeds from another investment, or funds from a property sale.
              </p>
              <p className="text-gray-700 leading-relaxed">
                It's a powerful way to leverage market opportunities if timed strategically, allowing your entire capital to benefit from compounding from day one.
              </p>
            </div>
            <div className="flex justify-center items-center h-full rounded-lg overflow-hidden shadow-md">
              {/* <img
                src={lumpSumConceptImage}
                alt="Illustration showing a pile of money or investments growing, representing a lump sum mutual fund investment."
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              /> */}
            </div>
          </div>
        </section>

        
        <section className="  "> 
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why is a Lump Sum Mutual Fund Calculator Important?</h2>
          <p className="mb-6 text-gray-700 leading-relaxed"> {/* Adjusted margin-bottom */}
            Investing a lump sum in mutual funds involves market dynamics, making a calculator an essential tool for strategic planning:
          </p>
          <ul className="list-none space-y-4 text-gray-700 text-[16px] leading-relaxed"> {/* Increased space for list items */}
            <li>
              <span className="font-semibold flex items-start"> {/* font-semibold for list items */}
                <Calculator size={22} className="mr-3 mt-0.5 flex-shrink-0 font-semibold" /> {/* Larger icon, better alignment */}
                Accurate Growth Projection:
              </span>
              <span className="block ml-9 -mt-1"> {/* Adjusted margin for new icon size */}
                Get an estimated view of how your one-time investment could grow over a specified period, based on an expected rate of return.
              </span>
            </li>
            <li>
              <span className="font-semibold flex items-start">
                <DollarSign size={22} className="mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                Scenario Analysis:
              </span>
              <span className="block ml-9 -mt-1">
                Test different investment amounts and tenures to see their impact on your potential maturity value and total gains.
              </span>
            </li>
            <li>
              <span className="font-semibold flex items-start">
                <TrendingUp size={22} className="mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                Fund Comparison:
              </span>
              <span className="block ml-9 -mt-1">
                Use historical returns of various mutual funds as "expected returns" to compare their potential growth over your desired horizon.
              </span>
            </li>
            <li>
              <span className="font-semibold flex items-start">
                <Target size={22} className="mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                Goal-Oriented Planning:
              </span>
              <span className="block ml-9 -mt-1">
                Align your lump sum investment with specific financial goals (e.g., retirement, child's education) by projecting the required corpus.
              </span>
            </li>
            <li>
              <span className="font-semibold flex items-start">
                <PieChart size={22} className="mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                Compounding Visualization:
              </span>
              <span className="block ml-9 -mt-1">
                Visually grasp how your entire investment benefits from compounding over the long term, enhancing financial understanding.
              </span>
            </li>
          </ul>
          <p className="mt-6 text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-md border border-blue-200">
            The <span className="font-bold text-blue-700">UniCX Lump Sum Mutual Fund Calculator</span> empowers you with estimated insights, but always remember that mutual fund returns are subject to market risks and are not guaranteed.
          </p>
        </section>

        {/* How to Use the UniCX Lump Sum Mutual Fund Calculator Section */}
        <section className=""> {/* Added padding, background, shadow */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use the UniCX Lump Sum Mutual Fund Calculator</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center"> {/* Increased gap, aligned items */}
            <div>
              <p className="text-gray-700 text-[16px] leading-relaxed">
                Our calculator provides quick estimates for your lump sum investments:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 text-[16px] leading-relaxed mt-4">
                <li>
                  <span className="font-semibold">Enter Principal Investment Amount:</span> Input the single amount you plan to invest (e.g., ₹1,00,000 or ₹10,00,000).
                </li>
                <li>
                  <span className="font-semibold">Enter Expected Annual Rate of Return (%):</span> Input the anticipated annual return percentage. <span className="font-bold bg-blue-50">(Important: This is an estimated value. Actual returns can vary significantly based on market performance.)</span>
                </li>
                <li>
                  <span className="font-semibold">Specify Investment Tenure (Years):</span> Choose the number of years you plan to stay invested.
                </li>
                <li>
                  <span className="font-semibold">Calculate:</span> Click the "Calculate Growth" button.
                </li>
              </ol>
              <p className="font-bold  mt-6 leading-relaxed bg-blue-50 p-3 rounded-md border border-blue-200">
                Disclaimer: This calculator provides estimates based on your entered expected return. Mutual fund investments are subject to market risks, and actual returns may be higher or lower than projected.
              </p>

              <h3 className="font-semibold text-xl mt-6 mb-3 text-gray-800">The UniCX Lump Sum Mutual Fund Calculator will instantly display:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-[16px] leading-relaxed">
                <li>
                  <span className="font-semibold">Estimated Maturity Value:</span> The projected total value of your investment at the end of the tenure.
                </li>
                <li>
                  <span className="font-semibold">Estimated Gains (Total Profit):</span> The estimated profit earned on your principal investment.
                </li>
              </ul>
            </div>
            {/* Image for How to Use */}
            <div className="flex justify-center items-center h-full rounded-lg overflow-hidden shadow-md"> {/* Added shadow, rounded-lg */}
              {/* <img
                src={lumpSumBenefitsImage} // Used the 'benefits' image here, as it's a good general fit for calculator interaction
                alt="Image showing the UniCX Lump Sum Mutual Fund calculator interface with inputs for amount, rate, tenure, and calculated outputs"
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              /> */}
            </div>
          </div>
        </section>

        {/* Understanding Lump Sum Mutual Fund Investments: Key Aspects Section */}
        <section className=""> {/* No specific background here, relies on main bg-white */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Lump Sum Mutual Fund Investments: Key Aspects</h2>
          <p className="mb-4 text-gray-700 text-[16px] leading-relaxed">
            To make a well-informed lump sum investment, understanding its core principles is vital:
          </p>

          <h3 className="font-semibold text-xl mt-6 mb-3 text-gray-800">What are Mutual Funds?</h3>
          <p className="mb-2 text-gray-700 text-[16px] leading-relaxed">
            <span className="font-bold">Mutual Funds</span> are investment vehicles that pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities. This portfolio is professionally managed by experienced fund managers, offering diversification and professional expertise.
          </p>

          <h3 className="font-semibold text-xl mt-6 mb-3 text-gray-800">Advantages of Lump Sum Investing</h3>
          <ul className="list-none space-y-3 text-gray-700 text-[16px] leading-relaxed">
            <li>
              <span className="font-semibold flex items-start">
                <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                Potential for Higher Returns:
              </span>
              <span className="block ml-8 -mt-0.5">
                If invested at a market low, your entire capital participates in the rally from the outset.
              </span>
            </li>
            <li>
              <span className="font-semibold flex items-start">
                <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                Simplicity:
              </span>
              <span className="block ml-8 -mt-0.5">
                It's a one-time transaction, requiring no recurring payments.
              </span>
            </li>
            <li>
              <span className="font-semibold flex items-start">
                <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                Immediate Compounding:
              </span>
              <span className="block ml-8 -mt-0.5">
                Your full investment starts compounding from day one.
              </span>
            </li>
          </ul>
          {/* Image for Understanding Lump Sum MF */}
          <div className="flex justify-center items-center mt-6 rounded-lg overflow-hidden shadow-md">
            {/* <img
              src={lumpSumUnderstandingImage}
              alt="Diagram illustrating mutual fund types, compounding, and investment growth"
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            /> */}
          </div>

          <h3 className="font-semibold text-xl mt-6 mb-3 text-gray-800">Disadvantages of Lump Sum Investing</h3>
          <ul className="list-none space-y-3 text-gray-700 text-[16px] leading-relaxed">
            <li>
              <span className="font-semibold flex items-start">
                <XCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-red-600" />
                Market Timing Risk:
              </span>
              <span className="block ml-8 -mt-0.5">
                If you invest just before a market correction, your investment value can drop significantly, taking time to recover.
              </span>
            </li>
            <li>
              <span className="font-semibold flex items-start">
                <XCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-red-600" />
                Higher Volatility Exposure:
              </span>
              <span className="block ml-8 -mt-0.5">
                Your entire capital is exposed to market volatility at once.
              </span>
            </li>
          </ul>


          <h3 className="font-semibold text-xl mt-6 mb-3 text-gray-800">When is Lump Sum Mutual Fund Investment Suitable?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-[16px] leading-relaxed">
            <li>When you have a significant surplus amount (e.g., gratuity, bonus, matured FD).</li>
            <li>When market valuations are perceived to be low (requires careful research).</li>
            <li>For investors with a high-risk appetite and a long-term investment horizon (5+ years).</li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-3 text-gray-800">Key Factors Influencing Mutual Fund Returns</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-[16px] leading-relaxed">
            <li><span className="font-semibold">Market Performance:</span> Primary driver of returns.</li>
            <li><span className="font-semibold">Fund Manager's Expertise:</span> Skill in selecting securities.</li>
            <li><span className="font-semibold">Expense Ratio:</span> Annual fee charged. Lower means higher net returns.</li>
            <li><span className="font-semibold">Exit Load:</span> Charge if you redeem before a specified period.</li>
            <li><span className="font-semibold">Investment Horizon:</span> Longer horizons generally mitigate short-term risks.</li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-3 text-gray-800">Types of Mutual Funds (Relevant for Lump Sum)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-[16px] leading-relaxed">
            <li><span className="font-semibold">Equity Funds:</span> High-risk, high-return potential. Suitable for long-term.</li>
            <li><span className="font-semibold">Debt Funds:</span> Lower risk, more stable returns. Suitable for short to medium-term.</li>
            <li><span className="font-semibold">Hybrid Funds:</span> Mix of equity and debt, offering a balance.</li>
            <li><span className="font-semibold">Index Funds/ETFs:</span> Passively managed, lower expense ratios.</li>
          </ul>
        </section>

        {/* Who Can Benefit from the UniCX Lump Sum Mutual Fund Calculator? */}
        <section className=" "> {/* Added padding, background, shadow */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Who Can Benefit from the UniCX Lump Sum Mutual Fund Calculator?</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
            <div>
                <p className="text-gray-700 text-[16px] leading-relaxed">
                    The UniCX Lump Sum Mutual Fund Calculator is a valuable tool for:
                </p>
                <ul className="list-disc list-inside space-y-3 text-gray-700 text-[16px] leading-relaxed">
                    <li>
                        <span className="font-semibold">Individuals with Surplus Capital:</span> Those who have received a significant sum of money.
                    </li>
                    <li>
                        <span className="font-semibold">Seasoned Investors:</span> Who prefer to invest in a single go based on their market outlook.
                    </li>
                    <li>
                        <span className="font-semibold">Long-Term Wealth Creators:</span> Individuals planning for long-term financial goals.
                    </li>
                    <li>
                        <span className="font-semibold">Financial Planners:</span> To quickly model different investment scenarios for their clients.
                    </li>
                </ul>
            </div>
            {/* Image for Who Can Benefit */}
            <div className="flex justify-center items-center h-full rounded-lg overflow-hidden shadow-md">
                {/* <img
                    src={lumpSumWhoCanBenefitImage}
                    alt="Image showing diverse individuals benefiting from using a lump sum mutual fund calculator for investment planning"
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                /> */}
            </div>
          </div>
        </section>

        {/* Key Considerations & Important Notes for Lump Sum Mutual Fund Investors */}
        <section className=" "> {/* No specific background here */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-yellow-800 mb-3 flex items-center">
              <Lightbulb size={24} className="mr-3 flex-shrink-0 text-yellow-600" /> {/* Larger icon */}
              Key Considerations & Important Notes for Lump Sum Mutual Fund Investors
            </h2>
            <p className="text-yellow-800 text-[16px] leading-relaxed mb-4">
              Investing a lump sum requires careful consideration due to market dynamics:
            </p>
            {/* Image for Important Considerations (If available) */}
            <div className="flex justify-center items-center mb-4"> {/* Added margin-bottom */}
              {/* <img
                  src={lumpSumConsiderationsImage}
                  alt="Icons representing financial risks, taxation, and diversification for Fixed Deposit investments"
                  className="w-auto h-20 mx-auto rounded" // Slightly larger image
                  loading="lazy"
              /> */}
            </div>
            <ul className="list-none space-y-3 text-yellow-800 text-[16px] leading-relaxed">
              <li>
                <span className="font-semibold flex items-start">
                  <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  Market Risk is Inherent:
                </span>
                <span className="block ml-8 -mt-0.5">
                  Mutual fund investments are subject to market risks. Returns are not guaranteed.
                </span>
              </li>
              <li>
                <span className="font-semibold flex items-start">
                  <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  Avoid Active Market Timing:
                </span>
                <span className="block ml-8 -mt-0.5">
                  Trying to time the market perfectly is difficult and risky. Focus on long-term investing.
                </span>
              </li>
              <li>
                <span className="font-semibold flex items-start">
                  <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  Diversification:
                </span>
                <span className="block ml-8 -mt-0.5">
                  Diversify across different funds, asset classes, and investment styles.
                </span>
              </li>
              <li>
                <span className="font-semibold flex items-start">
                  <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  Expense Ratio & Exit Load:
                </span>
                <span className="block ml-8 -mt-0.5">
                  These charges directly impact your net returns. Always check them.
                </span>
              </li>
              <li>
                <span className="font-semibold flex items-start">
                  <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  Taxation of Gains:
                </span>
                <span className="block ml-8 -mt-0.5">
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1"> {/* Nested list styling */}
                      <li><span className="font-semibold">Equity-Oriented Funds:</span> LTCG (over ₹1 Lakh) taxed at 10% (after 1 year); STCG taxed at 15%.</li>
                      <li><span className="font-semibold">Debt Funds & Others:</span> For investments from April 1, 2023, gains are taxed as per your income tax slab rate.</li>
                  </ul>
                  Consult a tax advisor for personalized guidance.
                </span>
              </li>
              <li>
                <span className="font-semibold flex items-start">
                  <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  Investment Horizon:
                </span>
                <span className="block ml-8 -mt-0.5">
                  For equity-oriented lump sum, a long-term horizon (5+ years) is generally recommended.
                </span>
              </li>
              <li>
                <span className="font-semibold flex items-start">
                  <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  Professional Advice:
                </span>
                <span className="block ml-8 -mt-0.5">
                  Consider consulting a SEBI-registered financial advisor before making significant decisions.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section className=" "> {/* Added padding, background, shadow */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <HelpCircle size={24} className="mr-3 flex-shrink-0" /> {/* Larger icon */}
            Frequently Asked Questions (FAQs) about Lump Sum Mutual Funds
          </h2>
          <div className="space-y-3"> {/* Increased space */}
            {lumpsumFaqs.map((faq, i) => (
              <div
                key={i}
                className={`border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === i ? "bg-white shadow-md" : "bg-white hover:border-gray-400" // Background on open and hover state
                }`}
              >
                <button
                  className={`flex justify-between items-center p-4 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg ${
                    openFAQ === i ? "pb-3" : "" // Add a little bottom padding when open for visual separation
                  }`}
                  onClick={() => toggleFAQ(i)}
                  aria-expanded={openFAQ === i ? "true" : "false"}
                  aria-controls={`faq-answer-${i}`}
                >
                  <p className="font-semibold text-gray-800 text-[16px]">{faq.q}</p> {/* Font size */}
                  {openFAQ === i ? <ChevronUp size={20} className="flex-shrink-0 ml-2 text-blue-600" /> : <ChevronDown size={20} className="flex-shrink-0 ml-2 text-gray-600" />}
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`text-gray-700 text-[15px] font-normal px-4 transition-all duration-300 ease-in-out ${
                    openFAQ === i ? "max-h-[500px] opacity-100 py-3" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={openFAQ !== i}
                >
                  <p dangerouslySetInnerHTML={{ __html: faq.a }}></p> {/* Using p tag inside for better styling of content */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="pt-0 border-t border-gray-200 mt-0"> {/* Adjusted padding, border color */}
          <p className="text-sm text-gray-600 leading-relaxed"> {/* Adjusted text color */}
            The UniCX Lump Sum Mutual Fund Calculator is a valuable tool to project your potential wealth growth and understand the dynamics of a one-time mutual fund investment.
            <br/><br/>
            <span className="font-bold text-red-600">Disclaimer: Mutual Fund investments are subject to market risks, read all scheme related documents carefully.</span>
            <br/><br/>
            This Lump Sum Mutual Fund Calculator and the information provided are developed and maintained by{" "}
            <span className="font-bold text-gray-800">UniCX (UniconsultX Solutions Private Limited)</span> to help
            users understand investment calculations. While we strive for accuracy, the information is for illustrative
            purposes only and should not be considered financial advice. For personalized financial advice
            or specific product details, always consult with a qualified financial advisor.
          </p>
        </section>
        </div>
</div>
</div>
      {/* </div> */}
    </section>
  );
}

export default LumpsumCalculator;
