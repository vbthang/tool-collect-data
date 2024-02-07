import React from 'react'
import FieldImage from './FieldImage'

const ChooseImage = () => {
  return (
    <div>
        <div className = 'image col-12 my-4'>
            <FieldImage name='Front Image' id='frontImg'/>
            <FieldImage name='Side Image' id='sideImg'/>
            <FieldImage name='Back Image' id='backImg'/>
        </div>
    </div>
  )
}

export default ChooseImage
