import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { ChevronDown, ChevronUp, AlertCircle, FileText, CheckCircle, MapPin, Users } from 'lucide-react'; // Added AlertCircle, FileText, CheckCircle, MapPin, Users icons
const HraCalculator = () => {
  const [basic, setBasic] = useState("600000");
  const [da, setDa] = useState("998");
  const [hra, setHra] = useState("240000");
  const [rent, setRent] = useState("180000");
  const [isMetro, setIsMetro] = useState(false);
 const [error, setError] = useState("");
 const [errorDa, setErrorDa] = useState("");
 const [errorHra, setErrorHra] = useState("");
 const [errorRent, setErrorRent] = useState("");
  const basicNum = parseFloat(basic) || 0;
  const daNum = parseFloat(da) || 0;
  const hraNum = parseFloat(hra) || 0;
  const rentNum = parseFloat(rent) || 0;

  const salary = basicNum + daNum;

  const actualHRAReceived = hraNum;
  const percentOfSalary = isMetro ? 0.5 : 0.4;
  const percentOfBasic = percentOfSalary * basicNum;
  const rentExcess = rentNum - 0.1 * salary;
  const rentPaidExcess = rentExcess > 0 ? rentExcess : 0;

  const hraExempt = Math.min(actualHRAReceived, percentOfBasic, rentPaidExcess);
  const hraTaxable = actualHRAReceived - hraExempt;
 const handleCostChange = (e) => {
    const value = e.target.value;

    // Allow empty string (user clearing input)
    if (value === "") {
      setBasic("");
      setError("");
      return;
    }

    // Ensure it's a number
    if (!/^\d+$/.test(value)) {
      setError("Only numbers are allowed");
      return;
    }

    // Check for 15 digit limit
    if (value.length > 15 ) {
      setError("Value must be between 1000 and 100000000");
      return;
    }

    setBasic(value);
    setError("");
  };
   const handleDaChange = (e) => {
    const value = e.target.value;

    // Allow empty string (user clearing input)
    if (value === "") {
      setBasic("");
      setErrorDa("");
      return;
    }

    // Ensure it's a number
    if (!/^\d+$/.test(value)) {
      setErrorDa("Only numbers are allowed");
      return;
    }

    // Check for 15 digit limit
    if (value.length > 15) {
      setErrorDa("Value must be between 1000 and 100000000");
      return;
    }

    setDa(value);
    setErrorDa("");
  };
   const handleHraChange = (e) => {
    const value = e.target.value;

    
    if (value === "") {
      setBasic("");
      setErrorHra("");
      return;
    }

    if (!/^\d+$/.test(value)) {
      setErrorHra("Only numbers are allowed");
      return;
    }


    if (value.length > 15 ) {
      setErrorHra("Value must be between 1000 and 100000000");
      return;
    }

    setHra(value);
    setErrorHra("");
  };
   const handleRentChange = (e) => {
    const value = e.target.value;

  
    if (value === "") {
      setBasic("");
      setErrorRent("");
      return;
    }

 
    if (!/^\d+$/.test(value)) {
      setErrorRent("Only numbers are allowed");
      return;
    }

   
    if (value.length > 15) {
      setErrorRent("Value must be between 1000 and 100000000");
      return;
    }

    setRent(value);
    setErrorRent("");
  };

    const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: "Can I claim HRA if I live with my parents?",
      a: "Yes, you can, provided you genuinely pay rent to your parents, and they declare this as rental income in their tax returns. Ensure you have proper rent receipts to avoid issues."
    },
    {
      q: "Do I need my landlord's PAN for HRA exemption?",
      a: "Yes, if your annual rent payment exceeds ₹1,00,000 (Rupees One Lakh), you must provide your landlord's PAN to your employer. If the landlord does not have a PAN, a declaration to that effect is required."
    },
    {
      q: "What if I move to a new city during the financial year?",
      a: "Your HRA exemption will be calculated proportionately for the period you paid rent in each type of city (metro/non-metro) and for the actual HRA received during those periods. The calculation considers the rent paid in each city."
    },
    {
      q: "Can both husband and wife claim HRA exemption for the same rented property?",
      a: "Only one person can claim the HRA exemption for the same property to avoid double deductions. If both are paying rent, they can claim HRA proportionally to their rent payment if it's genuinely split and documented, or one person can claim the full eligible amount."
    },
    {
      q: "What is Basic Salary + DA for HRA calculation?",
      a: "For HRA calculation, 'salary' typically includes your Basic Salary and Dearness Allowance (DA), but only if DA forms part of your retirement benefits. Other allowances or perquisites are generally excluded from this calculation."
    },
  ];
  return (
    <div className="container w-full h-full px-2 py-4 mx-auto ">
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[530px_1fr] 2xl:grid-cols-[640px_1fr] grid-cols-1  ">
        <div className="px-1 py-6 ">
          <h1 className="text-2xl font-bold ">HRA Calculator</h1>
          < p className="text-md text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            veniam beatae veritatis possimus nisi quaerat ad, omnis voluptas
            harum odit quod eveniet pariatur ex vel magni reprehenderit nobis
            minus dolore.
          </p>
        </div>
        <div className="bg-gray-200 h-full rounded-xl flex flex-col  ">
           <div className="bg-primary border rounded-t-2xl border-transparent p-5 relative">
                      <div className="flex justify-center items-center">
                        <div className="space-y-1 mt-3">
                          <p className="text-3xl tracking-wide font-semibold text-white">
                            HRA Calculator
                          </p>
                          <span className="text-gray-300 xl:text-md">
                            Simple, accurate Hra calculation
                          </span>
                        </div>
                       
                        <div className="absolute top-2 2sm:right-20 right-4 lg:right-10 xl:right-20 2xl:right-45 md:right-30 opacity-15 bg-gray-400 border border-transparent rounded-full w-25 h-27 flex items-center justify-center">
                           <FaRupeeSign size={60} className="text-white" />
                        </div>
                      </div>
                 </div>
        <div className=" flex-grow grid grid-cols-1 2sm:grid-cols-2  2sm:px-2 px-4 2sm:space-x-3 py-4 overflow-y-auto  ">
          <div className="mt-4 flex flex-col"> {/* flex-col to stack its children vertically */}
              <h1 className="text-lg font-semibold capitalize px-1 py-4 tracking-wide text-gray-700">Enter Details</h1>
          <div className=" bg-gray-50 rounded-xl p-6 shadow  ">
            <div className="mb-0">
              
                <div className="grid">
      <label className="py-3 px-0.5 text-gray-800 font-semibold">
        Basic salary received (₹)
      </label>

      <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
        ${error ? "border-red-500 shadow-red-300" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"}
      `}>
        <label className="size-5 text-md font-normal text-gray-500">₹</label>
        <input
          type="number"
          inputMode="numeric"
          value={basic}
          onChange={handleCostChange}
          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
          placeholder="0.00"
          min="0"
        />
      </div>
       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
                  <div className="grid">
      <label className="py-3.5 px-0.5 text-gray-800 font-semibold">
       Dearness Allowance received (₹)
      </label>

      <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
        ${errorDa ? "border-red-500 shadow-red-300" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"}
      `}>
        <label className="size-5 text-md font-normal text-gray-500">₹</label>
        <input
          type="number"
          inputMode="numeric"
          value={da}
          onChange={handleDaChange}
          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
          placeholder="0.00"
          min="0"
        />
      </div>
    </div>

                 <div className="grid">
      <label className="py-3.5 px-0.5 text-gray-800 font-semibold">
      HRA received (₹)
      </label>

      <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
        ${errorHra ? "border-red-500 shadow-red-300" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"}
      `}>
        <label className="size-5 text-md font-normal text-gray-500">₹</label>
        <input
          type="number"
          inputMode="numeric"
          value={hra}
          onChange={handleHraChange}
          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
          placeholder="0.00"
          min="0"
        />
      </div>
      {errorHra && <p className="text-red-500 text-sm mt-1">{errorHra}</p>}
    </div>

                        <div className="grid">
      <label className="py-3.5 px-0.5 text-gray-800 font-semibold">
      Total Rent paid (₹)
      </label>

      <div className={`flex items-center w-full max-w-xl border rounded-xl px-2 py-1
       ${errorRent ? "border-red-500 shadow-red-300" : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"}
      `}>
        <label className="size-5 text-md font-normal text-gray-500">₹</label>
        <input
          type="number"
          inputMode="numeric"
          value={rent}
          onChange={handleRentChange}
          className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
          placeholder="0.00"
          min="0"
        />
      </div>
      {errorRent && <p className="text-red-500 text-sm mt-1">{errorRent}</p>}
    </div>

              <p className="mt-3 font-semibold text-gray-800 ">
                Do you live in Delhi, Mumbai, Kolkata or Chennai?
              </p>
              <div className="flex gap-4 mt-2">
                <div>
                  <input
                    type="radio"
                    id="yes"
                    name="metro"
                    checked={isMetro}
                    onChange={() => setIsMetro(true)}
                  />
                  <label htmlFor="yes" className="ml-1 text-gray-800 font-semibold">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="no"
                    name="metro"
                    checked={!isMetro}
                    onChange={() => setIsMetro(false)}
                  />
                  <label htmlFor="no" className="ml-1 text-gray-800 font-semibold">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          </div>

<div className="mt-4 flex flex-col"> {/* flex-col to stack its children vertically */}
              <h1 className="text-lg font-semibold capitalize text-gray-700 px-2 py-4 tracking-wider">Results</h1>
          <div className="text-white rounded-lg px-5 py-6 bg-primary flex-grow flex flex-col justify-between ">
            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-700">Actual HRA received</p>
              <span className="text-md font-semibold text-green-800">₹{actualHRAReceived}</span>
            </div>

      

           
<div className="flex flex-col py-2 space-y-4">
   <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm mt-2">
              <p className="text-lg font-semibold text-gray-700">
                {isMetro ? "50%" : "40%"} of basic salary
              </p>
              <span className="text-md font-semibold text-green-800">₹{percentOfBasic.toFixed(2)}</span>
            </div>
            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-700">
                Rent Paid in excess of 10% of salary
              </p>
              <span className="text-md font-semibold text-green-800">₹{rentPaidExcess.toFixed(2)}</span>
            </div>

            {/* <hr className="my-4 pb-4 border-gray-500" /> */}

            <span className=" text-gray-300 block   text-md font-semibold ">
              The least of the above three is exempt from HRA
            </span>

            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-700">Amount of exempted HRA</p>
              <span className="text-md font-semibold text-green-800">₹{hraExempt.toFixed(2)}</span>
            </div>

            <div className="flex flex-col justify-between items-center bg-IntColor p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-700">HRA chargeable to Tax</p>
              <span className="text-md font-semibold text-green-800">₹{hraTaxable.toFixed(2)}</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
      </div>


       <div className="space-y-12 text-gray-800 text-[15px] leading-relaxed">

      {/* Intro - Expanded with Updates/Rules style */}
      <section className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold text-blue-700 mb-3 gap-2 flex items-center">
          <AlertCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
          HRA Tax Exemption: <strong>Important Updates & Rules You Need to Know!</strong>
        </h2>
        <p className="text-blue-800 mb-4">
          Understanding the <strong>House Rent Allowance (HRA)</strong> rules is crucial for salaried individuals looking to minimize their income tax liability. Stay informed about these key regulations to accurately claim your HRA exemption and ensure compliance.
        </p>
        <ul className="list-inside space-y-8 text-blue-700">
          <li>
            <strong className="flex items-start">
              <FileText size={18} className="mr-2 mt-1 flex-shrink-0" />
              Mandatory Landlord PAN for High Rent:
            </strong>
            <span className="block ml-6 -mt-1">
              If your annual rent payment exceeds <strong>₹1,00,000 (Rupees One Lakh)</strong>, it is mandatory to furnish your landlord's PAN details to your employer. Ensure you obtain this to claim your full HRA benefit.
            </span>
          </li>
          <li>
            <strong className="flex items-start">
              <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
              Retain Rent Receipts as Proof:
            </strong>
            <span className="block ml-6 -mt-1">
              Always collect and retain <strong>proper rent receipts</strong> for the rent paid. These documents are essential evidence for your HRA claim and may be required during tax assessments.
            </span>
          </li>
          <li>
            <strong className="flex items-start">
              <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
              Metro vs. Non-Metro City Definition:
            </strong>
            <span className="block ml-6 -mt-1">
              The percentage of HRA exemption depends on your city of residence. <strong>Metro cities</strong> are defined as Delhi, Mumbai, Kolkata, and Chennai (50% exemption), while all other cities fall under the <strong>non-metro</strong> category (40% exemption). Confirm your city status for accurate calculation.
            </span>
          </li>
          <li>
            <strong className="flex items-start">
              <Users size={18} className="mr-2 mt-1 flex-shrink-0" />
              Claiming HRA for Rent Paid to Parents:
            </strong>
            <span className="block ml-6 -mt-1">
              You can claim HRA exemption even if you pay rent to your parents, provided the transaction is genuine. Your parents must declare this rent as income in their tax returns. Ensure all documentation is clear and verifiable.
            </span>
          </li>
        </ul>
        <p className="text-blue-800 mt-4 font-semibold">
          Our UniCX HRA Calculator is here to help you navigate these rules and accurately calculate your tax exemption.
        </p>
      </section>

      {/* Placeholder for the HRA Calculator Component */}
      <section className="hra-calculator-section p-6 bg-white rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculate Your HRA Exemption</h2>
        <p className="text-gray-700 mb-6">
          <em>(Your actual HRA Calculator component with input fields and results will be displayed here.)</em>
        </p>
        {/* Placeholder example for your calculator, replace this with your actual component */}
      </section>

      {/* What is House Rent Allowance (HRA)? - Standard section style */}
      <section>
        <h2 className="text-2xl font-bold mb-3">What is House Rent Allowance (HRA)?</h2>
        <p className="mb-4">
          <strong>House Rent Allowance (HRA)</strong> is a special allowance provided by employers to their employees to help cover the cost of rented accommodation. It is a part of a salaried individual's compensation package and is specifically designed to provide tax relief on the housing expenses incurred by the employee.
        </p>
        <p>
          While HRA is a part of your salary, it is not fully taxable; a certain portion of it can be claimed as an exemption under <strong>Section 10(13A)</strong> of the Income Tax Act, 1961, provided certain conditions are met. This makes HRA a crucial component for effective tax planning for those living in rented homes.
        </p>
      </section>

      {/* Key Benefits & Tax Exemption Rules of HRA - NOW MATCHING NPS CARD STYLE */}
      <section className=""> {/* No direct background or border on the section */}
        <h2 className="text-2xl font-bold mb-3">Key Benefits & Tax Exemption Rules of HRA</h2>
        <p className="mb-4">
          The primary benefit of HRA is its potential for tax exemption, which directly reduces your taxable income. The amount of HRA that is exempt from tax is the <strong>least of the following three amounts</strong>:
        </p>
        <div className="space-y-4"> {/* Container for individual cards */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">Actual HRA Received:</h3>
            <p className="text-sm text-gray-600">The full House Rent Allowance amount that your employer pays to you.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">Rent Paid Minus 10% of Basic Salary + DA:</h3>
            <p className="text-sm text-gray-600">The actual rent you pay for your accommodation, reduced by 10% of your Basic Salary plus Dearness Allowance (if it forms part of your retirement benefits).</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">Percentage of Basic Salary + DA Based on City:</h3>
            <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600">
              <li><strong>50% of Basic Salary + DA</strong> if you live in a <strong>metro city</strong> (Delhi, Mumbai, Kolkata, Chennai).</li>
              <li><strong>40% of Basic Salary + DA</strong> if you live in any <strong>non-metro city</strong>.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-700 font-medium">
          <strong>Note:</strong> For HRA calculation purposes, 'salary' typically includes Basic Salary and Dearness Allowance (DA), only if DA is part of your retirement benefits. It generally excludes other allowances and perquisites.
        </p>
        <p className="mt-4 text-gray-800 font-semibold">
          <strong>Eligibility for HRA Exemption:</strong> You must be a salaried individual, actively paying rent for accommodation, and not own a house in the city for which the HRA is claimed.
        </p>
      </section>

      {/* How to Use the UniCX Free Online HRA Calculator - With a simpler list style, no grid with image */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">How to Use the UniCX Free Online HRA Calculator</h2>
        <p className="mb-4">
          Our UniCX HRA Calculator makes determining your tax-exempt HRA simple and quick. Just follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>
            <strong>Basic Salary (Monthly ₹):</strong> Input your monthly basic salary as per your payslip.
          </li>
          <li>
            <strong>Dearness Allowance (DA) (Monthly ₹):</strong> Enter your monthly Dearness Allowance if it is considered for retirement benefits. If not applicable, you can enter '0'.
          </li>
          <li>
            <strong>HRA Received (Monthly ₹):</strong> Provide the actual monthly House Rent Allowance you receive from your employer.
          </li>
          <li>
            <strong>Actual Rent Paid (Monthly ₹):</strong> Fill in the actual monthly rent you pay for your accommodation.
          </li>
          <li>
            <strong>City Type:</strong> Select whether your residence is in a 'Metro City' (Delhi, Mumbai, Kolkata, Chennai) or a 'Non-Metro City'. This selection impacts the tax exemption calculation.
          </li>
          <li>
            <strong>View Your Results:</strong> The calculator will instantly display your "Exempt HRA Amount" and "Taxable HRA Amount."
          </li>
        </ol>
      </section>

      {/* Understanding Your HRA Calculator Results - Standard section with example box */}
      <section className=''>
        <h2 className="text-2xl font-bold mb-3">Understanding Your HRA Calculator Results</h2>
        <p className="mb-4">
          Once you input your details, our calculator provides a clear breakdown of your HRA benefits:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>
            <strong>Exempt HRA Amount:</strong> This is the portion of your HRA that is <strong>completely free from income tax</strong>. This amount will reduce your gross taxable income, leading to direct tax savings.
          </li>
          <li>
            <strong>Taxable HRA Amount:</strong> This is the remaining portion of your HRA (Actual HRA Received - Exempt HRA Amount) that will be <strong>added to your taxable income</strong>. This portion will be taxed as per your applicable income tax slab.
          </li>
        </ul>

        <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded shadow-sm mt-6">
          <p className="text-gray-700 mb-2">
            📊 <strong>Example Calculation:</strong>
          </p>
          <p className="text-blue-700 font-semibold">
            Basic Salary + DA: <strong>₹50,000</strong>
          </p>
          <p className="text-blue-700 font-semibold">
            HRA Received: <strong>₹20,000</strong>
          </p>
          <p className="text-blue-700 font-semibold">
            Actual Rent Paid: <strong>₹18,000</strong>
          </p>
          <p className="text-blue-700 font-semibold">
            City Type: <strong>Metro</strong>
          </p>
          <p className="text-blue-800 font-bold text-lg mt-2">
            Estimated Exempt HRA: <strong>₹13,000</strong> (approx.)
          </p>
          <p className="text-blue-800 font-bold text-lg">
            Estimated Taxable HRA: <strong>₹7,000</strong> (approx.)
          </p>
        </div>
      </section>

      {/* Important HRA Rules & Considerations - Standard list style with varied headers */}
      <section className="">
        <h2 className="text-2xl font-bold mb-3">Important HRA Rules & Considerations</h2>
        <p className="mb-4">
          To ensure you can successfully claim HRA exemption, keep the following rules and considerations in mind:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-lg">Proof of Rent Payment:</strong> It is mandatory to keep proper rent receipts or bank statements showing rent transfers. Your employer will typically ask for these proofs.
          </li>
          <li>
            <strong className="text-lg">Rent Agreement:</strong> A valid rent agreement is crucial, especially for higher rent amounts, as it serves as primary proof of your rental obligation.
          </li>
          <li>
            <strong className="text-lg">Landlord's PAN Details:</strong> If your annual rent payment exceeds <strong>₹1,00,000 (Rupees One Lakh)</strong>, you must furnish the PAN of your landlord to your employer. A declaration is required if the landlord does not have a PAN.
          </li>
          <li>
            <strong className="text-lg">Living in Your Own House:</strong> You cannot claim HRA exemption if you live in a house that you own in the same city for which you are claiming HRA.
          </li>
          <li>
            <strong className="text-lg">Paying Rent to Parents:</strong> You can pay rent to your parents and claim HRA exemption, provided the transaction is genuine, and your parents declare the rental income in their tax returns.
          </li>
          <li>
            <strong className="text-lg">No HRA in Salary (Section 80GG):</strong> If you are a salaried individual but do not receive HRA as part of your salary, or if you are a self-employed professional paying rent, you can still claim a deduction for rent paid under <strong>Section 80GG</strong> of the Income Tax Act.
          </li>
          <li>
            <strong className="text-lg">Metro vs. Non-Metro Cities:</strong> For HRA purposes, metro cities generally include <strong>Delhi, Mumbai, Kolkata, and Chennai</strong>. All other cities fall under the <strong>'non-metro'</strong> category.
          </li>
        </ul>
      </section>

      {/* Advantages of Using the UniCX HRA Calculator - NOW MATCHING NPS CARD STYLE */}
      <section className=""> {/* No direct background or border on the section */}
        <h2 className="text-2xl font-bold mb-3">Advantages of Using the UniCX HRA Calculator</h2>
        <p className="mb-4">
          Leveraging our <strong>free online HRA calculator</strong> offers significant benefits for accurate tax planning:
        </p>
        <div className="space-y-4"> {/* Container for individual cards */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">Accurate Exemption Calculation:</h3>
            <p className="text-sm text-gray-600">Instantly determine the precise tax-exempt portion of your HRA, avoiding manual errors.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">Simplify Complex Rules:</h3>
            <p className="text-sm text-gray-600">Our calculator handles the "least of three" rule, making complex tax provisions easy to understand.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">Efficient Tax Planning:</h3>
            <p className="text-sm text-gray-600">Get clear insights into how HRA impacts your taxable income, aiding in better financial decisions.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">Time-Saving:</h3>
            <p className="text-sm text-gray-600">Quickly get results without needing to manually apply percentages and deductions.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-semibold text-lg text-blue-800">User-Friendly Interface:</h3>
            <p className="text-sm text-gray-600">Designed for ease of use, even for individuals without in-depth tax knowledge.</p>
          </div>
        </div>
      </section>

      {/* Tip box - Standard yellow theme */}
      <section className="">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
          <p className="text-sm text-yellow-700">
            <strong>UniCX Tip:</strong> Always retain all your rent receipts and rent agreement copies. These are crucial documents for claiming HRA exemption and may be required by your employer or during income tax assessment. For rent paid in cash, ensure the receipts are duly signed by the landlord.
          </p>
        </div>
      </section>

      {/* UniCX Expert Support & Resources - Consistent styling */}
      <section id="contact" className="">
        <h2 className="2xl font-bold mb-3">
          Beyond Calculations: UniCX - Your Partner in Tax & Financial Planning
        </h2>
        <p className="mb-4">
          At <strong>UniconsultX Solutions Private Limited (UniCX)</strong>, our
          commitment extends beyond providing a powerful HRA calculator. We
          understand that navigating the complexities of income tax and financial planning requires comprehensive support. That's
          why we offer <strong>comprehensive support and resources</strong> to
          help you optimize your finances.
        </p>
        <h3 className="font-semibold text-xl mt-4 mb-2">
          Our Expert Financial Services Include:
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Income Tax Filing Assistance:</strong> Expert help with accurate and timely filing of your income tax returns.
          </li>
          <li>
            <strong>Tax Planning & Optimization:</strong> Personalized strategies to maximize your tax savings through various deductions and exemptions (including HRA, 80C, etc.).
          </li>
          <li>
            <strong>Investment Advisory:</strong> Guidance on suitable investment avenues to achieve your financial goals.
          </li>
          <li>
            <strong>Financial Consulting:</strong> Holistic financial planning to grow and protect your wealth.
          </li>
          <li>
            <strong>Compliance & Advisory:</strong> Keeping you updated on the latest tax laws and regulations.
          </li>
        </ul>
        <p className="mt-4">
          <strong>Optimize Your Savings with UniCX:</strong> We are dedicated to being your
          reliable source for all things tax and financial planning. Explore our website for more
          in-depth articles, common FAQs, and the latest updates. Partner with UniCX for peace of mind in your financial journey.
        </p>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
            Get Expert Tax Consultation
          </button>
        </div>
      </section>

      {/* FAQs - Interactive section, with consistent blue FAQ active background */}
      <section>
        <h2 className="text-2xl font-bold mb-3">
          Frequently Asked Questions (FAQs) about HRA
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`py-2 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
                openFAQ === i ? "bg-blue-50 rounded-lg" : ""
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

      {/* Footer note - Consistent styling */}
      <footer className="pt-6 border-t mt-6">
        <p className="text-sm text-gray-500">
          This HRA calculator and information is developed and maintained by{" "}
          <strong>UniCX (UniconsultX Solutions Private Limited)</strong> to help
          users simplify House Rent Allowance computations as per current
          Indian income tax laws. For complex tax situations or personalized advice,
          always consult with a qualified tax professional or{" "}
          <a href="#contact" className="text-blue-600 hover:underline">
            contact UniCX directly
          </a>
          .
        </p>
      </footer>
    </div>
      </div>
  );
};

export default HraCalculator;

