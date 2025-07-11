import React, { useState, useEffect } from 'react';
import { FaRupeeSign } from "react-icons/fa";

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
        </div>
    );
}

export default RDCalculator;