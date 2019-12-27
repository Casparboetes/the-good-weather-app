/* eslint-disable no-undef */
import React from 'react'

const dayStyle = {
  marginTop: '0',
  marginBottom: '0'
}

const nightStyle = {
  color: '#DCDCDC',
  marginTop: '0',
  marginBottom: '0'
}

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

const MaxMinTemp = props => {
  const {
    props: [tempMax, tempMin, degreeSymbol]
  } = props

  return (
    <div className='maxAndMinTemp' style={divStyle}>
      <h5 style={dayStyle}>
        {tempMax}
        {tempMax ? degreeSymbol : null}
      </h5>
      &nbsp;
      <h6 style={nightStyle}>
        {tempMin}
        {tempMin ? degreeSymbol : null}
      </h6>
    </div>
  )
}

export default MaxMinTemp
