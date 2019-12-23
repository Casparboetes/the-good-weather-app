import { useEffect, useState } from 'react'
import axios from 'axios'
import secrets from '../secrets.js'

// for geolocation
// for city & coutry
// for languages

// Different units
// `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${secrets.YOUR_API_KEY}`
//   standard api.openweathermap.org/data/2.5/find?q=London

// metric api.openweathermap.org/data/2.5/find?q=London&units=metric

// imperial api.openweathermap.org/data/2.5/find?q=London&units=imperial

// For different languages
// `http://api.openweathermap.org/data/2.5/forecast?id=524901&lang=${lang}&appid=${secrets.YOUR_API_KEY}`

const language = 'en'

export const useAsyncGetForecast = props => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(props)

  const apiUrl =
    state.latitude && state.longitude
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${state.latitude}&lon=${state.longitude}&units=metric&lang=${language}&appid=${secrets.YOUR_API_KEY}`
      : `https://api.openweathermap.org/data/2.5/forecast?q=${state.city},${state.country}&units=metric&cnt=40&lang=${language}&appid=${secrets.YOUR_API_KEY}`

  useEffect(() => {
    setState(props)

    const getForecast = async () => {
      try {
        setLoading(true)
        const response = await axios({
          method: 'get',
          url: apiUrl
          // url: `https://api.openweathermap.org/data/2.5/forecast?lat=${state.latitude}&lon=${state.longitude}&units=metric&lang=${language}&appid=${secrets.YOUR_API_KEY}`
          // url: `https://api.openweathermap.org/data/2.5/forecast?q=${state.city},${state.country}&units=metric&cnt=40&lang=${language}&appid=${secrets.YOUR_API_KEY}`
        })
        const { data } = response
        setData(data)
      } catch (error) {
        console.log('ERROR IN API CALL', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getForecast()
  }, [
    props,
    apiUrl,
    state.latitude,
    state.longitude,
    state.city,
    state.country,
    state.language
  ])

  return [data, loading, error]
}
