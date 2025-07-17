import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency
import { Landmark, Briefcase, Calculator, ScrollText, Scale,  Award, FileText, ChevronDown, ChevronUp, HandCoins, BadgeDollarSign, Clock, HelpCircle } from 'lucide-react';
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
      const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the minimum service period required to be eligible for gratuity?",
      a: "Under the Payment of Gratuity Act, 1972, an employee must complete at least five years of continuous service to be eligible for gratuity. This rule has exceptions in cases of death or disablement."
    },
    {
      q: "Is gratuity taxable?",
      a: "Gratuity is taxable, but there are significant exemptions. For government employees, it's fully exempt. For private sector employees, the least of the actual gratuity received, ₹20 lakhs (or ₹10 lakhs for those not covered by the Act), or a specific formula-based amount is exempt."
    },
    {
      q: "Can I get gratuity if I resign?",
      a: "Yes, you can receive gratuity upon resignation, provided you have completed at least five years of continuous service with the employer."
    },
    {
      q: "What is 'Last Drawn Salary' for gratuity calculation?",
      a: "For employees covered by the Gratuity Act, 'Last Drawn Salary' typically includes Basic Salary + Dearness Allowance. For those not covered, it often includes Basic Salary + Dearness Allowance + all other fixed monthly allowances, as per company policy."
    },
    {
      q: "Can an employer deny gratuity payment?",
      a: "An employer can only deny or forfeit gratuity in specific circumstances, such as termination due to an employee's gross misconduct, riotous or disorderly behavior, violence, or any act involving moral turpitude, which caused damage or loss to the employer."
    },
  ];
    const estimatedGratuityAmount = '₹4,61,538';
  const taxExemptGratuity = '₹4,61,538'; // Example, assuming full exemption
  const taxableGratuity = '₹0';
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

            <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className="container max-w-screen-xl mx-auto 3sm:px-10">

        {/* Main Title & Intro */}
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5 flex items-center gap-3">
            {/* <BadgeDollarSign size={32} className="text-gray-700 flex-shrink-0" /> */}
            UniCX Gratuity Calculator: Estimate Your End-of-Service Benefits
          </h1>
          <p className="mb-8">
            Welcome to the UniCX Free Online Gratuity Calculator! **Gratuity** is a valuable monetary benefit provided by employers to employees as a token of appreciation for their long and dedicated service to the organization. Understanding how it's calculated and what you're eligible for is crucial for your financial planning at the time of retirement, resignation, or termination.
          </p>
          <p>
            Our calculator helps you accurately estimate your potential **gratuity payout**, whether you are **covered under the Payment of Gratuity Act, 1972**, or not, ensuring you can plan your financial future effectively.
          </p>
        </section>

        {/* Placeholder for the Gratuity Calculator Component */}
        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0">
          {/* Left - Calculator Input Section (Placeholder) */}
          <div className="rounded-lg px-0 pr-6 py-0 pb-15 w-full max-w-[40rem] opacity-85">
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Last Drawn Basic Salary (Monthly ₹)
              </label>
              <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-blue-500 focus-within:shadow-xl focus-within:shadow-blue-50">
                <HandCoins className="text-gray-500 mr-2" />
                <input
                  type="number"
                  inputMode="numeric"
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g., 50000"
                  min="0"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Last Drawn Dearness Allowance (Monthly ₹)
              </label>
              <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-blue-500 focus-within:shadow-xl focus-within:shadow-blue-50">
                <HandCoins className="text-gray-500 mr-2" />
                <input
                  type="number"
                  inputMode="numeric"
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g., 10000 (if applicable)"
                  min="0"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Years of Service (Completed)
              </label>
              <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-blue-500 focus-within:shadow-xl focus-within:shadow-blue-50">
                <Briefcase className="text-gray-500 mr-2" />
                <input
                  type="number"
                  inputMode="numeric"
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g., 15"
                  min="0"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Months in Excess (0-11, for Act covered employees)
              </label>
              <div className="flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7 border-gray-300 focus-within:border-blue-500 focus-within:shadow-xl focus-within:shadow-blue-50">
                <Clock className="text-gray-500 mr-2" />
                <input
                  type="number"
                  inputMode="numeric"
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g., 8"
                  min="0"
                  max="11"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Covered under Gratuity Act?
              </label>
              <div className="mr-7">
                <select className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium outline-none shadow-2boxShadow">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right - Result Section (Placeholder) */}
          <div className="rounded-lg px-6 py-6 shadow-boxShadow bg-white w-full">
            <div className="mt-5">
              <div className="space-y-4">
                <div className="flex justify-between border-b-2 py-3 border-gray-300">
                  <span className="text-gray-700">Calculated Gratuity</span>
                  <span className="font-semibold text-gray-700">
                    {/* {estimatedGratuityAmount} */}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Tax Exempt Gratuity</span>
                  <span className="font-semibold text-gray-700">
                    {taxExemptGratuity}
                  </span>
                </div>

                <div className="flex justify-between mt-4 border-b-2 py-2 border-gray-300">
                  <span className="text-gray-700">Taxable Gratuity</span>
                  <span className="font-semibold text-gray-700">{taxableGratuity}</span>
                </div>
                <div className="flex justify-between items-center mt-10 bg-green-600 py-4 px-10 rounded">
                  <h2 className="text-md font-semibold text-gray-100 uppercase">
                    Your Estimated Gratuity
                  </h2>
                  <p className="text-md font-semibold text-gray-100 uppercase">
                    {/* {estimatedGratuityAmount} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- */}
        <div className="mt-10">

          {/* What is Gratuity? */}
          <section>
            <h2 className="text-2xl font-bold mb-3">
              What is Gratuity?
            </h2>
            <p className="mb-4">
              **Gratuity** is a lump sum payment made by an employer to an employee upon the employee's superannuation (retirement), resignation, death, or disablement, provided they meet certain eligibility criteria, primarily related to the length of service. It's a statutory benefit for employees covered under the **Payment of Gratuity Act, 1972**, and a policy-based benefit for others.
            </p>
            <p>
              It serves as a long-term benefit for employees, recognizing their loyalty and contribution to the company over the years.
            </p>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* The Payment of Gratuity Act, 1972 (and its Scope) */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Landmark size={22} className="flex-shrink-0" />
              The Payment of Gratuity Act, 1972 (and its Scope)
            </h2>
            <p className="mb-4">
              The **Payment of Gratuity Act, 1972** is a central act that mandates the payment of gratuity to employees engaged in factories, mines, oilfields, plantations, ports, railway companies, shops or other establishments, and for matters connected therewith or incidental thereto.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong className="text-lg">Applicability:</strong> Applies to establishments employing **10 or more persons** on any day in the preceding 12 months. Once the Act becomes applicable, it continues to apply even if the number of employees falls below 10.
              </li>
              <li>
                <strong className="text-lg">Purpose:</strong> To provide a social security net for employees in their old age or upon cessation of employment after significant service.
              </li>
            </ul>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* Eligibility Criteria for Gratuity */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Briefcase size={22} className="flex-shrink-0" />
              Eligibility Criteria for Gratuity
            </h2>
            <p className="mb-4">
              To be eligible for gratuity under the Payment of Gratuity Act, 1972, an employee must have completed **at least five years of continuous service** with the same employer.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong className="text-lg">Exceptions to 5-Year Rule:</strong> The five-year continuous service rule does not apply in cases of:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Death of the employee.</li>
                  <li>Disablement of the employee due to accident or disease.</li>
                </ul>
                In such cases, gratuity is payable even if the service period is less than five years.
              </li>
            </ul>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* How Gratuity is Calculated? */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Calculator size={22} className="flex-shrink-0" />
              How Gratuity is Calculated?
            </h2>
            <p className="mb-4">
              The method of calculating gratuity differs based on whether the employee is covered under the Payment of Gratuity Act, 1972.
            </p>

            <h3 className="font-semibold text-xl mt-6 mb-3">
              A. For Employees Covered Under the Payment of Gratuity Act, 1972
            </h3>
            <p className="mb-2">
              The gratuity amount is calculated using the following formula:
            </p>
            <p className="bg-gray-100 p-3 rounded-md text-gray-800 font-mono text-center mb-4">
              **Gratuity = (Last Drawn Salary) &times; (15/26) &times; (Number of Years of Service)**
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
              <li>
                **Last Drawn Salary:** This includes Basic Salary + Dearness Allowance (DA). Any other allowances are generally not included.
              </li>
              <li>
                **15/26:** Represents 15 days' salary for every completed year of service, assuming a month has 26 working days.
              </li>
              <li>
                **Number of Years of Service:**
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>If the service period is six months or more in a year, it is rounded up to the next full year. (e.g., 5 years 7 months is considered 6 years).</li>
                  <li>If the service period is less than six months in a year, it is ignored. (e.g., 5 years 4 months is considered 5 years).</li>
                </ul>
              </li>
              <li>
                **Maximum Limit:** The maximum gratuity payable under the Act is currently **₹20 Lakhs** (as per the Gratuity Amendment Act, 2018).
              </li>
            </ul>

            <h3 className="font-semibold text-xl mt-6 mb-3">
              B. For Employees NOT Covered Under the Payment of Gratuity Act, 1972
            </h3>
            <p className="mb-2">
              For employees working in establishments not covered by the Act, gratuity payment is typically based on the company's internal policy or employment contract. The calculation formula commonly used in such cases is:
            </p>
            <p className="bg-gray-100 p-3 rounded-md text-gray-800 font-mono text-center mb-4">
              **Gratuity = (Last Drawn Salary) &times; (15/30) &times; (Number of Years of Service)**
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                **Last Drawn Salary:** This usually includes Basic Salary + Dearness Allowance + all other allowances (fixed monthly payments).
              </li>
              <li>
                **15/30:** Represents 15 days' salary for every completed year of service, assuming a month has 30 working days.
              </li>
              <li>
                **Number of Years of Service:** No rounding up for months is generally applied; only completed years of service are considered.
              </li>
              <li>
                **Maximum Limit:** The maximum limit is as per the company's policy, often capped at ₹20 Lakhs, similar to the Act, but can vary.
              </li>
            </ul>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* Taxation of Gratuity */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Scale size={22} className="flex-shrink-0" />
              Taxation of Gratuity
            </h2>
            <p className="mb-4">
              The tax treatment of gratuity varies based on the type of employer:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong className="text-lg">For Government Employees (Central/State/Local Authority):</strong> Gratuity received by government employees is **fully exempt from income tax**.
              </li>
              <li>
                <strong className="text-lg">For Private Sector Employees (Covered under Payment of Gratuity Act, 1972):</strong> The *least* of the following three amounts is exempt from tax:
                <ol className="list-decimal list-inside ml-6 mt-1">
                  <li>Actual Gratuity Received.</li>
                  <li>₹20,00,000 (Twenty Lakh Rupees) - The statutory limit.</li>
                  <li>15 days' salary for each completed year of service or part thereof in excess of six months (calculated as per the Act's formula: Last Drawn Salary &times; 15/26 &times; No. of Years of Service).</li>
                </ol>
              </li>
              <li>
                <strong className="text-lg">For Private Sector Employees (NOT Covered under Payment of Gratuity Act, 1972):</strong> The *least* of the following three amounts is exempt from tax:
                <ol className="list-decimal list-inside ml-6 mt-1">
                  <li>Actual Gratuity Received.</li>
                  <li>₹10,00,000 (Ten Lakh Rupees) - The statutory limit (Note: This limit was ₹10 Lakhs and is not updated to ₹20 Lakhs for this category unless specified by latest rules/policy).</li>
                  <li>Half-month's average salary for each completed year of service (calculated as: Average Last 10 months' Salary &times; 1/2 &times; No. of Completed Years of Service).</li>
                </ol>
              </li>
              <li>
                <strong className="text-lg">Gratuity received by dependents of an employee who dies in service:</strong> This is **fully exempt from tax**.
              </li>
            </ul>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* How to Use the UniCX Free Online Gratuity Calculator */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Calculator size={22} className="flex-shrink-0" />
              How to Use the UniCX Free Online Gratuity Calculator
            </h2>
            <p className="mb-4">
              Our UniCX Gratuity Calculator makes estimating your potential returns simple and quick. Follow these steps to see your wealth growth potential:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>
                **Coverage Status:** Select whether you are 'Covered under Gratuity Act' or 'Not Covered under Gratuity Act'. This determines the calculation method.
              </li>
              <li>
                **Last Drawn Basic Salary (Monthly ₹):** Enter your monthly Basic Salary.
              </li>
              <li>
                **Last Drawn Dearness Allowance (Monthly ₹):** Enter your monthly Dearness Allowance (DA). If applicable for those not covered, include other fixed allowances here.
              </li>
              <li>
                **Years of Service (Completed Years):** Enter the number of full years you have completed with the employer.
              </li>
              <li>
                **Months in Excess (if any):** If applicable (for those covered by the Act), enter the number of additional months (0 to 11).
              </li>
              <li>
                **Click "Calculate":** The calculator will instantly display your "Estimated Gratuity Amount" and "Taxable Gratuity (if any)."
              </li>
            </ol>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* Understanding Your Gratuity Calculator Results */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <FileText size={22} className="flex-shrink-0" />
              Understanding Your Gratuity Calculator Results
            </h2>
            <p className="mb-4">
              Once you input your details, our calculator provides a clear breakdown of your potential gratuity:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                **Estimated Gratuity Amount:** This is the calculated gratuity payment you are potentially eligible for.
              </li>
              <li>
                **Tax Exempt Gratuity:** This is the portion of your gratuity that is exempt from income tax, based on the applicable rules.
              </li>
              <li>
                **Taxable Gratuity:** This is any remaining portion of your gratuity that will be added to your taxable income and taxed as per your applicable income tax slab.
              </li>
            </ul>

            <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
              <p className="text-gray-700 mb-2">
                📊 **Example Calculation (Covered by Act):**
              </p>
              <p className="text-green-700 font-semibold">
                Last Drawn Basic + DA: **₹50,000**
              </p>
              <p className="text-green-700 font-semibold">
                Years of Service: **15 Years, 8 Months** (Calculated as 16 years)
              </p>
              <p className="text-blue-800 font-bold text-lg mt-2">
                Estimated Gratuity Amount: **₹4,61,538**
              </p>
              <p className="text-blue-800 font-bold text-lg">
                Tax Exempt (Example): **₹4,61,538**
              </p>
              <p className="text-blue-800 font-bold text-lg">
                Taxable Gratuity: **₹0**
              </p>
            </div>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* Important Gratuity Rules & Considerations */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <ScrollText size={22} className="flex-shrink-0" />
              Important Gratuity Rules & Considerations
            </h2>
            <p className="mb-4">
              While gratuity is a significant benefit, keep these important points in mind:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-lg">Continuous Service:</strong> This means uninterrupted service, including periods of leave, absence due to accident/sickness, or strike/lockout not due to employee's fault.
              </li>
              <li>
                <strong className="text-lg">Termination:</strong> Gratuity is payable upon termination of employment for any reason (superannuation, resignation, death, disablement, or even retrenchment).
              </li>
              <li>
                <strong className="text-lg">Forfeiture of Gratuity:</strong> Gratuity can be wholly or partially forfeited if the employee's services have been terminated for certain acts of omission or negligence causing damage or loss to the employer, or for riotous/disorderly conduct, or any act involving moral turpitude committed in the course of employment.
              </li>
              <li>
                <strong className="text-lg">Employer's Obligation:</strong> The employer is legally obligated to pay gratuity within 30 days of it becoming payable. If not, they are liable to pay simple interest on the unpaid amount.
              </li>
            </ul>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* Advantages of Using the UniCX Gratuity Calculator */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Award size={22} className="flex-shrink-0" />
              Advantages of Using the UniCX Gratuity Calculator
            </h2>
            <p className="mb-4">
              Leveraging our **free online Gratuity calculator** offers significant benefits for accurate financial planning:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
                  <Calculator size={20} className="flex-shrink-0" /> Accuracy & Ease:
                </h3>
                <p className="text-sm text-gray-600">Ensures precise calculation based on relevant Act or company policy, simplifying complex computations.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
                  <Briefcase size={20} className="flex-shrink-0" /> Clarity on Eligibility:
                </h3>
                <p className="text-sm text-gray-600">Helps understand eligibility conditions and their impact on your payout.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
                  <Scale size={20} className="flex-shrink-0" /> Tax Impact Analysis:
                </h3>
                <p className="text-sm text-gray-600">Provides insight into the taxability of your gratuity payout.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
                  <HandCoins size={20} className="flex-shrink-0" /> Financial Planning:
                </h3>
                <p className="text-sm text-gray-600">Aids in estimating your retirement or end-of-service corpus for better financial security.</p>
              </div>
            </div>
          </section>

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* Frequently Asked Questions (FAQs) about Gratuity */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <HelpCircle size={22} className="flex-shrink-0" />
              Frequently Asked Questions (FAQs) about Gratuity
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

          {/* --- */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* UniCX Expert Support & Resources */}
          <section id="contact">
            <h2 className="text-2xl font-bold mb-3">
              Beyond Calculations: UniCX - Your Partner in Financial Planning
            </h2>
            <p className="mb-4">
              At **UniconsultX Solutions Private Limited (UniCX)**, our
              commitment extends beyond providing powerful financial calculators. We
              understand that navigating end-of-service benefits, taxation, and overall financial planning requires expert guidance. That's
              why we offer **comprehensive support and resources** to help you optimize your finances.
            </p>
            <h3 className="font-semibold text-xl mt-4 mb-2">
              Our Expert Financial Services Include:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                **Retirement Planning:** Strategies to ensure a secure and comfortable post-employment life.
              </li>
              <li>
                **Tax Consulting:** Expert advice on gratuity taxation, income tax filing, and overall tax optimization.
              </li>
              <li>
                **Wealth Management:** Holistic financial planning to grow and protect your wealth.
              </li>
              <li>
                **Investment Advisory:** Guidance on suitable investment avenues for your long-term goals.
              </li>
            </ul>
            <p className="mt-4">
              **Plan Your Financial Future with UniCX:** We are dedicated to being your
              reliable source for all things financial planning and tax advisory. Explore our website for more
              in-depth articles, common FAQs, and the latest updates. Partner with UniCX for peace of mind in your wealth creation journey.
            </p>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
                Get Expert Financial Planning Consultation
              </button>
            </div>
          </section>

          {/* Footer note */}
          <footer className="pt-6 border-t mt-6">
            <p className="text-sm text-gray-500">
              This Gratuity calculator and information is developed and maintained by{" "}
              **UniCX (UniconsultX Solutions Private Limited)** to help
              users estimate their potential gratuity as per general understanding of the Payment of Gratuity Act, 1972, and common practices.
              For precise calculations, specific legal advice, or personalized financial planning,
              always consult with a qualified legal or tax professional or{" "}
              <a href="#contact" className="text-blue-600 hover:underline">
                contact UniCX directly
              </a>
              . Tax laws are subject to change.
            </p>
          </footer>
        </div>
      </div>
    </section>
        </div>
    );
};

export default GratuityCalculator;