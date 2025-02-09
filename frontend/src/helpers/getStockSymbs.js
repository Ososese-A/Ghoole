const getStockSymbs = async () => {
    const url = 'http://localhost:4000/api/stock/'
    const options = {
        method: 'GET'
    }

    try {
        const response = await fetch(url, options)
        const result = await response.json();
        // console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }
}


//this was previously called fetchsymbs 
export default getStockSymbs