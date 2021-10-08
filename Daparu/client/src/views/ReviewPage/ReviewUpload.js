import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import { Button, Input } from 'antd'

const { TextArea } = Input;

function ReviewUpload({ detail, history }) {

  const { me } = useSelector(state => state.user);

  const [Review, setReview] = useState("")
  const [Star, setStar] = useState(0)
  const [Images, setImages] = useState([])

 
  const reviewChangeHandler = (event) => {
    setReview(event.currentTarget.value)
  }

  const starChangeHandler = (event) => {
    setStar(event.currentTarget.value)
  }

  const updateImages = (newImages) => {
    setImages(newImages)
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Review) {
      return alert("내용을 넣어주셔야 합니다.")
    }

    const body = {
      productId: detail._id,
      writer: me.email,
      review: Review,
      images: Images,
      star: Star,
    }



    axios.post('http://localhost:5000/api/product/review', body)
      .then(response => {
        
        if (response.data.success) {
          alert('리뷰등록')
          setImages([])
          setReview('')
        } else {
          alert('리뷰등록 실패')
        }
      })
  }


  return (
    <div>
      <form onSubmit={submitHandler}>
        <br />
        <br />
        <label>리뷰</label>
        <TextArea onChange={reviewChangeHandler} value={Review} />
        <br />
        <br />
        <label>이미지 첨부</label>
        <FileUpload type="Button" refreshFunction={updateImages} icon="UploadOutlined" />
        <br />
        <Button htmlType="submit">
          확인
        </Button>
      </form>
    </div>
  )
}

export default ReviewUpload
