const fetchSymbInfoFromYahoo = async (symbol) => {
    const url = `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol=${symbol}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
                'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setYahooStockData(result);
        } catch (error) {
            console.error(error);
        }
}

export default fetchSymbInfoFromYahoo