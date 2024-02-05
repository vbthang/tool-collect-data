import React, { useRef, useState } from 'react';

const FieldImage = (props) => {
  const fileInput = useRef(null);
  const videoRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const chooseButtonClick = () => {
    fileInput.current.click();
  };

  const FileChange = (event) => {
    const selectedFile = event.target.files[0];

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

   // Hàm kiểm tra xem tên đuôi có phải là ảnh hay không
   const isImageFile = (fileName) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = fileName.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  return (
    <div className='fieldimage d-flex row container-fluid justify-content-around'>
      <div className='col-7'>
        <h4>{props.name}</h4>
        <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={FileChange} />
        <input type="text" value={selectedFileName} readOnly onClick={chooseButtonClick} />
      </div>

      <div className='button mt-2 col-5'>
        <button onClick={chooseButtonClick}>Choose</button>
        {/* <button onClick={cameraButtonClick}>Camera</button> */}
      </div>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay></video>
    </div>
  );
};

export default FieldImage;