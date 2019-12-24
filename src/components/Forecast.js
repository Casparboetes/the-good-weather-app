import React from 'react'
import MaxMinTemp from './MaxMinTemp'

const foreCastStyle = {
  width: '100%',
  height: 'auto',
  color: 'white'
}

const degreeSymbol = '°'

export const Forecast = ({ data, loading, error }) => {
  if (!data || loading) return <div></div> // PROBABLY REMOVE THIS
  if (!data && error) return <div>Something went wrong ...</div>

  const {
    city: { name }
  } = data

  const {
    main: { temp, temp_max: tempMax, temp_min: tempMin },
    weather: [{ description, icon }]
  } = data.list[0]

  const removeDecimal = temp => {
    if (temp) {
      const degreeTofixed = temp.toFixed(0)
      return degreeTofixed
    }
  }

  const capitalizeFirstLetter = string => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }

  return (
    <div className='card' style={foreCastStyle}>
      <div className='card__container'>
        <h1 className='card__title'>{name}</h1>
        <img
          className='card__img'
          src={icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : null}
          alt={description}
        ></img>
        <h1 className='card__temp'>
          {removeDecimal(temp)}
          {temp ? degreeSymbol : null}
        </h1>
        <MaxMinTemp
          props={[removeDecimal(tempMax), removeDecimal(tempMin), degreeSymbol]}
        />
        <h4 className='card__description--capitalized'>
          {capitalizeFirstLetter(description)}
        </h4>
      </div>
    </div>
  )
}
