import React, { useState } from 'react'
import { useAsyncGetForecast } from '../api'
import MaxMinTemp from './MaxMinTemp'

const foreCastStyle = {
  width: '100%',
  height: 'auto',
  color: 'white'
}

const Forecast = props => {
  const [data, loading, error] = useAsyncGetForecast(props)
  const [degreeSymbol] = useState('°')

  if (!data || loading) return <div></div> // PROBABLY REMOVE THIS
  // if (error) return <div>{error}</div>

  const {
    city: { name }
  } = data

  const {
    main: { temp, temp_max: tempMax, temp_min: tempMin },
    weather: [{ description, icon }],
    dt_txt: date
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

  // TODOL RENAME THE TINGS

  const getFullDate = unixTimestamp => {
    const fullDate = new Date(unixTimestamp * 1000)

    return fullDate
  }
  // TODOL RENAME THE TINGS

  const getWeekday = unixTimestamp => {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const n = weekdays[getFullDate(unixTimestamp).getUTCDay()]
    return n
  }

  // TODOL RENAME THE TINGS
  const fiveDayForecast = value => {
    const { list } = value
    const itIsTwelveOclock = '12:00:00'
    const filterOnTime = list.filter(el => el.dt_txt.includes(itIsTwelveOclock))

    const newMap = filterOnTime.map(el => {
      const {
        dt,
        main: { temp },
        weather: [{ id: weatherId, description, icon }]
      } = el

      return { dt, temp, weatherId, icon, description, date }
    })

    return (
      <ul>
        {newMap.map(el => (
          <li key={el.weatherId}>
            <h3>{getWeekday(el.dt)}</h3>
            <img
              style={{ transform: 0.5 }}
              // className='card__img'
              src={
                el.icon
                  ? `http://openweathermap.org/img/wn/${el.icon}@2x.png`
                  : null
              }
              alt={el.description}
            ></img>
            <h2>
              {removeDecimal(el.temp)}
              {temp ? degreeSymbol : null}
            </h2>
          </li>
        ))}
      </ul>
    )
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

      {/* make into component */}
      {fiveDayForecast(data)}
    </div>
  )
}

export default Forecast
