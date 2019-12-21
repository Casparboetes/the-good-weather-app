import React, { useState } from 'react'
import Forecast from './components/Forecast'

import './App.css'

export default () => {
  const [position, setPosition] = useState({})
  const [error, setError] = useState()

  const onPositionRecieved = ({ coords }) => {
    console.log('COORDS', coords)
    if (coords) {
      setPosition({
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
        timeout: 2
      }
    )
  }

  return (
    <div className='App'>
      <div className='App__body'>
        {error !== 'Timeout expired' ? (
          <h4>{error}</h4>
        ) : (
          <div>
            <Forecast {...position} />
            <div style={{ backgroundColor: 'peach' }}>
              <Forecast {...position} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
