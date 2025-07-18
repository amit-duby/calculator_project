import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import {
  Calculator,
  PieChart,
  TrendingUp,
  Handshake,
  Landmark,
  Car,
  HeartHandshake,
  School,
  Banknote,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  CheckCircle,
  FileText,
} from "lucide-react";
function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("2000000");
  const [interestRate, setInterestRate] = useState("14");
  const [loanPeriod, setLoanPeriod] = useState("30");
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
    if (isNaN(r) || r <= 0 || r > 30) {
      // Corrected max rate to 30% for consistency
      newErrors.interestRate = "Annual Return must be between 0.1% and 30%.";
      isValid = false;
    }
    if (isNaN(n) || n <= 0 || n > 50) {
      // Corrected max period to 50 years for consistency
      newErrors.loanPeriod = "Duration must be between 1 and 50 years.";
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
      setMonthlyResult({ emi: 0, total: 0, interest: 0 });
      setYearlyResult({ emi: 0, total: 0, interest: 0 });
    }
  }, [loanAmount, interestRate, loanPeriod, frequency]);

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

  const handleRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 30 && Number(value) >= 0)) {
      setInterestRate(value);
      setErrors((prev) => ({ ...prev, interestRate: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        interestRate: "Annual Return must be between 0.1% and 30%.",
      }));
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
      setLoanPeriod(value);
      setErrors((prev) => ({ ...prev, loanPeriod: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        loanPeriod: "Loan tenure between 1 and 50 years.",
      }));
    }
  };
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const emiFaqs = [
    {
      q: "Q1: What exactly is EMI?",
      a: "A1: EMI stands for Equated Monthly Installment. It is a fixed payment amount that you pay to your lender every month on a specific date, covering both the principal amount of your loan and the interest accrued on the outstanding balance. The EMI amount remains constant throughout the loan tenure.",
    },
    {
      q: "Q2: How is EMI calculated?",
      a: "A2: The most common formula for calculating EMI is:\n\n$EMI = [P \\times R \\times (1+R)^N] / [(1+R)^N-1]$\n\nWhere:\n* P = Principal Loan Amount\n* R = Monthly Interest Rate (Annual Rate / 12 / 100)\n* N = Loan Tenure in Months\n\nThe UniCX EMI Calculator does this complex calculation instantly for you!",
    },
    {
      q: "Q3: Does my EMI change if the interest rate changes?",
      a: "A3: If you have a loan with a **fixed interest rate**, your EMI will remain constant regardless of market fluctuations. However, if you have a loan with a **floating interest rate**, your EMI (or sometimes the tenure) will change whenever the benchmark interest rate to which your loan is linked is revised by the lender.",
    },
    {
      q: "Q4: Can I reduce my EMI during the loan tenure?",
      a: "A4: Yes, there are ways to potentially reduce your EMI:\n* **Partial Prepayments:** Making extra payments towards your principal loan amount can reduce the outstanding balance, leading to a lower future EMI or a shorter tenure.\n* **Refinancing/Balance Transfer:** You can transfer your outstanding loan to another lender offering a lower interest rate.\n* **Extension of Tenure:** Some lenders might allow you to extend your loan tenure, which will reduce your monthly EMI, though it will increase the total interest paid.",
    },
    {
      q: "Q5: What is an amortization schedule?",
      a: "A5: An amortization schedule is a table that shows the breakdown of each EMI payment throughout the loan tenure. It illustrates how much of each payment goes towards paying off the principal amount and how much goes towards paying interest. Initially, a larger portion is interest, gradually shifting to more principal as the loan matures.",
    },
    {
      q: "Q6: Is it better to take a longer or shorter loan tenure?",
      a: "A6:\n* **Longer Tenure:** Results in a **lower EMI**, making it more affordable monthly, but you end up paying **significantly more total interest** over the loan's lifetime.\n* **Shorter Tenure:** Results in a **higher EMI**, but you pay **much less total interest**, saving a considerable amount of money.\n\nThe best choice depends on your current financial capacity, income stability, and overall financial goals.",
    },
    {
      q: "Q7: What documents are typically needed for a loan application?",
      a: "A7: Common documents include: Identity Proof (Aadhaar, PAN, Passport, Driving License), Address Proof (Aadhaar, Passport, Utility Bills), Income Proof (Salary Slips, Bank Statements, ITR for self-employed), Employment Proof, and specific property/vehicle documents for secured loans.",
    },
    {
      q: "Q8: What is considered a good credit score for a loan in India?",
      a: "A8: In India, a CIBIL score (one of the main credit scores) generally ranges from 300 to 900. A score of **750 or above** is typically considered a very good credit score. It indicates a strong repayment history and financial discipline, making you a more attractive borrower and potentially qualifying you for lower interest rates and better loan terms.",
    },
  ];
  return (
    <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className=" container max-w-screen-xl mx-auto  3sm:px-10">
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            EMI Calculator
          </h1>
          <p className="mb-8">
            EMI stands for Equated Monthly Installment. It is a fixed payment
            amount that a borrower pays to a lender at a specified date each
            month. This monthly payment combines both the principal loan amount
            and the interest accrued on the outstanding loan balance. The EMI
            remains constant throughout the loan tenure, making it easy for
            borrowers to budget their finances. Whether it's a home loan, car
            loan, personal loan, or any other type of financing, EMIs are the
            standard method of repayment, ensuring a systematic and predictable
            way to clear your debt.
          </p>
        </section>
        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0 ">
          <div className="rounded-lg px-0 pr-6 py-0   pb-15 w-full max-w-[40rem] opacity-85">
        
              <div className="grid grid-cols-1 gap-y-5">
                {/* Loan Amount */}
                <div className="relative group">
                  <label
                    htmlFor="loanAmount"
                    className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                  >
                    Loan Amount (₹)
                  </label>
                  <div
                    className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${
                          errors.loanAmount
                            ? "border-borderColor shadow"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                  >
                    <label className="size-5 text-md font-normal text-gray-500">
                      ₹
                    </label>
                    <input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={handleAmountChange}
                      className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                      placeholder="e.g. 500000"
                      min="0"
                    />
                  </div>
                  {errors.loanAmount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.loanAmount}
                    </p>
                  )}
                </div>
                <div className="relative group">
                  <label
                    htmlFor="interestRate"
                    className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                  >
                    Annual Interest Rate (%)
                  </label>
                  <div
                    className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${
                          errors.interestRate
                            ? "border-borderColor shadow"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                  >
                    <input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={handleRateChange}
                      className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
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

                {/* Loan Tenure */}
                <div className="relative group">
                  <label
                    htmlFor="loanPeriod"
                    className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                  >
                    Loan Tenure (Years)
                  </label>
                  <div
                    className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                        ${
                          errors.loanPeriod
                            ? "border-borderColor shadow"
                            : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
                  >
                    <input
                      id="loanPeriod"
                      type="number"
                      value={loanPeriod}
                      onChange={handleYearChange}
                      className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                      placeholder="e.g. 5"
                      min="0"
                    />
                    <label className="text-md font-normal text-gray-500">
                      years
                    </label>
                  </div>
                  {errors.loanPeriod && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.loanPeriod}
                    </p>
                  )}
                </div>

                {/* Payment Frequency */}
                <div className="relative group">
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                  >
                    Payment Frequency
                  </label>
                  <div
                    className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
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
          
          </div>
          {/* Results Display */}
          <div className="rounded-lg px-6 py-6 shadow-boxShadow bg-white w-full ">
            <div className="">
              {/* Monthly EMI Results */}
              {(frequency === "monthly" || frequency === "both") && (
                <div className="">
                  <h3 className="text-primary mb-3 text-2xl font-extrabold text-center">
                    Monthly EMI
                  </h3>
                  <div className="flex  justify-between  py-3 border-b-2 border-gray-200">
                    <span className="text-gray-700 font-medium">EMI:</span>
                    <span className="text-green-700 font-semibold text-lg">
                      ₹{monthlyResult.emi.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between  py-3 border-b-2 border-gray-200 ">
                    <span className="text-gray-700 font-medium">
                      Total Interest:
                    </span>
                    <span className="text-green-700 font-semibold text-lg">
                      ₹{monthlyResult.interest.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between  py-3 ">
                    <span className="text-gray-700 font-medium">
                      Total Payment:
                    </span>
                    <span className="text-green-700 font-semibold text-lg">
                      ₹{monthlyResult.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}

              {/* Yearly EMI Results */}
              {(frequency === "yearly" || frequency === "both") && (
                <div className="bg-IntColor p-6 rounded-lg shadow-inner">
                  <h3 className="text-primary mb-3 text-2xl font-extrabold text-center">
                    Yearly EMI
                  </h3>
                  <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-700 font-medium">EMI:</span>
                    <span className="text-green-700 font-semibold text-lg">
                      ₹{yearlyResult.emi.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-700 font-medium">
                      Total Interest:
                    </span>
                    <span className="text-green-700 font-semibold text-lg">
                      ₹{yearlyResult.interest.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">
                      Total Payment:
                    </span>
                    <span className="text-green-700 font-semibold text-lg">
                      ₹{yearlyResult.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="mt-10">
          <div className="space-y-12 text-gray-800 text-[15px] leading-relaxed ">
            {/* What is EMI? Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-3">What is EMI?</h2>
              <p className="mb-4 text-gray-800 leading-relaxed">
                EMI stands for{" "}
                <strong className="text-blue-600">
                  Equated Monthly Installment
                </strong>
                . It is a fixed payment amount that a borrower pays to a lender
                at a specified date each month. This monthly payment combines
                both the principal loan amount and the interest accrued on the
                outstanding loan balance. The EMI remains constant throughout
                the loan tenure, making it easy for borrowers to budget their
                finances.
              </p>
              <p className="mb-4 text-gray-800 leading-relaxed">
                Whether it's a home loan, car loan, personal loan, or any other
                type of financing, EMIs are the standard method of repayment,
                ensuring a systematic and predictable way to clear your debt.
              </p>
            </section>

            {/* Why is an EMI Calculator Important? Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-3">
                Why is an EMI Calculator Important?
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="mb-4 text-gray-800 leading-relaxed">
                    An EMI calculator is an indispensable tool for anyone
                    planning to take a loan. Here's why it's so crucial:
                  </p>
                  <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <strong className="flex items-start">
                        <PieChart
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Financial Planning:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        It helps you determine your exact monthly outflow,
                        allowing you to budget effectively and avoid financial
                        strain.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <Calculator
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Loan Comparison:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Easily compare EMI amounts for different loan offers
                        (from various banks or for different loan products) by
                        inputting varying principal amounts, interest rates, and
                        tenures.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <TrendingUp
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Optimal Tenure & Rate Selection:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Experiment with different loan tenures and interest
                        rates to understand their direct impact on your monthly
                        EMI and the total interest you'll pay over the loan's
                        lifetime.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <Handshake
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Informed Decision-Making:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Armed with precise figures, you can make smarter choices
                        about how much you can comfortably borrow and for how
                        long.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-800 leading-relaxed">
                    The{" "}
                    <strong className="text-blue-600">
                      UniCX EMI Calculator
                    </strong>{" "}
                    simplifies the complex calculations involved in loan
                    repayments, giving you instant insights to manage your debt
                    responsibly and efficiently.
                  </p>
                </div>
                {/* Image for Why Important */}
                <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* <img
                src={emiBenefitsImage}
                alt="Illustration showing benefits of an EMI calculator: financial planning, budgeting, loan comparison"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain rounded"
                loading="lazy"
              /> */}
                </div>
              </div>
            </section>

            {/* How to Use the UniCX EMI Calculator Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                How to Use the UniCX EMI Calculator
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-800 text-[15px] leading-relaxed">
                    Our EMI calculator is designed for simplicity and accuracy,
                    providing you with immediate results:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed mt-4">
                    <li>
                      <strong>Enter Principal Loan Amount:</strong> Input the
                      total amount you wish to borrow (e.g., ₹5,00,000 for a car
                      loan, ₹50,00,000 for a home loan).
                    </li>
                    <li>
                      <strong>Enter Interest Rate (%):</strong> Provide the
                      annual interest rate offered by the lender (e.g., 7% for a
                      home loan, 10% for a personal loan).
                    </li>
                    <li>
                      <strong>Specify Loan Tenure:</strong> Choose the duration
                      of the loan in either "Years" or "Months."
                    </li>
                    <li>
                      <strong>Calculate:</strong> Click the "Calculate EMI"
                      button to get your results instantly.
                    </li>
                  </ol>
                  <h3 className="font-semibold text-xl mt-4 mb-2">
                    The UniCX EMI Calculator will then provide you with:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <strong>Monthly EMI Amount:</strong> The exact amount you
                      will need to pay each month.
                    </li>
                    <li>
                      <strong>Total Interest Payable:</strong> The total amount
                      of interest you will pay over the entire loan tenure.
                    </li>
                    <li>
                      <strong>Total Amount Payable:</strong> The sum of your
                      principal loan amount and the total interest payable.
                    </li>
                    <li>
                      <strong>Amortization Schedule:</strong> A detailed
                      breakdown showing how your principal and interest
                      components change with each EMI payment over the loan
                      tenure. This helps you visualize your loan's progress.
                    </li>
                  </ul>
                </div>
                {/* Image for How to Use */}
                <div className="flex justify-center items-center shadow rounded hover:shadow-md transition-shadow duration-300">
                  {/* <img
                src={emiPurposeImage}
                alt="Image showing the UniCX EMI calculator interface with input fields and calculated outputs"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain rounded"
                loading="lazy"
              /> */}
                </div>
              </div>
            </section>

            {/* Understanding EMI: Key Aspects of Loan Repayment Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                Understanding EMI: Key Aspects of Loan Repayment
              </h2>
              <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
                To effectively manage your loan, it's important to understand
                the core concepts behind EMI:
              </p>

              <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
                <Banknote
                  size={18}
                  className="mr-2 flex-shrink-0 text-green-600"
                />{" "}
                Components of EMI
              </h3>
              <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
                Every EMI payment consists of two parts:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Principal Component:</strong> This is the portion of
                  your payment that goes towards reducing your actual borrowed
                  amount.
                </li>
                <li>
                  <strong>Interest Component:</strong> This is the cost of
                  borrowing money, calculated on the outstanding principal
                  balance.
                </li>
              </ul>
              <p className="mt-2 text-gray-800 text-[15px] leading-relaxed">
                In the initial years of a loan, a larger portion of your EMI
                goes towards paying interest. As the loan progresses and the
                principal outstanding reduces, a larger portion of your EMI
                starts contributing to the principal repayment. This gradual
                shift is clearly illustrated in the amortization schedule.
              </p>
              {/* Image for Understanding EMI */}
              <div className="flex justify-center items-center mt-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* <img
              src={emiUnderstandingImage}
              alt="Diagram illustrating the breakdown of EMI into principal and interest components over time"
              className="w-full h-auto max-h-[300px] object-contain rounded"
              loading="lazy"
            /> */}
              </div>

              <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
                <Calculator
                  size={18}
                  className="mr-2 flex-shrink-0 text-purple-600"
                />{" "}
                Factors Affecting EMI
              </h3>
              <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
                Three primary factors directly influence your EMI:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Principal Loan Amount:</strong> A higher loan amount
                  will naturally result in a higher EMI, assuming other factors
                  remain constant.
                </li>
                <li>
                  <strong>Interest Rate:</strong> The interest rate is a
                  critical factor. Even a small change in the interest rate can
                  significantly impact your EMI and the total interest paid.
                  Higher interest rates lead to higher EMIs.
                </li>
                <li>
                  <strong>Loan Tenure (Duration):</strong> This is the period
                  over which you choose to repay the loan.
                  <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                    <li>
                      <strong>Longer Tenure:</strong> Leads to a lower EMI but
                      results in a higher total interest paid over the loan's
                      lifetime.
                    </li>
                    <li>
                      <strong>Shorter Tenure:</strong> Results in a higher EMI
                      but significantly reduces the total interest paid.
                    </li>
                  </ul>
                </li>
              </ul>

              <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
                <FileText
                  size={18}
                  className="mr-2 flex-shrink-0 text-cyan-600"
                />{" "}
                Types of Loans (Repaid via EMI)
              </h3>
              <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
                EMIs are the most common repayment method for various types of
                loans:
              </p>
              <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong className="flex items-start">
                    <Landmark
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Home Loans:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Long-term loans used to purchase or construct a house.
                    Typically have lower interest rates and longer tenures.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <Car
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Car Loans:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Loans for purchasing new or used vehicles. Usually have
                    moderate interest rates and tenures.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <HeartHandshake
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Personal Loans:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Unsecured loans for various personal needs. Generally have
                    higher interest rates and shorter tenures.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <School
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Education Loans:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Loans to finance higher education. Often come with flexible
                    repayment options and tax benefits.
                  </span>
                </li>
                <li>
                  <strong className="flex items-start">
                    <Banknote
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Other Loans:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Includes consumer durable loans, business loans, etc.
                  </span>
                </li>
              </ul>
            </section>

            {/* Who Can Benefit from the UniCX EMI Calculator? */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                Who Can Benefit from the UniCX EMI Calculator?
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-800 text-[15px] leading-relaxed">
                    The UniCX EMI Calculator is an indispensable tool for a wide
                    range of individuals and businesses:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <strong>Prospective Borrowers:</strong> Anyone considering
                      taking out a new loan can pre-calculate their potential
                      EMIs and total repayment costs.
                    </li>
                    <li>
                      <strong>Existing Loan Holders:</strong> To understand
                      their current loan's amortization schedule, or to evaluate
                      the impact of prepayments or refinancing.
                    </li>
                    <li>
                      <strong>Financial Planners & Advisors:</strong> To quickly
                      illustrate loan scenarios for their clients and help them
                      make informed borrowing decisions.
                    </li>
                    <li>
                      <strong>Budget-Conscious Individuals:</strong> To ensure
                      that potential loan repayments fit comfortably within
                      their monthly budget.
                    </li>
                  </ul>
                </div>
                {/* Image for Who Can Benefit */}
                <div className="flex justify-center items-center shadow rounded hover:shadow-md transition-shadow duration-300">
                  {/* <img
                    src={emiWhoCanBenefitImage}
                    alt="Image showing diverse individuals benefiting from using an EMI calculator for loan planning"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain rounded"
                    loading="lazy"
                /> */}
                </div>
              </div>
            </section>

            {/* Key Considerations & Important Notes Before Taking a Loan */}
            <section className="mt-10">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
                <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center">
                  <Lightbulb size={20} className="mr-3 mt-1 flex-shrink-0" />
                  Key Considerations & Important Notes Before Taking a Loan
                </h2>
                <p className="text-blue-800 text-[15px] leading-relaxed mb-4">
                  While an EMI calculator provides clarity on your monthly
                  payments, remember to consider these broader factors before
                  committing to a loan:
                </p>
                {/* Image for Important Considerations (If available) */}
                <div className="flex justify-center items-center">
                  {/* <img
                  src={emiConsiderationsImage}
                  alt="Icons representing loan considerations like fees, interest rates, credit score, and eligibility"
                  className="w-auto h-16 mx-auto my-4 rounded"
                  loading="lazy"
              /> */}
                </div>
                <ul className="list-none space-y-2 text-blue-700 text-[15px] leading-relaxed">
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Processing Fees & Other Charges:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Beyond the interest rate, loans often involve processing
                      fees, legal fees, technical valuation fees, stamp duty,
                      etc. Factor these into your overall loan cost.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Prepayment & Foreclosure Rules:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Understand if your lender allows partial prepayments or
                      full foreclosure, and if any penalties apply. Prepaying
                      can significantly reduce your total interest burden.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Floating vs. Fixed Interest Rates:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Decide whether a stable EMI (fixed) or one that fluctuates
                      with market rates (floating) suits your risk profile.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Credit Score:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Your credit score (CIBIL score in India) significantly
                      impacts the interest rate you'll be offered. A higher
                      score generally qualifies you for lower rates.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Debt-to-Income (DTI) Ratio & Eligibility:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Lenders assess your DTI and specific eligibility criteria
                      (age, income, employment stability).
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Emergency Fund:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Ensure you have an adequate emergency fund even after
                      taking a loan, to handle unforeseen financial disruptions
                      without defaulting on EMIs.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3 flex items-center">
                <HelpCircle size={20} className="mr-2 flex-shrink-0" />
                Frequently Asked Questions (FAQs) about EMI
              </h2>
              <div className="space-y-2">
                {emiFaqs.map((faq, i) => (
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
                    >
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section className="pt-6 border-t mt-10">
              <p className="text-sm text-gray-500 leading-relaxed">
                The UniCX EMI Calculator is an indispensable tool for anyone
                navigating the world of loans. It provides clarity, helps with
                budgeting, and empowers you to make informed decisions about
                your financial commitments.
                <br />
                <br />
                This EMI Calculator and the information provided are developed
                and maintained by{" "}
                <strong>
                  UniCX (UniconsultX Solutions Private Limited)
                </strong>{" "}
                to help users understand EMI calculations. While we strive for
                accuracy, the information is for illustrative purposes only and
                should not be considered financial advice. For personalized
                financial advice or specific loan product details, always
                consult with a qualified financial advisor or your lender.
              </p>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
}

export default EmiCalculator;
