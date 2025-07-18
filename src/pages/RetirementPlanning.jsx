import React,{useState,useEffect} from 'react';
// Assuming you're using Lucide icons, adjust imports as needed
import { Clock, Landmark, TrendingUp, DollarSign, Target, Briefcase, BarChart, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react'; 
// Assuming FaRupeeSign is used for currency inputs
import { FaRupeeSign } from 'react-icons/fa'; 

// Placeholder image URLs for Retirement Calculator (you'll generate these with me later)
// Suggestions for image content:
const retirementBenefitImage = "YOUR_RETIREMENT_BENEFIT_IMAGE_URL"; // Suggestion: A serene landscape with a couple enjoying retirement (e.g., beach, mountain view).
const retirementCalculatorUsageImage = "YOUR_RETIREMENT_CALCULATOR_USAGE_IMAGE_URL"; // Suggestion: An abstract graphic showing progression, growth, or a financial dashboard.
const planningConsiderationsImage = "YOUR_PLANNING_CONSIDERATIONS_IMAGE_URL"; // Suggestion: A visual metaphor for foresight or strategic thinking (e.g., chess pieces, a roadmap).
const whoBenefitsImage = "YOUR_WHO_BENEFITS_IMAGE_URL"; // Suggestion: A diverse group of people planning their future or looking at a financial chart.

function RetirementPlanning() {
  // State variables for user inputs
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(5); // in %
  const [preRetirementROI, setPreRetirementROI] = useState(10); // in %
  const [postRetirementROI, setPostRetirementROI] = useState(7); // in %
  const [existingSavings, setExistingSavings] = useState(100000);
  const [retirementBenefits, setRetirementBenefits] = useState(0);
  const [errors, setErrors] = useState({});

  // State variables for calculated results
  const [monthlyExpensesAtRetirement, setMonthlyExpensesAtRetirement] = useState(0);
  const [corpusRequired, setCorpusRequired] = useState(0);
  const [monthlySIPRequired, setMonthlySIPRequired] = useState(0);
  const [message, setMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Function to format numbers to Indian Rupee system
  const formatIndianRupee = (amount) => {
    if (isNaN(amount) || amount === 0) return '₹0';
    const parts = Math.round(amount).toString().split('.');
    let lastThree = parts[0].substring(parts[0].length - 3);
    let otherNumbers = parts[0].substring(0, parts[0].length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return '₹' + res + (parts.length > 1 ? '.' + parts[1] : '');
  };

  // Centralized validation function
  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;

    // Current Age validation
    if (currentAge === '' || Number(currentAge) < 15 || Number(currentAge) > 60) {
      newErrors.currentAge = 'Current age must be between 15 and 60 years.';
      isValid = false;
    }

    // Retirement Age validation
    if (retirementAge === '' || Number(retirementAge) <= Number(currentAge) || Number(retirementAge) > 70) {
      newErrors.retirementAge = 'Retirement age must be greater than current age and less than or equal to 70.';
      isValid = false;
    }

    // Life Expectancy validation
    if (lifeExpectancy === '' || Number(lifeExpectancy) <= Number(retirementAge) || Number(lifeExpectancy) > 100) {
      newErrors.lifeExpectancy = 'Life expectancy must be greater than retirement age and less than or equal to 100.';
      isValid = false;
    }

    // Current Monthly Expenses validation
    if (currentMonthlyExpenses === '' || Number(currentMonthlyExpenses) < 0 || String(currentMonthlyExpenses).length > 15) {
      newErrors.currentMonthlyExpenses = 'Monthly expenses must be a non-negative number and cannot be more than 15 digits.';
      isValid = false;
    }

    // Inflation Rate validation
    if (inflationRate === '' || Number(inflationRate) < 0 || Number(inflationRate) > 15) {
      newErrors.inflationRate = 'Inflation rate must be between 0% and 15%.';
      isValid = false;
    }

    // Pre-Retirement ROI validation
    if (preRetirementROI === '' || Number(preRetirementROI) < 0 || Number(preRetirementROI) > 60) {
      newErrors.preRetirementROI = 'Pre-retirement ROI must be between 0% and 60%.';
      isValid = false;
    }

    // Post-Retirement ROI validation
    if (postRetirementROI === '' || Number(postRetirementROI) < 0 || Number(postRetirementROI) > 30) {
      newErrors.postRetirementROI = 'Post-retirement ROI must be between 0% and 30%.';
      isValid = false;
    }

    // Existing Savings validation
    if (existingSavings === '' || Number(existingSavings) < 0 || String(existingSavings).length > 15) {
      newErrors.existingSavings = 'Existing savings must be a non-negative number and cannot be more than 15 digits.';
      isValid = false;
    }

    // Retirement Benefits validation
    if (retirementBenefits === '' || Number(retirementBenefits) < 0 || String(retirementBenefits).length > 15) {
      newErrors.retirementBenefits = 'Retirement benefits must be a non-negative number and cannot be more than 15 digits.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to calculate retirement planning
  const calculateRetirement = () => {
    if (!validateInputs()) {
      setShowResults(false);
      return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    // Convert percentages to decimals
    const inflRateDecimal = inflationRate / 100;
    const preRetROI_Decimal = preRetirementROI / 100;
    const postRetROI_Decimal = postRetirementROI / 100;

    // 1. Calculate future monthly expenses at retirement
    const futureMonthlyExpenses = currentMonthlyExpenses * Math.pow((1 + inflRateDecimal), yearsToRetirement);
    setMonthlyExpensesAtRetirement(futureMonthlyExpenses);

    // 2. Calculate the total corpus required at retirement
    const annualExpensesAtRetirement = futureMonthlyExpenses * 12;

    let corpusNeededForRetirement = 0;
    // Calculate inflation-adjusted return during retirement
    const realRateOfReturnPostRetirement = ((1 + postRetROI_Decimal) / (1 + inflRateDecimal)) - 1;

    if (realRateOfReturnPostRetirement === 0) {
      // If real rate of return is 0, simple multiplication
      corpusNeededForRetirement = annualExpensesAtRetirement * yearsInRetirement;
    } else {
      // Present value of an annuity formula for corpus
      corpusNeededForRetirement = annualExpensesAtRetirement * (1 - Math.pow((1 + realRateOfReturnPostRetirement), -yearsInRetirement)) / realRateOfReturnPostRetirement;
    }
    setCorpusRequired(corpusNeededForRetirement);

    // 3. Calculate future value of existing savings and retirement benefits
    const fvExistingSavings = existingSavings * Math.pow((1 + preRetROI_Decimal), yearsToRetirement);
    const fvRetirementBenefits = retirementBenefits; // Assuming retirement benefits are received at retirement, so no future value calculation needed for them if they are current values

    const netCorpusToBuild = corpusNeededForRetirement - fvExistingSavings - fvRetirementBenefits;

    // 4. Calculate monthly SIP required
    let requiredSIP = 0;
    if (netCorpusToBuild <= 0) {
      setMessage('Congratulations! Based on your current savings and benefits, you already have enough or more than enough for your estimated retirement corpus.');
      setMonthlySIPRequired(0);
    } else {
      const monthsToRetirement = yearsToRetirement * 12;
      const monthlyPreRetROI = Math.pow((1 + preRetROI_Decimal), (1 / 12)) - 1;

      if (monthlyPreRetROI === 0) {
        requiredSIP = netCorpusToBuild / monthsToRetirement;
      } else {
        // Future value of annuity formula for SIP
        requiredSIP = netCorpusToBuild * (monthlyPreRetROI / (Math.pow((1 + monthlyPreRetROI), monthsToRetirement) - 1));
      }
      setMonthlySIPRequired(requiredSIP);
      setMessage(''); // Clear any previous messages if there was a "have enough" message
    }
    setShowResults(true);
  };

  // useEffect to recalculate when any input changes, and validate
  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, lifeExpectancy, currentMonthlyExpenses, inflationRate, preRetirementROI, postRetirementROI, existingSavings, retirementBenefits]);

  // Input change handlers with validation
  const handleCurrentAgeChange = (e) => {

    const value = e.target.value;
  //  if(isValid===false){
    setCurrentAge(value);
  //  }
    // setCurrentAge(value);
  };

  const handleRetirementAgeChange = (e) => {
    const value = e.target.value;
    setRetirementAge(value);
  };

  const handleLifeExpectancyChange = (e) => {
    const value = e.target.value;
    setLifeExpectancy(value);
  };

  const handleCurrentMonthlyExpensesChange = (e) => {
    const value = e.target.value;
    setCurrentMonthlyExpenses(value);
  };

  const handleInflationRateChange = (e) => {
    const value = e.target.value;
    setInflationRate(value);
  };

  const handlePreRetirementROIChange = (e) => {
    const value = e.target.value;
    setPreRetirementROI(value);
  };

  const handlePostRetirementROIChange = (e) => {
    const value = e.target.value;
    setPostRetirementROI(value); // Fixed: was setting inflationRate
  };

  const handleExistingSavingsChange = (e) => {
    const value = e.target.value;
    setExistingSavings(value);
  };

  const handleRetirementBenefitsChange = (e) => {
    const value = e.target.value;
    setRetirementBenefits(value);
  };

   const [openFAQ, setOpenFAQ] = React.useState(null); 
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Retirement Calculator FAQs data
  const retirementFaqs = [
    {
      q: "Q1: When should I start planning for retirement?",
      a: "A1: The earlier, the better. Starting in your 20s or early 30s gives your investments the maximum time to grow due to compounding, significantly reducing the pressure to save large amounts later."
    },
    {
      q: "Q2: How much should I save for retirement?",
      a: "A2: There's no single answer as it depends on your desired retirement lifestyle, current age, income, and inflation. A common rule of thumb is to save 10-15% of your income, increasing it over time. Our calculator helps personalize this number."
    },
    {
      q: "Q3: What is a safe withdrawal rate in retirement?",
      a: "A3: The '4% rule' is a widely discussed guideline, suggesting you can withdraw 4% of your initial retirement corpus in the first year of retirement, adjusted for inflation annually, with a high probability of not running out of money for 30 years. However, this rule has nuances and should be adapted to individual circumstances."
    },
    {
      q: "Q4: Should I consider inflation when planning for retirement?",
      a: "A4: Absolutely. Inflation is crucial. It operates in the background, eroding purchasing power over time. What costs ₹100 today might cost significantly more in 20-30 years. Our calculator incorporates inflation to provide a realistic future expense estimate."
    },
    {
      q: "Q5: What investment options are suitable for retirement?",
      a: "A5: A diversified portfolio is key. Common options include: Equity Mutual Funds/Stocks (for long-term growth), Public Provident Fund (PPF), Employees' Provident Fund (EPF), National Pension System (NPS), and Fixed Deposits/Bonds (for stability). Always align your investments with your risk tolerance and financial goals."
    }
  ];
  return (
    <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
        {/* Left Section: Introduction and Description */}
        <div className="px-1 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Retirement Calculator</h1>
          <p className="text-md text-gray-600 mt-2">
            Plan your golden years. Enter your details to estimate your retirement corpus and monthly savings needed.
          </p>
        </div>

        {/* Right Section: Calculator Inputs and Results */}
        <div className="bg-secondary h-full rounded-xl flex flex-col">
          {/* Header for the Calculator */}
          <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
            <div className="flex justify-center items-center">
              <div className="space-y-1 mt-3 text-center">
                <p className="text-3xl tracking-wide font-semibold text-white">
                  Retirement Calculator
                </p>
                <span className="text-gray-300 xl:text-md">
                  Plan Your Golden Years
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
              <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">Enter Details</h1>
              <div className="bg-IntColor rounded-xl p-6 shadow flex-grow">
                <div className="grid grid-cols-1 gap-y-5">
                  {/* Current Age */}
                  <div className="relative group">
                    <label htmlFor="currentAge" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Current Age (Years)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.currentAge ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="currentAge"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={currentAge}
                        onChange={handleCurrentAgeChange}
                        min="15"
                        max="60"
                      />
                      <label className="text-md font-normal text-gray-500">years</label>
                    </div>
                    {errors.currentAge && <p className="text-red-500 text-xs mt-1">{errors.currentAge}</p>}
                  </div>

                  {/* Retirement Age */}
                  <div className="relative group">
                    <label htmlFor="retirementAge" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Retirement Age (Years)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.retirementAge ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="retirementAge"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={retirementAge}
                        onChange={handleRetirementAgeChange}
                        min={Number(currentAge) + 1}
                        max="70"
                      />
                      <label className="text-md font-normal text-gray-500">years</label>
                    </div>
                    {errors.retirementAge && <p className="text-red-500 text-xs mt-1">{errors.retirementAge}</p>}
                  </div>

                  {/* Life Expectancy */}
                  <div className="relative group">
                    <label htmlFor="lifeExpectancy" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Life Expectancy (Years)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.lifeExpectancy ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="lifeExpectancy"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={lifeExpectancy}
                        onChange={handleLifeExpectancyChange}
                        min={Number(retirementAge) + 1}
                        max="100"
                      />
                      <label className="text-md font-normal text-gray-500">years</label>
                    </div>
                    {errors.lifeExpectancy && <p className="text-red-500 text-xs mt-1">{errors.lifeExpectancy}</p>}
                  </div>

                  {/* Current Monthly Expenses */}
                  <div className="relative group">
                    <label htmlFor="currentMonthlyExpenses" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Current Monthly Expenses (₹)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.currentMonthlyExpenses ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <label className="size-5 text-md font-normal text-gray-500">₹</label>
                      <input
                        type="number"
                        id="currentMonthlyExpenses"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={currentMonthlyExpenses}
                        onChange={handleCurrentMonthlyExpensesChange}
                        min="0"
                      />
                    </div>
                    {errors.currentMonthlyExpenses && <p className="text-red-500 text-xs mt-1">{errors.currentMonthlyExpenses}</p>}
                  </div>

                  {/* Inflation Rate */}
                  <div className="relative group">
                    <label htmlFor="inflationRate" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Expected Inflation Rate (%)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.inflationRate ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="inflationRate"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={inflationRate}
                        onChange={handleInflationRateChange}
                        min="0"
                        max="15"
                        step="0.1"
                      />
                      <label className="size-5 text-md font-normal text-gray-500">%</label>
                    </div>
                    {errors.inflationRate && <p className="text-red-500 text-xs mt-1">{errors.inflationRate}</p>}
                  </div>

                  {/* Pre-Retirement ROI */}
                  <div className="relative group">
                    <label htmlFor="preRetirementROI" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Expected ROI (Pre-Retirement, %)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.preRetirementROI ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="preRetirementROI"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={preRetirementROI}
                        onChange={handlePreRetirementROIChange}
                        min="0"
                        max="60"
                        step="0.1"
                      />
                      <label className="size-5 text-md font-normal text-gray-500">%</label>
                    </div>
                    {errors.preRetirementROI && <p className="text-red-500 text-xs mt-1">{errors.preRetirementROI}</p>}
                  </div>

                  {/* Post-Retirement ROI */}
                  <div className="relative group">
                    <label htmlFor="postRetirementROI" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Expected ROI (Post-Retirement, %)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.postRetirementROI ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="postRetirementROI"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={postRetirementROI}
                        onChange={handlePostRetirementROIChange}
                        min="0"
                        max="60"
                        step="0.1"
                      />
                      <label className="size-5 text-md font-normal text-gray-500">%</label>
                    </div>
                    {errors.postRetirementROI && <p className="text-red-500 text-xs mt-1">{errors.postRetirementROI}</p>}
                  </div>

                  {/* Existing Savings */}
                  <div className="relative group">
                    <label htmlFor="existingSavings" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Existing Retirement Savings (₹)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.existingSavings ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <label className="size-5 text-md font-normal text-gray-500">₹</label>
                      <input
                        type="number"
                        id="existingSavings"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={existingSavings}
                        onChange={handleExistingSavingsChange}
                        min="0"
                      />
                    </div>
                    {errors.existingSavings && <p className="text-red-500 text-xs mt-1">{errors.existingSavings}</p>}
                  </div>

                  {/* Retirement Benefits */}
                  <div className="relative group">
                    <label htmlFor="retirementBenefits" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                      Expected Retirement Benefits (₹)
                    </label>
                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${errors.retirementBenefits ? "border-red-500 shadow-red-200 shadow" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <label className="size-5 text-md font-normal text-gray-500">₹</label>
                      <input
                        type="number"
                        id="retirementBenefits"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={retirementBenefits}
                        onChange={handleRetirementBenefitsChange}
                        min="0"
                      />
                    </div>
                    {errors.retirementBenefits && <p className="text-red-500 text-xs mt-1">{errors.retirementBenefits}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="mt-4 flex flex-col">
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
              <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
                {/* {showResults && Object.keys(errors).length === 0 ? ( */}
                  <div className="pt-0">
                    <div className="bg-IntColor p-6 rounded-lg shadow-inner">
                      <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-700 font-medium">Monthly Expenses at Retirement Age ({retirementAge} yrs):</span>
                        <span className="text-green-700 font-semibold text-lg">{formatIndianRupee(monthlyExpensesAtRetirement)}</span>
                      </div>
                      <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-700 font-medium">Total Corpus Required at Retirement:</span>
                        <span className="text-green-700 font-semibold text-lg">{formatIndianRupee(corpusRequired)}</span>
                      </div>
                      <div className="flex flex-col justify-between items-center py-2 last:border-b-0">
                        <span className="text-gray-700 font-medium">Monthly SIP Required to Achieve Goal:</span>
                        <span className="text-green-700 font-semibold text-lg">{formatIndianRupee(monthlySIPRequired)}</span>
                      </div>
                    </div>

                    {/* Detailed Retirement Insights */}
                    <div className="mt-8 bg-IntColor p-6 rounded-lg shadow-inner">
                      <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Detailed Retirement Insights
                      </h3>
                      <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700 font-medium">Annual Income Required Immediately After Retirement:</span>
                        <span className="text-green-700 font-semibold text-lg">{formatIndianRupee(monthlyExpensesAtRetirement * 12)}</span>
                      </div>
                      <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700 font-medium">Additional Retirement Fund Which Needs To Be Accumulated:</span>
                        <span className="text-green-700 font-semibold text-lg">
                          {formatIndianRupee(corpusRequired - (existingSavings * Math.pow((1 + (preRetirementROI / 100)), (retirementAge - currentAge))) - retirementBenefits)}
                        </span>
                      </div>
                      <div className="flex flex-col justify-between items-center py-2">
                        <span className="text-gray-700 font-medium">Monthly Savings Required To Accumulate The Fund:</span>
                        <span className="text-green-700 font-semibold text-lg">{formatIndianRupee(monthlySIPRequired)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-15">
                      *All values are estimates based on your inputs and assumed rates. Consult a financial advisor for personalized planning.
                    </p>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add content 
       */}

        <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className="container max-w-screen-xl mx-auto 3sm:px-10">

        {/* Retirement Calculator Main Heading */}
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            UniCX Retirement Calculator: Plan Your Golden Years with Confidence
          </h1>
        </section>

        {/* What is Retirement Planning? Section */}
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-3">What is Retirement Planning?</h2>
            <p className="mb-4 text-gray-800 leading-relaxed">
                <strong className="font-semibold">Retirement planning</strong> is the process of setting financial goals for your post-working life and developing a strategy to achieve them. It involves assessing your future expenses, estimating the funds required to cover them, and setting aside adequate savings and investments over your working years. Effective retirement planning aims to ensure you maintain your desired lifestyle and financial independence long after you stop earning an active income.
            </p>
        </section>

        {/* Securing Your Future: Why a Retirement Calculator is Essential Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Securing Your Future: Why a Retirement Calculator is Essential</h2>
          <p className="mb-8 text-gray-800 leading-relaxed">
            <strong className="font-semibold">Retirement planning</strong> is not just about saving money; it's about building a financial foundation that ensures your comfort, independence, and desired lifestyle long after your working years. The <strong className="font-semibold">UniCX Retirement Calculator</strong> is a powerful tool designed to help you visualize your financial future, estimate the corpus you'll need, and understand if your current savings trajectory is sufficient to achieve your retirement goals. It brings clarity to a crucial, often overwhelming, aspect of long-term financial planning.
          </p>
        </section>


        {/* Main Calculator Grid (Placeholder for actual calculator UI) */}
        {/*
          This section should mirror the structure of your GST and EPF calculators.
          Integrate your React state management and input fields here.
        */}
        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0">
          {/* Left - Retirement Calculator Input Section */}
          <div className="rounded-lg px-0 pr-6 py-0 pb-15 w-full max-w-[40rem] opacity-85">
            {/* Input Field: Current Age */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Current Age (Years)
              </label>
              <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                <input
                  type="number"
                  inputMode="numeric"
                  // value={yourAgeState}
                  // onChange={handleAgeChange}
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g., 30"
                  min="18"
                />
              </div>
            </div>

            {/* Input Field: Retirement Age */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Retirement Age (Years)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={retirementAgeState}
                        // onChange={handleRetirementAgeChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 60"
                        min="18"
                    />
                </div>
            </div>

            {/* Input Field: Current Monthly Expenses */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Current Monthly Expenses (₹)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <FaRupeeSign className="text-gray-500 mr-2" />
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={currentExpensesState}
                        // onChange={handleCurrentExpensesChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 30000"
                        min="0"
                    />
                </div>
            </div>

            {/* Input Field: Inflation Rate (%) */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Inflation Rate (%)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={inflationRateState}
                        // onChange={handleInflationRateChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 6"
                        min="0"
                        max="100"
                    />
                    <span className="text-gray-500 ml-2">%</span>
                </div>
            </div>

            {/* Input Field: Expected Rate of Return (Pre-Retirement, %) */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Expected Rate of Return (Pre-Retirement, %)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={preRetireReturnState}
                        // onChange={handlePreRetireReturnChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 10"
                        min="0"
                        max="100"
                    />
                    <span className="text-gray-500 ml-2">%</span>
                </div>
            </div>

            {/* Input Field: Expected Rate of Return (Post-Retirement, %) */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Expected Rate of Return (Post-Retirement, %)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={postRetireReturnState}
                        // onChange={handlePostRetireReturnChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 7"
                        min="0"
                        max="100"
                    />
                    <span className="text-gray-500 ml-2">%</span>
                </div>
            </div>

            {/* Input Field: Current Retirement Savings (if any) */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Current Retirement Savings (₹)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <FaRupeeSign className="text-gray-500 mr-2" />
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={currentSavingsState}
                        // onChange={handleCurrentSavingsChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 500000"
                        min="0"
                    />
                </div>
            </div>

            {/* Input Field: Monthly Savings Towards Retirement */}
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">
                    Monthly Savings Towards Retirement (₹)
                </label>
                <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50">
                    <FaRupeeSign className="text-gray-500 mr-2" />
                    <input
                        type="number"
                        inputMode="numeric"
                        // value={monthlySavingsState}
                        // onChange={handleMonthlySavingsChange}
                        className="w-full text-gray-700 font-medium outline-none bg-transparent"
                        placeholder="e.g., 5000"
                        min="0"
                    />
                </div>
            </div>

            {/* Calculate Button */}
            <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300 mr-7 w-full">
                Calculate Retirement Goal
            </button>
          </div>

          {/* Right - Retirement Calculator Result Section */}
          <div className="rounded-lg px-6 py-6 shadow-boxShadow bg-white w-full">
            <div className="mt-5">
              <div className="space-y-4">
                <div className="flex justify-between border-b-2 py-3 border-gray-300">
                  <span className="text-gray-700">Estimated Monthly Expenses in Retirement</span>
                  <span className="font-semibold text-gray-700">
                    ₹ {'0.00'} {/* Placeholder: Replace with your state */}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-3 border-gray-300">
                  <span className="text-gray-700">Total Corpus Needed at Retirement</span>
                  <span className="font-semibold text-gray-700">
                    ₹ {'0.00'} {/* Placeholder: Replace with your state */}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Projected Savings at Retirement</span>
                  <span className="font-semibold text-gray-700">
                    ₹ {'0.00'} {/* Placeholder: Replace with your state */}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-10 bg-green-600 py-4 px-10 rounded">
                  <h2 className="text-md font-semibold text-gray-100 uppercase">
                    Retirement Readiness
                  </h2>
                  <p className="text-md font-semibold text-gray-100 uppercase">
                    {'--'} {/* Placeholder: e.g., On Track / Needs Adjustment */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Retirement Planning is Crucial Section */}
        <section className="mt-10">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-3">
                The Indispensable Benefits of Early Retirement Planning
              </h2>
              <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
                <strong className="font-semibold">Starting early</strong> with your retirement planning, and regularly checking your progress with a calculator, offers significant advantages:
              </p>
              {/* Removed list-disc list-inside for icon-based list */}
              <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong className="flex items-start">
                    <Clock size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Harnessing Compounding Power:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Time is your greatest ally. The longer your investments grow, the more the <strong className="font-semibold">power of compounding</strong> multiplies your wealth, even with smaller, consistent contributions.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <BarChart size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Beating Inflation:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Retirement is decades away. <strong className="font-semibold">Inflation</strong> will significantly erode the purchasing power of money. Proper planning accounts for this, ensuring your future savings can actually buy what you need.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <Landmark size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Financial Independence:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Avoid relying on family or external support. A well-planned retirement means you maintain control over your finances and lifestyle choices.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Peace of Mind:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Knowing you're on track for a secure retirement reduces financial stress and allows you to enjoy your present more fully.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <Target size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Achieving Lifestyle Goals:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Whether it's travel, hobbies, or simply comfortable living, a calculator helps you quantify the cost of your desired retirement lifestyle and plan accordingly.
                  </span>
                </li>
              </ul>
            </div>
            {/* Image for Why Retirement Planning is Crucial - Concept: Serene retirement scene */}
            <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={retirementBenefitImage} // You'll generate this image later
                alt="Benefits of Early Retirement Planning - Financial Freedom"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
              /> */}
            </div>
          </div>
        </section>

        {/* How to Use the UniCX Free Online Retirement Calculator Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            How to Use the UniCX Free Online Retirement Calculator
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Our <strong className="font-semibold">intuitive UniCX Retirement Calculator</strong> simplifies the process of estimating your retirement needs. To get started, simply input the following details:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Current Age:</strong> Your current age in years.
                </li>
                <li>
                  <strong>Retirement Age:</strong> The age at which you plan to retire.
                </li>
                <li>
                  <strong>Current Monthly Expenses (₹):</strong> Your estimated current monthly expenditure.
                </li>
                <li>
                  <strong>Inflation Rate (%):</strong> The expected annual inflation rate.
                </li>
                <li>
                  <strong>Expected Rate of Return (Pre-Retirement, %):</strong> Expected return from investments before retirement.
                </li>
                <li>
                  <strong>Expected Rate of Return (Post-Retirement, %):</strong> Expected return from investments after retirement.
                </li>
                <li>
                  <strong>Current Retirement Savings (if any, ₹):</strong> Your existing retirement corpus.
                </li>
                <li>
                  <strong>Monthly Savings Towards Retirement (₹):</strong> The amount you currently save monthly for retirement.
                </li>
                <li>
                  <strong>View Your Results:</strong> The calculator will show your estimated monthly expenses in retirement, the total corpus needed, and your retirement readiness.
                </li>
              </ol>
            </div>
            {/* Image for How to Use Retirement Calculator - Concept: Abstract financial growth */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={retirementCalculatorUsageImage} // You'll generate this image later
                alt="How to use UniCX Retirement Calculator - Step by step guide"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
              /> */}
            </div>
          </div>
        </section>

        {/* Key Factors Influencing Your Retirement Corpus */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Key Factors Influencing Your Retirement Corpus</h2>
          <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
            Several variables play a critical role in determining how much you need for retirement and how quickly you can accumulate it:
          </p>
          {/* Removed list-disc list-inside for icon-based list */}
          <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong className="flex items-start">
                <DollarSign size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Inflation:
              </strong>
              <span className="block ml-6 -mt-1">
                The <strong className="font-semibold">silent wealth-eroder</strong>. What costs ₹100 today might cost ₹300-400 in 30 years due to inflation. Accounting for it ensures your retirement funds have real purchasing power.
              </span>
            </li>
            <li>
              <strong className="flex items-start">
                <TrendingUp size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Investment Returns:
              </strong>
              <span className="block ml-6 -mt-1">
                The higher and more consistent your annual returns, the faster your corpus grows. However, balance returns with risk tolerance.
              </span>
            </li>
            <li>
              <strong className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Retirement Age & Life Expectancy:
              </strong>
              <span className="block ml-6 -mt-1">
                Retiring earlier means fewer earning years and more retirement years to fund. Longer life expectancy means needing a larger corpus.
              </span>
            </li>
            <li>
              <strong className="flex items-start">
                <Target size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Post-Retirement Expenses:
              </strong>
              <span className="block ml-6 -mt-1">
                Your desired lifestyle in retirement (travel, healthcare, hobbies) directly dictates your annual expenses and, consequently, the required corpus.
              </span>
            </li>
            <li>
              <strong className="flex items-start">
                <Briefcase size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                Current Savings & Future Contributions:
              </strong>
              <span className="block ml-6 -mt-1">
                The amount you've already saved and your consistent future contributions are fundamental to reaching your goal.
              </span>
            </li>
          </ul>
        </section>

        {/* Important Considerations for Robust Retirement Planning - Similar to your 'Critical Updates' box, but distinct color/icon */}
        <section className="mt-10">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center">
              <Target size={20} className="mr-3 mt-1 flex-shrink-0" /> {/* Using Target for planning focus */}
              Important Considerations for Robust Retirement Planning
            </h2>
            <p className="text-blue-800 mb-4 text-[15px] leading-relaxed">
              Beyond the numbers, a <strong className="font-semibold">holistic approach</strong> to retirement planning involves several key aspects:
            </p>
            {/* Image for Planning Considerations */}
            {/* <img
                src={planningConsiderationsImage} // You'll generate this image later
                alt="Important Considerations for Retirement Planning"
                className="w-auto h-16 mx-auto my-4" // Consistent with other info box image sizes
            /> */}
            {/* Removed list-inside for icon-based list */}
            <ul className="list-none space-y-2 text-blue-700 text-[15px] leading-relaxed">
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Start Early, Stay Consistent:
                </strong>
                <span className="block ml-6 -mt-1">
                  The <strong className="font-semibold">most impactful advice</strong>. Even small amounts saved consistently over a long period can become substantial due to compounding.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Diversify Investments:
                </strong>
                <span className="block ml-6 -mt-1">
                  Don't put all your eggs in one basket. A <strong className="font-semibold">diversified portfolio</strong> can mitigate risk and optimize returns.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Account for Healthcare:
                </strong>
                <span className="block ml-6 -mt-1">
                  <strong className="font-semibold">Healthcare costs</strong> typically rise with age. Factor in potential medical expenses, health insurance, and critical illness cover.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Review Regularly:
                </strong>
                <span className="block ml-6 -mt-1">
                  Life circumstances, inflation, and market conditions change. <strong className="font-semibold">Review your retirement plan annually</strong> and adjust your savings or investment strategy as needed.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Consider Professional Advice:
                </strong>
                <span className="block ml-6 -mt-1">
                  A <strong className="font-semibold">financial advisor</strong> can provide personalized guidance, help you create a tailored plan, and optimize your investment strategy.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Factor in Contingencies:
                </strong>
                <span className="block ml-6 -mt-1">
                  Build an <strong className="font-semibold">emergency fund</strong> separate from your retirement savings to handle unforeseen circumstances without derailing your long-term goals.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Who Can Benefit from the UniCX Retirement Calculator? */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Who Can Benefit from the UniCX Retirement Calculator?
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
                <p className="text-gray-800 text-[15px] leading-relaxed">
                    Our <strong className="font-semibold">Retirement Calculator</strong> is a versatile and invaluable tool for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                        <strong className="font-semibold">Young Professionals:</strong> To kickstart their retirement planning early and understand the magic of compounding.
                    </li>
                    <li>
                        <strong className="font-semibold">Mid-Career Individuals:</strong> To assess if they are on track and make necessary adjustments to their savings strategy.
                    </li>
                    <li>
                        <strong className="font-semibold">Individuals Approaching Retirement:</strong> To fine-tune their plans and ensure they have adequate funds.
                    </li>
                    <li>
                        <strong className="font-semibold">Financial Advisors:</strong> As a quick estimation tool for client consultations and initial planning discussions.
                    </li>
                    <li>
                        <strong className="font-semibold">Anyone Concerned About Their Future:</strong> To gain clarity and actionable insights into their long-term financial security.
                    </li>
                </ul>
            </div>
            {/* Image for Who Can Benefit - Concept: Diverse group of people planning their future */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
                {/* <img
                    src={whoBenefitsImage} // You'll generate this image later
                    alt="Who can use Retirement Calculator - Diverse age groups"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                /> */}
            </div>
          </div>
        </section>

        {/* Why Use UniCX Retirement Calculator? - Similar to Advantages section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Why Choose UniCX for Your Retirement Planning Needs?
          </h2>
          <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
            Leveraging our <strong className="font-semibold">free online Retirement Calculator</strong> offers significant advantages for your financial planning:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong className="font-semibold">User-Friendly Interface:</strong> Designed for simplicity, allowing anyone to estimate their retirement needs with ease.
            </li>
            <li>
              <strong className="font-semibold">Comprehensive Inputs:</strong> Takes into account crucial factors like inflation and pre/post-retirement returns for a more realistic projection.
            </li>
            <li>
              <strong className="font-semibold">Instant & Accurate Results:</strong> Get immediate insights into your retirement readiness.
            </li>
            <li>
              <strong className="font-semibold">Empowering Decisions:</strong> Helps you make informed choices about your savings and investments.
            </li>
            <li>
              <strong className="font-semibold">Free & Accessible:</strong> A valuable resource available to you anytime, anywhere.
            </li>
          </ul>
        </section>

        {/* Simplified Retirement Calculation Concept & Example Scenario */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Simplified Retirement Calculation Concept & Example Scenario
          </h2>
          <p className="text-gray-800 text-[15px] leading-relaxed">
            While the calculator handles the detailed math, the <strong className="font-semibold">core idea</strong> is:
          </p>
          <h3 className="font-semibold text-xl mt-4 mb-2">
            Core Calculation Principles:
          </h3>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong>Future Value of Expenses:</strong> Project your current monthly expenses into the future using an inflation rate.
            </li>
            <li>
              <strong>Corpus Needed:</strong> Estimate the total corpus required to cover your desired retirement lifestyle, considering post-retirement returns.
            </li>
            <li>
              <strong>Future Value of Current & Future Savings:</strong> Calculate how much your existing savings and regular contributions will grow to by retirement.
            </li>
            <li>
              <strong>Gap Analysis:</strong> Compare your total estimated future savings against the total corpus needed to identify any shortfall or surplus.
            </li>
          </ul>
          
          <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
            <p className="text-gray-700 mb-2">
              📊 <strong className="font-semibold">Example Scenario (Illustrative):</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Current Age: <strong>30</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Retirement Age: <strong>60</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Current Monthly Expenses: <strong>₹30,000</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Inflation Rate: <strong>6%</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Expected Pre-Retirement Return: <strong>10%</strong>
            </p>
            <p className="text-green-700 font-semibold">
              Expected Post-Retirement Return: <strong>7%</strong>
            </p>
            <p className="text-primary font-bold text-lg mt-3">
              Estimated Total Corpus Needed at 60 (approx): <strong>₹3.5 Crores</strong> {/* Placeholder value */}
            </p>
            <p className="text-gray-700 mt-2 text-sm">
                *This is an illustrative example. Actual results may vary based on exact inputs and market conditions.
            </p>
          </div>

          <p className="mt-4 text-gray-800 text-[15px] leading-relaxed">
            <strong className="font-semibold">The Power of Compounding:</strong> This example illustrates how consistent contributions, coupled with annual salary increments and compounding interest, can lead to a significant retirement fund over time. The earlier you start, the more substantial your corpus can become.
          </p>
        </section>

        {/* FAQs Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Frequently Asked Questions (FAQs) about Retirement Planning
          </h2>
          <div className="space-y-2"> {/* Added space-y-2 for vertical separation between FAQs */}
            {retirementFaqs.map((faq, i) => (
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
            This Retirement Calculator and information is developed and maintained by{" "}
            <strong className="font-semibold">UniCX (UniconsultX Solutions Private Limited)</strong> to help
            users estimate their retirement needs and plan for a secure financial future.
            For personalized financial advice or complex retirement planning scenarios,
            always consult with a qualified financial professional.
          </p>
        </section>

      </div>
    </section>
    </div>
  );
}

export default RetirementPlanning;
