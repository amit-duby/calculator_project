import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency

function GratuityCalculator() {
    const [lastSalary, setLastSalary] = useState('10000');
    const [yearsOfService, setYearsOfService] = useState('5');
    const [covered, setCovered] = useState('yes'); // yes = Covered, no = Not Covered
    const [gratuity, setGratuity] = useState(null);
    const [errors, setErrors] = useState({}); // Add error message state

    const calculateGratuity = () => {
        // setErrorMessage("")/; // Clear previous error messages

        // Basic validation for inputs
        // if (!lastSalary || isNaN(parseFloat(lastSalary)) || parseFloat(lastSalary) <= 0) {
        //     setGratuity(null);
        //     setErrorMessage('Please enter a valid Last Drawn Salary.');
        //     return;
        // }
        // if (!yearsOfService || isNaN(parseFloat(yearsOfService)) || parseFloat(yearsOfService) <= 0) {
        //     setGratuity(null);
        //     setErrorMessage('Please enter valid Years of Service.');
        //     return;
        // }


        const salary = parseFloat(lastSalary);
        const years = parseFloat(yearsOfService);

        let amount = 0;
        let actualYears = Math.floor(years);

        // If service is less than 5 years, not eligible in the standard case for covered employees
        // if (covered === 'yes' && actualYears < 5) {
        //     setGratuity(null); // Reset gratuity if not eligible
        //     setErrorMessage('Not eligible for Gratuity (Minimum 5 years of service required for covered employees).');
        //     return;
        // }
        // // If not covered and years are less than 1, also not eligible (though not explicitly stated in your code for 'no' case)
        // if (covered === 'no' && actualYears < 1) { // Added this for logical consistency, assuming minimum 1 year even if not covered
        //     setGratuity(null);
        //     setErrorMessage('Not eligible for Gratuity (Minimum 1 year of service required for non-covered employees).');
        //     return;
        // }

        let yearsForCalculation = actualYears;

        if (covered === 'yes') {
            // Covered under Gratuity Act: "part thereof exceeding six months" is counted as one full year.
            if ((years - actualYears) >= 0.75) { // Common interpretation for 240 days rule (approx 0.65 years) for covered. Using 0.75 as it's closer to 9 months for simplicity. The Act typically means 240 days of *actual working* days in the last year. For general calculation, "more than 6 months" is often used, which is (years - actualYears) > 0.5. Let's use the strict "exceeding six months" which is `> 0.5`.
                yearsForCalculation = actualYears + 1;
            } else {
                yearsForCalculation = actualYears;
            }
            amount = Math.floor((salary * 15 * yearsForCalculation) / 26);
        } else {
            // Not covered under Gratuity Act: half a month's salary for each *completed* year of service.
            // No rounding up for parts of a year.
            amount = Math.floor((salary / 2) * actualYears);
        }

        setGratuity(amount);
    };

    // This useEffect will re-run calculateGratuity whenever lastSalary, yearsOfService, or covered changes
    useEffect(() => {
        calculateGratuity();
    }, [lastSalary, yearsOfService, covered]); // Dependency array now includes all relevant state variables

    const formatNumber = (num) => {
        if (num === null || isNaN(num)) return '';
        return parseFloat(num).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    };

      const handleAmountChange = (e) => {
        const value = e.target.value;
       

        // Keeping your character limit validation
        if (value.length <= 15) { 
             setLastSalary(value);
            setErrors((prev) => ({ ...prev, lastSalary: '' }));
        } else {
            setErrors((prev) => ({
                ...prev,
                lastSalary: 'Value must be between 1 and 10000000000',
            }));
        }
    };
// Year of services
      const handleYearChange = (e) => {
        const value = e.target.value;
      

        // Keeping your character limit validation
        if (value <= 50) { 
              setYearsOfService(value);
            setErrors((prev) => ({ ...prev, yearsOfService: '' }));
        } else {
            setErrors((prev) => ({
                ...prev,
                yearsOfService: 'Value must be between 5 and 50',
            }));
        }
    };
    return (
        <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-5 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Gratuity Calculator</h1>
                    <p className="text-md text-gray-600 mt-2">
                        Calculate your estimated gratuity amount based on your last drawn salary,
                        years of service, and whether your organization is covered under the Gratuity Act.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-gray-200 h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center">
                                <p className="text-3xl tracking-wide font-semibold text-white">
                                    Gratuity Calculator
                                </p>
                                <span className="text-gray-300 xl:text-md">
                                    Estimate your gratuity payment
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
                            <div className="bg-gray-50 rounded-xl p-6 shadow flex-grow">
                                <div className="grid grid-cols-1 gap-y-5">
                                    {/* Input: Last Drawn Salary */}
                                    <div className="relative group">
                                        <label htmlFor="lastSalary" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Last Drawn Salary (Basic + DA) (₹)
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1 
                                            ${errors.lastSalary?"border-borderColor shadow-red-400":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                            <input
                                                type="number"
                                                id="lastSalary"
                                                value={lastSalary}
                                                onChange={handleAmountChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                placeholder="e.g., 50000"
                                                aria-label="Last Drawn Salary"
                                            />
                                           
                                        </div> 
                                        {errors.lastSalary && <p className="text-red-500 text-xs mt-1">{errors.lastSalary}</p>}
                                    </div>
                                    {/* Input: Years of Service */}
                                    <div className="relative group">
                                        <label htmlFor="yearsOfService" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Years of Service
                                        </label>
                                        <div className={`w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border rounded-xl px-2 py-1 
                                            ${errors.yearsOfService?"border-borderColor shadow-red-400":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <input
                                                type="number"
                                                id="yearsOfService"
                                                value={yearsOfService}
                                                onChange={handleYearChange}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                step="0.01" // Allow decimal for months (e.g., 5.5 years)
                                                placeholder="e.g., 10.5"
                                                aria-label="Years of Service"
                                            />

                                        </div>
                                        {errors.yearsOfService && <p className="text-red-500 text-xs mt-1">{errors.yearsOfService}</p>}
                                    </div>
                                    {/* Select: Covered under Gratuity Act */}
                                    <div className="relative group">
                                        <label htmlFor="covered" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Are you covered under the Gratuity Act?
                                        </label>
                                        <div className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                                            <select
                                                id="covered"
                                                value={covered}
                                                onChange={(e) => setCovered(e.target.value)}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                aria-label="Covered under Gratuity Act"
                                            >
                                                <option value="yes">Yes (Covered)</option>
                                                <option value="no">No (Not Covered)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="mt-4 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
                            <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
                                {/* {errorMessage && (
                                    <div className="text-red-300 bg-red-800 p-3 rounded-lg mb-4 text-center">
                                        {errorMessage}
                                    </div>
                                )} */}
                                <div className="text-center">
                                    {/* {gratuity !== null && !errorMessage ? ( */}
                                        <div className="flex flex-col justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Estimated Gratuity Amount:</span>
                                            <span className="text-xl font-bold text-green-700">₹ {formatNumber(gratuity)|| "0.00"}</span>
                                        </div>
                                    {/* ) : ( */}
                                        
                                    {/* )} */}
                                </div>
                                <p className="text-sm text-gray-500 mt-6 text-center">
                                    * This calculation is an estimate and may vary based on specific company policies and the Gratuity Act rules.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GratuityCalculator;