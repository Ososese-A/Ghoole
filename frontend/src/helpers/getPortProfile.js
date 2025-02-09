import getPortInfo from "../helpers/getPortInfo"

const getPortProfile = async (portId) => {
    const initRes = await getPortInfo()
    const portRes = [initRes]
    const portResB = portRes[0]

    const preStockProfile = portResB.find(prePort => prePort._id == portId);

    const stockProfile = preStockProfile.profile

    // console.log(stockProfile)
    return stockProfile;
}

export default getPortProfile