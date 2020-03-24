const ApiConfig = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/',
  network: process.env.REACT_APP_NETWORK || 'main'
}

export default ApiConfig
