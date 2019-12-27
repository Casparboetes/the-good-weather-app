import React, { useState } from 'react'
import { useAsyncGetForecast } from './api'
import { Forecast } from './components/Forecast'
import FiveDayForecast from './components/FiveDayForecast'
import WeatherSearchBar from './components/WeatherSearchBar'

import './App.css'

const language = 'en'

const squareStyle = {
  height: '5rem',
  width: '5rem'
}

const square = [0, 1, 2, 3, 4, 5, 6, 7]

export default () => {
  const [[data, isLoading, isError], setUrl] = useAsyncGetForecast()
  const [errorMessage, setErrorMessage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [props, setProps] = useState({})
  const [flag, setFlag] = useState(false)
  const [hasGeolocation, setHasGeolocation] = useState()

  const onEnter = event => {
    if (event.key === 'Enter') {
      setUrl(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm},${null}&units=metric&cnt=40&lang=${language}`
      )
      setFlag(true)
      setSearchTerm((event.target.value = ''))
    }
  }

  const userInput = event => {
    setSearchTerm(event.target.value)
  }

  const succes = ({ coords }) => {
    setHasGeolocation(true)

    if (coords) {
      console.log(coords)
      setUrl(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=${language}`
      )
    }
    // window.location.reload(coords)
  }

  const error = error => {
    // console.log('ERROR(' + error.code + '): ' + error.message)
    // if (message) {
    // setErrorMessage(message)
    // }
  }
  const findGeolocation = () => {
    console.log('FIND ME BITCHES')
  }

  if (navigator.geolocation && !flag) {
    if (!navigator.geolocation) {
      setHasGeolocation(false)
    } else {
      navigator.geolocation.getCurrentPosition(succes, error, {
        timeout: 5
      })
      // setHasGeolocation(true)
    }
  }
  const numbers = [1, 2, 3, 4, 5]
  const colors = [
    '#FFBC9E',
    '#6C7179',
    '#cdd5e0',
    '#89a4c7',
    '#cdd5e0',
    '#ad62aa',
    '#9aceff',
    '#4e709d'
  ]
  const listItems = colors.map(color => (
    <li style={{ width: '10rem', height: '10rem', backgroundColor: color }}>
      <div></div>
    </li>
  ))

  return (
    <div
      className='App'
      onLoad={findGeolocation}
      // style={{ backgroundColor: '#ff896b' }}
    >
      {/* <ul>{listItems}</ul> */}
      <div className='App__body'>
        {/* {!hasGeolocation ? ( */}
        <div>
          <span>
            <WeatherSearchBar
              value={searchTerm}
              handleChange={userInput}
              handleKeyPress={onEnter}
            />
          </span>
        </div>
        {/* ) : ( */}
        {/* <p>hallo test</p> */}
        {/* )} */}
        {/* {error !== 'Timeout expired' ? (
          <div>...</div>
        ) : ( */}
        {/* <div>
          <span>
            <WeatherSearchBar
              value={searchTerm}
              handleChange={userInput}
              handleKeyPress={onEnter}
            />
          </span>
        </div> */}
        <Forecast data={data} isLoading={isLoading} isError={isError} />
        <FiveDayForecast data={data} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  )
}
