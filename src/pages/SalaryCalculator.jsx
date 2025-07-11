import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#d0ed57'];

const SalaryCalculator = () => {
  const [tab, setTab] = useState('basic');
  const [ctc, setCtc] = useState('');
  const [age, setAge] = useState(30);
  const [location, setLocation] = useState('metro');
  const [structure, setStructure] = useState('standard');
  const [basicPercent, setBasicPercent] = useState(50);
  const [hraPercent, setHraPercent] = useState(50);
  // Deductions for Advanced Tab
  const [lta, setLta] = useState(0); // LTA Allowance input
  const [foodAllowance, setFoodAllowance] = useState(0); // Food Allowance input
  const [section80c, setSection80c] = useState(0);
  const [section80d, setSection80d] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [taxRegime, setTaxRegime] = useState('old');
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Helper function to format currency
  const formatCurrency = amount => `₹${Math.round(amount).toLocaleString('en-IN')}`;

  // Tax calculation for Old Regime
  const calculateTaxOldRegime = income => {
    let tax = 0;
    if (income <= 250000) tax = 0;
    else if (income <= 500000) tax = (income - 250000) * 0.05;
    else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.2;
    else tax = 112500 + (income - 1000000) * 0.3;
    return tax; // Cess added later
  };

  // Tax calculation for New Regime
  const calculateTaxNewRegime = income => {
    let tax = 0;
    if (income <= 300000) tax = 0;
    else if (income <= 600000) tax = (income - 300000) * 0.05;
    else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1;
    else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
    else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.2;
    else tax = 150000 + (income - 1500000) * 0.3;
    return tax; // Cess added later
  };

  // Main calculation logic
  const calculate = () => {
    const annualCtc = parseFloat(ctc);
    if (isNaN(annualCtc) || annualCtc <= 0) {
      setErrorMessage('Please enter a valid annual CTC.');
      setResult(null);
      return;
    }

    setErrorMessage(''); // Clear any previous error messages
    setResult(null); // Clear previous results

    let basic, hraComponent, ltaComponent, foodAllowanceComponent;
    let epfEmployeeContribution, epfEmployerContribution;

    // 1. Determine components based on structure
    if (structure === 'standard') {
      basic = annualCtc * 0.50; // Typically 50% of CTC
      hraComponent = basic * 0.50; // Typically 50% of Basic
      ltaComponent = 0; // Not explicitly defined in standard
      foodAllowanceComponent = 0; // Not explicitly defined in standard
    } else if (structure === 'tax-saving') {
      basic = annualCtc * 0.40; // Typically 40% of CTC
      hraComponent = basic * 0.50; // Typically 50% of Basic
      ltaComponent = annualCtc * 0.05; // Example: 5% of CTC for LTA
      foodAllowanceComponent = 26400; // Example fixed food allowance (₹1100/month * 2 meals * 12 months)
    } else { // custom
      basic = annualCtc * (basicPercent / 100);
      hraComponent = basic * (hraPercent / 100);
      ltaComponent = lta; // Use user-defined LTA from advanced tab
      foodAllowanceComponent = foodAllowance; // Use user-defined Food Allowance from advanced tab
    }

    // EPF Calculation (Employee and Employer)
    // Assuming 12% of Basic, capped at 21600 annually for statutory purposes (15000 basic * 12% * 12 months)
    epfEmployeeContribution = Math.min(basic * 0.12, 21600);
    epfEmployerContribution = Math.min(basic * 0.12, 21600); // Employer matches employee's statutory contribution

    // Professional Tax (deductible from gross salary)
    const professionalTax = 2400; // Common annual professional tax (e.g., ₹200/month)

    // Special Allowance: Remaining part of CTC
    // CTC = Basic + HRA + LTA + Food Allowance + EPF Employer + Special Allowance
    const totalFixedComponents = basic + hraComponent + epfEmployerContribution + ltaComponent + foodAllowanceComponent;
    let specialAllowance = Math.max(0, annualCtc - totalFixedComponents);

    // Calculate Gross Taxable Salary (before standard deduction and other exemptions/deductions)
    // This includes all components that are generally part of taxable income before exemptions
    // Note: HRA exemption and LTA exemption are complex and depend on actual rent/travel.
    // For simplicity, this calculator assumes full HRA and LTA are taxable if not explicitly exempted.
    // Food allowance exemption: ₹50 per meal for 22 working days = ₹1100/month = ₹13200/year.
    // If foodAllowanceComponent is 26400, then 13200 is exempt, 13200 is taxable.
    // User's original code used foodAllowance * 0.6, implying 60% taxable. I'll stick to that for consistency.
    let grossTaxableSalaryBeforeDeductions = basic + hraComponent + specialAllowance + ltaComponent + (foodAllowanceComponent * 0.6);

    // Standard Deduction (applicable for both regimes from FY 2023-24)
    const standardDeduction = 50000;
    let finalTaxableIncome = Math.max(0, grossTaxableSalaryBeforeDeductions - standardDeduction);

    let totalDeductionsClaimed = standardDeduction; // Start with standard deduction
    let incomeTax = 0;

    if (taxRegime === 'old') {
      const sec80cMax = 150000;
      const sec80dMax = 50000; // For individuals below 60, for senior citizens it's higher
      const homeLoanInterestMax = 200000; // Section 24(b) interest

      const actual80c = Math.min(section80c + epfEmployeeContribution, sec80cMax);
      const actual80d = Math.min(section80d, sec80dMax);
      const actualHomeLoanInterest = Math.min(homeLoanInterest, homeLoanInterestMax);

      const oldRegimeSpecificDeductions = actual80c + actual80d + actualHomeLoanInterest + otherDeductions;
      totalDeductionsClaimed += oldRegimeSpecificDeductions; // Add to standard deduction
      finalTaxableIncome = Math.max(0, grossTaxableSalaryBeforeDeductions - totalDeductionsClaimed);
      incomeTax = calculateTaxOldRegime(finalTaxableIncome);
    } else { // New Regime
      // No other deductions allowed apart from standard deduction (already applied)
      incomeTax = calculateTaxNewRegime(finalTaxableIncome);
    }

    // Rebate under Section 87A
    let taxRebate = 0;
    if (taxRegime === 'old' && finalTaxableIncome <= 500000) {
      taxRebate = Math.min(incomeTax, 12500);
    } else if (taxRegime === 'new' && finalTaxableIncome <= 700000) {
      taxRebate = Math.min(incomeTax, 25000);
    }
    incomeTax = Math.max(0, incomeTax - taxRebate);

    // Health and Education Cess (4%)
    incomeTax = incomeTax * 1.04;

    // Total deductions from Net Salary calculation perspective
    // These are amounts subtracted from CTC to get Net Take-Home
    const totalDeductFromNet = epfEmployeeContribution + professionalTax + incomeTax;
    // Net Salary = CTC - Employer EPF (not employee's take-home) - Employee EPF - Professional Tax - Income Tax
    const netSalary = annualCtc - epfEmployerContribution - totalDeductFromNet;

    setResult({
      annualCtc,
      basic,
      hra: hraComponent,
      specialAllowance,
      lta: ltaComponent,
      foodAllowance: foodAllowanceComponent,
      epfEmployee: epfEmployeeContribution,
      epfEmployer: epfEmployerContribution,
      professionalTax,
      incomeTax,
      totalDeduct: totalDeductFromNet,
      netSalary,
      grossTaxableSalaryBeforeSD: grossTaxableSalaryBeforeDeductions,
      standardDeduction,
      totalDeductionsClaimed,
      finalTaxableIncome,
      taxRebate,
    });
  };

  // Data for the Pie Chart
  const chartData = result ? [
    { name: 'Net Take-Home', value: result.netSalary },
    { name: 'Income Tax', value: result.incomeTax },
    { name: 'Employee EPF', value: result.epfEmployee },
    { name: 'Professional Tax', value: result.professionalTax },
    { name: 'Employer EPF (not take-home)', value: result.epfEmployer },
    // Add other deductions if they are significant and distinct from tax
  ].filter(item => item.value > 0) : []; // Filter out zero values for cleaner chart

  return (
    <div className="p-6 max-w-5xl mx-auto font-inter bg-gray-50 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        <span className="text-blue-600">Indian</span> Salary Calculator
      </h1>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {['basic', 'advanced', 'visual'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-center text-lg font-semibold transition-all duration-300 ease-in-out
              ${tab === t ? 'bg-blue-600 text-white shadow-inner' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} Calculator
          </button>
        ))}
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 shadow-sm" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{errorMessage}</span>
        </div>
      )}

      {/* Basic Calculator Tab */}
      {tab === 'basic' && (
        <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div>
            <label htmlFor="ctc" className="block text-gray-700 text-sm font-medium mb-2">Annual CTC (Cost to Company)</label>
            <input
              id="ctc"
              type="number"
              value={ctc}
              onChange={e => setCtc(e.target.value)}
              placeholder="e.g., 1200000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-gray-700 text-sm font-medium mb-2">Age</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="e.g., 30"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">Location Type</label>
            <select
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="metro">Metro (e.g., Mumbai, Delhi, Chennai, Kolkata, Bengaluru, Hyderabad, Ahmedabad, Pune)</option>
              <option value="tier1">Tier 1 (e.g., Jaipur, Lucknow, Chandigarh)</option>
              <option value="tier2">Tier 2 (e.g., Bhopal, Nagpur, Kochi)</option>
              <option value="other">Other Cities</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Salary Structure</label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={structure === 'standard'}
                  onChange={() => setStructure('standard')}
                />
                <span className="ml-2 text-gray-700">Standard (50% Basic, 50% HRA)</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={structure === 'tax-saving'}
                  onChange={() => setStructure('tax-saving')}
                />
                <span className="ml-2 text-gray-700">Tax Saving (40% Basic, LTA, Food Allowance)</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={structure === 'custom'}
                  onChange={() => setStructure('custom')}
                />
                <span className="ml-2 text-gray-700">Custom</span>
              </label>
            </div>
          </div>

          {structure === 'custom' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Basic Percentage: <span className="font-semibold">{basicPercent}%</span></label>
                <input
                  type="range"
                  min="30"
                  max="60"
                  value={basicPercent}
                  onChange={e => setBasicPercent(e.target.value)}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">HRA Percentage (of Basic): <span className="font-semibold">{hraPercent}%</span></label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hraPercent}
                  onChange={e => setHraPercent(e.target.value)}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Calculate Salary
          </button>
        </div>
      )}

      {/* Advanced Calculator Tab */}
      {tab === 'advanced' && (
        <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <p className="text-gray-600 mb-4">Enter your planned deductions and allowances for a more precise calculation. These apply primarily to the Old Tax Regime.</p>

          <div>
            <label htmlFor="ctcAdvanced" className="block text-gray-700 text-sm font-medium mb-2">Annual CTC</label>
            <input
              id="ctcAdvanced"
              type="number"
              value={ctc}
              onChange={e => setCtc(e.target.value)}
              placeholder="Enter annual CTC"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lta" className="block text-gray-700 text-sm font-medium mb-2">LTA (Leave Travel Allowance)</label>
              <input
                id="lta"
                type="number"
                value={lta}
                onChange={e => setLta(e.target.value)}
                placeholder="e.g., 20000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Exempt if actual travel expenses are incurred (Old Regime only).</p>
            </div>
            <div>
              <label htmlFor="foodAllowance" className="block text-gray-700 text-sm font-medium mb-2">Food Allowance</label>
              <input
                id="foodAllowance"
                type="number"
                value={foodAllowance}
                onChange={e => setFoodAllowance(e.target.value)}
                placeholder="e.g., 26400"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Partially exempt (e.g., ₹50/meal) if provided as meal coupons.</p>
            </div>
            <div>
              <label htmlFor="section80c" className="block text-gray-700 text-sm font-medium mb-2">Section 80C (Max ₹1.5 Lakh)</label>
              <input
                id="section80c"
                type="number"
                value={section80c}
                onChange={e => setSection80c(e.target.value)}
                placeholder="e.g., 100000 (LIC, PPF, ELSS, etc.)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="section80d" className="block text-gray-700 text-sm font-medium mb-2">Section 80D (Health Insurance)</label>
              <input
                id="section80d"
                type="number"
                value={section80d}
                onChange={e => setSection80d(e.target.value)}
                placeholder="e.g., 25000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="homeLoanInterest" className="block text-gray-700 text-sm font-medium mb-2">Home Loan Interest (Sec 24b, Max ₹2 Lakh)</label>
              <input
                id="homeLoanInterest"
                type="number"
                value={homeLoanInterest}
                onChange={e => setHomeLoanInterest(e.target.value)}
                placeholder="e.g., 150000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="otherDeductions" className="block text-gray-700 text-sm font-medium mb-2">Other Deductions</label>
              <input
                id="otherDeductions"
                type="number"
                value={otherDeductions}
                onChange={e => setOtherDeductions(e.target.value)}
                placeholder="e.g., 80CCD(1B), 80G, etc."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Tax Regime</label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={taxRegime === 'old'}
                  onChange={() => setTaxRegime('old')}
                />
                <span className="ml-2 text-gray-700">Old Regime (with deductions)</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={taxRegime === 'new'}
                  onChange={() => setTaxRegime('new')}
                />
                <span className="ml-2 text-gray-700">New Regime (simplified, fewer deductions)</span>
              </label>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Calculate Salary
          </button>
        </div>
      )}

      {/* Visual Calculator Tab */}
      {tab === 'visual' && (
        <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">CTC Breakdown Visualization</h2>
          {result ? (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-8 text-center text-gray-700">
                <p className="text-xl font-semibold">Annual CTC: <span className="text-blue-600">{formatCurrency(result.annualCtc)}</span></p>
                <p className="text-lg mt-2">This chart illustrates how your Cost to Company (CTC) is distributed among various components, including your net take-home salary and different deductions.</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">Please calculate your salary first in the Basic or Advanced tab to see the visualization.</p>
          )}
        </div>
      )}

      {/* Results Display */}
      {result && tab !== 'visual' && (
        <div className="mt-8 bg-white p-8 rounded-xl shadow-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Calculation Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md">
              <span className="font-semibold text-blue-700">Annual CTC:</span>
              <span className="font-bold text-blue-800">{formatCurrency(result.annualCtc)}</span>
            </div>
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-md">
              <span className="font-semibold text-green-700">Net Take-Home (Annual):</span>
              <span className="font-bold text-green-800 text-xl">{formatCurrency(result.netSalary)}</span>
            </div>
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-md">
              <span className="font-semibold text-green-700">Net Take-Home (Monthly):</span>
              <span className="font-bold text-green-800 text-xl">{formatCurrency(result.netSalary / 12)}</span>
            </div>

            <div className="col-span-full border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Breakdown of Components:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>Basic Salary: <span className="font-medium">{formatCurrency(result.basic)}</span></p>
                <p>House Rent Allowance (HRA): <span className="font-medium">{formatCurrency(result.hra)}</span></p>
                <p>Special Allowance: <span className="font-medium">{formatCurrency(result.specialAllowance)}</span></p>
                <p>Leave Travel Allowance (LTA): <span className="font-medium">{formatCurrency(result.lta)}</span></p>
                <p>Food Allowance: <span className="font-medium">{formatCurrency(result.foodAllowance)}</span></p>
                <p>Employee Provident Fund (EPF - Employee): <span className="font-medium">{formatCurrency(result.epfEmployee)}</span></p>
                <p>Employee Provident Fund (EPF - Employer): <span className="font-medium">{formatCurrency(result.epfEmployer)}</span></p>
              </div>
            </div>

            <div className="col-span-full border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Deductions & Tax:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>Gross Taxable Salary (Before Deductions): <span className="font-medium">{formatCurrency(result.grossTaxableSalaryBeforeSD)}</span></p>
                <p>Standard Deduction: <span className="font-medium">{formatCurrency(result.standardDeduction)}</span></p>
                <p>Total Deductions Claimed: <span className="font-medium">{formatCurrency(result.totalDeductionsClaimed)}</span></p>
                <p>Final Taxable Income: <span className="font-medium">{formatCurrency(result.finalTaxableIncome)}</span></p>
                <p>Tax Rebate (Sec 87A): <span className="font-medium">{formatCurrency(result.taxRebate)}</span></p>
                <p>Income Tax (incl. Cess): <span className="font-medium text-red-600">{formatCurrency(result.incomeTax)}</span></p>
                <p>Professional Tax: <span className="font-medium">{formatCurrency(result.professionalTax)}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
