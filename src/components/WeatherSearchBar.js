import React from 'react'

import './WeatherSearchBar.css'

const WeatherSearchBar = ({ value, handleChange, handleKeyPress }) => {
  return (
    <div className='focus-wrapper focuses has-dash-icon'>
      <div className='prompt'>
        <h3 className='question'>Where is the good weather?</h3>
        <input
          type='text'
          value={value}
          onInput={handleChange}
          onKeyPress={handleKeyPress}
          autoComplete='off'
        />
      </div>
    </div>
  )
}

export default WeatherSearchBar
