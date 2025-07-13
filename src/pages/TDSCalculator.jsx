import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

function TDSCalculator() {
  // List of TDS sections with their logic (Unique keys now)
  const tdsOptions = [
    {
      key: "salary",
      label: "Salary",
      section: "192",
      rate: "slab",
      threshold: "-",
    },
    {
      key: "interest_fd",
      label: "Interest on FD",
      section: "194A",
      rate: 0.1,
      threshold: "₹40,000 (₹50,000 for seniors)",
    },
    {
      key: "professional",
      label: "Professional Fees",
      section: "194J",
      rate: 0.1,
      threshold: "₹30,000",
    },
    {
      key: "rent",
      label: "Rent",
      section: "194I",
      rate: 0.1,
      threshold: "₹2,40,000/year",
    },
    {
      key: "commission",
      label: "Commission",
      section: "194H",
      rate: 0.05,
      threshold: "₹15,000",
    },
    {
      key: "contractor",
      label: "Contractor Payment",
      section: "194C",
      rate: { individual: 0.01, others: 0.02 },
      threshold: "₹30,000 per contract or ₹1 lakh/year",
    },
    {
      key: "lottery",
      label: "Lottery Winnings",
      section: "194B",
      rate: 0.3,
      threshold: "₹10,000",
    },
    {
      key: "premature_epf",
      label: "Premature EPF withdrawal*",
      section: "192A",
      rate: 0.1,
      threshold: "₹50,000",
    },
    {
      key: "interest_securities",
      label: "Interest on Securities",
      section: "193",
      rate: 0.1,
      threshold: "₹10,000",
    },
    {
      key: "dividend",
      label: "Payment of Dividend",
      section: "194",
      rate: 0.1,
      threshold: "₹5,000",
    },
    {
      key: "interest_banks_po",
      label: "Interest from Banks/Post Offices on Deposits",
      section: "194A",
      rate: 0.1,
      threshold: "₹40,000",
    },
    {
      key: "interest_others",
      label: "Interest by others (apart from on securities)",
      section: "194A",
      rate: 0.1,
      threshold: "₹5,000",
    },
  ];

  const [recipientType, setRecipientType] = useState("individual");
  const [hasPAN, setHasPAN] = useState(true);
  const [selectedKey, setSelectedKey] = useState("interest_fd"); // Changed default to a unique key
  const [paymentAmount, setPaymentAmount] = useState("50000");
  const [result, setResult] = useState({
    label: "",
    section: "",
    threshold: "",
    rate: "0.00",
    tds: "0.00",
    net: "0.00",
  });
  const [paymentAmountError, setPaymentAmountError] = useState(""); // Specific error for payment amount

  // --- Calculation Logic ---
  const calculateTDS = () => {
    setPaymentAmountError(""); // Clear previous error messages for payment amount
    const amount = parseFloat(paymentAmount);

    // Input validation for paymentAmount
    if (isNaN(amount) || amount < 100 || amount > 100000000) {
      setResult({
        label: "",
        section: "",
        threshold: "",
        rate: "0.00",
        tds: "0.00",
        net: "0.00",
      });
      setPaymentAmountError(
        "Payment amount must be between ₹100 and ₹10,00,00,000."
      );
      return;
    }

    const selected = tdsOptions.find((opt) => opt.key === selectedKey);

    if (!selected) {
      // This should ideally not happen if selectedKey is always from tdsOptions
      setResult({
        label: "",
        section: "",
        threshold: "",
        rate: "0.00",
        tds: "0.00",
        net: "0.00",
      });
      setPaymentAmountError("Invalid payment type selected.");
      return;
    }

    let rate;
    let tdsAmount = 0;
    let netAmount = 0;

    if (selected.key === "salary") {
      setResult({
        label: selected.label,
        section: selected.section,
        threshold: selected.threshold,
        rate: "N/A",
        tds: "N/A",
        net: "N/A",
      });
      setPaymentAmountError(
        "TDS on Salary (Section 192) is calculated based on individual income tax slab rates and deductions, not a flat percentage on the payment amount. This calculator does not support detailed salary TDS calculation."
      );
      return;
    }

    if (!hasPAN) {
      rate = 0.2; // Default higher rate if PAN not available
    } else if (selected.key === "contractor") {
      rate = selected.rate[recipientType];
    } else {
      rate = selected.rate;
    }

    tdsAmount = amount * rate;
    netAmount = amount - tdsAmount;

    setResult({
      label: selected.label,
      section: selected.section,
      threshold: selected.threshold,
      rate: (rate * 100).toFixed(2),
      tds: tdsAmount.toFixed(2),
      net: netAmount.toFixed(2),
    });
  };

  // Use useEffect to trigger calculation on input changes
  useEffect(() => {
    // Debounce calculation for better performance on rapid input
    const handler = setTimeout(() => {
      calculateTDS();
    }, 300); // 300ms debounce
    return () => clearTimeout(handler);
  }, [recipientType, hasPAN, selectedKey, paymentAmount]);

  // --- Formatting Function ---
  const formatNumber = (num) => {
    if (num === null || isNaN(num) || num === "N/A")
      return num === "N/A" ? "N/A" : "0.00";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // --- Input Change Handlers ---
  const handlePaymentAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty string or numbers only
    if (value === "" || /^\d+$/.test(value)) {
      if (value.length <= 15) {
        setPaymentAmount(value);
        setPaymentAmountError(""); // Clear error if input is valid so far
      } else {
        setPaymentAmountError("Payment amount cannot exceed 15 digits.");
      }
    } else {
      setPaymentAmountError("Invalid input. Please enter a number.");
    }
  };

  const handleSelectedKeyChange = (e) => {
    setSelectedKey(e.target.value);
    setPaymentAmountError(""); // Clear payment amount error when type of payment changes
  };

  return (
    <div className="container w-full h-full px-5 py-6 mx-auto font-inter">
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1">
        {/* Left Section: Introduction and Description */}
        <div className="px-1 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            TDS Calculator (India)
          </h1>
          <p className="text-md text-gray-600 mt-2">
            Calculate the **Tax Deducted at Source (TDS)** on various types of
            payments as per the Indian Income Tax Act.
          </p>
        </div>
        {/* Right Section: Calculator Inputs and Results */}
        <div className="bg-gray-200 h-full rounded-xl flex flex-col">
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
              <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">
                Enter Details
              </h1>
              <div className="bg-gray-50 rounded-xl p-6 shadow flex-grow pb-10">
                <div className="grid grid-cols-1 gap-y-5">
                  {/* Input: Recipient Type */}
                  <div className="relative group">
                    <label
                      htmlFor="recipientType"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
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
                    <label
                      htmlFor="selectedKey"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Type of Payment:
                    </label>
                    <div className="w-full border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                      <select
                        id="selectedKey"
                        value={selectedKey}
                        onChange={handleSelectedKeyChange}
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
                    <label
                      htmlFor="paymentAmount"
                      className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                    >
                      Payment Amount (₹):
                    </label>
                    <div
                      className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${
                                              paymentAmountError
                                                ? "border-red-700 shadow-red-300"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}
                    >
                      <label className="size-5 text-md font-normal text-gray-500">
                        ₹
                      </label>
                      <input
                        type="number"
                        id="paymentAmount"
                        value={paymentAmount}
                        onChange={handlePaymentAmountChange}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        min="0"
                        placeholder="e.g., 50000"
                        aria-label="Payment Amount"
                      />
                    </div>
                    {paymentAmountError && (
                      <p className="text-red-500 text-xs mt-1">
                        {paymentAmountError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
           
            <div className="mt-4 flex flex-col">
            
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">
                Results
              </h1>
             
              <div className="bg-primary rounded-xl p-6 shadow flex flex-col justify-between h-full">
               
                <div className="text-center">
                  
                  <div className="space-y-4">
                   
                    <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                      
                      <span className="text-lg font-semibold text-gray-700">
                        TDS Deducted:
                      </span>
                    
                      <span className="text-xl font-bold text-green-700">
                        ₹ {formatNumber(result.tds)}
                      </span>
                     
                    </div>
                   
                    <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
                    
                      <span className="text-lg font-semibold text-gray-700">
                        Net Amount (After TDS):
                      </span>
                     
                      <span className="text-xl font-bold text-green-700">
                        ₹ {formatNumber(result.net)}
                      </span>
                     
                    </div>
                   
                  </div>
                 
                </div>
              
                <p className="text-sm text-gray-500 mt-4 text-center">
                   * This calculator
                  provides an estimate. Actual TDS may vary based on specific
                  tax laws, amendments, and individual circumstances. Consult a
                  tax professional for precise calculations. 
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
