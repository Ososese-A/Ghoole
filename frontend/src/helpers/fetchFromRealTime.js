const fetchFromRealTime = async (symbol) => {
    const url = `http://127.0.0.1:4000/api/stock/sample`;
    const options = {
        method: 'GET',
    };


    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result)
        return result
    } catch (error) {
        console.error(error);
    }
}
 
export default fetchFromRealTime;












// const fetchFromRealTime = async (symbol) => {
//     const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${symbol}%2CMSFT%2C%5ESPX%2C%5ENYA%2CGAZP.ME%2CSIBN.ME%2CGEECEE.NS`;
//     const options = {
//         method: 'GET',
//         headers: {
//           'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
//           'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
//         }
//       };


//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         // console.log(result)
//         return result
//     } catch (error) {
//         console.error(error);
//     }
// }
 
// export default fetchFromRealTime;