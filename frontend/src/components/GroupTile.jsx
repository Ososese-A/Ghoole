const GroupTile = ({port_symbol, port_name}) => {
    const now = new Date()
    const currentDate = now.toLocaleDateString()
    const currentTime = now.toLocaleTimeString()

    return ( 
        <>
        <div className="px-8 my-16">
            <div className="tile_width">
                <div className="border-2 rounded-xl flex items-center justify-between px-8 py-4 space-x-1">
                    <div className="text-2xl space-y-4">
                        <p className="font-bold">{port_symbol}</p>
                        <p>Port price</p>
                    </div>
                    <div className="flex-col justify-items-end">
                        <p className="text-xl text-nowrap">{port_name}</p>
                        <div className="flex text-gho-green space-x-6 justify-end">
                            <p>port %</p><p>port change</p>
                        </div>
                        <div className="flex w-40 space-x-6 justify-end">
                        <p className="text-nowrap">{currentDate}</p><p className="text-nowrap">{currentTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default GroupTile;