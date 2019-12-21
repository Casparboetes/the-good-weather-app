/* eslint-disable no-undef */
import React from 'react'

const MaxMinTemp = props => {
  const {
    props: [tempMax, tempMin, degreeSymbol]
  } = props

  return (
    <h3 className='maxAndMinTemp'>
      <span>
        {tempMax}
        {tempMax ? degreeSymbol : null}
      </span>
      {'  '}
      <span>
        {tempMin}
        {tempMin ? degreeSymbol : null}
      </span>
    </h3>
  )
}

export default MaxMinTemp
