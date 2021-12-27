import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Input } from 'antd';

import FileUpload from '../../utils/FileUpload';
import { ALERT_MSG, API_ADDRESS } from '../../utils/constants';

const { TextArea } = Input;

const ReviewUpload = ({ detail }) => {
  const { me } = useSelector(state => state.user);

  const [Review, setReview] = useState("");
  const [Star, setStar] = useState(0);
  const [Images, setImages] = useState([]);

  const reviewChangeHandler = event => {
    setReview(event.currentTarget.value);
  };

  const starChangeHandler = event => {
    setStar(event.currentTarget.value);
  };

  const updateImages = newImages => {
    setImages(newImages);
  };

  const submitHandler = event => {
    event.preventDefault();
    const { wrongReview, failWriteReview } = ALERT_MSG;

    if (!Review) {
      return alert(wrongReview);
    }

    const body = {
      productId: detail._id,
      writer: me.email,
      review: Review,
      images: Images,
      star: Star,
    };

    axios.post(API_ADDRESS + '/product/review', body)
      .then(response => {
        if (response.data.success) {
          setImages([]);
          setReview('');
        } else {
          alert(failWriteReview);
        }
      });
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
  );
};

export default ReviewUpload;
