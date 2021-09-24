import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import { Button, Form, Input } from 'antd'

const { TextArea } = Input;

function ReviewUpload({ detail, history }) {

  const { me } = useSelector(state => state.user);


  const [Title, setTitle] = useState("")
  const [Review, setReview] = useState("")
  const [Star, setStar] = useState(0)
  const [Images, setImages] = useState([])

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value)
  }

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

    if (!Title || !Review) {
      return alert("모든 값을 넣어주셔야 합니다.")
    }

    const body = {
      productId: detail._id,
      email: me.email,
      title: Title,
      review: Review,
      images: Images,
    }

    console.log(body);

    axios.post('http://localhost:5000/api/user/review', body)
      .then(response => {
        
        if (response.data.success) {
          alert('리뷰등록')
          history.push(`/product/${detail._id}`)
        } else {
          alert(response.data.message);
        }
      })
  }


  return (
    <div>


      <Form onSubmit={submitHandler}>
        <br />
        <br />
        <label>제목</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>내용</label>
        <TextArea onChange={reviewChangeHandler} value={Review} />
        <br />
        <br />
        <label>이미지</label>
        <FileUpload type="Button" refreshFunction={updateImages} icon="UploadOutlined" />
        <br />
        <Button type="submit">
          확인
        </Button>
      </Form>
    </div>
  )
}

export default ReviewUpload
