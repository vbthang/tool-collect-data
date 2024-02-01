import React from 'react'
import Measurement from './Measurement'
import ChooseImage from './ChooseImage'

const Content = () => {
  return (
    <div className='row'>
        <div className='col-md-4 col-12'>
          <ChooseImage />
        </div>
        <Measurement />
    </div>
  )
}

export default Content
