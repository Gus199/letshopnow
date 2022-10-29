import axios from 'axios'

const API_URL = '/api/devices/'

// Get device notes
const getNotes = async (deviceId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + deviceId + '/notes', config)

  return response.data
}

// Create device note
const createNote = async (noteText, deviceId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + deviceId + '/notes',
    {
      text: noteText,
    },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService
