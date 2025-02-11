const getSectorIndustry = async (stock) => {
    const url = `https://real-time-finance-data.p.rapidapi.com/stock-overview?symbol=${stock}&language=en`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
            'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }
}

export default getSectorIndustry