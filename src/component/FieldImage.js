import React, { useRef, useState } from 'react';

const FieldImage = (props) => {
  const fileInput = useRef(null);
  const videoRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [baseImage, setBaseImage] = useState('');

  const chooseButtonClick = () => {
    fileInput.current.click();
  };

  const uploadImage = async(e) => {
    const selectedFile = e.target.files[0];
    const base64 = await convertBase64(selectedFile);
    console.log(base64);
    setBaseImage(base64);

    //chuyển từ base64 sang ảnh
    base64ToImage(base64)
    .then((image) => {
      console.log("Converted image:", image);
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
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = fileName.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const cameraButtonClick = () => {
    try {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Thêm sự kiện loadedmetadata để đảm bảo rằng kích thước video đã sẵn sàng
            videoRef.current.addEventListener('loadedmetadata', () => {
              capturePhoto(); // Gọi hàm capturePhoto khi kích thước video sẵn sàng
            });
          }
        })
        .catch((error) => {
          console.error("Error opening camera:", error);
        });
    } catch (error) {
      console.error("Error accessing getUserMedia:", error);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL('image/png');
    const blob = dataURLtoBlob(imageDataURL);
    const file = new File([blob], 'picture.png', { type: 'image/png' });

    setSelectedFileName(file.name);
    saveToFile(file);
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const saveToFile = (file) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
  };


  return (
    <div className='fieldimage d-flex row container-fluid justify-content-around'>
      <div className='image col-7'>
        <h4>{props.name}</h4>
        <input id={props.name} type="file" ref={fileInput} style={{ display: 'none' }} onChange={(e) => {
          uploadImage(e);
        }} />
        <br></br>
        {/* <img src={baseImage} height="200px" /> */}
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