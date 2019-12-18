import React, { useState } from 'react'

import './App.css'

export default () => {
  const [position, setPosition] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [error, setError] = useState()

  const onPositionRecieved = position => {
    console.log(position)
    setPosition(position.coords.latitude)
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

  const onPositionNotRecieved = positionError => {
    console.log(positionError.message)
    setError(positionError.message)
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onPositionRecieved,
      onPositionNotRecieved,
      {
        timeout: 2,
      }
    )
  } else {
    console.log('Geolocation blocked')
  }

  return (
    <div className='App'>
      <code>
        {error !== 'Timeout expired' ? (
          <h4>{error}</h4>
        ) : (
          <h4>
            {position}&nbsp;{latitude}&nbsp;{longitude}
          </h4>
        )}
      </code>
    </div>
  )
}
