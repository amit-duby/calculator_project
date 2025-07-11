import React, { useEffect, useRef, useState } from "react";

import { IoCalendarOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa6";
import { Link } from "react-router-dom";
const  Header=()=> {
  const [show, setShow] = useState(true);
  const [isActive,setIsActive]=useState(false);
   const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div className='bg-white shadow w-full p-4 relative 'ref={dropdownRef}>
        <div
          className='flex px-3 items-center cursor-pointer'
          onClick={() => setShow((prev) => !prev)}
        >


          <p className="text-xl text-gray-600">Other</p>
          {show ? (
            <IoChevronDown size={24} className="mt-1 text-gray-600" />
          ) : (
            <IoChevronUp size={24} className="mt-1 text-gray-600" />
          )}
        </div>
      
      </div>  

      {show && (
        <>
        {/* <div className={`${show?'border-b-4 border-b-yellow-400 w-20 ml-4':''}`}></div> */}
        <div className="absolute top-17 bg-[#f7f7f7] right-0 left-0 bottom-0 w-full max-w-[700px] h-[70%] mx-5 rounded flex  p-4 justify-between  gap-2 ">
        <div className="flex">
  <div
    className={`flex items-center justify-between h-[52px] w-[260px] px-4 gap-2 cursor-pointer rounded  
      ${isActive ? 'border border-gray-400 bg-white hover:bg-white ' : ''} 
      `}
    onClick={() => setIsActive(true)}
  >
    <div className="flex items-center gap-2">
      <IoCalendarOutline size={17} className="text-gray-600" />
      <p className="text-md text-gray-800">Calculator</p>
    </div>
    <FaGreaterThan size={15} className="text-gray-500 ml-[30px]" />
  </div>
</div>
          <div className="bg-[#ffffff] max-w-[450px] w-full h-full py-3 px-3 overflow-y-auto ">
  <span className="text-xl font-bold text-gray-700 px-4 block">Calculator</span>
  <div className="border-b border-gray-200 ml-5 pt-3 w-60"></div>

  <ul className="mt-3 text-sm  px-2 space-y-1 text-gray-700">
    <li className="px-2 py-1 ">
      <Link to="/all" className="hover:text-blue-400 cursor-pointer">All Calculators</Link>
    </li>
    <li className="px-2 py-1 ">
      <Link to="/income" className="hover:text-blue-400 cursor-pointer">Income Tax Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/hra" className="hover:text-blue-400 cursor-pointer">HRA Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/gst" className="hover:text-blue-400 cursor-pointer">GST Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/emi" className="hover:text-blue-400 cursor-pointer">EMI Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/home" className="hover:text-blue-400 cursor-pointer">Home Loan EMI Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/salary" className="hover:text-blue-400 cursor-pointer">Salary Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/mutual" className="hover:text-blue-400 cursor-pointer">Mutual Fund Returns Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/retirement" className="hover:text-blue-400 cursor-pointer">Retirement Planning Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/epf" className="hover:text-blue-400 cursor-pointer">EPF Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/ppf" className="hover:text-blue-400 cursor-pointer">PPF Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/nps" className="hover:text-blue-400 cursor-pointer">NPS Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/gratuity" className="hover:text-blue-400 cursor-pointer">Gratuity Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/simple" className="hover:text-blue-400 cursor-pointer">Simple Compound Interest Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/fd" className="hover:text-blue-400 cursor-pointer">FD Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/lumpsum" className="hover:text-blue-400 cursor-pointer">Lumpsum Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/tds" className="hover:text-blue-400 cursor-pointer">TDS Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/rd" className="hover:text-blue-400 cursor-pointer">RD Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/sip" className="hover:text-blue-400 cursor-pointer">SIP Calculator</Link>
    </li>
    <li className="px-2 py-1">
      <Link to="/business" className="hover:text-blue-900 cursor-pointer">Business Setup Calculator</Link>
    </li>
  </ul>
</div>
</div>
</>
      )}
    </>
  );
}

export default Header;
