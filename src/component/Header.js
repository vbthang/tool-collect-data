import React from 'react'
import Field from './Field'

const Header = () => {
  return (
    <div>
        <h1>Collect Data</h1>
        <div className = 'Info'>
            <Field name='Name'/>
            <Field name='Height'/>
            <Field name='Weight'/>
        </div>
    </div>
  )
}

export default Header
