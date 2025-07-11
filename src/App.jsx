import { Routes, Route } from 'react-router-dom';

import Header from './component/Header';
import AllCalculator from './pages/AllCalculator';
import IncomeTax from './pages/IncomeTax';
import HraCalculator from './pages/HraCalculator';
import GstCalculator from './pages/GstCalculator';
import EmiCalculator from './pages/EmiCalculator';
import HomeLoanEmi from './pages/HomeLoanEmi';
import SalaryCalculator from './pages/SalaryCalculator';
// import MutualFund from './pages/MutualFund';
import RetirementPlanning from './pages/RetirementPlanning';
import EpfCalculator from './pages/EpfCalculator';
import PPFCalculator from './pages/PPFCalculator';
import NPsCalculator from './pages/NPsCalculator';
import GratuityCalculator from './pages/GratuityCalculator';
import SimpleCompound from './pages/SimpleCompound';
import FDCalculator from './pages/FDCalculator';
import LumpsumCalculator from './pages/LumpsumCalculator';
import TDSCalculator from './pages/TDSCalculator';
import RDCalculator from './pages/RDCalculator';
import SIPCalculator from './pages/SIPCalculator';
import BusinessSetup from './pages/BusinessSetup';
import MutualFundCalculator from './pages/MutualFund';

function App() {
  return (
    <>
      <Header /> {/* Always visible at the top */}
      <Routes>
        <Route path="/all" element={<AllCalculator />} />
        <Route path="/income" element={<IncomeTax />} />
        <Route path="/hra" element={<HraCalculator />} />
        <Route path="/gst" element={<GstCalculator />} />
        <Route path="/emi" element={<EmiCalculator />} />
        <Route path="/home" element={<HomeLoanEmi />} />
        <Route path="/salary" element={<SalaryCalculator />} />
        <Route path="/mutual" element={<MutualFundCalculator />} />
        <Route path="/retirement" element={<RetirementPlanning />} />
        <Route path="/epf" element={<EpfCalculator />} />
        <Route path="/ppf" element={<PPFCalculator />} />
        <Route path="/nps" element={<NPsCalculator />} />
        <Route path="/gratuity" element={<GratuityCalculator />} />
        <Route path="/simple" element={<SimpleCompound />} />
        <Route path="/fd" element={<FDCalculator />} />
        <Route path="/lumpsum" element={<LumpsumCalculator />} />
        <Route path="/tds" element={<TDSCalculator />} />
        <Route path="/rd" element={<RDCalculator />} />
        <Route path="/sip" element={<SIPCalculator />} />
        <Route path="/business" element={<BusinessSetup />} />

        {/* Optional: default route */}
        <Route path="*" element={<AllCalculator />} />
      </Routes>
    </>
  );
}

export default App;
