import React, { useState } from 'react'
import Forecast from './components/Forecast'
import WeatherSearchBar from './components/WeatherSearchBar'

import './App.css'

export default () => {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState()
  const [searchTerm, setSearchTerm] = useState()

  const [props, setProps] = useState({})

  const onEnter = event => {
    if (event.key === 'Enter') {
      setProps({
        // ...props,
        latitude: null,
        longitude: null,
        city: searchTerm
      })
      setSearchTerm((event.target.value = null))
    }
  }

  // const handleInputChange = (e) => setInput({
  //   ...input,
  //   [e.currentTarget.name]: e.currentTarget.value
  // })
  const userInput = event => {
    setSearchTerm(event.target.value)
  }

  const onPositionRecieved = ({ coords }) => {
    if (coords) {
      setProps({
        // ...props,
        latitude: coords.latitude,
        longitude: coords.longitude
      })
    }
  }

  const onPositionNotRecieved = ({ message }) => {
    console.log('ERROR MESSAGE', message)
    if (message) {
      setError(message)
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onPositionRecieved,
      onPositionNotRecieved,
      {
        timeout: 5
      }
    )
  }

  return (
    <div className='App'>
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
        <Forecast {...props} />
        {/* )} */}
      </div>
    </div>
  )
}
