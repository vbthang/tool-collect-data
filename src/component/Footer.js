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

const convertBase64 = (file) => {
  return new Promise((resolve, reject)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const getBase64 = async () => {
  try {
    let frontBase64 = await convertBase64(document.getElementById('frontImg').files[0]);
    let backBase64 = await convertBase64(document.getElementById('backImg').files[0]);
    let sideBase64 = await convertBase64(document.getElementById('sideImg').files[0]);

    let frontStr = frontBase64.split(',')[1];
    let backStr = backBase64.split(',')[1];
    let sideStr = sideBase64.split(',')[1];

    return {
      front: frontStr,
      back: backStr,
      side: sideStr
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const chooseButtonClick = async (e) => {
  e.preventDefault();
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
    const image = await getBase64()
    db['image'] = image
    
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(db)
    };
    fetch('https://thangvb.io.vn/bodydata', data)
    .then(response => response.json()) // Chuyển đổi response sang dạng JSON
    .then(data => console.log(data)) // Xử lý dữ liệu JSON
    .catch(error => console.error('Error:', error)); 
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
