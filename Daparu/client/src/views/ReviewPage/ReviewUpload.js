import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Input } from 'antd';

import FileUpload from '../../utils/FileUpload';
import { ALERT_MSG, API_ADDRESS } from '../../utils/constants';
import './ReviewPage.css';

const { TextArea } = Input;

const ReviewUpload = ({ match, history }) => {
  const { me } = useSelector(state => state.user);

  const [Review, setReview] = useState("");
  const [Star, setStar] = useState(0);
  const [Images, setImages] = useState([]);

  const reviewChangeHandler = event => {
    setReview(event.currentTarget.value);
  };

  const starChangeHandler = event => {
    setStar(event.target.value);
  };

  const updateImages = newImages => {
    setImages(newImages);
  };

  const submitHandler = event => {
    event.preventDefault();
    const { wrongReview, failWriteReview } = ALERT_MSG;

    if (!Review || Star < 1) {
      return alert(wrongReview);
    }

    const body = {
      productId: match.params.productId,
      writer: me.email,
      review: Review,
      images: Images,
      star: Star,
    };

    axios.post(API_ADDRESS + '/product/review', body)
      .then(response => {
        if (response.data.success) {
          history.push('/');
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
        <div class='star-rating' onChange={starChangeHandler}>
          <input type='radio' name='star-point' id='5-stars' value='5' />
          <label for='5-stars' class='star'>★</label>
          <input type='radio' name='star-point' id='4-stars' value='4' />
          <label for='4-stars' class='star'>★</label>
          <input type='radio' name='star-point' id='3-stars' value='3' />
          <label for='3-stars' class='star'>★</label>
          <input type='radio' name='star-point' id='2-stars' value='2' />
          <label for='2-stars' class='star'>★</label>
          <input type='radio' name='star-point' id='1-stars' value='1' />
          <label for='1-stars' class='star'>★</label>
        </div>
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
