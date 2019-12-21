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

// Limitation of result
// Description:
// To limit number of listed cities please setup 'cnt' parameter that specifies the number of lines returned.

// Parameters:
// cnt number of lines in response
// Examples of API calls:
// cnt=3 api.openweathermap.org/data/2.5/find?lat=57&lon=-2.15&cnt=3 <<<<<<!!!

const language = 'nl'

export const useAsyncGetForecast = props => {
  const [data, setData] = useState({ data: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [state, setState] = useState(props)

  useEffect(() => {
    const getForecast = async () => {
      try {
        setLoading(true)
        const response = await axios({
          method: 'get',
          url: `https://api.openweathermap.org/data/2.5/forecast?lat=${state.latitude}&lon=${state.longitude}&units=metric&lang=${language}&appid=${secrets.YOUR_API_KEY}`
          // url: `https://api.openweathermap.org/data/2.5/forecast?q=Accra,ghana&units=metric&cnt=40&lang=${language}&appid=${secrets.YOUR_API_KEY}`
        })
        // all data
        // const { data } = response
        // setData({ data })

        // 5dagen
        // const { list } = response.data
        // const itIsTwelveOclock = '12:00:00'
        // const filterOntime = list.filter(el =>
        //   el.dt_txt.includes(itIsTwelveOclock)
        // )
        // console.log(
        //   'filterOntimefilterOntimefilterOntimefilterOntime',
        //   filterOntime
        // )
        // Eentje
        // console.log(list[0])
        const {
          city: { id: cityId, name }
        } = response.data

        for (const {
          dt,
          main: { temp, temp_max: tempMax, temp_min: tempMin },
          weather: [{ id: weatherId, description, icon }],
          dt_txt: date
        } of response.data.list)
          setData({
            dt,
            temp,
            tempMax,
            tempMin,
            weatherId,
            description,
            icon,
            date,
            cityId,
            name
          })
      } catch (error) {
        console.log('ERROR IN API CALL', error)
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
