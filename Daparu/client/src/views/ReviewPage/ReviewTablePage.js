import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ALERT_MSG, API_ADDRESS } from '../../utils/constants';

const ReviewTablePage = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const body = {
      productId,
    };

    axios.post(API_ADDRESS + '/review/show', body)
      .then(res => {
        if (res.data.success) {
          setReviews(res.data.reviews);
        } else {
          alert(ALERT_MSG.failGetAllReviews);
        }
      })
  }, []);

  const setStars = starPoint => {
    const count = [];
    const unCount = [];

    for (let i = 0; i < starPoint; i++) {
      count.push('1');
    }

    for (let i = 0; i < 5 - starPoint; i++) {
      unCount.push('0');
    }

    return (
      <div>
        {count.map(c => <span style={{ color: "#fc0" }}>★</span>)}
        {unCount.map(c => <span style={{ color: "#ccc" }}>★</span>)}
      </div>
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>별점</th>
            <th>내용</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, i) => (
            <tr key={i}>
              <td>{setStars(review.star)}</td>
              <td>{review.review}</td>
              <td>{review.writer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTablePage;
