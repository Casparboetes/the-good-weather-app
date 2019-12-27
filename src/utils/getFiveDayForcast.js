import { merge as _merge } from 'lodash'

const fiveDayForecast = ({ list }) => {
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

  console.log('dayTimeWeatherInfo', dayTimeWeatherInfo)
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

return default 
