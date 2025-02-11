import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import StockListPortfolioPage from "./pages/StockListPortfolioPage";
import PageNotFound from "./pages/PageNotFound";
import StockLisSectorPage from "./pages/StockListSectorPage";
import StockListIndustryPage from "./pages/stockListIndustryPage";

const App = () => {

  return ( 
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/portfolio/:portfolioId" element={<StockListPortfolioPage />} />
        <Route path="/sector/:sectorId" element={<StockLisSectorPage />}/>
        <Route path="/industry/:industryId" element={<StockListIndustryPage />}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
    </>
   );
}
 
export default App;