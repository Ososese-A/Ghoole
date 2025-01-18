const SumValue = ({total_price, total_change, total_percent}) => {
    return ( 
        <>
        <div className="flex items-center justify-between mx-6 md:mx-40 lg:mx-80">
            <p className="text-2xl">{total_price}</p>
            <div className={
                total_percent?.toString().charAt(0) == '-' ?
                "flex text-gho-red space-x-6 justify-end" :
                "flex text-gho-green space-x-6 justify-end"
            }>

                <p>{total_percent}%</p>
                <p>{total_change}</p>
            </div>
        </div>
        </>
     );
}
 
export default SumValue;