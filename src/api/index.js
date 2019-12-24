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

// const language = 'en'

export const useAsyncGetForecast = () => {
  // console.log(props)
  const [data, setData] = useState(null)
  const [url, setUrl] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // const apiUrl =
  //   props.latitude && props.longitude
  //     ? `https://api.openweathermap.org/data/2.5/forecast?lat=${props.latitude}&lon=${props.longitude}&units=metric&lang=${language}&appid=${secrets.YOUR_API_KEY}`
  //     : `https://api.openweathermap.org/data/2.5/forecast?q=${props.city},${props.country}&units=metric&cnt=40&lang=${language}&appid=${secrets.YOUR_API_KEY}`

  useEffect(() => {
    // setState(props)

    const getForecast = async () => {
      try {
        setLoading(true)
        const response = await axios(
          url
          // apiUrl
          // url: `https://api.openweathermap.org/data/2.5/forecast?lat=${state.latitude}&lon=${state.longitude}&units=metric&lang=${language}&appid=${secrets.YOUR_API_KEY}`
          // url: `https://api.openweathermap.org/data/2.5/forecast?q=${state.city},${state.country}&units=metric&cnt=40&lang=${language}&appid=${secrets.YOUR_API_KEY}`
        )
        const { data } = response
        setData(data)
      } catch (error) {
        console.log('ERROR IN API CALL', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getForecast()
  }, [url])

  return [[data, loading, error], setUrl]
}
// props,
// // apiUrl,
// state.latitude,
// state.longitude,
// state.city,
// state.country,
// state.language
