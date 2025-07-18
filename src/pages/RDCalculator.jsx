import React, { useState, useEffect } from 'react';
// Assuming you're using Lucide icons, adjust imports as needed
import { BarChart2, DollarSign, Clock, TrendingUp, HelpCircle, CheckCircle, ChevronUp, ChevronDown, Calculator, PiggyBank, Target } from 'lucide-react'; 
// Assuming FaRupeeSign is used for currency inputs
import { FaRupeeSign } from 'react-icons/fa'; 

// Placeholder image URLs for RD Calculator
// Suggestions for image content:
const rdBenefitImage = "YOUR_RD_BENEFIT_IMAGE_URL"; // Suggestion: A graphic showing money growing over time, or stacked coins with an arrow upwards.
const rdCalculatorUsageImage = "YOUR_RD_CALCULATOR_USAGE_IMAGE_URL"; // Suggestion: An illustration of a hand using a tablet/computer with calculator interface.
const rdConsiderationsImage = "YOUR_RD_CONSIDERATIONS_IMAGE_URL"; // Suggestion: A visual representing security or planning, e.g., a shield or a calendar with financial notes.
// const whoBenefitsRdImage 

function RDCalculator() {
    const [monthlyAmount, setMonthlyAmount] = useState('5000');
    const [tenureMonths, setTenureMonths] = useState('70'); // Default to 70 months
    const [interestRate, setInterestRate] = useState('10.6');
    const [result, setResult] = useState({
        maturity: '',
        interest: '',
        principal: ''
    });
    const [errors, setErrors] = useState({});

    const calculateRD = () => {
        const P = parseFloat(monthlyAmount); // Monthly Deposit
        const annualRate = parseFloat(interestRate); // Annual Interest Rate (e.g., 10.6)
        const N_months = parseInt(tenureMonths); // Total Tenure in Months

        // Basic validation
        if (isNaN(P) || P <= 0 || isNaN(annualRate) || annualRate < 0 || isNaN(N_months) || N_months <= 0) {
            setResult({ maturity: '0.00', interest: '0.00', principal: '0.00' });
            return;
        }

        const r_annual_decimal = annualRate / 100; // Annual rate as decimal (e.g., 0.106)
        const r_quarterly_decimal = r_annual_decimal / 4; // Quarterly rate as decimal

        let maturityAmount = 0;

        // Loop through each monthly installment
        for (let k = 1; k <= N_months; k++) {
            // For the k-th deposit (1-indexed month)
            // Number of months this specific deposit will remain in the account until maturity
            const monthsRemainingForThisDeposit = N_months - k + 1;
            
            // Number of full quarters this specific deposit will earn interest
            const compoundingPeriods = Math.floor(monthsRemainingForThisDeposit / 3);
            
            // Add the future value of this deposit to the total maturity amount
            maturityAmount += P * Math.pow((1 + r_quarterly_decimal), compoundingPeriods);
        }

        const totalPrincipal = P * N_months;
        const interestEarned = maturityAmount - totalPrincipal;

        setResult({
            maturity: maturityAmount.toFixed(2),
            interest: interestEarned.toFixed(2),
            principal: totalPrincipal.toFixed(2)
        });
    };

    useEffect(() => {
        calculateRD();
    }, [monthlyAmount, tenureMonths, interestRate]);

    const formatNumber = (num) => {
        if (num === null || isNaN(num) || num === '') return '0.00';
        return parseFloat(num).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };

    const handleTenureChange = (e) => {
        const value = e.target.value;
        // setTenureMonths(value);
        
        // Tenure between 6 and 120 months (typical RD tenure)
        if (value === '' || (value) <= 120) { 
            setTenureMonths(value)
            setErrors((prev) => ({ ...prev, tenureMonths: '' }));
        } else {
            setErrors((prev) => ({ ...prev, tenureMonths: 'Tenure must be between 6 and 120 months' }));
        }
    };

    const handleRateChange = (e) => {
        const value = e.target.value;
        // setInterestRate(value);

        // Rate between 0% and 25% (a reasonable range for bank interest rates)
        if (value === '' || ((value) >= 0 && (value) <= 25)) { 
            setErrors((prev) => ({ ...prev, interestRate: '' }));
            setInterestRate(value);
        } else {
            setErrors((prev) => ({ ...prev, interestRate: 'Rate must be between 0% and 25%' }));
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setMonthlyAmount(value);

        // Keeping your character limit validation
        if (value.length <= 15) { 
            setErrors((prev) => ({ ...prev, monthlyAmount: '' }));
        } else {
            setErrors((prev) => ({
                ...prev,
                monthlyAmount: 'Amount cannot be more than 15 characters',
            }));
        }
    };

    // Calculate tenure in years for display
    const tenureYears = parseInt(tenureMonths) >= 12 ? Math.floor(parseInt(tenureMonths) / 12) : 0;
    const remainingMonths = parseInt(tenureMonths) % 12;
// console.log(tenureYears,tenureMonths,"tensun year ")
// console.log(remainingMonths,tenureMonths,"tensun year ")

  const [openFAQ, setOpenFAQ] = React.useState(null); 
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // RD Calculator FAQs data
  const rdFaqs = [
    {
      q: "Q1: Can I increase or decrease my monthly RD installment during the tenure?",
      a: "A1: Typically, no. Once an RD account is opened, the monthly installment amount is fixed for the entire tenure. If you wish to change the amount, you would usually need to close the existing RD and open a new one."
    },
    {
      q: "Q2: Can I make partial withdrawals from an RD account?",
      a: "A2: No, partial withdrawals are generally not allowed from an RD account. If you need funds, you might have to prematurely close the account, which usually involves a penalty. Alternatively, some banks offer a loan against your RD."
    },
    {
      q: "Q3: Is the interest earned on an RD taxable?",
      a: "A3: Yes, the interest earned on a Recurring Deposit is fully taxable as \"Income from Other Sources\" as per your applicable income tax slab rates. If the total interest across all your RDs and FDs in a bank exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year, the bank will deduct TDS (Tax Deducted at Source)."
    },
    {
      q: "Q4: What happens if I miss an RD installment?",
      a: "A4: If you miss an RD installment, most banks levy a small penalty. Repeated defaults might lead to the closure of the RD account. It's advisable to maintain consistency to avoid penalties and ensure your savings plan stays on track."
    },
    {
      q: "Q5: Is a Recurring Deposit (RD) better than a Fixed Deposit (FD)?",
      a: "A5: Both RDs and FDs are safe investment options, but they serve different purposes. An FD is ideal if you have a lump sum amount to invest for a fixed period. An RD is perfect for individuals who want to save small amounts regularly over time and build a corpus, fostering a disciplined saving habit. Neither is \"better\" – it depends on your savings pattern and financial needs."
    }
  ];
    return (
        <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-1 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Recurring Deposit Calculator</h1>
                    <p className="text-md text-gray-600 mt-2">
                        Estimate the maturity amount and interest earned on your Recurring Deposit (RD).
                        Enter your monthly deposit amount, tenure, and annual interest rate.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-gray-200 h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center">
                                <p className="text-3xl tracking-wide font-semibold text-white">
                                    RD Calculator
                                </p>
                                <span className="text-gray-300 xl:text-md">
                                    Plan your recurring investments
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
                        <div className="mt-2 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">Enter Details</h1>
                            <div className="bg-gray-50 rounded-xl p-6 shadow flex-grow">
                                <div className="grid grid-cols-1 gap-y-5">
                                    {/* Input: Monthly Deposit */}
                                    <div className="relative group">
                                        <label htmlFor="monthlyAmount" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Monthly Deposit (₹)
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${errors.monthlyAmount ? "border-borderColor shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                            <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                            <input
                                                type="number"
                                                id="monthlyAmount"
                                                value={monthlyAmount}
                                                onChange={handleAmountChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                placeholder="e.g., 5000"
                                                aria-label="Monthly Deposit"
                                            />
                                        </div>
                                        {errors.monthlyAmount && <p className="text-red-500 text-xs mt-1">{errors.monthlyAmount}</p>}
                                    </div>

                                    {/* Input: Tenure (Months) */}
                                    <div className="relative group">
                                        <label htmlFor="tenureMonths" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Tenure (Months)
                                        </label>
                                        <div className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1
                                            ${errors.tenureMonths ? "border-borderColor shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                            <input
                                                type="number"
                                                id="tenureMonths"
                                                value={tenureMonths}
                                                onChange={handleTenureChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="1"
                                                placeholder="e.g., 60"
                                                aria-label="Tenure in Months"
                                            />
                                        </div>
                                        {errors.tenureMonths && <p className="text-red-500 text-xs mt-1">{errors.tenureMonths}</p>}
                                        {/* Display tenure in years and months */}
                                        {tenureMonths && parseInt(tenureMonths) >= 1 && (
                                            <p className="text-gray-500 text-sm mt-1">
                                                {tenureYears > 0 ? `${tenureYears} Year${tenureYears > 1 ? 's' : ''}` : ''}
                                                {tenureYears > 0 && remainingMonths > 0 ? ' and ' : ''}
                                                {remainingMonths > 0 ? `${remainingMonths} Month${remainingMonths > 1 ? 's' : ''}` : ''}
                                                {tenureYears === 0 && remainingMonths === 0 && parseInt(tenureMonths) > 0 ? `${tenureMonths} Month${parseInt(tenureMonths) > 1 ? 's' : ''}` : ''}
                                            </p>
                                        )}
                                    </div>

                                    {/* Input: Annual Interest Rate (%) */}
                                    <div className="relative group">
                                        <label htmlFor="interestRate" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Annual Interest Rate (%)
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${errors.interestRate ? "border-borderColor shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}>
                                            <input
                                                type="number"
                                                id="interestRate"
                                                value={interestRate}
                                                onChange={handleRateChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                step="0.01"
                                                placeholder="e.g., 7.5"
                                                aria-label="Annual Interest Rate"
                                            />
                                            <label className="size-5 text-md font-normal text-gray-500">%</label>
                                        </div>
                                        {errors.interestRate && <p className="text-red-500 text-xs mt-1">{errors.interestRate}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="mt-2 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
                            <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">

                                <div className="text-center">
                                    <div className="space-y-4">
                                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Deposited Amount:</span>
                                            <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.principal)}</span>
                                        </div>
                                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Total Interest Earned:</span>
                                            <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.interest)}</span>
                                        </div>
                                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Total Maturity Amount:</span>
                                            <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.maturity)}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 mt-6 text-center">
                                    * This calculation is an estimate and may vary based on specific bank policies and compounding frequencies.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className="container max-w-screen-xl mx-auto 3sm:px-10">

        {/* RD Calculator Main Heading */}
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            UniCX RD Calculator: Calculate Your Recurring Deposit Returns with Ease
          </h1>
        </section>

        {/* What is a Recurring Deposit (RD)? Section */}
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-3">What is a Recurring Deposit (RD)?</h2>
            <p className="mb-4 text-gray-800 leading-relaxed">
                A <strong className="font-semibold">Recurring Deposit (RD)</strong> is a popular savings scheme offered by banks and post offices in India, designed for individuals who wish to save a fixed amount regularly over a specific period. With an RD, you commit to depositing a fixed sum of money every month for a chosen tenure, typically ranging from 6 months to 10 years. In return, your deposits earn a fixed interest rate, and at the end of the tenure, you receive a lump sum amount, including your total invested principal and the accumulated interest. RDs are an excellent tool for disciplined savings towards specific financial goals.
            </p>
        </section>

        {/* Why Use the UniCX RD Calculator? Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Why Use the UniCX RD Calculator?</h2>
          <p className="mb-8 text-gray-800 leading-relaxed">
            Planning your finances effectively often requires knowing the exact returns on your investments. The <strong className="font-semibold">UniCX RD Calculator</strong> offers invaluable benefits for anyone considering a Recurring Deposit:
          </p>
        </section>

        {/* Main Calculator Grid (Placeholder for actual calculator UI) */}
        {/*
          This section should mirror the structure of your other calculators.
          Integrate your React state management and input fields here.
        */}
        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0">
          {/* Left - RD Calculator Input Section */}
          <div className="rounded-lg px-0 pr-6 py-0 pb-15 w-full max-w-[40rem] opacity-85">
            {/* Input Field: Monthly Installment */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Monthly Installment (₹)
              </label>
              <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  type="number"
                  inputMode="numeric"
                  // value={monthlyInstallmentState}
                  // onChange={handleMonthlyInstallmentChange}
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g., 5000"
                  min="100"
                />
              </div>
            </div>

            {/* Input Field: Tenure (Years) */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Tenure (Years)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={tenureYearsState}
                        // onChange={handleTenureYearsChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 3"
                        min="0.5" // 6 months
                        max="10" // 10 years
                        step="0.5"
                    />
                    <span className="text-gray-500 ml-2">Years</span>
                </div>
            </div>

            {/* Input Field: Annual Interest Rate (%) */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Annual Interest Rate (%)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={interestRateState}
                        // onChange={handleInterestRateChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 7.00"
                        min="0"
                        max="20"
                        step="0.01"
                    />
                    <span className="text-gray-500 ml-2">%</span>
                </div>
            </div>

            {/* Calculate Button */}
            <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300 mr-7 w-full">
                Calculate RD Maturity
            </button>
          </div>

          {/* Right - RD Calculator Result Section */}
          <div className="rounded-lg px-6 py-6 shadow-boxShadow bg-white w-full">
            <div className="mt-5">
              <div className="space-y-4">
                <div className="flex justify-between border-b-2 py-3 border-gray-300">
                  <span className="text-gray-700">Total Amount Invested</span>
                  <span className="font-semibold text-gray-700">
                    ₹ {'0.00'} {/* Placeholder: Replace with your state */}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-3 border-gray-300">
                  <span className="text-gray-700">Total Interest Earned</span>
                  <span className="font-semibold text-gray-700">
                    ₹ {'0.00'} {/* Placeholder: Replace with your state */}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Maturity Amount</span>
                  <span className="font-bold text-primary text-lg">
                    ₹ {'0.00'} {/* Placeholder: Replace with your state */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Use the UniCX RD Calculator? (Expanded Benefits Section) */}
        <section className="mt-10">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-3">
                Key Benefits of Using the UniCX RD Calculator
              </h2>
              <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
                The UniCX RD Calculator empowers you to make smarter savings decisions:
              </p>
              {/* Removed list-disc list-inside for icon-based list */}
              <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong className="flex items-start">
                    <Calculator size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Predict Your Earnings:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Get an instant and accurate estimate of the <strong className="font-semibold">maturity amount</strong> you will receive, including total principal and interest earned.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <Target size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Plan Financial Goals:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Knowing the exact maturity value helps you align your savings with specific goals like a down payment or vacation.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <BarChart2 size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Compare Schemes:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Easily compare potential returns from <strong className="font-semibold">different RD schemes</strong> by simply adjusting the interest rate and tenure.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <TrendingUp size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Optimize Your Savings:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Understand the impact of increasing your monthly installment or extending your tenure on your final amount.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Avoid Manual Errors:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Eliminate the complexity and potential errors of manual calculations, giving you confidence in your financial projections.
                  </span>
                </li>
              </ul>
            </div>
            {/* Image for RD Calculator Benefits - Concept: Money growth or financial planning */}
            <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={rdBenefitImage} // You'll generate this image later
                alt="Benefits of using UniCX RD Calculator - Financial Growth"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
              /> */}
            </div>
          </div>
        </section>

        {/* How to Use the UniCX RD Calculator Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            How to Use the UniCX RD Calculator
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Our <strong className="font-semibold">user-friendly RD Calculator</strong> is designed for simplicity and accuracy. To get an instant calculation of your Recurring Deposit maturity amount, simply input the following details:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Monthly Installment (₹):</strong> Enter the fixed amount you plan to deposit every month.
                </li>
                <li>
                  <strong>Tenure (Years/Months):</strong> Specify the duration for which you intend to make deposits.
                </li>
                <li>
                  <strong>Annual Interest Rate (%):</strong> Input the annual interest rate offered for the RD scheme.
                </li>
                <li>
                  <strong>View Your Results:</strong> The calculator will instantly display your Total Amount Invested, Total Interest Earned, and the final Maturity Amount.
                </li>
              </ol>
            </div>
            {/* Image for How to Use RD Calculator - Concept: User interacting with a digital calculator */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={rdCalculatorUsageImage} // You'll generate this image later
                alt="How to use UniCX RD Calculator - Step by step guide"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
              /> */}
            </div>
          </div>
        </section>

        {/* Key Factors Affecting Your RD Returns */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Key Factors Affecting Your RD Returns</h2>
          <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
            The final maturity amount of your Recurring Deposit is primarily influenced by these core factors:
          </p>
          {/* Removed list-disc list-inside for icon-based list */}
          <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong className="flex items-start">
                <DollarSign size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Monthly Installment:
              </strong>
              <span className="block ml-6 -mt-1">
                This is the most direct factor. A <strong className="font-semibold">higher monthly deposit</strong> will naturally lead to a larger total principal invested and, consequently, a higher maturity amount.
              </span>
            </li>
            <li>
              <strong className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Tenure:
              </strong>
              <span className="block ml-6 -mt-1">
                The duration for which you invest is crucial. A <strong className="font-semibold">longer tenure</strong> allows your money more time to grow, especially benefiting from the power of compounding interest.
              </span>
            </li>
            <li>
              <strong className="flex items-start">
                <TrendingUp size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Annual Interest Rate:
              </strong>
              <span className="block ml-6 -mt-1">
                The <strong className="font-semibold">interest rate offered by the bank</strong> is a direct determinant of your earnings. Even a small difference can significantly impact your total interest earned.
              </span>
            </li>
            <li>
              <strong className="flex items-start">
                <BarChart2 size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Compounding Frequency:
              </strong>
              <span className="block ml-6 -mt-1">
                While rates are quoted annually, RD interest is typically <strong className="font-semibold">compounded quarterly</strong>, leading to slightly higher effective returns. Our calculator accounts for this.
              </span>
            </li>
          </ul>
        </section>

        {/* Important Considerations for Recurring Deposits (RDs) - Info Box */}
        <section className="mt-10">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center">
              <PiggyBank size={20} className="mr-3 mt-1 flex-shrink-0" /> {/* Using PiggyBank for savings focus */}
              Important Considerations for Recurring Deposits (RDs)
            </h2>
            <p className="text-blue-800 mb-4 text-[15px] leading-relaxed">
              Before opening an RD, it's beneficial to be aware of these key aspects:
            </p>
            {/* Image for Important Considerations */}
            {/* <img
                src={rdConsiderationsImage} // You'll generate this image later
                alt="Important Considerations for Recurring Deposits"
                className="w-auto h-16 mx-auto my-4" // Consistent with other info box image sizes
            /> */}
            {/* Removed list-inside for icon-based list */}
            <ul className="list-none space-y-2 text-blue-700 text-[15px] leading-relaxed">
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Fixed Interest Rate:
                </strong>
                <span className="block ml-6 -mt-1">
                  Once an RD account is opened, the <strong className="font-semibold">interest rate remains fixed</strong> for the entire chosen tenure.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Premature Withdrawal Penalties:
                </strong>
                <span className="block ml-6 -mt-1">
                  Most banks allow premature closure, but it usually comes with a <strong className="font-semibold">penalty</strong> on the interest earned.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Loan Against RD:
                </strong>
                <span className="block ml-6 -mt-1">
                  Many banks offer the facility to take a <strong className="font-semibold">loan against your RD account</strong>, typically up to 80-90% of the deposited amount.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Tax Deducted at Source (TDS):
                </strong>
                <span className="block ml-6 -mt-1">
                  If total interest earned from RDs (and FDs) exceeds <strong className="font-semibold">₹40,000 (₹50,000 for senior citizens)</strong> in a financial year, banks will deduct TDS.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Nomination Facility:
                </strong>
                <span className="block ml-6 -mt-1">
                  It is crucial to avail the <strong className="font-semibold">nomination facility</strong> for smooth transfer of maturity amount in unforeseen events.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Missed Installments:
                </strong>
                <span className="block ml-6 -mt-1">
                  Missing an installment might attract a <strong className="font-semibold">small penalty</strong> from the bank; consistency is key.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Who Can Benefit from the UniCX RD Calculator? */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Who Can Benefit from the UniCX RD Calculator?
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
                <p className="text-gray-800 text-[15px] leading-relaxed">
                    The <strong className="font-semibold">UniCX RD Calculator</strong> is an ideal tool for a wide range of individuals and financial planning scenarios:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                        <strong className="font-semibold">Salaried Individuals:</strong> Who want to save a fixed portion of their income monthly towards a goal without market risks.
                    </li>
                    <li>
                        <strong className="font-semibold">Students:</strong> Looking to save small amounts regularly for future expenses like higher education or personal purchases.
                    </li>
                    <li>
                        <strong className="font-semibold">Small Business Owners/Freelancers:</strong> Who might have fluctuating income but want to maintain a disciplined savings habit.
                    </li>
                    <li>
                        <strong className="font-semibold">Parents:</strong> Saving for their children's future milestones like education or marriage.
                    </li>
                    <li>
                        <strong className="font-semibold">Anyone with Short-to-Medium Term Goals:</strong> Saving for a new gadget, a holiday, a home appliance, or an emergency fund.
                    </li>
                    <li>
                        <strong className="font-semibold">Budget-Conscious Savers:</strong> Who prefer a fixed, predictable return on their savings.
                    </li>
                </ul>
            </div>
            {/* Image for Who Can Benefit - Concept: Diverse group of people saving */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
                {/* <img
                    src={whoBenefitsRdImage} // You'll generate this image later
                    alt="Who can use RD Calculator - Diverse individuals saving"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                /> */}
            </div>
          </div>
        </section>

        {/* Why Choose UniCX for Your RD Calculation? - Similar to Advantages section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Why Choose UniCX for Your RD Calculation?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong className="font-semibold">Accuracy & Reliability:</strong> Our calculator provides <strong className="font-semibold">precise results</strong> based on standard financial formulas, including quarterly compounding, giving you confidence in your projections.
            </li>
            <li>
              <strong className="font-semibold">User-Friendly Interface:</strong> With a <strong className="font-semibold">clean and intuitive design</strong>, it's easy for anyone to input details and get instant results.
            </li>
            <li>
              <strong className="font-semibold">Instant Results:</strong> No waiting time. Get your maturity amount, total interest earned, and total invested amount in seconds.
            </li>
            <li>
              <strong className="font-semibold">Financial Planning Aid:</strong> Helps you <strong className="font-semibold">visualize your savings growth</strong> and make informed decisions about your RD investments.
            </li>
            <li>
              <strong className="font-semibold">Completely Free:</strong> A valuable resource available to you at <strong className="font-semibold">no cost</strong>, anytime, anywhere.
            </li>
          </ul>
        </section>

        {/* Simplified RD Calculation Concept & Example Scenario */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Simplified RD Calculation Concept & Example
          </h2>
          <p className="text-gray-800 text-[15px] leading-relaxed">
            While banks use complex formulas for quarterly compounding, the <strong className="font-semibold">core concept of an RD</strong> is straightforward: you invest regularly, and that money earns interest.
          </p>
          <h3 className="font-semibold text-xl mt-4 mb-2">
            Basic Concept:
          </h3>
          <p className="text-gray-800 text-[15px] leading-relaxed">
            The <strong className="font-semibold">maturity amount (M)</strong> of an RD is essentially the sum of all your <strong className="font-semibold">monthly installments (P)</strong> over the <strong className="font-semibold">tenure (n)</strong>, plus the <strong className="font-semibold">interest (I)</strong> earned on those installments, which compounds over time.
          </p>
          <p className="text-gray-800 text-[15px] leading-relaxed mt-2">
            Formula (simplified conceptual view, as actual RD calculations are complex due to compounding frequency): <br/>
            <code className="bg-gray-100 px-2 py-1 rounded">M = (P × number of installments) + Compound Interest</code>
          </p>
          
          <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
            <p className="text-gray-700 mb-2">
              📊 <strong className="font-semibold">Example Scenario (Illustrative):</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Monthly Installment: <strong>₹5,000</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Tenure: <strong>3 Years (36 months)</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Annual Interest Rate: <strong>7.00%</strong>
            </p>
            <p className="text-primary font-bold text-lg mt-3">
              Total Amount Invested: <strong>₹1,80,000</strong>
            </p>
            <p className="text-primary font-bold text-lg mt-1">
              Total Interest Earned: <strong>~₹19,770</strong>
            </p>
            <p className="text-primary font-bold text-lg mt-1">
              Maturity Amount: <strong>~₹1,99,770</strong>
            </p>
            <p className="text-gray-700 mt-2 text-sm">
                *This is an illustrative example. Exact figures may vary slightly due to rounding or specific bank compounding methods.
            </p>
          </div>

          <p className="mt-4 text-gray-800 text-[15px] leading-relaxed">
            This example clearly shows how your <strong className="font-semibold">regular savings</strong>, combined with a steady interest rate and the power of compounding, can build a <strong className="font-semibold">substantial sum</strong> for your future goals.
          </p>
        </section>

        {/* FAQs Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Frequently Asked Questions (FAQs) about Recurring Deposits
          </h2>
          <div className="space-y-2"> {/* Added space-y-2 for vertical separation between FAQs */}
            {rdFaqs.map((faq, i) => (
              <div
                key={i}
                className={`py-2 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === i ? "bg-blue-50 rounded-lg " : ""
                }`}
                onClick={() => toggleFAQ(i)}
              >
                <div
                  className={`flex justify-between items-center px-3 ${
                    openFAQ !== i ? "border border-gray-300 rounded-lg py-3" : ""
                  }`}
                >
                  <p className="font-semibold text-gray-800">{faq.q}</p>
                  {openFAQ === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <p
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

        {/* Footer note */}
        <section className="pt-6 border-t mt-10">
          <p className="text-sm text-gray-500">
            This Recurring Deposit Calculator and the information provided are developed and maintained by{" "}
            <strong className="font-semibold">UniCX (UniconsultX Solutions Private Limited)</strong> to help
            users estimate their RD returns. While we strive for accuracy, the information is for illustrative
            purposes only and should not be considered financial advice. For personalized financial guidance
            or specific product details, always consult with a qualified financial professional or your bank.
          </p>
        </section>

      </div>
    </section>
        </div>
    );
}

export default RDCalculator;