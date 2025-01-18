import AppBarA from "./components/AppBarA";
import PageLabel from "./components/PageLabel";
import Search from "./components/Search";
import StockList from "./components/StockList";
import SumValue from "./components/SumValue";
import FloatBtn from "./components/FloatBtn";
import StockListSample from "./components/StockListSample";

const App = () => {

  return ( 
    <>
      <div className="overflow-x-hidden">
      <AppBarA/>
      <Search />
      <PageLabel/>
      <FloatBtn />
      <StockList />
      {/* <StockListSample /> */}
      </div>
    </>
   );
}
 
export default App;