import React from 'react'
import Field from './Field'
import { data } from '../data/FetchData'

const Measurement = () => {
  const volumeFields = Object.values(data['volume']);
  const linearFields = Object.values(data['linear']);
  return (
    <div className = 'detail col-md-8 col-12 my-4'>
        <h2 className='fs-4 bg-danger-subtle rounded p-2'>Volume:</h2>
        <div className = 'volume row mb-4'>
          {volumeFields.map((field) => {
            return <Field key={field.id} id={field.id} name={field.name} placeholder={field.placeholder} require={field.require} col={`col-sm-6 col-12`}/>;
          })}
        </div>
        <h2 className='fs-4 bg-danger-subtle rounded p-2'>Linear:</h2>
        <div className = 'linear row'>
          {linearFields.map((field) => {
              return <Field key={field.id} id={field.id} name={field.name} placeholder={field.placeholder} require={field.require} col={`col-sm-6 col-12`}/>;
          })}
        </div>

    </div>
  )
}

export default Measurement
