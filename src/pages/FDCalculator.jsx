import React, { useState, useEffect } from "react"; // Import useEffect
import { FaRupeeSign } from "react-icons/fa";
import {
  Calculator,
  DollarSign,
  PiggyBank,
  Scale,
  ShieldCheck,
  TrendingUp,
  FileText,
  Lightbulb,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Home,
  Car,
  HeartHandshake,
  School,
  Banknote,
  Users,
  Percent,
  CreditCard,
} from "lucide-react";
function FDCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("2");
  const [frequency, setFrequency] = useState("1");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const n = parseFloat(time);

    if (isNaN(P) || P < 100 || P > 100000000) {
      newErrors.principal = "Amount must be between ₹100 and ₹10,00,00,000.";
      isValid = false;
    }
    if (isNaN(r) || r <= 0 || r > 30) {
      newErrors.rate = "Annual Return must be between 0.1% and 30%.";
      isValid = false;
    }
    if (isNaN(n) || n <= 0 || n > 50) {
      newErrors.time = "Duration must be between 1 and 50 years.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const calculateFD = () => {
    if (!validateInputs()) {
      setResult(null);
      return;
    }
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const n = parseInt(frequency);
    const maturityAmount = P * Math.pow(1 + R / n, n * T);
    const interestEarned = maturityAmount - P;
    setResult({
      maturityAmount: maturityAmount.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      principal: P.toFixed(2),
    });
  };
  useEffect(() => {
    calculateFD();
  }, [principal, rate, time, frequency]);
  const formatNumber = (num) => {
    if (num === null || isNaN(num)) return "0.00";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setPrincipal(value);
      setErrors((prev) => ({ ...prev, principal: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        principal: "Amount must be between ₹100 and ₹10,00,00,000.",
      }));
    }
  };

  const handleRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 30 && Number(value) >= 0)) {
      setRate(value);
      setErrors((prev) => ({ ...prev, rate: "" }));
    } else {
      setErrors((prev) => ({ ...prev, rate: "Rate cannot exceed 30%" }));
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 50 && Number(value) >= 0)) {
      setTime(value);
      setErrors((prev) => ({ ...prev, time: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        time: "Loan tenure cannot exceed 50 years",
      }));
    }
  };
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const fdFaqs = [
    {
      q: "Q1: What is a Fixed Deposit (FD)?",
      a: "A1: A Fixed Deposit (FD) is a financial instrument where you deposit a lump sum amount with a bank or NBFC for a fixed period at a pre-determined interest rate. You receive the principal along with the accumulated interest at maturity, or interest is paid out periodically, depending on the type of FD.",
    },
    {
      q: "Q2: How is FD interest calculated?",
      a: "A2: FD interest is typically calculated using the compound interest formula, taking into account the principal, interest rate, tenure, and compounding frequency (monthly, quarterly, half-yearly, annually). The formula is:\n\n$A = P (1 + r/n)^{nt}$\n\nWhere:\n* A = Maturity Amount\n* P = Principal Investment\n* r = Annual Interest Rate (as a decimal)\n* n = Number of times interest is compounded per year\n* t = Tenure in years",
    },
    {
      q: "Q3: What is compounding frequency in FD?",
      a: "A3: Compounding frequency refers to how often the interest earned on your FD is added back to the principal amount. The more frequently interest is compounded (e.g., quarterly vs. annually), the more interest you earn on your interest, leading to a higher maturity amount due to the power of compounding.",
    },
    {
      q: "Q4: Is FD interest taxable in India?",
      a: "A4: Yes, the interest earned on Fixed Deposits is fully taxable in India. It is added to your 'Income from Other Sources' and taxed as per your applicable income tax slab rate.",
    },
    {
      q: "Q5: What is TDS on FD and how can I avoid it?",
      a: "A5: TDS (Tax Deducted at Source) is deducted by banks if your FD interest exceeds ₹40,000 in a financial year (₹50,000 for senior citizens). To avoid TDS if your total income is below the taxable limit, you can submit **Form 15G (for non-senior citizens/HUFs)** or **Form 15H (for senior citizens)** to the bank at the beginning of the financial year.",
    },
    {
      q: "Q6: Can I withdraw my FD before maturity?",
      a: "A6: Most FDs allow premature withdrawal. However, doing so usually incurs a penalty (e.g., a reduction of 0.50% to 1.00% in the applicable interest rate for the period held). Tax-saving FDs have a strict 5-year lock-in period and do not allow premature withdrawals.",
    },
    {
      q: "Q7: What is a tax-saving FD?",
      a: "A7: A tax-saving FD is a special type of Fixed Deposit with a mandatory 5-year lock-in period. Investments made in these FDs, up to ₹1.5 Lakh per financial year, are eligible for tax deduction under Section 80C of the Income Tax Act. The interest earned is still taxable.",
    },
    {
      q: "Q8: Are Fixed Deposits safe?",
      a: "A8: Yes, FDs are considered one of the safest investment options in India. Deposits in scheduled commercial banks are insured by the **DICGC (Deposit Insurance and Credit Guarantee Corporation)** up to ₹5 Lakh per depositor per bank (covering both principal and interest) in case of bank failure.",
    },
  ];
  return (
    <section className="px-6 md:px-20 py-10 bg-white w-full">
      <div className=" container max-w-screen-xl mx-auto  3sm:px-10 ">
        <section className="my-3">
          <h1 className="text-4xl font-medium text-gray-900 mb-5">
            Fixed Deposit Calculator
          </h1>
          <p className="mb-8">
            A Fixed Deposit (FD) is a popular and secure investment option
            offered by banks and Non-Banking Financial Companies (NBFCs) in
            India. It allows individuals to deposit a lump sum amount for a
            pre-determined period at a fixed rate of interest. Unlike a savings
            account, the money deposited in an FD cannot be withdrawn regularly
            and earns a higher interest rate, providing assured returns. FDs are
            a preferred choice for conservative investors due to their safety,
            guaranteed returns, and predictability, making them ideal for
            achieving specific financial goals over short to medium terms.
          </p>
        </section>
        <div className="grid 2md:grid-cols-2 grid-cols-1 gap-4 space-y-4 md:space-y-0 ">
            <div className="rounded-lg px-0 pr-6 py-0   pb-15 w-full max-w-[40rem] opacity-85">
                  <div className="grid grid-cols-1 gap-y-5">
                    <div className="relative group">
                      <label
                        htmlFor="principal"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Deposit Amount (₹):
                      </label>
                      <div
                        className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${
                                              errors.principal
                                                ? "border-borderColor shadow"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }
                                        }`}
                      >
                        <label className="size-5 text-md font-normal text-gray-500">
                          ₹
                        </label>
                        <input
                          type="number"
                          id="principal"
                          value={principal}
                          onChange={handleAmountChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          min="0"
                          placeholder="e.g., 100000"
                          aria-label="Deposit Amount"
                        />
                      </div>
                      {errors.principal && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.principal}
                        </p>
                      )}
                    </div>

                    {/* Input: Annual Interest Rate */}
                    <div className="relative group">
                      <label
                        htmlFor="rate"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Annual Interest Rate (%):
                      </label>
                      <div
                        className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                             ${
                                               errors.rate
                                                 ? "border-borderColor shadow"
                                                 : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                             }`}
                      >
                        <input
                          type="number"
                          id="rate"
                          value={rate}
                          onChange={handleRateChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          min="0"
                          step="0.01"
                          placeholder="e.g., 6.5"
                          aria-label="Annual Interest Rate"
                        />
                        <label className="size-5 text-md font-normal text-gray-500">
                          %
                        </label>
                      </div>
                      {errors.rate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.rate}
                        </p>
                      )}
                    </div>

                    {/* Input: Time Period */}
                    <div className="relative group">
                      <label
                        htmlFor="time"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Time Period (in years):
                      </label>
                      <div
                        className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
                                            ${
                                              errors.time
                                                ? "border-borderColor shadow"
                                                : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }
                                        }`}
                      >
                        <input
                          type="number"
                          id="time"
                          value={time}
                          onChange={handleYearChange}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          min="0"
                          placeholder="e.g., 5"
                          aria-label="Time Period in years"
                        />
                        <label className="text-md font-normal text-gray-500">
                          years
                        </label>
                      </div>
                      {errors.time && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.time}
                        </p>
                      )}
                    </div>

                    {/* Input: Compounding Frequency */}
                    <div className="relative group">
                      <label
                        htmlFor="frequency"
                        className="block text-sm font-semibold text-gray-800 px-0.5 py-3"
                      >
                        Compounding Frequency:
                      </label>
                      <div className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                        <select
                          id="frequency"
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                          aria-label="Compounding Frequency"
                        >
                          <option value="1">Yearly</option>
                          <option value="2">Half-Yearly</option>
                          <option value="4">Quarterly</option>
                          <option value="12">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="rounded-lg px-6 py-6  shadow-boxShadow bg-white w-full  ">
               
                <div className="mt-4">
                  {result && (
                    <div className="text-center">
                      <div className="space-y-4">
                        <div className="flex justify-between border-b-2 py-3 border-gray-300">
                          <span className=" text-gray-700">
                            Principal Amount:
                          </span>
                          <span className=" font-bold text-gray-700">
                            ₹ {formatNumber(result.principal)}
                          </span>
                        </div>
                        <div className="flex  justify-between  border-b-2 py-3 border-gray-300 ">
                          <span className=" text-gray-700">
                            Interest Earned:
                          </span>
                          <span className=" font-bold text-gray-700">
                            ₹ {formatNumber(result.interestEarned)}
                          </span>
                        </div>
                        <div className="flex  justify-between border-b-2 py-3 border-gray-300">
                          <span className=" text-gray-700">
                            Maturity Amount:
                          </span>
                          <span className=" font-bold text-gray-700">
                            ₹ {formatNumber(result.maturityAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 mt-20 text-center">
                    * This calculator provides an estimate. Actual returns may
                    vary based on bank policies, tax deductions, and specific
                    terms and conditions. Consult your bank for precise details.
                  </p>
                </div>
              </div>
            </div>
        <section className="mt-10 ">
          <div className="space-y-12 text-gray-800 text-[15px] leading-relaxed ">
            {/* What is a Fixed Deposit (FD)? Section */}
            <section className="">
              <h2 className="text-2xl font-bold mb-3">
                What is a Fixed Deposit (FD)?
              </h2>
              <p className="mb-4 text-gray-800 leading-relaxed">
                A{" "}
                <span className="font-bold text-blue-600">
                  Fixed Deposit (FD)
                </span>{" "}
                is a popular and secure investment option offered by banks and
                Non-Banking Financial Companies (NBFCs) in India. It allows
                individuals to deposit a lump sum amount for a pre-determined
                period at a fixed rate of interest. Unlike a savings account,
                the money deposited in an FD cannot be withdrawn regularly and
                earns a higher interest rate, providing assured returns.
              </p>
              <p className="mb-4 text-gray-800 leading-relaxed">
                FDs are a preferred choice for conservative investors due to
                their safety, guaranteed returns, and predictability, making
                them ideal for achieving specific financial goals over short to
                medium terms.
              </p>
            </section>

            {/* Why is an FD Calculator Important? Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-3">
                Why is an FD Calculator Important?
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="mb-4 text-gray-800 leading-relaxed">
                    An FD calculator is an essential tool for effective
                    financial planning and making informed investment decisions.
                    Here's why it's invaluable:
                  </p>
                  <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <span className="font-bold flex items-start">
                        <Calculator
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Project Maturity Value:
                      </span>
                      <span className="block ml-6 -mt-1">
                        Quickly determine the exact maturity amount you will
                        receive, including principal and compounded interest.
                      </span>
                    </li>
                    <li>
                      <span className="font-bold flex items-start">
                        <TrendingUp
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Compare Investment Scenarios:
                      </span>
                      <span className="block ml-6 -mt-1">
                        Experiment with different amounts, rates, and tenures to
                        compare offers and optimize your strategy.
                      </span>
                    </li>
                    <li>
                      <span className="font-bold flex items-start">
                        <Percent
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Understand Compounding Power:
                      </span>
                      <span className="block ml-6 -mt-1">
                        Visualize how different compounding frequencies can
                        enhance your earnings.
                      </span>
                    </li>
                    <li>
                      <span className="font-bold flex items-start">
                        <PiggyBank
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Goal-Oriented Planning:
                      </span>
                      <span className="block ml-6 -mt-1">
                        Helps determine the investment needed to reach specific
                        financial goals.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-800 leading-relaxed">
                    The{" "}
                    <span className="font-bold text-blue-600">
                      UniCX FD Calculator
                    </span>{" "}
                    provides transparent and instant calculations, empowering
                    you to optimize your Fixed Deposit investments for maximum
                    returns.
                  </p>
                </div>
                {/* Image for Why Important */}
                <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* <img
                src={fdBenefitsImage}
                alt="Illustration showing the benefits of using an FD calculator for financial planning and savings growth"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain rounded"
                loading="lazy"
              /> */}
                </div>
              </div>
            </section>

            {/* How to Use the UniCX FD Calculator Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                How to Use the UniCX FD Calculator
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-800 text-[15px] leading-relaxed">
                    Our FD calculator is designed for ease of use and provides
                    accurate results in moments:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed mt-4">
                    <li>
                      <span className="font-bold">
                        Enter Principal Investment Amount:
                      </span>{" "}
                      Input the lump sum amount you plan to deposit (e.g.,
                      ₹1,00,000 or ₹5,00,000).
                    </li>
                    <li>
                      <span className="font-bold">
                        Enter Annual Interest Rate (%):
                      </span>{" "}
                      Provide the annual interest rate offered by the bank/NBFC
                      (e.g., 6.5%, 7.0%).
                    </li>
                    <li>
                      <span className="font-bold">
                        Specify Investment Tenure:
                      </span>{" "}
                      Choose the duration of your Fixed Deposit in either
                      "Years" or "Months."
                    </li>
                    <li>
                      <span className="font-bold">
                        Select Compounding Frequency:
                      </span>{" "}
                      This is crucial for FDs. Choose how often the interest is
                      compounded:
                      <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                        <li>Monthly</li>
                        <li>Quarterly (most common for non-cumulative FDs)</li>
                        <li>Half-yearly</li>
                        <li>Annually (most common for cumulative FDs)</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold">Calculate:</span> Click the
                      "Calculate FD Maturity" button.
                    </li>
                  </ol>
                  <h3 className="font-semibold text-xl mt-4 mb-2">
                    The UniCX FD Calculator will instantly display:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <span className="font-bold">Maturity Amount:</span> The
                      total amount you will receive at the end of the tenure
                      (Principal + Total Interest).
                    </li>
                    <li>
                      <span className="font-bold">Total Interest Earned:</span>{" "}
                      The absolute amount of interest your investment has
                      generated.
                    </li>
                  </ul>
                </div>
                {/* Image for How to Use */}
                <div className="flex justify-center items-center shadow rounded hover:shadow-md transition-shadow duration-300">
                  {/* <img
                src={fdPurposeImage}
                alt="Image showing the UniCX FD calculator interface with inputs for principal, rate, tenure, and compounding frequency, and calculated outputs"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain rounded"
                loading="lazy"
              /> */}
                </div>
              </div>
            </section>

            {/* Understanding Fixed Deposits: Key Aspects of Your Investment Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                Understanding Fixed Deposits: Key Aspects of Your Investment
              </h2>
              <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
                To make the most of your Fixed Deposit, it's essential to grasp
                its various facets:
              </p>

              <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
                <CreditCard
                  size={18}
                  className="mr-2 flex-shrink-0 text-green-600"
                />{" "}
                Types of Fixed Deposits
              </h3>
              <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
                Banks and NBFCs offer several types of FDs to cater to diverse
                investor needs:
              </p>
              <ul className="list-none space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <span className="font-bold flex items-start">
                    <DollarSign
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Cumulative FD (Growth Option):
                  </span>
                  <span className="block ml-6 -mt-1">
                    Interest is reinvested, and principal plus compounded
                    interest is received at maturity.
                  </span>
                </li>
                <li>
                  <span className="font-bold flex items-start">
                    <Banknote
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Non-Cumulative FD (Payout Option):
                  </span>
                  <span className="block ml-6 -mt-1">
                    Interest is paid out periodically (monthly, quarterly, etc.)
                    to your savings account.
                  </span>
                </li>
                <li>
                  <span className="font-bold flex items-start">
                    <Scale
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Tax-Saving FD:
                  </span>
                  <span className="block ml-6 -mt-1">
                    Mandatory 5-year lock-in, qualifies for Section 80C
                    deduction.
                  </span>
                </li>
                <li>
                  <span className="font-bold flex items-start">
                    <Users
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Senior Citizen FD:
                  </span>
                  <span className="block ml-6 -mt-1">
                    Offers slightly higher interest rates to individuals aged 60
                    and above.
                  </span>
                </li>
                <li>
                  <span className="font-bold flex items-start">
                    <FileText
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Standard/Regular FD:
                  </span>
                  <span className="block ml-6 -mt-1">
                    The most common type, fixed rate for a fixed period.
                  </span>
                </li>
              </ul>

              <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
                <ShieldCheck
                  size={18}
                  className="mr-2 flex-shrink-0 text-purple-600"
                />{" "}
                Key Features of Fixed Deposits
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <span className="font-bold">Fixed Interest Rate:</span> The
                  rate is locked in for the entire tenure, offering
                  predictability.
                </li>
                <li>
                  <span className="font-bold">Compounding:</span> Interest is
                  added to the principal at regular intervals, earning "interest
                  on interest."
                </li>
                <li>
                  <span className="font-bold">Safety & Security:</span> Insured
                  by the <span className="font-bold">DICGC</span> up to{" "}
                  <span className="font-bold">₹5 Lakh</span> per depositor per
                  bank.
                </li>
                <li>
                  <span className="font-bold">Liquidity (with caveats):</span>{" "}
                  Allows premature withdrawal, usually with a penalty.
                  Tax-saving FDs have a strict lock-in.
                </li>
                <li>
                  <span className="font-bold">Loan Against FD:</span> Most banks
                  offer loans against your FD.
                </li>
                <li>
                  <span className="font-bold">Nomination Facility:</span>{" "}
                  Simplifies the claim process for beneficiaries.
                </li>
              </ul>
              {/* Image for Understanding FD */}
              <div className="flex justify-center items-center mt-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* <img
              src={fdUnderstandingImage}
              alt="Diagram illustrating Fixed Deposit features like compounding, safety, and fixed returns"
              className="w-full h-auto max-h-[300px] object-contain rounded"
              loading="lazy"
            /> */}
              </div>

              <h3 className="font-semibold text-xl mt-6 mb-2 flex items-center">
                <Percent
                  size={18}
                  className="mr-2 flex-shrink-0 text-orange-600"
                />{" "}
                Taxation of FD Interest
              </h3>
              <p className="mb-2 text-gray-800 text-[15px] leading-relaxed">
                It's crucial to understand the tax implications of FD interest:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <span className="font-bold">Taxable Income:</span> Interest
                  earned is fully taxable as "Income from Other Sources" and
                  taxed as per your applicable income tax slab.
                </li>
                <li>
                  <span className="font-bold">
                    TDS (Tax Deducted at Source):
                  </span>
                  <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                    <li>
                      Banks deduct TDS if interest exceeds{" "}
                      <span className="font-bold">₹40,000</span> for general
                      citizens, <span className="font-bold">₹50,000</span> for
                      senior citizens, in a financial year.
                    </li>
                    <li>
                      TDS rate is typically{" "}
                      <span className="font-bold">10%</span> with PAN,{" "}
                      <span className="font-bold">20%</span> without PAN.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">
                    Avoiding TDS (Form 15G / 15H):
                  </span>
                  <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                    <li>
                      Submit{" "}
                      <span className="font-bold">
                        Form 15G (for non-senior citizens/HUFs)
                      </span>{" "}
                      or{" "}
                      <span className="font-bold">
                        Form 15H (for senior citizens)
                      </span>{" "}
                      to the bank if your total taxable income is below the
                      exemption limit.
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* Who Can Benefit from the UniCX FD Calculator? */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                Who Can Benefit from the UniCX FD Calculator?
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-800 text-[15px] leading-relaxed">
                    The UniCX FD Calculator is a valuable resource for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <span className="font-bold">Conservative Investors:</span>{" "}
                      Prioritizing capital safety and guaranteed returns.
                    </li>
                    <li>
                      <span className="font-bold">
                        Retirees & Senior Citizens:
                      </span>{" "}
                      Planning for a steady, predictable income stream.
                    </li>
                    <li>
                      <span className="font-bold">
                        Short to Medium-Term Savers:
                      </span>{" "}
                      Individuals saving for specific goals like a down payment
                      or education fees.
                    </li>
                    <li>
                      <span className="font-bold">
                        Emergency Fund Builders:
                      </span>{" "}
                      Seeking slightly higher returns on emergency savings.
                    </li>
                    <li>
                      <span className="font-bold">Tax Planners:</span>{" "}
                      Understanding maturity values and anticipating taxable
                      interest.
                    </li>
                  </ul>
                </div>
                {/* Image for Who Can Benefit */}
                <div className="flex justify-center items-center shadow rounded hover:shadow-md transition-shadow duration-300">
                  {/* <img
                    src={fdWhoCanBenefitImage}
                    alt="Image showing diverse individuals benefiting from using an FD calculator for savings and financial planning"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain rounded"
                    loading="lazy"
                /> */}
                </div>
              </div>
            </section>

            {/* Key Considerations & Important Notes for FD Investors */}
            <section className="mt-10">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-md shadow-sm">
                <h2 className="text-2xl font-bold text-yellow-700 mb-3 flex items-center">
                  <Lightbulb size={20} className="mr-3 mt-1 flex-shrink-0" />
                  Key Considerations & Important Notes for FD Investors
                </h2>
                <p className="text-yellow-800 text-[15px] leading-relaxed mb-4">
                  While FDs offer stability, keep these points in mind:
                </p>
                {/* Image for Important Considerations (If available) */}
                <div className="flex justify-center items-center">
                  {/* <img
                  src={fdConsiderationsImage}
                  alt="Icons representing financial risks, taxation, and diversification for Fixed Deposit investments"
                  className="w-auto h-16 mx-auto my-4 rounded"
                  loading="lazy"
              /> */}
                </div>
                <ul className="list-none space-y-2 text-yellow-700 text-[15px] leading-relaxed">
                  <li>
                    <span className="font-bold flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Inflation Risk:
                    </span>
                    <span className="block ml-6 -mt-1">
                      FD returns might not always beat inflation after
                      accounting for taxes, potentially eroding purchasing
                      power.
                    </span>
                  </li>
                  <li>
                    <span className="font-bold flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Interest Rate Environment:
                    </span>
                    <span className="block ml-6 -mt-1">
                      Once invested, your FD rate is fixed, but general market
                      rates might rise later.
                    </span>
                  </li>
                  <li>
                    <span className="font-bold flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Liquidity Penalties:
                    </span>
                    <span className="block ml-6 -mt-1">
                      Be mindful of penalties for premature withdrawals.
                    </span>
                  </li>
                  <li>
                    <span className="font-bold flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Tax Burden:
                    </span>
                    <span className="block ml-6 -mt-1">
                      Always factor in the tax on interest income to calculate
                      your post-tax return.
                    </span>
                  </li>
                  <li>
                    <span className="font-bold flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Diversification:
                    </span>
                    <span className="block ml-6 -mt-1">
                      While safe, FDs should be part of a diversified investment
                      portfolio.
                    </span>
                  </li>
                  <li>
                    <span className="font-bold flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Bank Solvency:
                    </span>
                    <span className="block ml-6 -mt-1">
                      For amounts exceeding ₹5 Lakh, consider diversifying FDs
                      across different banks for maximum DICGC coverage.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-3 flex items-center">
                <HelpCircle size={20} className="mr-2 flex-shrink-0" />
                Frequently Asked Questions (FAQs) about Fixed Deposits
              </h2>
              <div className="space-y-2">
                {fdFaqs.map((faq, i) => (
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
                The UniCX FD Calculator is a powerful tool to help you
                understand, plan, and optimize your Fixed Deposit investments.
                It offers clarity on your potential earnings and assists in
                making financially sound decisions.
                <br />
                <br />
                This Fixed Deposit Calculator and the information provided are
                developed and maintained by{" "}
                <span className="font-bold">
                  UniCX (UniconsultX Solutions Private Limited)
                </span>{" "}
                to help users understand FD calculations. While we strive for
                accuracy, the information is for illustrative purposes only and
                should not be considered financial advice. For personalized
                financial advice or specific product details, always consult
                with a qualified financial advisor or your bank/NBFC.
              </p>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
}

export default FDCalculator;
