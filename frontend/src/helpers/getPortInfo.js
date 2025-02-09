const getPortInfo = async () => {
        const url = 'http://localhost:4000/api/portfolio/'
        const options = {
            method: 'GET'
        }

        try {
            const response = await fetch(url, options)
            const result = await response.json();
            // console.log(result);
            return result
        } catch (error) {
        }
    }

    export default getPortInfo