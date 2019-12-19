import React, { useState } from 'react'

import './App.css'

export default () => {
  const [position, setPosition] = useState({})
  const [error, setError] = useState()

  const onPositionRecieved = ({ coords }) => {
    console.log({ coords })
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }

  const onPositionNotRecieved = positionError => {
    console.log(positionError)
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
      {position.latitude} {position.longitude}
      <code>
        {error !== 'Timeout expired' ? (
          <h4>{error}</h4>
        ) : (
          <h4>
            {position.latitude}&nbsp;{position.longitude}
          </h4>
        )}
      </code>
    </div>
  )
}
