import React, { useState } from 'react'
import { useAsyncGetForecast } from './api'
import { Forecast } from './components/Forecast'
import FiveDayForecast from './components/FiveDayForecast'
import WeatherSearchBar from './components/WeatherSearchBar'

import './App.css'

const language = 'en'

export default () => {
  const [[data, loading, error], setUrl] = useAsyncGetForecast()
  const [errorMessage, setErrorMessage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [props, setProps] = useState({})
  const [weatherColor, setWeatherColor] = useState({
    backgroundColor: '#000',
    color: '#fff'
  })
  const [color, setColor] = useState({
    backgroundColor: '#000'
  })
  const [flag, setFlag] = useState(true)

  // const onEnter = event => {
  //   if (event.key === 'Enter') {
  //     setProps({
  //       // ...props,
  //       latitude: null,
  //       longitude: null,
  //       city: searchTerm
  //     })
  //     setSearchTerm((event.target.value = null))
  //   }
  // }

  const onEnter = event => {
    if (event.key === 'Enter') {
      setUrl(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm},${null}&units=metric&cnt=40&lang=${language}&appid=02ceeb04ea9bec37d93a471d1171d9ce`
      )
      setFlag(false)
      setSearchTerm((event.target.value = ''))
      // setProps({
      //   // ...props,
      //   latitude: null,
      //   longitude: null,
      //   city: searchTerm
      // })
      // setSearchTerm((event.target.value = null))
    }
  }

  const userInput = event => {
    setSearchTerm(event.target.value)
  }

  const onPositionRecieved = ({ coords }) => {
    if (coords) {
      setUrl(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=${language}&appid=02ceeb04ea9bec37d93a471d1171d9ce`
      )
    }
  }

  const onPositionNotRecieved = ({ message }) => {
    if (message) {
      setErrorMessage(message)
    }
  }

  if (navigator.geolocation && flag) {
    navigator.geolocation.getCurrentPosition(
      onPositionRecieved,
      onPositionNotRecieved,
      {
        timeout: 5
      }
    )
  }
  if (!data || loading) return <div>Hallo</div> // PROBABLY REMOVE THIS
  if (!data && error) return <div>Something went wrong ...</div>

  const colorMood = data => {
    const {
      weather: [{ main }]
    } = data.list[0]

    const thunderstorm = 'Thunderstorm'
    const drizzle = 'Drizzle'
    const rain = 'Rain'
    const snow = 'Snow'
    const atmosphere = 'Atmosphere'
    const clear = 'Clear'
    const clouds = 'Clouds'

    switch (main) {
      case main === thunderstorm:
        setWeatherColor({ backgroundColor: '#393e46', color: '#fff' })
        break
      case main === drizzle:
        setWeatherColor({ backgroundColor: '#89a4c7', color: '#fff' })
        break
      case main === rain:
        setWeatherColor({ backgroundColor: '#1f3c88', color: '#fff' })
        break
      case main === snow:
        setWeatherColor({ backgroundColor: '##f3f9fb', color: '#000' })
        break
      case main === atmosphere:
        setWeatherColor({ backgroundColor: '#cdd5e0', color: '#000' })
        break
      case main === clear:
        setWeatherColor({ backgroundColor: '#ff896b', color: '#fff' })
        break
      case main === clouds:
        setWeatherColor({ backgroundColor: '#89a4c7', color: '#fff' })
        break
      default:
        setWeatherColor({ backgroundColor: '#000', color: '#fff' })
    }
  }

  const testColor = val => {
    // console.log(data)
    // const {
    //   weather: [{ main }]
    // } = val.list[0]

    const thunderstorm = 'Thunderstorm'
    const drizzle = 'Drizzle'
    const rain = 'Rain'
    const snow = 'Snow'
    const atmosphere = 'Atmosphere'
    const clear = 'Clear'
    const clouds = 'Clouds'

    // const value = 'Rain'

    if (rain) {
      return '#89a4c7'
    } else {
      return '#ff896b'
    }
  }
  const styles = {
    backgroundColor: testColor('Rain')
  }
  if (data) {
    const {
      weather: [{ main }]
    } = data.list[0]
    console.log(main)
    const styles = {
      backgroundColor: testColor(main)
    }
  }

  console.log('data.list[0]', data.city.name)

  return (
    <div className='App' style={styles}>
      <div className='App__body'>
        {/* {error !== 'Timeout expired' ? (
          <div>...</div>
        ) : ( */}
        <div>
          <span>
            <WeatherSearchBar
              value={searchTerm}
              handleChange={userInput}
              handleKeyPress={onEnter}
            />
          </span>
        </div>
        <Forecast data={data} loading={loading} error={error} />
        <FiveDayForecast data={data} loading={loading} error={error} />
      </div>
    </div>
  )
}
