import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

function EPFCalculator() {
  // State variables for inputs
  const [monthlyBasicDA, setMonthlyBasicDA] = useState("25000");
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("58");
  const [employeeContributionPercent, setEmployeeContributionPercent] = useState("12");
  const [annualSalaryIncreasePercent, setAnnualSalaryIncreasePercent] = useState("5");
  const [currentEPFBalance, setCurrentEPFBalance] = useState("0");
  const [annualInterestRate, setAnnualInterestRate] = useState("8.25"); // This is read-only in the UI

  // State variables for calculated results
  const [estimatedCorpus, setEstimatedCorpus] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterestEarned, setTotalInterestEarned] = useState(0);

  // State for error messages, now an object to hold errors for each field
  const [errors, setErrors] = useState({});

  // Debounce effect to calculate PF after a short delay from input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      calculatePF();
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [
    monthlyBasicDA,
    currentAge,
    retirementAge,
    employeeContributionPercent,
    annualSalaryIncreasePercent,
    currentEPFBalance,
    annualInterestRate,
  ]);

  /**
   * Validates all input fields and sets specific error messages if any validation fails.
   * @returns {boolean} True if all inputs are valid, false otherwise.
   */
  const validateInputs = () => {
    let currentErrors = {};
    let isValid = true;

    const basicDA = parseFloat(monthlyBasicDA);
    const cAge = parseFloat(currentAge);
    const rAge = parseFloat(retirementAge);
    const empCont = parseFloat(employeeContributionPercent);
    const annualInc = parseFloat(annualSalaryIncreasePercent);
    const epfBalance = parseFloat(currentEPFBalance);
    const interestRate = parseFloat(annualInterestRate);

    // Validate Monthly Basic Salary + DA
    if (isNaN(basicDA) || basicDA <= 0 || basicDA > 10000000) {
      currentErrors.monthlyBasicDA = "Monthly Basic Salary + DA must be between ₹1 and ₹1,00,00,000.";
      isValid = false;
    }

    // Validate Current Age
    if (isNaN(cAge) || cAge < 18 || cAge >= rAge || cAge > 59) {
      currentErrors.currentAge = "Current Age must be between 18 and 59 years and less than Retirement Age.";
      isValid = false;
    }

    // Validate Retirement Age
    if (isNaN(rAge) || rAge <= cAge || rAge > 70) {
      currentErrors.retirementAge = "Retirement Age must be greater than Current Age and up to 70 years.";
      isValid = false;
    }

    // Validate Employee Contribution Percent
    if (isNaN(empCont) || empCont < 12 || empCont > 100) {
      currentErrors.employeeContributionPercent = "Your Contribution must be between 12% and 100%.";
      isValid = false;
    }

    // Validate Annual Salary Increase Percent
    if (isNaN(annualInc) || annualInc < 0 || annualInc > 20) {
      currentErrors.annualSalaryIncreasePercent = "Expected Annual Salary Increase must be between 0% and 20%.";
      isValid = false;
    }

    // Validate Current EPF Balance
    if (isNaN(epfBalance) || epfBalance < 0 || epfBalance > 100000000) { // Assuming a reasonable max for current balance
      currentErrors.currentEPFBalance = "Current EPF Balance must be between ₹0 and ₹10,00,00,000.";
      isValid = false;
    }

    // Validate Annual Interest Rate (though read-only, ensure it's a valid number)
    if (isNaN(interestRate) || interestRate <= 0 || interestRate > 15) { // Assuming 0.1% to 15% is a reasonable range
      currentErrors.annualInterestRate = "Interest Rate must be between 0.1% and 15%.";
      isValid = false;
    }

    setErrors(currentErrors); // Update the errors state with all collected errors

    if (!isValid) {
      // Reset results on validation failure
      setEstimatedCorpus(0);
      setTotalContributions(0);
      setTotalInterestEarned(0);
    }
    return isValid;
  };

  /**
   * Calculates the estimated EPF corpus, total contributions, and total interest earned.
   */
  const calculatePF = () => {
    // Only proceed with calculation if inputs are valid
    if (!validateInputs()) {
      return;
    }

    let currentCorpus = parseFloat(currentEPFBalance);
    let totalEmployeeContributions = 0;
    let totalEmployerContributions = 0;
    let totalInterest = 0;

    const monthsToRetirement = (parseFloat(retirementAge) - parseFloat(currentAge)) * 12;
    let currentMonthlyBasicDA = parseFloat(monthlyBasicDA);
    const monthlyInterestRate = parseFloat(annualInterestRate) / 100 / 12;

    // Loop through each month until retirement
    for (let month = 0; month < monthsToRetirement; month++) {
      // Annual salary increase logic
      if (month > 0 && month % 12 === 0) {
        currentMonthlyBasicDA *= 1 + parseFloat(annualSalaryIncreasePercent) / 100;
      }

      // Calculate employee's monthly EPF contribution
      const employeeMonthlyEPF = currentMonthlyBasicDA * (parseFloat(employeeContributionPercent) / 100);

      // Calculate employer's raw contribution (12% of Basic + DA)
      const employerRawContribution = currentMonthlyBasicDA * 0.12;

      // Calculate EPS contribution (capped at 1250 if Basic+DA * 8.33% is higher)
      const epsContribution = Math.min(currentMonthlyBasicDA * 0.0833, 1250);

      // Calculate employer's EPF contribution (total employer contribution minus EPS)
      const employerMonthlyEPF = employerRawContribution - epsContribution;

      // Total monthly deposit into EPF
      const totalMonthlyDeposit = employeeMonthlyEPF + employerMonthlyEPF;

      // Accumulate total contributions
      totalEmployeeContributions += employeeMonthlyEPF;
      totalEmployerContributions += employerMonthlyEPF;

      // Calculate interest for the current month on the accumulated corpus + new deposit
      const monthlyInterestEarned = (currentCorpus + totalMonthlyDeposit) * monthlyInterestRate;

      // Update current corpus and total interest
      currentCorpus += totalMonthlyDeposit + monthlyInterestEarned;
      totalInterest += monthlyInterestEarned;
    }

    // Set the calculated results to state variables
    setEstimatedCorpus(currentCorpus);
    // Total contributions include initial balance + employee contributions + employer EPF contributions
    setTotalContributions(totalEmployeeContributions + totalEmployerContributions + parseFloat(currentEPFBalance));
    setTotalInterestEarned(totalInterest);
  };

  // --- Input Change Handlers with Inline Validation ---

  const handleMonthlyBasicDAChange = (e) => {
    const value = e.target.value;
    // setMonthlyBasicDA(value); 
    // const numValue = parseFloat(value);
    if ( value <= 10000000 || value.length<=15) {
         setMonthlyBasicDA(value); 
      setErrors((prev) => ({ ...prev, monthlyBasicDA: "" }));
    } else {
      setErrors((prev) => ({ ...prev, monthlyBasicDA: "Value must be between ₹1 and ₹1,00,00,000." })); 
    }
  };

  const handleCurrentAgeChange = (e) => {
    const value = e.target.value;
    // setCurrentAge(value);
    // const numValue = parseFloat(value);
    // const rAge = parseFloat(retirementAge);
    if ( value <=59 ) {
         setCurrentAge(value);
      setErrors((prev) => ({ ...prev, currentAge: "" }));
    } else {
      setErrors((prev) => ({ ...prev, currentAge: "Value must be between 18 and 59 years and less than Retirement Age." }));
    }
  };

  const handleRetirementAgeChange = (e) => {
    const value = e.target.value;
    // setRetirementAge(value);
    // const numValue = parseFloat(value);
    // const cAge = parseFloat(currentAge);
    if ( value <=70) {
        setRetirementAge(value);
      setErrors((prev) => ({ ...prev, retirementAge: "" }));
    } else {
      setErrors((prev) => ({ ...prev, retirementAge: "Value must be greater than Current Age and ≤ 70 years." }));
    }
  };

  const handleEmployeeContributionPercentChange = (e) => {
    const value = e.target.value;
    // const numValue = parseFloat(value);
    if ( value <= 100) {
       setEmployeeContributionPercent(value);
      setErrors((prev) => ({ ...prev, employeeContributionPercent: "" }));
    } else {
      setErrors((prev) => ({ ...prev, employeeContributionPercent: "Contribution must be between 12% and 100%." }));
    }
  };

  const handleAnnualSalaryIncreasePercentChange = (e) => {
    const value = e.target.value;
    // const numValue = parseFloat(value);
    if ( value <= 20) { 
      setAnnualSalaryIncreasePercent(value);
      setErrors((prev) => ({ ...prev, annualSalaryIncreasePercent: "" }));
    } else {
      setErrors((prev) => ({ ...prev, annualSalaryIncreasePercent: "Expected annual increase must be between 0% and 20%." }));
    }
  };

  const handleCurrentEPFBalanceChange = (e) => {
    const value = e.target.value;
    // const numValue = parseFloat(value);
    if ( value <= 10000000 || value.length<=15) { 
       setCurrentEPFBalance(value);
      setErrors((prev) => ({ ...prev, currentEPFBalance: "" }));
    } else {
      setErrors((prev) => ({ ...prev, currentEPFBalance: "Value must be between ₹0 and ₹10,00,00,000." }));
    }
  };

  // No specific handler for annualInterestRate as it's read-only, but validateInputs will check it.

  return (
    <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
        {/* Left Section: Introduction and Description */}
        <div className="px-1 py-6">
          <h1 className="text-2xl font-bold text-gray-900">PF Calculator</h1>
          <p className="text-md text-gray-600 mt-2">
            Calculate your estimated Employee Provident Fund (EPF) corpus at retirement.
            Understand how your contributions and interest growth can build your retirement savings.
          </p>
        </div>

        {/* Right Section: Calculator Inputs and Results */}
        <div className="bg-secondary h-full rounded-xl flex flex-col">
          {/* Header for the Calculator */}
          <div className="bg-primary border rounded-lg border-transparent p-5 relative">
            <div className="flex justify-center items-center">
              <div className="space-y-1 mt-3 text-center">
                <p className="text-3xl tracking-wide font-semibold text-white">
                  PF Calculator
                </p>
                <span className="text-gray-300 xl:text-md">
                  Estimate your retirement corpus
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
              <div className="bg-IntColor rounded-xl p-6 shadow">
                <div className="grid grid-cols-1 gap-y-5">
                  {/* Monthly Basic Salary + DA Input */}
                  <div className="relative group">
                    <label
                      htmlFor="monthlyBasicDA"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Monthly Basic Salary + DA (₹)
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                        errors.monthlyBasicDA
                          ? "border-red-500 shadow-red-300"
                          : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}
                    >
                      <label className="size-5 text-md font-normal text-gray-500">₹</label>
                      <input
                        type="number"
                        id="monthlyBasicDA"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={monthlyBasicDA}
                        onChange={handleMonthlyBasicDAChange}
                        min="0"
                        placeholder="e.g., 25000"
                        aria-label="Monthly Basic Salary plus Dearness Allowance"
                      />
                    </div>
                    {errors.monthlyBasicDA && <p className="text-red-500 text-xs mt-1">{errors.monthlyBasicDA}</p>}
                  </div>

                  {/* Current Age Input */}
                  <div className="relative group">
                    <label
                      htmlFor="currentAge"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-1"
                    >
                      Current Age (Years)
                    </label>
                    <div
                      className={`mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm transition duration-200 ${
                        errors.currentAge
                          ? "border-red-500 ring-red-500"
                          : "border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary"
                      }`}
                    >
                      <input
                        type="number"
                        id="currentAge"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={currentAge}
                        onChange={handleCurrentAgeChange}
                        min="0"
                        placeholder="e.g., 30"
                        aria-label="Current Age"
                      />
                    </div>
                    {errors.currentAge && (
                      <p className="text-red-500 text-xs mt-1">{errors.currentAge}</p>
                    )}
                  </div>

                  {/* Retirement Age Input */}
                  <div className="relative group">
                    <label
                      htmlFor="retirementAge"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-1"
                    >
                      Retirement Age (Years)
                    </label>
                    <div className={`mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.retirementAge
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="retirementAge"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={retirementAge}
                        onChange={handleRetirementAgeChange}
                        min="0"
                        placeholder="e.g., 58"
                        aria-label="Retirement Age"
                      />
                    </div>
                    {errors.retirementAge && (
                      <p className="text-red-500 text-xs mt-1">{errors.retirementAge}</p>
                    )}
                  </div>

                  {/* Employee Contribution Percent Input */}
                  <div className="relative group">
                    <label
                      htmlFor="employeeContributionPercent"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-1"
                    >
                      Your Contribution to EPF (%)
                    </label>
                    <div className={`mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.employeeContributionPercent
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="employeeContributionPercent"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={employeeContributionPercent}
                        onChange={handleEmployeeContributionPercentChange}
                        min="0"
                        max="100"
                        placeholder="e.g., 12"
                        aria-label="Employee Contribution Percentage"
                      />
                    </div>
                    {errors.employeeContributionPercent && (
                      <p className="text-red-500 text-xs mt-1">{errors.employeeContributionPercent}</p>
                    )}
                  </div>

                  {/* Annual Salary Increase Percent Input */}
                  <div className="relative group">
                    <label
                      htmlFor="annualSalaryIncreasePercent"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-1"
                    >
                      Expected Annual Salary Increase (%)
                    </label>
                    <div className={`mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.annualSalaryIncreasePercent
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="annualSalaryIncreasePercent"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={annualSalaryIncreasePercent}
                        onChange={handleAnnualSalaryIncreasePercentChange}
                        min="0"
                        placeholder="e.g., 5"
                        aria-label="Annual Salary Increase Percentage"
                      />
                    </div>
                    {errors.annualSalaryIncreasePercent && (<p className="text-red-500 text-xs mt-1">{errors.annualSalaryIncreasePercent}</p>)}
                  </div>

                  {/* Current EPF Balance Input */}
                  <div className="relative group">
                    <label
                      htmlFor="currentEPFBalance"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-1"
                    >
                      Current EPF Balance (₹)
                    </label>
                    <div className={`mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.currentEPFBalance
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="currentEPFBalance"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={currentEPFBalance}
                        onChange={handleCurrentEPFBalanceChange}
                        min="0"
                        placeholder="e.g., 0"
                        aria-label="Current EPF Balance"
                      />
                    </div>
                    {errors.currentEPFBalance && (<p className="text-red-500 text-xs mt-1">{errors.currentEPFBalance}</p>)}
                  </div>

                  {/* Annual Interest Rate Input (Read-only) */}
                  <div className="relative group">
                    <label
                      htmlFor="annualInterestRate"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-1"
                    >
                      Current EPF Interest Rate (%)
                    </label>
                    <div className={`mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.annualInterestRate
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                      }`}>
                      <input
                        type="number"
                        id="annualInterestRate"
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        value={annualInterestRate} // Use the state variable
                        readOnly // Keep it read-only as per original code
                        // No onChange handler needed for user input, but validateInputs will check its value
                        min="0"
                        step="0.01"
                        placeholder="e.g., 8.25"
                        aria-label="Annual Interest Rate"
                      />
                    </div>
                    {errors.annualInterestRate && (<p className="text-red-500 text-xs mt-1">{errors.annualInterestRate}</p>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="mt-4 flex flex-col">
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
              <div className="bg-primary rounded-xl p-6 shadow flex-grow flex flex-col justify-between">
                <div className="mt-8 pt-6 text-center">
                  <h2 className="text-xl font-bold text-gray-300 mb-4">
                    Your Estimated PF Corpus
                  </h2>
                  <div className=" p-4 rounded-xl shadow-inner mb-4">
                    <p className="text-gray-200 text-4xl font-extrabold">
                      ₹
                      {estimatedCorpus.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                      <p className="text-lg font-semibold text-gray-700">Total Contributions:</p>
                      <p className="text-xl font-bold text-green-700">
                        ₹
                        {totalContributions.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                      <p className="text-lg font-semibold text-gray-700">Total Interest Earned:</p>
                      <p className="text-md font-semibold text-green-800">
                        ₹
                        {totalInterestEarned.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    *This is an estimate. Actual values may vary based on future
                    policy changes, interest rate revisions, and specific employer
                    policies.
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

export default EPFCalculator;