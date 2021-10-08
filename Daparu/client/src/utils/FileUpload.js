import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload(props) {

  const [Images, setImages] = useState([]);
  

  const dropHandler = (files) => {
    let formData = new FormData();
    //console.log(files);

    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }

    formData.append("file", files[0])

    axios.post('http://localhost:5000/api/product/images', formData, config)
      .then(response => {
        if (response.data.success) {
          setImages([...Images, response.data.fileBuffer])
          props.refreshFunction([...Images, response.data.fileBuffer])
          console.log(response.data)
          alert('이미지 저장')
        } else {
          alert('이미지 저장 실패')

        }
      })    
  }



  const sampleHandler = (image) => {//한 번 클릭으로 썸네일 이미지 선택
    //console.log(Images.indexOf(image))
    //console.log(Images)
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1)//기존 이미지 삭제
    newImages.splice(0,0,image);//썸네일 이미지의 인덱스 이동
    setImages(newImages)
    props.refreshFunction(newImages)

}

const deleteHandler = (image) => {//더블클릭 시 이미지 삭제
  const currentIndex = Images.indexOf(image);
  let newImages = [...Images];
  newImages.splice(currentIndex, 1)
  setImages(newImages)
  props.refreshFunction(newImages)
}


  return (
    <div>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </div>
          </section>
        )}
      </Dropzone>


      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>

        {Images.map((image, index) => (
          <div onClick={()=> sampleHandler(image)} onDoubleClick={()=>deleteHandler(image)} key={index}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`data:image/png;base64,${image}`}
            />
          </div>
        ))}

      </div>
    </div>
  )


}

export default FileUpload
