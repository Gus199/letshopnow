import axios from "axios";


const API_URL = '/api/products/'

// create new device:

const createProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    }

    const response = await axios.post(API_URL, productData, config)

    return response.data
}
// Get user Devices
const  getProducts = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

  // Get all Devices
const getAllProducts = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL , config)
  
    return response.data
  }

  // Get  Device
const getProduct = async (deviceId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + deviceId, config)
  
    return response.data
  }


  // close  Device
const closeProduct = async (deviceId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_URL + deviceId,{status: 'closed'}, config)
  
    return response.data
  }



const deviceService = {
  createProduct ,
    getProducts,
    getProduct,
    closeProduct,
    getAllProducts,
}

export default deviceService