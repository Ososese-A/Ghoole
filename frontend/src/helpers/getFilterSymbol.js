const getFilterSymbol = (str) => {
    let result = ''
    let count = 0

    for (let i = 0; i < str.length; i++) {
        // Ignore spaces
        if (str[i] !== ' ') {
            count++
            // Always include the first non-space character
            if (count === 1 || (count - 1) % 3 === 0) {
                result += str[i]
                // Stop if we already have 3 letters
                if (result.length === 3) {
                    break
                }
            }
        }
    }
    // Return the result in uppercase
    return result.toUpperCase()
}

export default getFilterSymbol;