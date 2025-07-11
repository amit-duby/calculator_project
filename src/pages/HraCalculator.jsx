import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

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
      </div>
  );
};

export default HraCalculator;

