import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import {
  ShieldCheck, FileText, Banknote, ListChecks, ScrollText, CheckCircle, HelpCircle, ChevronUp, ChevronDown
} from 'lucide-react';
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

    const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const tdsFaqs = [
    {
      q: "Q1: What is the primary difference between TDS and TCS?",
      a: "A1: TDS (Tax Deducted at Source) is deducted by the payer on certain incomes (like salary, rent, fees) before making payment to the recipient. TCS (Tax Collected at Source) is collected by the seller from the buyer on specific goods (like scrap, timber, motor vehicle sales) at the time of sale. Both are mechanisms for early tax collection but apply at different stages and for different types of transactions."
    },
    {
      q: "Q2: Who is a 'deductor' and a 'deductee' in TDS?",
      a: "A2: A 'deductor' is the person or entity (e.g., employer, company, individual paying rent) who is required to deduct tax at source before making a payment. A 'deductee' is the person or entity who receives the payment from which tax has been deducted."
    },
    {
      q: "Q3: What happens if TDS is not deducted or not deposited on time?",
      a: "A3: If TDS is not deducted or not deposited on time, the deductor can face severe penalties, including interest on the delayed payment, penalties for non-deduction or non-payment, and even prosecution in some cases. The expense for which TDS was not deducted might also be disallowed for income tax purposes."
    },
    {
      q: "Q4: Can I claim a refund for excess TDS deducted?",
      a: "A4: Yes, if the TDS deducted from your income is more than your actual tax liability for the financial year, you can claim a refund when you file your Income Tax Return (ITR). The refund amount will be credited to your bank account by the Income Tax Department."
    },
    {
      q: "Q5: How often should TDS be deposited with the government?",
      a: "A5: Generally, TDS deducted by non-government deductors must be deposited by the 7th of the subsequent month. For the month of March, it can be deposited by April 30th. For government deductors, the rules may vary slightly. Quarterly TDS returns also need to be filed."
    },
    {
      q: "Q6: Is TDS applicable on all types of payments?",
      a: "A6: No, TDS is applicable only on specific types of payments as defined under various sections of the Income Tax Act, and often only when the payment amount exceeds certain threshold limits in a financial year. Common examples include salary, rent, professional fees, interest, commission, etc."
    },
    {
      q: "Q7: What is Form 26AS and why is it important?",
      a: "A7: Form 26AS is an annual consolidated statement available on the Income Tax Department's e-filing portal. It shows all tax deducted at source (TDS), tax collected at source (TCS), advance tax paid, and self-assessment tax paid against your PAN. It is crucial for verifying that the TDS deducted from your income has been correctly deposited by the deductor and for claiming credit when filing your ITR."
    }
  ];
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
    
   <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className="container max-w-screen-xl mx-auto 3sm:px-10">

        {/* Main Heading */}
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            UniCX TDS Calculator: Simplify Your Tax Deducted at Source Calculations
          </h1>
        </section>

        {/* What is TDS? Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">What is Tax Deducted at Source (TDS)?</h2>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Understanding Tax Deducted at Source (TDS) is crucial for both individuals and businesses in India. TDS is essentially a mechanism introduced by the Indian Income Tax Department to collect tax at the very source of income. It ensures a steady flow of revenue to the government and widens the tax base by bringing more transactions under tax purview.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <strong>How it works:</strong> When certain payments (like salary, rent, professional fees, interest, commission, etc.) are made, the payer (deductor) is mandated to deduct a specific percentage as tax before making the final payment to the recipient (deductee).
            </li>
            <li>
              <strong>Purpose:</strong> The amount deducted as TDS is then remitted by the deductor to the government. The deductee, in turn, receives a credit for this deducted tax, which they can claim against their total tax liability when filing their annual income tax return.
            </li>
          </ul>
          <p className="mt-4 text-gray-800 leading-relaxed">
            The <strong>UniCX TDS Calculator</strong> is designed to simplify these intricate calculations, helping you effortlessly determine the applicable TDS amounts and ensure compliance with tax regulations.
          </p>
        </section>

        {/* Why Use the UniCX TDS Calculator? Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Why Use the UniCX TDS Calculator?</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="mb-4 text-gray-800 leading-relaxed">
                Navigating the various TDS sections, rates, and thresholds can be complex. Our calculator offers a straightforward solution to these challenges:
              </p>
              <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong className="flex items-start">
                    <ShieldCheck size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Accuracy & Simplicity:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Get precise TDS calculations in moments, without needing to remember complex formulas or different rates for various sections.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <FileText size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Compliance Assurance:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Helps both deductors and deductees understand their tax obligations and rights, reducing the chances of errors and penalties.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <Banknote size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Financial Planning:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Provides clarity on the net amount to be paid or received, aiding in better financial management and budgeting.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <ListChecks size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                    Versatility:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Covers multiple common TDS sections, making it a comprehensive tool for diverse users.
                  </span>
                </li>
              </ul>
            </div>
            {/* Image for Benefits */}
            <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={tdsBenefitsImage}
                alt="Benefits of using UniCX TDS Calculator - Tax Compliance, Financial Planning"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
              /> */}
            </div>
          </div>
        </section>

        {/* How to Use the UniCX TDS Calculator Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">How to Use the UniCX TDS Calculator</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Our calculator is designed for intuitive use, allowing you to quickly determine your TDS estimates. You will typically input the following:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed mt-4">
                <li>
                  <strong>Select Payment Type:</strong> Choose the nature of the payment from a dropdown (e.g., Salary, Rent, Professional Fees, Interest, etc.). This determines the applicable TDS section and rate.
                </li>
                <li>
                  <strong>Enter Payment Amount:</strong> Input the gross amount of the payment before any deductions.
                </li>
                <li>
                  <strong>PAN Availability:</strong> Indicate whether the deductee's Permanent Account Number (PAN) is available. This is critical as non-furnishing of PAN leads to higher TDS rates.
                </li>
                <li>
                  <strong>Resident Status:</strong> Specify if the deductee is a Resident or Non-Resident (relevant for certain sections like 195).
                </li>
                <li>
                  <strong>Select Financial Year:</strong> Choose the appropriate financial year for which the calculation is being made, as rates and rules can change annually.
                </li>
                <li>
                  <strong>Calculate:</strong> Click the "Calculate TDS" button to instantly view the results.
                </li>
              </ol>
              <h3 className="font-semibold text-xl mt-4 mb-2">Outputs:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Applicable TDS Section & Rate:</strong> The specific section of the Income Tax Act under which TDS is to be deducted, along with the percentage rate.
                </li>
                <li>
                  <strong>Calculated TDS Amount:</strong> The exact amount of tax to be deducted.
                </li>
                <li>
                  <strong>Net Amount Payable/Receivable:</strong> The amount remaining after TDS deduction.
                </li>
              </ul>
            </div>
            {/* Image for How to Use */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
              {/* <img
                src={tdsPurposeImage} // Reusing image or provide specific if available
                alt="How to use UniCX TDS Calculator - Step by step guide"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
              /> */}
            </div>
          </div>
        </section>

        {/* Key Sections Covered by the TDS Calculator (Table) */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Key Sections Covered by the UniCX TDS Calculator</h2>
          <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
            Our calculator helps you compute TDS for some of the most common payment types:
          </p>
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nature of Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Common Rate*
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Threshold Limit (Approx.)*
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">192</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Salaries</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Slab Rates</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Basic Exemption Limit</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">194A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Interest other than Interest on Securities</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">10%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹40,000 (Banks), ₹5,000 (Others)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">194C</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Payment to Contractors</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">1% (Ind/HUF), 2% (Co/Firm)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹30,000 (single), ₹1,00,000 (aggregate)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">194H</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Commission or Brokerage</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">5%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹15,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">194I</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Rent</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">10% (Plant/Machinery/Equipment), 10% (Land/Building/Furniture)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹2,40,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">194J</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Professional or Technical Fees</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">10%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹30,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">194IA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Transfer of Certain Immovable Property</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">1%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹50 Lakhs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            *_Rates and thresholds are illustrative and subject to change as per Income Tax Act amendments. Always refer to the latest tax laws for definitive rates._
          </p>
        </section>

        {/* The Crucial Role of PAN in TDS Calculations */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">The Crucial Role of PAN in TDS Calculations</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
            <p className="text-blue-800 mb-4 text-[15px] leading-relaxed">
              The Permanent Account Number (PAN) is paramount in TDS deductions:
            </p>
            <ul className="list-none space-y-2 text-blue-700 text-[15px] leading-relaxed">
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Standard Deduction:
                </strong>
                <span className="block ml-6 -mt-1">
                  When a deductee furnishes their valid PAN, TDS is deducted at the rates specified under the respective sections of the Income Tax Act.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Higher Deduction without PAN:
                </strong>
                <span className="block ml-6 -mt-1">
                  If the deductee fails to furnish their PAN to the deductor, the TDS will be deducted at a higher rate. This rate is typically 20% or the rate specified for that section, whichever is higher.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Benefit of PAN:
                </strong>
                <span className="block ml-6 -mt-1">
                  Providing PAN ensures that TDS is deducted at the correct, usually lower, rate and allows the deductee to easily claim credit for the deducted tax against their final tax liability.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Who Can Benefit from the UniCX TDS Calculator? */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Who Can Benefit from the UniCX TDS Calculator?</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
                <p className="text-gray-800 text-[15px] leading-relaxed">
                    This versatile calculator is beneficial for a wide array of users:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                        <strong>Salaried Individuals:</strong> To understand the TDS deducted from their salary and verify its accuracy.
                    </li>
                    <li>
                        <strong>Employers:</strong> For accurate and compliant TDS deductions from employee salaries.
                    </li>
                    <li>
                        <strong>Businesses & Freelancers:</strong> To calculate TDS on payments made for professional services, contracts, commissions, or interest.
                    </li>
                    <li>
                        <strong>Property Owners & Tenants:</strong> To determine TDS on rent payments (especially above thresholds).
                    </li>
                    <li>
                        <strong>Accountants & Tax Professionals:</strong> As a quick reference tool for TDS computation for their clients.
                    </li>
                    <li>
                        <strong>Financial Departments:</strong> For precise calculation and compliance across various payment categories.
                    </li>
                    <li>
                        <strong>Students & Learners:</strong> To grasp practical aspects of tax deductions.
                    </li>
                </ul>
            </div>
            {/* Image for Who Can Benefit */}
            <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
                {/* <img
                    src={tdsWhoCanBenefitImage}
                    alt="Who can use UniCX TDS Calculator - Diverse users"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                /> */}
            </div>
          </div>
        </section>

        {/* Key Considerations & Important Notes Regarding TDS */}
        <section className="mt-10">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center">
              <ScrollText size={20} className="mr-3 mt-1 flex-shrink-0" />
              Key Considerations & Important Notes Regarding TDS
            </h2>
            <p className="text-blue-800 mb-4 text-[15px] leading-relaxed">
              While the calculator simplifies the process, it's essential to be aware of the broader TDS landscape:
            </p>
            {/* Image for Important Considerations (If available) */}
            {/* <img
                src={tdsConsiderationsImage}
                alt="Important Considerations for TDS Calculations"
                className="w-auto h-16 mx-auto my-4"
            /> */}
            <ul className="list-none space-y-2 text-blue-700 text-[15px] leading-relaxed">
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Threshold Limits:
                </strong>
                <span className="block ml-6 -mt-1">
                  TDS is applicable only if the payment amount exceeds certain specified threshold limits for each section in a financial year. Below these limits, no TDS is required.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  TDS Certificates (Form 16/16A):
                </strong>
                <span className="block ml-6 -mt-1">
                  Deductors are legally required to issue TDS certificates (Form 16 for salaries, Form 16A for non-salary payments) to deductees. These certificates are crucial for the deductee to claim tax credit.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Timely Deposit & Filing:
                </strong>
                <span className="block ml-6 -mt-1">
                  Deductors must deposit the deducted TDS with the government and file quarterly TDS returns (Forms 24Q, 26Q, 27Q, etc.) within prescribed due dates.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Penalties for Non-Compliance:
                </strong>
                <span className="block ml-6 -mt-1">
                  Non-deduction, delayed deduction, non-payment, or delayed payment of TDS can attract significant penalties and interest under the Income Tax Act.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  TDS Credit & Refunds:
                </strong>
                <span className="block ml-6 -mt-1">
                  Deductees can claim the TDS amount against their final income tax liability. If the TDS deducted is more than their actual tax liability, they can claim a refund when filing their Income Tax Return (ITR).
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Lower Deduction Certificate (Section 197):
                </strong>
                <span className="block ml-6 -mt-1">
                  Taxpayers can apply to the Assessing Officer (AO) for a certificate to allow deduction of TDS at a lower rate or even nil rate if their estimated tax liability is low.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  TDS on Cash Withdrawals (Section 194N):
                </strong>
                <span className="block ml-6 -mt-1">
                  Banks are required to deduct TDS on cash withdrawals exceeding certain limits (e.g., ₹20 lakhs for non-filers, ₹1 crore for filers) in a financial year.
                </span>
              </li>
              <li>
                <strong className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Form 26AS:
                </strong>
                <span className="block ml-6 -mt-1">
                  This annual statement provides details of all TDS (and TCS) deducted against your PAN and deposited with the government. It's crucial for verifying TDS credits.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Frequently Asked Questions (FAQs) about TDS
          </h2>
          <div className="space-y-2">
            {tdsFaqs.map((faq, i) => (
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

        {/* Conclusion */}
        <section className="pt-6 border-t mt-10">
          <p className="text-sm text-gray-500">
            The UniCX TDS Calculator is your reliable partner in navigating the complexities of tax deducted at source. Empower yourself with accurate calculations and ensure seamless compliance with Indian tax laws. Try it now and simplify your financial life!
            <br/><br/>
            This TDS Calculator and the information provided are developed and maintained by{" "}
            <strong>UniCX (UniconsultX Solutions Private Limited)</strong> to help
            users understand TDS calculations. While we strive for accuracy, the information is for illustrative
            purposes only and should not be considered financial advice. For personalized tax advice
            or specific product details, always consult with a qualified tax professional.
          </p>
        </section>

      </div>
    </section>
    </div>
  );
}

export default TDSCalculator;
