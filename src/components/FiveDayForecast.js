import React from 'react'
import removeDecimal from '../utils'

const degreeSymbol = '°'

const FiveDayForecast = ({ data, loading, error }) => {
  if (!data || loading) return <div></div> // PROBABLY REMOVE THIS
  if (!data && error) return <div>Something went wrong ...</div>
  const { list } = data

  const getFullDate = unixTimestamp => {
    const fullDate = new Date(unixTimestamp * 1000)

    return fullDate
  }

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

    const dayOfTheWeek = weekdays[getFullDate(unixTimestamp).getUTCDay()]

    return dayOfTheWeek
  }

  const fiveDayForecast = list => {
    const itIsTwelveOclock = '12:00:00'
    const filterOnTwelveOClock = list.filter(el =>
      el.dt_txt.includes(itIsTwelveOclock)
    )

    const newArray = filterOnTwelveOClock.map(el => {
      const {
        dt,
        main: { temp },
        weather: [{ id: weatherId, description, icon }]
      } = el

      return { dt, temp, weatherId, icon, description }
    })

    return newArray
  }

  return (
    <ul>
      {fiveDayForecast(list).map((el, index) => (
        <li key={index}>
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
            {el.temp ? degreeSymbol : null}
          </h2>
        </li>
      ))}
    </ul>
  )
}

export default FiveDayForecast
