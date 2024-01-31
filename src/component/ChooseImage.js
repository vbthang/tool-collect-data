import React from 'react'
import FieldImage from './FieldImage'

const ChooseImage = () => {
  return (
    <div>
        <div className = 'image'>
            <FieldImage name='Front Image'/>
            <FieldImage name='Side Image'/>
            <FieldImage name='Back Image'/>
        </div>
    </div>
  )
}

export default ChooseImage
