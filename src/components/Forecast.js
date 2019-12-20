import React, { useEffect, useState } from 'react'

import { useAsyncGetForecast } from '../api'

const foreCastStyle = {
  backgroundColor: 'red',
  width: '100px',
  height: 'auto',
  padding: '1rem'
}

const Forecast = props => {
  // const [state, setState] = useState(props)

  // useEffect(() => {
  //   setState(props)
  // }, [props])

  const { data, loading, error } = useAsyncGetForecast(props)

  if (loading) return <div>Loading...</div>
  // if (error) return <div>{error}</div>
  console.log('data in forecast', data)

  // if (data) {
  return (
    <div style={foreCastStyle}>
      <div>{data.name}</div>
      <div>{data.main}</div>
      <div>{data.description}</div>
      <img
        src={
          data.icon
            ? `http://openweathermap.org/img/wn/${data.icon}@2x.png`
            : null
        }
        alt={data.description}
      ></img>
      <div>{data.icon}</div>
      <div>{data.id}</div>
      <div>{data.temp}</div>
    </div>
  )
  // }
}

export default Forecast
