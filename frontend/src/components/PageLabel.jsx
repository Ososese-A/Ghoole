const PageLabel = ({pageLabel}) => {
    return ( 
        <>
            <div className="w-screen flex justify-center px-6 md:px-20 lg:px-40 xl:px-64 2xl:px-96">
                <div className="flex w-screen justify-between">
                    <p className="text-2xl ml-4">{pageLabel}</p>
                    <select name="time_frame" id="time_frame" className="border-2 border-gho-white bg-gho-black rounded-lg px-2 h-10 w-36 mr-4">
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="past_week">Past Week</option>
                        <option value="past_month">Past Month</option>
                        <option value="past_3_months">Past 3 months</option>
                        <option value="past_6_months">Past 6 months</option>
                        <option value="past_year">Past Year</option>
                        <option value="past_2_years">Past 2 Years</option>
                        <option value="past_5_years">Past 2 Years</option>
                        <option value="all_time">All time</option>
                    </select>
                </div>
            </div>
        </>
     );
}
 
export default PageLabel;