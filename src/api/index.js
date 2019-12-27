import { useEffect, useState } from 'react'
import axios from 'axios'
import secrets from '../secrets.js'

// For different languages
// `http://api.openweathermap.org/data/2.5/forecast?id=524901&lang=${lang}&appid=${secrets.YOUR_API_KEY}`

export const useAsyncGetForecast = () => {
  const [data, setData] = useState(null)
  const [url, setUrl] = useState()
  const [isError, setIsError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getForecast = async () => {
      try {
        setLoading(true)
        const response = await axios(
          url ? url + `&appid=${secrets.YOUR_API_KEY}` : null
        )
        const { data } = response
        setData(data)
      } catch (error) {
        console.log(error.message)
        setIsError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getForecast()
  }, [url])

  return [[data, loading, isError], setUrl]
}
