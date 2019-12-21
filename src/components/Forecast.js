import React, { useState, useEffect } from 'react'
import { useAsyncGetForecast } from '../api'
import MaxMinTemp from './MaxMinTemp'

const foreCastStyle = {
  width: '100%',
  height: 'auto',
  // color: '#e96e50',
  color: 'white'
}

const Forecast = props => {
  const [degreeSymbol] = useState('°')
  const [state, setState] = useState()

  // if (props) {
  const { data, loading, error } = useAsyncGetForecast(props)
  // }

  if (!data || loading) return <div>Loading...</div> // PROBABLY REMOVE THIS
  // if (error) return <div>{error}</div>

  // const { name, id } = data
  // console.log(name, id)
  // if (data) {
  // console.log('1', data)
  // console.log('2', state)
  // const { city } = data
  // console.log('ggg', city)

  // for (const {
  //   dt,
  //   main: { temp, temp_max: tempMax, temp_min: tempMin },
  //   weather: [{ id: weatherId, description, icon }],
  //   dt_txt: date
  // } of data.list) {
  //   const x = [
  //     ...{ dt, temp, tempMax, tempMin, weatherId, description, icon, date }
  //   ]
  //   console.log(x)
  //   // setData([
  //   //   ...[dt, temp, tempMax, tempMin, weatherId, description, icon, date]
  //   //   // cityId,
  //   //   // name,
  //   // ])
  // }

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
        <h1 className='card__title'>{data.name}</h1>
        <img
          className='card__img'
          src={
            data.icon
              ? `http://openweathermap.org/img/wn/${data.icon}@2x.png`
              : null
          }
          alt={data.description}
        ></img>
        <h1 className='card__temp'>
          {removeDecimal(data.temp)}
          {data.temp ? degreeSymbol : null}
        </h1>
        <MaxMinTemp
          props={[
            removeDecimal(data.tempMax),
            removeDecimal(data.tempMin),
            degreeSymbol
          ]}
        />
        <h4 className='card__description--capitalized'>
          {capitalizeFirstLetter(data.description)}
        </h4>
      </div>
    </div>
  )
}

export default Forecast
