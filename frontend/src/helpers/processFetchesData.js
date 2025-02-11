import fetchFromRealTime from "../helpers/fetchFromRealTime"

const processFetchedData =async (dataToProcess) => {
    try {
        const data = await fetchFromRealTime(dataToProcess)
        const price = parseFloat(data.body[0]?.regularMarketPrice)
        // console.log(price)
        const price_change = parseFloat(data.body[0]?.regularMarketChange)
        // console.log(price_change)
        const price_percent = parseFloat(data.body[0]?.regularMarketChangePercent)
        // console.log(price_percent)
        return { price, price_change, price_percent }
    } catch (error) {
        console.log(error)
    }
}

export default processFetchedData