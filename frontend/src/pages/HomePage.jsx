import AppBarA from "../components/AppBarA";
import PageLabel from "../components/PageLabel";
import Search from "../components/Search";
import StockList from "../components/StockList";
import FloatBtn from "../components/FloatBtn";
const HomePage = () => {
    return ( 
        <>
            <div className="overflow-x-hidden">
            <AppBarA/>
            <Search />
            <PageLabel pageLabel='All Stocks' />
            <FloatBtn />
            <StockList />
            {/* <StockListSample /> */}
            </div>
        </>
     );
}
 
export default HomePage;