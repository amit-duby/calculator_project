import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import {
  Calculator,
  Home,
  DollarSign,
  TrendingUp,
  Handshake,
  Lightbulb,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Users,
  CreditCard,
  Cake,
  Scale,
  Square,
  Hammer,
  Paintbrush,
  Maximize,
  RefreshCcw,
  FileText,
  Banknote,
  Percent,
} from "lucide-react";
function HomeLoanEmi() {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("6");
  const [loanPeriod, setLoanPeriod] = useState("3");
  const [frequency, setFrequency] = useState("monthly");
  const [monthlyResult, setMonthlyResult] = useState({
    emi: 0,
    total: 0,
    interest: 0,
  });
  const [yearlyResult, setYearlyResult] = useState({
    emi: 0,
    total: 0,
    interest: 0,
  });
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate);
    const n = parseFloat(loanPeriod);

    if (isNaN(P) || P < 100 || P > 100000000) {
      newErrors.loanAmount = "Amount must be between ₹100 and ₹10,00,00,000.";
      isValid = false;
    }
    if (isNaN(r) || r <= 0 || r > 12) {
      newErrors.interestRate = "Annual Return must be between 0.1% and 12%.";
      isValid = false;
    }
    if (isNaN(n) || n <= 0 || n > 30) {
      newErrors.loanPeriod = "Duration must be between 1 and 30 years.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  /**
   * @param {number} P
   * @param {number} R
   * @param {number} N
   * @returns {{emi: number, total: number, interest: number}}
   */
  const calculateEmi = (P, R, N) => {
    if (R === 0) {
      const emi = P / N;
      const total = P;
      const interest = 0;
      return {
        emi: Math.round(emi),
        total: Math.round(total),
        interest: Math.round(interest),
      };
    }
    const onePlusR_pow_n = Math.pow(1 + R, N);

    const emi = (P * R * onePlusR_pow_n) / (onePlusR_pow_n - 1);

    const total = emi * N;

    const interest = total - P;

    return {
      emi: Math.round(emi),
      total: Math.round(total),
      interest: Math.round(interest),
    };
  };

  useEffect(() => {
    if (validateInputs()) {
      const P = parseFloat(loanAmount);
      const years = parseFloat(loanPeriod);
      const annualRate = parseFloat(interestRate);

      if (frequency === "monthly" || frequency === "both") {
        const R_monthly = annualRate / 12 / 100;
        const months = years * 12;
        const result = calculateEmi(P, R_monthly, months);
        setMonthlyResult(result);
      } else {
        setMonthlyResult({ emi: 0, total: 0, interest: 0 });
      }

      if (frequency === "yearly" || frequency === "both") {
        const R_yearly = annualRate / 100;
        const result = calculateEmi(P, R_yearly, years);
        setYearlyResult(result);
      } else {
        setYearlyResult({ emi: 0, total: 0, interest: 0 });
      }
    } else {
      // Clear results if inputs are invalid
      setMonthlyResult({ emi: 0, total: 0, interest: 0 });
      setYearlyResult({ emi: 0, total: 0, interest: 0 });
    }
  }, [loanAmount, interestRate, loanPeriod, frequency]);

  // Loan Amount Validation
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setLoanAmount(value);
      setErrors((prev) => ({ ...prev, loanAmount: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        loanAmount: "Amount cannot exceed ₹100,000,000 or 15 digits.",
      }));
    }
  };

  // Interest Rate Validation
  const handleRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 12 && Number(value) >= 0)) {
      setInterestRate(value);
      setErrors((prev) => ({ ...prev, interestRate: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        interestRate: "Rate cannot exceed 50%",
      }));
    }
  };

  // Loan Tenure (Years) Validation
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 30 && Number(value) >= 0)) {
      setLoanPeriod(value);
      setErrors((prev) => ({ ...prev, loanPeriod: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        loanPeriod: "Loan tenure cannot exceed 30 years",
      }));
    }
  };
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const homeLoanFaqs = [
    {
      q: "Q1: What is a home loan EMI?",
      a: "A1: Home Loan EMI stands for Equated Monthly Installment. It's the fixed amount you pay to your lender each month to repay your home loan. It comprises both the principal loan amount and the interest accrued on the outstanding balance.",
    },
    {
      q: "Q2: How is home loan eligibility determined?",
      a: "A2: Home loan eligibility is primarily determined by your repayment capacity, which lenders assess based on your income, age, credit score, existing financial obligations (debt-to-income ratio), and the Loan to Value (LTV) ratio of the property.",
    },
    {
      q: "Q3: What is the ideal home loan tenure?",
      a: 'A3: There\'s no single "ideal" tenure. A longer tenure means lower EMI but higher total interest paid. A shorter tenure means higher EMI but significant savings on total interest. The ideal tenure balances your monthly affordability with minimizing total interest costs.',
    },
    {
      q: "Q4: Should I choose a fixed or floating interest rate?",
      a: 'A4:\n<span class="font-bold">Fixed Rate:</span> Offers stability and predictability of EMIs, good if you expect interest rates to rise.\n<span class="font-bold">Floating Rate:</span> EMIs fluctuate with market rates. Can be beneficial if rates fall, but risky if they rise. Most home loans in India are floating rate.\nYour choice depends on your risk appetite and market outlook.',
    },
    {
      q: "Q5: Can I get tax benefits on a home loan in India?",
      a: 'A5: Yes, significant tax benefits are available:\n* <span class="font-bold">Section 80C:</span> Deduction for principal repayment (up to ₹1.5 Lakh/year).\n* <span class="font-bold">Section 24(b):</span> Deduction for interest paid (up to ₹2 Lakh/year for self-occupied property, full interest for rented property with certain limits).\n* Additional benefits under <span class="font-bold">80EE/80EEA</span> for first-time homebuyers.',
    },
    {
      q: "Q6: What is the Loan to Value (LTV) ratio in a home loan?",
      a: "A6: The LTV ratio is the proportion of the property's value that the bank is willing to finance. For example, an 80% LTV on a ₹50 Lakh property means the bank will lend ₹40 Lakh, and you need to pay the remaining ₹10 Lakh as a down payment.",
    },
    {
      q: "Q7: What happens if I prepay my home loan?",
      a: "A7: Prepaying your home loan (making payments over and above your EMI) reduces your outstanding principal. This can significantly reduce the total interest you pay over the loan's lifetime and/or shorten your loan tenure. Most floating-rate home loans for individuals in India do not have prepayment penalties.",
    },
    {
      q: "Q8: What documents are required for a home loan?",
      a: "A8: Typically, lenders require: Identity Proof (PAN, Aadhaar, Passport), Address Proof, Income Proof (Salary slips, Bank statements, ITRs for last 2-3 years), Employment Proof, and Property Documents (Sale agreement, chain documents, NOCs, etc.).",
    },
  ];
  return (
    <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className=" container max-w-screen-xl mx-auto  3sm:px-10  ">
        
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            Home Loan Calculator
          </h1>
          <p className="mb-8">
            A Home Loan is a secured financial facility offered by banks and
            Housing Finance Companies (HFCs) to help individuals purchase,
            construct, extend, or renovate a residential property. It's
            considered a "secured" loan because the property itself serves as
            collateral. Home loans are typically repaid through Equated Monthly
            Installments (EMIs) over a long tenure, making homeownership
            accessible to many. Given the substantial amount involved and the
            long repayment period, a home loan is one of the most significant
            financial commitments an individual undertakes.
          </p>
        </section>
        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0">
          <div className="rounded-lg  pr-6  mt-[-4px]  pb-15 w-full max-w-[40rem] opacity-85">
            {/* Loan Amount */}
            <div className="group ">
              <label
                htmlFor="loanAmount"
                className="block text-gray-800 font-semibold mb-2"
              >
                Loan Amount (₹)
              </label>
              <div
                className={`flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7
                          ${
                            errors.loanAmount
                              ? "border-red-400 shadow-sm"
                              : "border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                          }`}
              >
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={handleAmountChange}
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g. 500000"
                  min="0"
                />
              </div>
              {errors.loanAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>
              )}
            </div>

            {/* Annual Interest Rate */}
            <div className="group my-4">
              <label
                htmlFor="interestRate"
                className="block text-gray-800 font-semibold mb-2"
              >
                Annual Interest Rate (%)
              </label>
              <div
                className={`flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7
                          ${
                            errors.interestRate
                              ? "border-red-400 shadow-sm"
                              : "border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                          }`}
              >
                <input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={handleRateChange}
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g. 8.5"
                  min="0"
                  step="0.01"
                />
                <label className="size-5 text-md font-normal text-gray-500">
                  %
                </label>
              </div>
              {errors.interestRate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.interestRate}
                </p>
              )}
            </div>
            <div className=" group">
              <label
                htmlFor="loanPeriod"
                className="block text-gray-800 font-semibold mb-2"
              >
                Loan Tenure (Years)
              </label>
              <div
                className={`flex items-center border rounded-xl shadow-2boxShadow px-3 py-2 mr-7
                          ${
                            errors.loanPeriod
                              ? "border-red-400 shadow-sm"
                              : "border-gray-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                          }`}
              >
                <input
                  id="loanPeriod"
                  type="number"
                  value={loanPeriod}
                  onChange={handleYearChange}
                  className="w-full text-gray-700 font-medium outline-none bg-transparent"
                  placeholder="e.g. 5"
                  min="0"
                />
                <label className="text-md font-normal text-gray-500">
                  years
                </label>
              </div>
              {errors.loanPeriod && (
                <p className="text-red-500 text-sm mt-1">{errors.loanPeriod}</p>
              )}
            </div>

            {/* Payment Frequency */}
            <div className=" group my-4">
              <label
                htmlFor="frequency"
                className="block text-gray-800 font-semibold mb-2"
              >
                Payment Frequency
              </label>
              <div
                className={`flex items-center border rounded-xl shadow-2boxShadow px-3 py-1.5 mr-7
                          border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow
                      }`}
              >
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="rounded-lg px-6 py-6 shadow-boxShadow bg-white w-full ">
            <div className=" rounded-xl px-2 mt-5  flex flex-col justify-between ">
              {/* Monthly EMI Results */}
              {(frequency === "monthly" || frequency === "both") && (
                <div className=" space-y-4">
                  <h3 className="text-primary text-2xl font-extrabold text-center">
                    Monthly EMI
                  </h3>
                  <div className="flex justify-between border-b-2 py-3 border-gray-300">
                    <span className="text-gray-700 ">EMI</span>
                    <span className="text-gray-700 font-semibold ">
                      ₹{monthlyResult.emi.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b-2 py-3 border-gray-300">
                    <span className="text-gray-700 ">Total Interest:</span>
                    <span className="text-gray-700 font-semibold ">
                      ₹{monthlyResult.interest.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b-2 py-3 border-gray-300">
                    <span className="text-gray-700 ">Total Payment:</span>
                    <span className="text-gray-700 font-semibold ">
                      ₹{monthlyResult.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}

              {/* Yearly EMI Results */}
              {(frequency === "yearly" || frequency === "both") && (
                <div
                  className={`${
                    frequency === "both" ? "space-y-2 mt-4" : "space-y-4"
                  }`}
                >
                  <h3 className="text-primary  text-2xl font-extrabold text-center">
                    Yearly EMI
                  </h3>
                  <div className="flex justify-between border-b-2 py-3 border-gray-300">
                    <span className="text-gray-700 ">EMI:</span>
                    <span className="text-gray-700 font-semibold ">
                      ₹{yearlyResult.emi.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b-2 py-3 border-gray-300">
                    <span className="text-gray-700 ">Total Interest:</span>
                    <span className="text-gray-700 font-semibold ">
                      ₹{yearlyResult.interest.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b-2 py-3 border-gray-300">
                    <span className="text-gray-700 ">Total Payment:</span>
                    <span className="text-gray-700 font-semibold ">
                      ₹{yearlyResult.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}

              {/* {!monthlyResult.emi && !yearlyResult.emi && !message && (
                    <p className="text-white text-center text-lg">Enter details to calculate your EMI.</p>
                  )} */}
            </div>
          </div>
        </div>
<div className=" mt-10">
  <div className="space-y-12 text-gray-800 text-[15px] leading-relaxed ">
        <section className="">
          <h2 className="text-2xl font-bold mb-3">What is a Home Loan?</h2>
          <p className="mb-4 text-gray-800 leading-relaxed">
            A <span className="font-bold text-blue-600">Home Loan</span> is a
            secured financial facility offered by banks and Housing Finance
            Companies (HFCs) to help individuals purchase, construct, extend, or
            renovate a residential property. It's considered a "secured" loan
            because the property itself serves as collateral. Home loans are
            typically repaid through Equated Monthly Installments (EMIs) over a
            long tenure, making homeownership accessible to many.
          </p>
          <p className="mb-4 text-gray-800 leading-relaxed">
            Given the substantial amount involved and the long repayment period,
            a home loan is one of the most significant financial commitments an
            individual undertakes.
          </p>
        </section>

        {/* Why is a Home Loan Calculator Important? Section */}
        <section className="">
          <h2 className="text-2xl font-bold mb-3">
            Why is a Home Loan Calculator Important?
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="mb-4 text-gray-800 leading-relaxed">
                A Home Loan Calculator is an indispensable tool for anyone
                planning to take on a mortgage. Here's why it's crucial:
              </p>
              <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <span className="font-bold flex items-start">
                    <Calculator
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Accurate EMI Estimation:
                  </span>
                  <span className="block ml-6 -mt-1">
                    Instantly determine your exact monthly EMI outflow, allowing
                    you to effectively budget and manage your household
                    expenses.
                  </span>
                </li>
                <li>
                  <span className="font-bold flex items-start">
                    <DollarSign
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Total Cost Visibility:
                  </span>
                  <span className="block ml-6 -mt-1">
                    Gain a clear understanding of the total interest you'll pay
                    over the entire loan tenure, revealing the true cost of
                    borrowing.
                  </span>
                </li>
                <li>
                  <span className="font-bold flex items-start">
                    <Handshake
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Loan Option Comparison:
                  </span>
                  <span className="block ml-6 -mt-1">
                    Easily compare different home loan offers from various
                    lenders.
                  </span>
                </li>
                <li>
                  <span className="font-bold flex items-start">
                    <TrendingUp
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Optimal Tenure Planning:
                  </span>
                  <span className="block ml-6 -mt-1">
                    Experiment with different loan durations to find the right
                    balance for your financial comfort.
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-gray-800 leading-relaxed">
                The{" "}
                <span className="font-bold text-blue-600">
                  UniCX Home Loan Calculator
                </span>{" "}
                empowers you with immediate insights, transforming complex loan
                calculations into simple, actionable information for your
                homeownership journey.
              </p>
            </div>
            {/* Image for Why Important */}
            <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* <img
                src={homeLoanBenefitsImage}
                alt="Illustration showing benefits of a home loan calculator: financial planning, budgeting, loan comparison"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain rounded"
                loading="lazy"
              /> */}
            </div>
          </div>
        </section>

        {/* How to Use the UniCX Home Loan Calculator Section */}
        <section className="">
          <h2 className="text-2xl font-bold mb-3">
            How to Use the UniCX Home Loan Calculator
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Our Home Loan calculator is designed for simplicity, accuracy,
                and providing you with comprehensive results:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed mt-4">
                <li>
                  <span className="font-bold">
                    Enter Principal Loan Amount:
                  </span>{" "}
                  Input the total amount you wish to borrow for your home (e.g.,
                  ₹30,00,000 or ₹75,00,000).
                </li>
                <li>
                  <span className="font-bold">
                    Enter Annual Interest Rate (%):
                  </span>{" "}
                  Provide the annual interest rate offered by the lender (e.g.,
                  8.5%, 9.0%).
                </li>
                <li>
                  <span className="font-bold">
                    Specify Loan Tenure (Years):
                  </span>{" "}
                  Choose the duration over which you plan to repay the loan
                  (e.g., 15 years, 20 years, 30 years).
                </li>
                <li>
                  <span className="font-bold">Calculate:</span> Click the
                  "Calculate Home Loan" button.
                </li>
              </ol>
              <h3 className="font-semibold text-xl mt-4 mb-2">
                The UniCX Home Loan Calculator will instantly provide you with:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <span className="font-bold">Monthly EMI Amount:</span> The
                  exact amount you will need to pay each month.
                </li>
                <li>
                  <span className="font-bold">Total Interest Payable:</span> The
                  absolute amount of interest you will pay over the entire loan
                  tenure.
                </li>
                <li>
                  <span className="font-bold">Total Amount Payable:</span> The
                  sum of your principal loan amount and the total interest
                  payable (your total repayment).
                </li>
                <li>
                  <span className="font-bold">Amortization Schedule:</span> A
                  detailed year-wise breakdown showing how much of each EMI
                  payment goes towards principal repayment and how much towards
                  interest.
                </li>
              </ul>
            </div>
            {/* Image for How to Use */}
            <div className="flex justify-center items-center shadow rounded hover:shadow-md transition-shadow duration-300">
              {/* <img
                src={homeLoanPurposeImage}
                alt="Image showing the UniCX Home Loan calculator interface with input fields and calculated outputs"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain rounded"
                loading="lazy"
              /> */}
            </div>
          </div>
        </section>

        {/* Understanding Home Loans: Key Aspects of Your Mortgage Section */}
        <section className="">
          <h2 className="text-2xl font-bold mb-3">
            Understanding Home Loans: Key Aspects of Your Mortgage
          </h2>
          <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
            Navigating a home loan requires understanding its various components
            and implications:
          </p>

          <h3 className="font-semibold text-xl mt-6 mb-2">
            Components of a Home Loan & Factors Affecting Eligibility
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <span className="font-bold">Principal:</span> The actual amount of
              money you borrow.
            </li>
            <li>
              <span className="font-bold">Interest:</span> The cost of
              borrowing, paid on the outstanding principal balance.
            </li>
            <li>
              <span className="font-bold">
                EMI (Equated Monthly Installment):
              </span>{" "}
              A fixed monthly payment combining both principal and interest.
            </li>
          </ul>

          <div className="my-4 p-4 border rounded-lg shadow-sm bg-gray-50">
            <h4 className="font-semibold text-lg mb-2">
              Key Factors Affecting Your Home Loan Eligibility & EMI:
            </h4>
            <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
              <li>
                <span className="font-bold flex items-start">
                  <Users
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0 text-indigo-600"
                  />
                  Income & Employment Stability:
                </span>
                <span className="block ml-6 -mt-1">
                  Your monthly income, employer reputation, and work experience
                  are primary determinants. Lenders assess your repayment
                  capacity.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <CreditCard
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0 text-indigo-600"
                  />
                  Credit Score (CIBIL Score):
                </span>
                <span className="block ml-6 -mt-1">
                  A strong credit score (typically 750+) is crucial. It reflects
                  your creditworthiness and can significantly impact the
                  interest rate you are offered.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <Cake
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0 text-indigo-600"
                  />
                  Age:
                </span>
                <span className="block ml-6 -mt-1">
                  Your age at loan application and at loan maturity impacts the
                  maximum permissible tenure.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <Scale
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0 text-indigo-600"
                  />
                  Existing Debts (DTI Ratio):
                </span>
                <span className="block ml-6 -mt-1">
                  Your current loan obligations are considered. A high
                  Debt-to-Income (DTI) ratio can reduce your eligibility.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <Home
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0 text-indigo-600"
                  />
                  Property Value & Type:
                </span>
                <span className="block ml-6 -mt-1">
                  The market value and type of property influence the Loan to
                  Value (LTV) ratio.
                </span>
              </li>
            </ul>
          </div>
          {/* Image for Understanding Home Loan */}
          <div className="flex justify-center items-center mt-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* <img
              src={homeLoanUnderstandingImage}
              alt="Diagram illustrating factors affecting home loan eligibility and different loan types"
              className="w-full h-auto max-h-[300px] object-contain rounded"
              loading="lazy"
            /> */}
          </div>

          <h3 className="font-semibold text-xl mt-6 mb-2">
            Types of Home Loans
          </h3>
          <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
            Lenders offer various home loan products tailored to specific needs:
          </p>
          <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <span className="font-bold flex items-start">
                <Home
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                />{" "}
                Home Purchase Loan:
              </span>{" "}
              For buying a new or resale residential property.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <Square
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                />{" "}
                Plot Loan:
              </span>{" "}
              For purchasing a plot of land for residential construction.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <Hammer
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                />{" "}
                Home Construction Loan:
              </span>{" "}
              For building a house on a self-owned plot.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <Paintbrush
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                />{" "}
                Home Renovation/Improvement Loan:
              </span>{" "}
              For repairs, renovations, or upgrades to an existing home.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <Maximize
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                />{" "}
                Home Extension Loan:
              </span>{" "}
              For adding new rooms or floors to an existing house.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <RefreshCcw
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                />{" "}
                Home Loan Balance Transfer:
              </span>{" "}
              For transferring your existing home loan to another lender,
              usually for a lower interest rate or better terms.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <TrendingUp
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                />{" "}
                Top-Up Loan:
              </span>{" "}
              An additional loan sanctioned over an existing home loan, often
              for any personal or business need.
            </li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-2">
            Interest Rate Types
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <span className="font-bold">Fixed Interest Rate:</span> The
              interest rate remains constant throughout the loan tenure,
              providing predictable EMIs.
            </li>
            <li>
              <span className="font-bold">Floating Interest Rate:</span> The
              interest rate fluctuates with market conditions. EMIs can increase
              or decrease.
            </li>
            <li>
              <span className="font-bold">Hybrid Interest Rate:</span> A
              combination, fixed for an initial period then converts to
              floating.
            </li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-2">
            Key Home Loan Terms to Know
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <span className="font-bold">Loan to Value (LTV) Ratio:</span> The
              maximum percentage of the property's value that a bank can
              finance.
            </li>
            <li>
              <span className="font-bold">Processing Fees:</span> A one-time fee
              charged by the lender for processing your loan application.
            </li>
            <li>
              <span className="font-bold">Prepayment/Foreclosure Charges:</span>{" "}
              Fees charged if you repay a part or the entire loan before tenure
              (often zero for floating-rate loans for individuals).
            </li>
            <li>
              <span className="font-bold">
                Stamp Duty & Registration Charges:
              </span>{" "}
              Government levies on the property transaction, not covered by the
              loan.
            </li>
            <li>
              <span className="font-bold">
                Legal & Technical Valuation Fees:
              </span>{" "}
              Charges for legal verification of documents and property
              valuation.
            </li>
            <li>
              <span className="font-bold">Moratorium Period:</span> A temporary
              period during which the borrower is not required to make full EMI
              payments.
            </li>
          </ul>

          <h3 className="font-semibold text-xl mt-6 mb-2">
            Tax Benefits on Home Loans (India Specific)
          </h3>
          <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
            Home loans offer significant tax benefits in India under the Income
            Tax Act, 1961:
          </p>
          <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
            <li>
              <span className="font-bold flex items-start">
                <FileText
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-green-600"
                />{" "}
                Section 80C:
              </span>{" "}
              Deduction for principal repayment up to ₹1.5 Lakh per financial
              year.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <DollarSign
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-green-600"
                />{" "}
                Section 24(b):
              </span>{" "}
              Deduction for interest paid. Up to ₹2 Lakh for self-occupied
              property.
            </li>
            <li>
              <span className="font-bold flex items-start">
                <Percent
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-green-600"
                />{" "}
                Section 80EE/80EEA:
              </span>{" "}
              Additional deductions for interest paid for first-time homebuyers.
            </li>
          </ul>
        </section>

        {/* Who Can Benefit from the UniCX Home Loan Calculator? */}
        <section className="">
          <h2 className="text-2xl font-bold mb-3">
            Who Can Benefit from the UniCX Home Loan Calculator?
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-800 text-[15px] leading-relaxed">
                The UniCX Home Loan Calculator is an indispensable tool for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <span className="font-bold">First-Time Homebuyers:</span> To
                  understand affordability and compare loan options.
                </li>
                <li>
                  <span className="font-bold">Existing Homeowners:</span>{" "}
                  Considering a balance transfer, top-up loan, or exploring
                  prepayment.
                </li>
                <li>
                  <span className="font-bold">Real Estate Investors:</span>{" "}
                  Analyzing the viability and returns of potential property
                  investments.
                </li>
                <li>
                  <span className="font-bold">
                    Financial Planners & Advisors:
                  </span>{" "}
                  To quickly model various home loan scenarios for their
                  clients.
                </li>
                <li>
                  <span className="font-bold">
                    Budget-Conscious Individuals:
                  </span>{" "}
                  To ensure that home loan EMIs fit comfortably within their
                  monthly financial plan.
                </li>
              </ul>
            </div>
            {/* Image for Who Can Benefit */}
            <div className="flex justify-center items-center shadow rounded hover:shadow-md transition-shadow duration-300">
              {/* <img
                    src={homeLoanWhoCanBenefitImage}
                    alt="Image showing diverse individuals benefiting from using a home loan calculator for property financing"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain rounded"
                    loading="lazy"
                /> */}
            </div>
          </div>
        </section>

        {/* Key Considerations & Important Notes Before Taking a Home Loan */}
        <section className="">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-yellow-700 mb-3 flex items-center">
              <Lightbulb size={20} className="mr-3 mt-1 flex-shrink-0" />
              Key Considerations & Important Notes Before Taking a Home Loan
            </h2>
            <p className="text-yellow-800 text-[15px] leading-relaxed mb-4">
              A home loan is a long-term commitment. Consider these factors
              beyond just the EMI:
            </p>
            {/* Image for Important Considerations (If available) */}
            <div className="flex justify-center items-center">
              {/* <img
                  src={homeLoanConsiderationsImage}
                  alt="Icons representing financial risks, taxation, and diversification for Fixed Deposit investments"
                  className="w-auto h-16 mx-auto my-4 rounded"
                  loading="lazy"
              /> */}
            </div>
            <ul className="list-none space-y-2 text-yellow-700 text-[15px] leading-relaxed">
              <li>
                <span className="font-bold flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Down Payment (Own Contribution):
                </span>
                <span className="block ml-6 -mt-1">
                  Ensure you have sufficient funds for the down payment
                  (typically 10-25% of property value).
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Hidden/Additional Costs:
                </span>
                <span className="block ml-6 -mt-1">
                  Factor in property taxes, society maintenance charges, and
                  various insurance costs.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Prepayment Strategy:
                </span>
                <span className="block ml-6 -mt-1">
                  Even small partial prepayments can save substantial interest
                  over the long term.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Credit Score Maintenance:
                </span>
                <span className="block ml-6 -mt-1">
                  Keep your credit score healthy for potential refinancing or
                  future loans.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Compare Lenders Thoroughly:
                </span>
                <span className="block ml-6 -mt-1">
                  Look beyond just the interest rate; compare fees, service, and
                  terms.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Legal & Technical Due Diligence:
                </span>
                <span className="block ml-6 -mt-1">
                  Ensure the property has clear titles and all necessary
                  approvals.
                </span>
              </li>
              <li>
                <span className="font-bold flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Loan Insurance:
                </span>
                <span className="block ml-6 -mt-1">
                  Consider a loan protection plan to safeguard your family.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="">
          <h2 className="text-2xl font-bold mb-3 flex items-center">
            <HelpCircle size={20} className="mr-2 flex-shrink-0" />
            Frequently Asked Questions (FAQs) about Home Loans
          </h2>
          <div className="space-y-2">
            {homeLoanFaqs.map((faq, i) => (
              <div
                key={i}
                className={`py-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === i ? "bg-blue-50 rounded-lg shadow-sm" : ""
                }`}
              >
                <button
                  className={`flex justify-between items-center px-4 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg py-3 ${
                    openFAQ !== i
                      ? "border border-gray-300 hover:border-gray-400"
                      : "border-b border-blue-200"
                  }`}
                  onClick={() => toggleFAQ(i)}
                  aria-expanded={openFAQ === i ? "true" : "false"}
                  aria-controls={`faq-answer-${i}`}
                >
                  <p className="font-semibold text-gray-800">{faq.q}</p>
                  {openFAQ === i ? (
                    <ChevronUp size={20} className="flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown size={20} className="flex-shrink-0 ml-2" />
                  )}
                </button>
                <p
                  id={`faq-answer-${i}`}
                  className={`text-gray-800 text-md font-normal px-4 ${
                    openFAQ === i
                      ? "max-h-[500px] opacity-100 py-3"
                      : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={openFAQ !== i}
                  dangerouslySetInnerHTML={{ __html: faq.a }} // Using dangerouslySetInnerHTML for bold tags within FAQ answers
                ></p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="pt-6 border-t mt-10">
          <p className="text-sm text-gray-500 leading-relaxed">
            The UniCX Home Loan Calculator is your trusted partner in navigating
            the complexities of home financing. It provides the clarity and
            insights you need to make empowered decisions for your dream home.
            <br />
            <br />
            This Home Loan Calculator and the information provided are developed
            and maintained by{" "}
            <span className="font-bold">
              UniCX (UniconsultX Solutions Private Limited)
            </span>{" "}
            to help users understand home loan calculations. While we strive for
            accuracy, the information is for illustrative purposes only and
            should not be considered financial advice. For personalized
            financial advice or specific loan product details, always consult
            with a qualified financial advisor or your lender.
          </p>
        </section>
      </div>
      </div>
      </div>
      
    </section>
  );
}

export default HomeLoanEmi;
