import React, { useState, useEffect } from 'react'; // Import useEffect
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign

function TDSCalculator() {
    // List of TDS sections with their logic
    const tdsOptions = [
        { key: 'salary', label: 'Salary', section: '192', rate: 'slab', threshold: '-' },
        { key: 'interest', label: 'Interest on FD', section: '194A', rate: 0.10, threshold: '₹40,000 (₹50,000 for seniors)' },
        { key: 'professional', label: 'Professional Fees', section: '194J', rate: 0.10, threshold: '₹30,000' },
        { key: 'rent', label: 'Rent', section: '194I', rate: 0.10, threshold: '₹2,40,000/year' },
        { key: 'commission', label: 'Commission', section: '194H', rate: 0.05, threshold: '₹15,000' },
        { key: 'contractor', label: 'Contractor Payment', section: '194C', rate: { individual: 0.01, others: 0.02 }, threshold: '₹30,000 per contract or ₹1 lakh/year' },
        { key: 'lottery', label: 'Lottery Winnings', section: '194B', rate: 0.30, threshold: '₹10,000' },
        { key: 'premature', label: 'Premature EPFwithdrawal*', section: '192A', rate: 0.1, threshold: '₹50,000' },
         { key: 'tds', label: 'TDS on interest on securities', section: '193', rate: 0.1, threshold: '₹10,000' },
         { key: 'payment', label: 'Payment of dividend', section: '194', rate: 0.1, threshold: '₹5,000' },
          { key: 'interest', label: 'Interest issued by banks or post offices on deposits', section: '194A', rate: 0.1, threshold: '₹40,000' },
           { key: 'interestby', label: 'Interest by others apartfrom on securities', section: '194A', rate: 0.1, threshold: '₹5,000' },
    ];

    const [recipientType, setRecipientType] = useState('individual');
    const [hasPAN, setHasPAN] = useState(true);
    const [selectedKey, setSelectedKey] = useState('interest');
    const [paymentAmount, setPaymentAmount] = useState('50000');
    const [result, setResult] = useState({ // Initialize result with default values for cleaner display
        label: '',
        section: '',
        threshold: '',
        rate: '0.00',
        tds: '0.00',
        net: '0.00'
    });
    const [errorMessage, setErrorMessage] = useState(""); // Add error message state

    const calculateTDS = () => {
        setErrorMessage(""); // Clear previous error messages
        const amount = parseFloat(paymentAmount);

        if (paymentAmount.length > 15) {
            setResult({
                label: '',
                section: '',
                threshold: '',
                rate: '0.00',
                tds: '0.00',
                net: '0.00'
            });
            setErrorMessage("Payment amount cannot exceed 15 characters.");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setResult({ // Reset to 0.00 if inputs are invalid
                label: '',
                section: '',
                threshold: '',
                rate: '0.00',
                tds: '0.00',
                net: '0.00'
            });
            setErrorMessage("Please enter a valid positive payment amount.");
            return;
        }

        const selected = tdsOptions.find(opt => opt.key === selectedKey);
        let rate;

        if (!hasPAN) {
            rate = 0.20; // Default higher rate if PAN not available
        } else if (selected.key === 'contractor') {
            rate = selected.rate[recipientType];
        } else if (selected.rate === 'slab') {
            setResult({ // For salary, reset and show specific message
                label: selected.label,
                section: selected.section,
                threshold: selected.threshold,
                rate: 'N/A',
                tds: 'N/A',
                net: 'N/A'
            });
            setErrorMessage("TDS on Salary (Section 192) is calculated based on individual income tax slab rates and deductions, not a flat percentage on the payment amount. This calculator does not support detailed salary TDS calculation.");
            return;
        } else {
            rate = selected.rate;
        }

        const tdsAmount = amount * rate;
        const netAmount = amount - tdsAmount;

        setResult({
            label: selected.label,
            section: selected.section,
            threshold: selected.threshold,
            rate: (rate * 100).toFixed(2),
            tds: tdsAmount.toFixed(2),
            net: netAmount.toFixed(2)
        });
    };

    // Use useEffect to trigger calculation on input changes
    useEffect(() => {
        calculateTDS();
    }, [recipientType, hasPAN, selectedKey, paymentAmount]);

    const formatNumber = (num) => {
        if (num === null || isNaN(num) || num === '0.00' || num === 'N/A') return num === 'N/A' ? 'N/A' : '0.00';
        return parseFloat(num).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };

    const handlePaymentAmountChange = (e) => {
        const value = e.target.value;
        if (value.length <= 15) {
            setPaymentAmount(value);
        } else {
            // Optionally, you can set an error message here if the user tries to type more
            setErrorMessage("Payment amount cannot exceed 15 characters.");
        }
    };

    return (
        <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
            <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
                {/* Left Section: Introduction and Description */}
                <div className="px-1 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">TDS Calculator (India)</h1>
                    <p className="text-md text-gray-600 mt-2">
                        Calculate the Tax Deducted at Source (TDS) on various types of payments as per Indian Income Tax Act.
                    </p>
                </div>

                {/* Right Section: Calculator Inputs and Results */}
                <div className="bg-secondary h-full rounded-xl flex flex-col">
                    {/* Header for the Calculator */}
                    <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                        <div className="flex justify-center items-center">
                            <div className="space-y-1 mt-3 text-center">
                                <p className="text-3xl tracking-wide font-semibold text-white">
                                    TDS Calculator
                                </p>
                                <span className="text-gray-300 xl:text-md">
                                    Estimate your TDS deductions
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
                            <div className="bg-IntColor rounded-xl p-6 shadow flex-grow">
                                <div className="grid grid-cols-1 gap-y-5">
                                    {/* Input: Recipient Type */}
                                    <div className="relative group">
                                        <label htmlFor="recipientType" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Recipient Type:
                                        </label>
                                        <div className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                                            <select
                                                id="recipientType"
                                                value={recipientType}
                                                onChange={(e) => setRecipientType(e.target.value)}
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                aria-label="Recipient Type"
                                            >
                                                <option value="individual">Individual / HUF</option>
                                                <option value="others">Company / Firm / Others</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Input: Has PAN? */}
                                    <div className="relative group">
                                        <label className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Do you have PAN?
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <label className="inline-flex items-center text-gray-700">
                                                <input
                                                    type="radio"
                                                    className="form-radio h-4 w-4 text-primary focus:ring-primary focus-within:ring-primary"
                                                    checked={hasPAN}
                                                    onChange={() => setHasPAN(true)}
                                                    name="hasPan"
                                                    
                                                />
                                                <span className="ml-2">Yes</span>
                                            </label>
                                            <label className="inline-flex items-center text-gray-700">
                                                <input
                                                    type="radio"
                                                    className="form-radio h-4 w-4 text-primary focus:ring-primary"
                                                    checked={!hasPAN}
                                                    onChange={() => setHasPAN(false)}
                                                    name="hasPan"
                                                />
                                                <span className="ml-2">No (Higher TDS)</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Input: Type of Payment */}
                                    <div className="relative group">
                                        <label htmlFor="selectedKey" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Type of Payment:
                                        </label>
                                        <div className="w-full border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
  <select
    id="selectedKey"
    value={selectedKey}
    onChange={handlePaymentAmountChange}
    className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
    aria-label="Type of Payment"
  >
    {tdsOptions.map((option) => (
      <option key={option.key} value={option.key}>
        {option.label} (Section {option.section})
      </option>
    ))}
  </select>
</div>

                                    </div>

                                    {/* Input: Payment Amount */}
                                    <div className="relative group">
                                        <label htmlFor="paymentAmount" className="block text-sm font-semibold text-gray-800 px-0.5 py-3">
                                            Payment Amount (₹):
                                        </label>
                                        <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${errorMessage?"border-red-700 shadow":"border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                        }`}>
                                            <label className="size-5 text-md font-normal text-gray-500">₹</label>
                                            <input
                                                type="number"
                                                id="paymentAmount"
                                                value={paymentAmount}
                                                onChange={handlePaymentAmountChange} // Use the new handler here
                                                className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                                                min="0"
                                                placeholder="e.g., 25000"
                                                aria-label="Payment Amount"
                                              
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="mt-4 flex flex-col">
                            <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
                            <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
                                
                                <div className="text-center">
                                    <div className="space-y-4">
                                        <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">TDS Deducted:</span>
                                            <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.tds)}</span>
                                        </div>
                                        <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                                            <span className="text-lg font-semibold text-gray-700">Net Amount (After TDS):</span>
                                            <span className="text-xl font-bold text-green-700">₹ {formatNumber(result.net)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                    <p className="text-sm text-gray-500 mt-4 text-center">
                                        * This calculator provides an estimate. Actual TDS may vary based on specific tax laws, amendments, and individual circumstances. Consult a tax professional for precise calculations.
                                    </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TDSCalculator;