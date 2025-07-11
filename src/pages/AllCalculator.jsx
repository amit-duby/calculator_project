import React from "react";
// import Header from "../component/Header";
import { useNavigate } from "react-router-dom";

const AllCalculator=()=> {
  const navigate= useNavigate();
  return (
    <>
      {/* <Header /> */}
      <div className="bg-white py-10">
        <div className="md:text-center px-4">
          <h1 className="text-3xl font-semibold max-w-4xl mx-auto p-4">
            Calculators Consolidated. All in One Place
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl md:mx-auto px-4"style={{fontFamily:'Roboto,sans-serif'}}>
            Are you looking for an easy way to calculate your investment online?
            Get a clear picture of your financial future with just a few clicks.
            Check out now and start investing like a pro!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-6 mt-12 mx-40 ">
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-90 h-50 cursor-pointer"onClick={()=>navigate("/gst")}>
            <p className="text-2xl font-semibold mb-3">GST Calculator</p>
            <span className="text-md text-gray-600 "style={{fontFamily:'Roboto,sans-serif'}}>
              Effortlessly compute GST, ensuring compliance and saving time with
              accurate calculations for all products and services.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md  rounded-xl p-4 w-90 h-50 cursor-pointer"onClick={()=>navigate("/income")}>
            <p className="text-2xl font-semibold mb-3">ITR Calculator</p>
            <span className="text-md text-gray-600 ">
              A useful online tool for accurately computing income tax
              liability, deductions, and refunds based on the latest tax laws
              and regulations. It simplifies tax planning and compliance.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-90 h-50 cursor-pointer"onClick={()=>navigate("/epf")}>
            <p className="text-2xl font-semibold mb-3">EPF Calculator</p>
            <span className="text-md text-gray-600 ">
              Estimate your Employees' Provident Fund (EPF) contribution,
              interest, and balance effortlessly with the user-friendly EPF
              Calculator.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer "onClick={()=>navigate("/nps")}>
            <p className="text-2xl font-semibold mb-3">NPS Calculator</p>
            <span className="text-md text-gray-600 ">
              The National Pension Scheme (NPS) Calculator helps users calculate
              their retirement savings. Give it a try to see how much you could
              save!
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/hra")}>
            <p className="text-2xl font-semibold mb-3">HRA Calculator</p>
            <span className="text-md text-gray-600 ">
              HRA calculator is a tool that helps calculate House Rent Allowance
              (HRA) based on salary, rent paid, and location for income tax
              purposes.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer"onClick={()=>navigate("/sip")}>
            <p className="text-2xl font-semibold mb-3">SIP Calculator</p>
            <span className="text-md text-gray-600 ">
              SIP Calculator calculates the estimated returns on investments
              made through Systematic Investment Plans (SIPs) based on different
              parameters.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/gratuity")}>
            <p className="text-2xl font-semibold mb-3">Gratuity Calculator</p>
            <span className="text-md text-gray-600 ">
              Gratuity calculator helps determine the gratuity amount an
              employee is eligible for based on their years of service.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/retirement")}>
            <p className="text-2xl font-semibold mb-3">
              Retirement Calculator Now
            </p>
            <span className="text-md text-gray-600 ">
              Discover how much you need to save for retirement and start
              planning for your future with our easy-to-use Retirement
              Calculator.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/rd")}>
            <p className="text-2xl font-semibold mb-3">RD Calculator</p>
            <span className="text-md text-gray-600 ">
              Get a quick estimate of your recurring deposit earnings and plan
              for your financial future with our RD calculator now!
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/simple")}>
            <p className="text-2xl font-semibold mb-3">
              Simple Interest Calculator
            </p>
            <span className="text-md text-gray-600 ">
              Easily predict your money's future, compound interest calculator
              for your financial adventure.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/tds")}>
            <p className="text-2xl font-semibold mb-3">TDS Calculator</p>
            <span className="text-md text-gray-600 ">
              Stay tax-savvy with TDS calculator, predict your withholdings
              accurately. Don't let the taxman give you a headache, calculate
              with ease and be ahead.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/business")}>
            <p className="text-2xl font-semibold mb-3">
              Business Setup Calculator
            </p>
            <span className="text-md text-gray-600 ">
              Starting a business? Don't fret! Use the business setup calculator
              to estimate expenses, avoid surprises, and plan your budget for
              success.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/ppf")}>
            <p className="text-2xl font-semibold mb-3">PPF Calculator</p>
            <span className="text-md text-gray-600 ">
              PPF Calculator estimates maturity amount based on initial deposit,
              annual contributions, and prevailing interest rates. It aids in
              planning for long-term financial goals.
            </span>
          </div> 
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/mutual")}>
            <p className="text-2xl font-semibold mb-3">
              Mutual Fund Returns Calculator
            </p>
            <span className="text-md text-gray-600 ">
              Mutual Fund Returns Calculator forecasts potential returns based
              on investment amount, tenure, and expected returns. It assists in
              evaluating mutual fund investment strategies.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/emi")}>
            <p className="text-2xl font-semibold mb-3">Online EMI Calculator</p>
            <span className="text-md text-gray-600 ">
              Calculate your monthly EMI with our online tool. Get precise plans
              for loans. Enter the loan amount, interest rate, & tenure to get
              results
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/fd")}>
            <p className="text-2xl font-semibold mb-3">
              Online Fixed Deposit(FD) Calculator
            </p>
            <span className="text-md text-gray-600 ">
              Determine your FD returns with our Online Fixed Deposit
              Calculator. Enter your investment amount, tenure, and interest
              rate for results
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer" onClick={()=>navigate("/home")}>
            <p className="text-2xl font-semibold mb-3">
              Online Home EMI Calculator
            </p>
            <span className="text-md text-gray-600 ">
              Calculate your Home Loan EMI effortlessly with our online tool.
              Enter the loan amount, interest rate, and tenure to get the EMI
              outcomes.
            </span>
          </div>
          <div className="bg-white border border-gray-50 shadow hover:shadow-md   rounded-xl px-4 py-5 w-sm h-50 cursor-pointer"onClick={()=>navigate("/lumpsum")}>
            <p className="text-2xl font-semibold mb-3">Lump Sum Calculator</p>
            <span className="text-md text-gray-600 ">
              Determine the future value of a lump sum investment with ease.
              Enter the principal amount, interest rate, & tenure for accurate
              results
            </span>
          </div>
        </div>
        <div className="mt-5 px-4 mx-40 ">
          <p className="text-xl font-semibold px-1 py-2 max-w-3xl ">
            Introduction to Investment Calculators
          </p>
          <span className="text-md text-gray-700 max-w-2xl p-1 flex-1 flex-wrap"style={{fontFamily:'Roboto,sans-serif'}}>
            Investment calculators are indispensable tools that empower
            individuals to make informed financial decisions. By leveraging
            these calculators, users can assess potential returns, plan for
            future financial goals, and navigate the complexities of various
            investment options.
          </span>

         
       
        </div>
      </div>
    </>
  );
}

export default AllCalculator;
