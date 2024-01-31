// MS.js
import React from 'react'
import { data } from '../data/FetchData'
import Field from './Field'

const Header = () => {
  const infoFields = Object.values(data['info']);

  return (
    <div className='row'>
      <h1 className='container-fluid bg-success-subtle fixed-top text-center fw-semibold py-2'>Collect Data</h1>
      <div className='info container-fluid row d-flex justify-content-around pt-8'>
        {infoFields.map((field) => {
          return <Field key={field.id} id={field.id} name={field.name} placeholder={field.placeholder} require={field.require} col={`col-2`}/>;
        })}
      </div>
    </div>
  );
}

export default Header;
