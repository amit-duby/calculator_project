import React,{useEffect, useState} from 'react'
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency

function NPsCalculator() {
     const [currentAge, setCurrentAge] = useState(30);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState(10);

  const [totalInvestment, setTotalInvestment] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [totalCorpus, setTotalCorpus] = useState(0);
  const [lumpSumWithdrawal, setLumpSumWithdrawal] = useState(0);
  const [annuityAmount, setAnnuityAmount] = useState(0);
  const [monthlyPension, setMonthlyPension] = useState(0);
  const [error, setError] = useState({
    currentAge: '',
    monthlyContribution: '',
    expectedAnnualReturn: '',
  });// Add error message state

    const fixedRetirementAge = 60;
    const fixedAnnuityPurchasePercentage = 40; // Minimum 40% as per NPS rules
    const fixedExpectedAnnuityReturn = 6;

     useEffect(() => {
    const handler = setTimeout(() => {
      if (validateInputs()) {
        calculateNPS();
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [currentAge, monthlyContribution, expectedAnnualReturn]);

    /**
     * Validates all input fields and sets an error message if any validation fails.
     * @returns {boolean} True if all inputs are valid, false otherwise.
     */

     const validateInputs = () => {
    let valid = true;
    const newErrors = {
      currentAge: '',
      monthlyContribution: '',
      expectedAnnualReturn: ''
    };

    if (currentAge < 18 || currentAge >= fixedRetirementAge) {
      newErrors.currentAge = 'Age must be between 18 and 59';
      valid = false;
    }

    if (monthlyContribution <= 0 || monthlyContribution >= 10000000 ) {
      newErrors.monthlyContribution = 'Value must be between 1 and 10000000';
      valid = false;
    }

    if (expectedAnnualReturn <= 0 || expectedAnnualReturn > 20) {
      newErrors.expectedAnnualReturn = 'Expected return must be between 0.1% and 20%';
      valid = false;
    }

    setError(newErrors);
    return valid;
  };
    const calculateNPS = () => {
        

        const age = parseFloat(currentAge);
        const contribution = parseFloat(monthlyContribution);
        const annualReturn = parseFloat(expectedAnnualReturn);

        const investmentDurationYears = fixedRetirementAge - age;
        const totalMonths = investmentDurationYears * 12;

        const calculatedTotalInvestment = contribution * totalMonths;

        const monthlyRate = (annualReturn / 100) / 12;

        let calculatedCorpus = 0;
        if (monthlyRate === 0) {
            calculatedCorpus = calculatedTotalInvestment;
        } else {
            calculatedCorpus = contribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
        }

        const calculatedInterestEarned = calculatedCorpus - calculatedTotalInvestment;

        const calculatedAnnuityAmount = calculatedCorpus * (fixedAnnuityPurchasePercentage / 100);
        const calculatedLumpSum = calculatedCorpus - calculatedAnnuityAmount;

        const calculatedMonthlyPension = (calculatedAnnuityAmount * (fixedExpectedAnnuityReturn / 100)) / 12;

        setTotalInvestment(parseFloat(calculatedTotalInvestment.toFixed(2)));
        setInterestEarned(parseFloat(calculatedInterestEarned.toFixed(2)));
        setTotalCorpus(parseFloat(calculatedCorpus.toFixed(2)));
        setLumpSumWithdrawal(parseFloat(calculatedLumpSum.toFixed(2)));
        setAnnuityAmount(parseFloat(calculatedAnnuityAmount.toFixed(2)));
        setMonthlyPension(parseFloat(calculatedMonthlyPension.toFixed(2)));
    };

const handlemonthlyBasicDAChange = (e) => {
 const value = e.target.value;
        // Keeping your character limit validation
        if ( value <= 10000000 || value.length<=15) { 
             setMonthlyContribution(value);
            setError((prev) => ({ ...prev, monthlyContribution: '' }));
        } else {
            setError((prev) => ({
                ...prev,
                monthlyContribution: 'Value must be between 1 and 10000000',
            }));
        }
  };

  const handleCurrentAge = (e) => {
  const value = (e.target.value);
  if (  value <= 59) {
    setCurrentAge(value);
    setError((prev) => ({ ...prev, currentAge: '' }));
  } else {
    setError((prev) => ({
      ...prev,
      currentAge: 'Value must be between 18 and 59',
    }));
  }
};

const handleAnnualSalaryPercent = (e) => {
  const value = (e.target.value);
  if (value <= 20) {
    setExpectedAnnualReturn(value);
    setError((prev) => ({ ...prev, expectedAnnualReturn: '' }));
  } else {
    setError((prev) => ({
      ...prev,
      expectedAnnualReturn: 'Expected annual increase must be between 0% and 20%',
    }));
  }
};


    return (
        <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-1 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">NPS Calculator</h1>
                    <p className="text-md text-gray-600 mt-2">
                        Estimate your National Pension System (NPS) corpus and monthly pension at retirement.
                        Plan your retirement savings effectively with this calculator.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-secondary h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center">
                                <p className="text-3xl tracking-wide font-semibold text-white">
                                    NPS Calculator
                                </p>
                                <span className="text-gray-300 xl:text-md">
                                    Estimate your retirement pension
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
                         <div className="mt-4 flex flex-col"> {/* flex-col to stack its children vertically */}
              <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">Enter Details</h1>
                        <div className="bg-IntColor rounded-xl p-6 shadow flex-grow">
                            <div className="grid grid-cols-1 gap-y-5">
                                {/* Input: Current Age */}
                                <div className="relative group">
                                    <label htmlFor="currentAge" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                        Current Age (Years)
                                    </label>
                                    <div  className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                                           error.currentAge
                                                ? "border-red-500 shadow-red-300"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                    <input
                                        type="number"
                                        id="currentAge"
                                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                        value={currentAge}
                                        onChange={handleCurrentAge}
                                        min="18"
                                        max={fixedRetirementAge - 1}
                                        aria-label="Current Age"
                                    />
                                </div>
                                {error.currentAge && <p className="text-red-500 text-sm mt-1">{error.currentAge}</p>}
                               </div>
                                {/* Input: Monthly Contribution */}
                                <div className="relative group">
                                    <label htmlFor="monthlyContribution" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                        Monthly Contribution (₹)
                                    </label>
                                    <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 ${
                                        error.monthlyContribution
                                            ? "border-red-500 shadow-red-300"
                                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                    }`}>
                                        <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                        <input
                                            type="number"
                                            id="monthlyContribution"
                                            className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                            value={monthlyContribution}
                                            onChange={handlemonthlyBasicDAChange}
                                            min="1"
                                            placeholder="e.g., 5000"
                                            aria-label="Monthly Contribution"
                                        />
                                    </div>
                                     {error.monthlyContribution && <p className="text-red-500 text-sm mt-1">{error.monthlyContribution}</p>}
                                </div>

                                {/* Input: Expected Annual Return */}
                                <div className="relative group">
                                    <label htmlFor="expectedAnnualReturn" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                        Expected Annual Return (%)
                                    </label>
                                    <div  className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 ${
                                            error.expectedAnnualReturn
                                                ? "border-red-500 shadow-red-300"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                    <input
                                        type="number"
                                        id="expectedAnnualReturn"
                                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                        value={expectedAnnualReturn}
                                        onChange={handleAnnualSalaryPercent}
                                        step="0.1"
                                        min="0.1"
                                        max="20"
                                        placeholder="e.g., 10"
                                        aria-label="Expected Annual Return"
                                    />
                                </div>
                                 {error.expectedAnnualReturn && <p className="text-red-500 text-sm mt-1">{error.expectedAnnualReturn}</p>}
                                </div>

                            </div>

                            {/* Displaying fixed parameters for user awareness */}
                            <div className="mt-40 text-center text-gray-600 text-sm">
                                <p>Retirement Age: {fixedRetirementAge} years</p>
                                <p>% of Corpus for Annuity: {fixedAnnuityPurchasePercentage}%</p>
                                <p>Expected Annuity Return: {fixedExpectedAnnuityReturn}%</p>
                            </div>
                        </div>
</div>
                        {/* Results Section */}
                           <div className="mt-4 flex flex-col"> 
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
                        <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between">
                           
                                <div className=" text-center">
                                    {/* <h2 className="text-2xl font-bold text-gray-50 py-4">
                                        Your NPS Projections
                                    </h2> */}

                                    <div className="space-y-4">
                                        {/* Output: Total Investment */}
                                        <div className="flex flex-col justify-between items-center bg-red-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Total Investment:</span>
                                            <span className="text-md font-semibold text-green-800">₹ {totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>

                                        {/* Output: Interest Earned */}
                                        <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Interest Earned:</span>
                                            <span className="text-md font-semibold text-green-800">₹ {interestEarned.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>

                                        {/* Output: Total Corpus at Maturity (Maturity Amount) */}
                                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Maturity Amount:</span>
                                            <span className="text-xl font-bold text-green-700">₹ {totalCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>

                                        {/* Output: Lump Sum Withdrawal */}
                                        <div className="flex flex-col justify-between items-center bg-yellow-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Lump Sum Withdrawal (Tax-Free):</span>
                                            <span className="text-md font-semibold text-green-800">₹ {lumpSumWithdrawal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>

                                        {/* Output: Annuity Purchase Amount */}
                                        <div className="flex flex-col justify-between items-center bg-purple-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Annuity Purchase Amount:</span>
                                            <span className="text-md font-semibold text-green-800">₹ {annuityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>

                                        {/* Output: Estimated Monthly Pension */}
                                        <div className="flex flex-col justify-between items-center bg-red-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Estimated Monthly Pension:</span>
                                            <span className="text-md font-semibold text-green-800">₹ {monthlyPension.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-6 text-center">
                                        * These are estimated values based on your inputs and assumed rates. Actual returns may vary.
                                    </p>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NPsCalculator;
