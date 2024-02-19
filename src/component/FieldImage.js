import React, { useRef, useState } from 'react';

const FieldImage = (props) => {
  const fileInput = useRef(null);
  const videoRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [baseImage, setBaseImage] = useState('');

  const chooseButtonClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const uploadImage = async(e) => {
    const selectedFile = e.target.files[0];
    const base64 = await convertBase64(selectedFile);
    // console.log(base64);
    setBaseImage(base64);

    //chuyển từ base64 sang ảnh
    base64ToImage(base64)
    .then((image) => {
      // console.log("Converted image:", image);
      // document.body.appendChild(image); // Thêm hình ảnh vào trang web
    })
    .catch((error) => {
      console.error("Error converting base64 to image:", error);
    });



    if (selectedFile) {
      const fileName = selectedFile.name;
      // Kiểm tra xem tên đuôi có phải là ảnh hay không
      if (isImageFile(fileName)) {
        setSelectedFileName(fileName);
        if (props.onFileSelected) {
          props.onFileSelected(fileName);
        }
      } else {
        // Nếu không phải ảnh, bạn có thể xử lý tùy ý, ví dụ, thông báo cho người dùng
        alert('Chỉ chấp nhận tệp hình ảnh');
      }
    }
  };


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


const base64ToImage = (base64String) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = base64String;
  });
};

   // Hàm kiểm tra xem tên đuôi có phải là ảnh hay không
   const isImageFile = (fileName) => {
    const allowedExtensions = ['jpg', 'png', 'gif', 'jpeg'];
    const extension = fileName.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  return (
    <div className='fieldimage d-flex row container-fluid justify-content-around'>
      <div className='image col-7 mb-2'>
        <h4>{props.name}</h4>
        <input id={props.id} type="file" ref={fileInput} style={{ display: 'none' }} onChange={(e) => {
          uploadImage(e);
        }} />
        {/* <br></br> */}
        <input type="text" value={selectedFileName} readOnly onClick={chooseButtonClick} placeholder='Click here'/>
      </div>

      <div className='button mt-2 col-5'>
        {/* <button onClick={chooseButtonClick}>Choose</button> */}
      </div>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay></video>
    </div>
  );
};

export default FieldImage;