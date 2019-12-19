import { useEffect, useState } from 'react'
import axios from 'axios'
import secrets from '../secrets.js'

// see which params are needed for which call
// for geolocation
// for city & coutry
// for languages
// export const  useAsyncGetForecast = (endpoint, { method, data, jwt } = {}) => {
// think also about this const apiUrl =
//   searchParams && searchParams.length > 0
//     ? `someUrl`
//     : 'someOtherUrl'

export const useAsyncGetForecast = ({ ...params }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getForecast() {
    try {
      setLoading(true)
      const response = await axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${secrets.YOUR_API_KEY}`
      })
      console.log(response.data)

      const {
        data: {
          weather: [{ main, description, icon }],
          main: { temp },
          name,
          id
        }
      } = response

      setData({
        main,
        description,
        icon,
        name,
        id,
        temp
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getForecast()
  }, [])

  return { data, loading, error }
}
