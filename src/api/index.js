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

// useEffect(() => {
//   getForecast()
//   setState(props)
// }, [props])
// { latitude, longitude } = props
// console.log(props)

// console.log(latitude)
// console.log(longitude)

// const lat = 52.338688
// const lon = 4.907007999999999

// const lon = 4.89
// const lat = 52.37

// Different units
// `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${secrets.YOUR_API_KEY}`
//   standard api.openweathermap.org/data/2.5/find?q=London

// metric api.openweathermap.org/data/2.5/find?q=London&units=metric

// imperial api.openweathermap.org/data/2.5/find?q=London&units=imperial

// GEOLOCATION
// url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${secrets.YOUR_API_KEY}`

// BY CITY
// `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${secrets.YOUR_API_KEY}`

// For different languages
// `http://api.openweathermap.org/data/2.5/forecast?id=524901&lang=${lang}&appid=${secrets.YOUR_API_KEY}`

export const useAsyncGetForecast = props => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [state, setState] = useState(props)

  useEffect(() => {
    const getForecast = async () => {
      try {
        setLoading(true)
        const response = await axios({
          method: 'get',
          url: `https://api.openweathermap.org/data/2.5/forecast?lat=52.338688&lon=4.907007999999999&units=metric&appid=${secrets.YOUR_API_KEY}`
          // url: `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=${secrets.YOUR_API_KEY}`
        })
        // console.log(response.data)
        // const { data } = response.data
        // setData(data)
        const {
          data: {
            weather: [{ main, description, icon }],
            main: { temp },
            name,
            id
          }
        } = response

        setData({ main, description, icon, name, id, temp })
      } catch (error) {
        // setError(error)
      } finally {
        setLoading(false)
      }
    }

    setState(props)

    getForecast()
  }, [props, state.latitude, state.longitude])

  return { data, loading, error }
}
