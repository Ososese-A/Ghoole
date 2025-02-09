import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import StockListPortfolioPage from "./pages/StockListPortfolioPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => {

  return ( 
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/portfolio/:portfolioId" element={<StockListPortfolioPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
    </>
   );
}
 
export default App;