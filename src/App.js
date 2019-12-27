/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useAsyncGetForecast } from './api'
import { Forecast } from './components/Forecast'
import FiveDayForecast from './components/FiveDayForecast'
import WeatherSearchBar from './components/WeatherSearchBar'

import './App.css'

const language = 'en'

export default () => {
  const [[data, isLoading, isError], setUrl] = useAsyncGetForecast()
  const [errorMessage, setErrorMessage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [hasGeolocation, setHasGeolocation] = useState()
  const [flag, setFlag] = useState()

  const onEnter = event => {
    setFlag(true)
    if (event.key === 'Enter') {
      setUrl(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm},${null}&units=metric&cnt=40&lang=${language}`
      )
      setSearchTerm((event.target.value = ''))
    }
  }

  const userInput = event => {
    setSearchTerm(event.target.value)
  }

  const succes = ({ coords }) => {
    setHasGeolocation(true)

    if (coords) {
      setUrl(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=${language}`
      )
    }
  }

  const error = error => {
    if (error) {
      setErrorMessage(!error.code === 3 ? error.message : null)
    }
  }

  if (navigator.geolocation && !hasGeolocation && !flag) {
    navigator.geolocation.getCurrentPosition(succes, error, {
      timeout: 5
    })
  }

  const setMoodColor = () => {
    const mainWeaterType = data ? data.list[0].weather[0].main : null
    const thunderstorm = 'Thunderstorm'
    const drizzle = 'Drizzle'
    const rain = 'Rain'
    const snow = 'Snow'
    const atmosphere = 'Atmosphere'
    const clear = 'Clear'
    const clouds = 'Clouds'

    if (mainWeaterType === thunderstorm) {
      return (document.body.style.backgroundColor = '#6C7179')
    } else if (mainWeaterType === drizzle) {
      return (document.body.style.backgroundColor = '#cdd5e0')
    } else if (mainWeaterType === rain) {
      return (document.body.style.backgroundColor = '#89a4c7')
    } else if (mainWeaterType === snow) {
      return (document.body.style.backgroundColor = '#cdd5e0')
    } else if (mainWeaterType === atmosphere) {
      return (document.body.style.backgroundColor = '#ad62aa')
    } else if (mainWeaterType === clear) {
      return (document.body.style.backgroundColor = '#9aceff')
    } else if (mainWeaterType === clouds) {
      return (document.body.style.backgroundColor = '#4e709d')
    } else {
      return
    }
  }

  useEffect(() => {
    setMoodColor()
  }, [setMoodColor])

  return (
    <div className='App'>
      <div className='App__body'>
        <span>
          <WeatherSearchBar
            value={searchTerm}
            handleChange={userInput}
            handleKeyPress={onEnter}
          />
        </span>
        {!hasGeolocation && !flag ? (
          <></>
        ) : (
          <div>
            <Forecast data={data} isLoading={isLoading} isError={isError} />
            <FiveDayForecast
              data={data}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        )}
      </div>
    </div>
  )
}
