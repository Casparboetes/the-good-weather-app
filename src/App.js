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
  const [flag, setFlag] = useState(true)

  const onEnter = event => {
    if (event.key === 'Enter') {
      setUrl(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm},${null}&units=metric&cnt=40&lang=${language}&appid=02ceeb04ea9bec37d93a471d1171d9ce`
      )
      setFlag(false)
      setSearchTerm((event.target.value = ''))
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

  return (
    <div className='App' style={{ backgroundColor: '#ff896b' }}>
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
