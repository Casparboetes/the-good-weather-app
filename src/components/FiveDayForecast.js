import React from 'react'
import MaxMinTemp from './MaxMinTemp'
import { removeDecimal } from '../utils'
import { merge as _merge } from 'lodash'

const degreeSymbol = '°'

const FiveDayForecast = ({ data, isLoading, isError }) => {
  if (!data || isLoading) return <div></div> // PROBABLY REMOVE THIS
  if (!data && isError) return <div>Something went wrong ...</div>
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

  const getFiveDayForecast = list => {
    const itIsTwelveOclock = '12:00:00'
    const itIsTwelveOclockAtNight = '00:00:00'

    const filterOnTwelveOClock = list.filter(el =>
      el.dt_txt.includes(itIsTwelveOclock)
    )

    const filterOnTwelveAtNight = list.filter(el =>
      el.dt_txt.includes(itIsTwelveOclockAtNight)
    )

    const dayTimeWeatherInfo = filterOnTwelveOClock.map(el => {
      const {
        dt,
        main: { temp: dayTemp },
        weather: [{ id: weatherId, description, icon }]
      } = el

      return { dt, dayTemp, weatherId, icon, description }
    })

    const nightTimeWeatherInfo = filterOnTwelveAtNight.map(el => {
      const {
        main: { temp: nightTemp },
        dt_txt
      } = el

      return { nightTemp, dt_txt }
    })

    const combineDayAndNightInfo = _merge(
      dayTimeWeatherInfo,
      nightTimeWeatherInfo
    )

    return combineDayAndNightInfo
  }

  return (
    <ul>
      {getFiveDayForecast(list).map((el, index) => (
        <li style={{ padding: '0.5rem' }} key={index}>
          <h6 style={{ marginBottom: 0, fontWeight: 'normal' }}>
            {getWeekday(el.dt)}
          </h6>
          <img
            // className='card__img'
            src={
              el.icon
                ? `http://openweathermap.org/img/wn/${el.icon}@2x.png`
                : null
            }
            alt={el.description}
          ></img>
          <MaxMinTemp
            props={[
              removeDecimal(el.dayTemp),
              removeDecimal(el.nightTemp),
              degreeSymbol
            ]}
          />
        </li>
      ))}
    </ul>
  )
}

export default FiveDayForecast
