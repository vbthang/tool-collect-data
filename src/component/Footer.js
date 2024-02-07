import React from 'react'
import { data } from '../data/FetchData';

function getValueFromFields(fields, category, db) {
  for (const [key, value] of Object.entries(fields)) {
    const inputElem = document.getElementById(key)
    const inputValue = inputElem.value;
    if (inputElem.required) 
      if (inputValue === '') {
        alert(`${fields[key]['name']} is required`);
        throw new Error('Not have value');
    }
    const parsedValue = parseFloat(inputValue);

    if (!isNaN(parsedValue)) {
      db[category][key] = parsedValue;
    } else {
      db[category][key] = inputValue;
    }
  }
}

const chooseButtonClick = (e) => {
  
  const db = {
    'info': {},
    'volume': {},
    'linear': {},
    'image': {}
  };
  const info = data['info'];
  const volume = data['volume'];
  const linear = data['linear'];
  try {
    getValueFromFields(info, 'info', db);
    getValueFromFields(volume, 'volume', db);
    getValueFromFields(linear, 'linear', db);
    console.log(db);
    e.preventDefault();
  } catch (error) {
    console.error(error);
  }
};

const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <button id='btn' className='fw-bold fs-5' onClick={chooseButtonClick}>Submit</button>
      </div>
    </div>
  )
}

export default Footer;
