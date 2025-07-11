import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency

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
                {/* ) : ( */}
                  {/* <div className="flex items-center justify-center h-full text-white text-center">
                    {Object.keys(errors).length > 0 ? (
                      <p className="text-red-300 text-lg">Please correct the input errors to see results.</p>
                    ) : (
                      <p className="text-gray-300 text-lg">Enter your details to see your retirement plan.</p>
                    )}
                  </div> */}
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetirementPlanning;
