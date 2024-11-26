const Tile = ({symb, price, percent_change, price_change, stock_name, date, time}) => {
    return (
        <>
        <div className="px-8 my-16">
            <div className="tile_width">
                <div className="border-2 rounded-xl flex items-center justify-between px-8 py-4 space-x-1">
                    <div className="text-2xl space-y-4">
                        <p className="font-bold">{symb}</p>
                        <p>{price}</p>
                    </div>
                    <div className="flex-col justify-items-end">
                        <p className="text-xl text-nowrap">{stock_name}</p>
                        <div className="flex text-gho-red space-x-6 justify-end">
                            <p>{percent_change}</p><p>{price_change}</p>
                        </div>
                        <div className="flex w-40 space-x-6 justify-end">
                            <p>{date}</p><p>{time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Tile