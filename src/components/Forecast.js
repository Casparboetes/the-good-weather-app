import React from 'react'
import { removeDecimal } from '../utils'

const foreCastStyle = {
  width: '100%',
  height: 'auto',
  color: 'white'
}

const degreeSymbol = '°'

export const Forecast = ({ data, isLoading, isError }) => {
  if (!data || isLoading) return <></>
  if (!data && isError) return <div>Something went wrong ...</div>

  const {
    city: { name: cityName }
  } = data

  const {
    main: { temp },
    weather: [{ description, icon }]
  } = data.list[0]

  const capitalizeFirstLetter = string => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }

  return (
    <div className='card' style={foreCastStyle}>
      <div className='card__container'>
        <p style={{ marginBottom: 0 }} className='card__title'>
          {cityName}
        </p>
        <h3
          style={{ marginTop: 0, marginBottom: '1rem' }}
          className='card__description--capitalized'
        >
          {capitalizeFirstLetter(description)}
        </h3>
        <img
          className='card__img'
          src={icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : null}
          alt={description}
        ></img>
        <h1 style={{ marginTop: 0, marginBottom: 0 }} className='card__temp'>
          {removeDecimal(temp)}
          {temp ? degreeSymbol : null}
        </h1>
      </div>
    </div>
  )
}
