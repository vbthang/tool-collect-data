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

const resizeImageIfNeeded = async (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (file.size <= maxSize) {
    return file;
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const scaleFactor = maxSize / file.size;
          const newWidth = Math.floor(img.width * scaleFactor);
          const newHeight = Math.floor(img.height * scaleFactor);

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          }, file.type);
        };
      };
    });
  }
};

const getBase64 = async () => {
  try {
    let frontFile = await resizeImageIfNeeded(document.getElementById('frontImg').files[0]);
    let backFile = await resizeImageIfNeeded(document.getElementById('backImg').files[0]);
    let sideFile = await resizeImageIfNeeded(document.getElementById('sideImg').files[0]);

    let frontBase64 = await convertBase64(frontFile);
    let backBase64 = await convertBase64(backFile);
    let sideBase64 = await convertBase64(sideFile);

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
};

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
    .then(response => {
      if (response.status === 200) {
        alert('OK');
        clearFormFields();
      }
      return response.json(); // Chuyển đổi response sang dạng JSON
    })
    .then(data => console.log(data)) // Xử lý dữ liệu JSON
    .catch(error => console.error('Error:', error)); 
  } catch (error) {
    console.error(error);
  }
};

const clearFormFields = () => {
  const fields = document.querySelectorAll('input[type="text"]');
  fields.forEach(field => {
    field.value = '';
  });

  document.getElementById('frontImg').value = null;
  document.getElementById('backImg').value = null;
  document.getElementById('sideImg').value = null;
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
