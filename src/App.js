import React, { useState } from 'react'
import Forcast from './components/Forecast'

import './App.css'

export default () => {
  const [position, setPosition] = useState({})
  const [error, setError] = useState()

  const onPositionRecieved = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }

  const onPositionNotRecieved = ({ message }) => {
    setError(message)
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onPositionRecieved,
      onPositionNotRecieved,
      {
        timeout: 2,
      }
    )
  }

  return (
    <div className='App'>
      <code>
        {error !== 'Timeout expired' ? (
          <h4>{error}</h4>
        ) : (
          <div>
            <h4>
              {position.latitude}&nbsp;{position.longitude}
            </h4>
          </div>
        )}
      </code>
      <Forcast />
    </div>
  )
}
