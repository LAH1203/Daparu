import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col } from 'antd';

import Logo from '../../Logo';
import { addToCart } from '../../../reducers/user'
import ProductImage from '../Sections/ProductImage';
import ProductInfo from '../Sections/ProductInfo';
import ReviewTablePage from '../../ReviewPage/ReviewTablePage';
import onClickDeleteProductButton from '../../MyPage/MyPage';
import { ALERT_MSG, API_ADDRESS } from '../../../utils/constants';
import QnAPage from '../../QnAPage/QnAPage';

//상품 id에 따른 기본적인 설명 레이아웃 만들기
//sections에서 상세 설명 만들고 불러오기(상품 이미지, 상품 설명)
//별점은 평균값을 상품 기본 설명에 추가할 것
const DetailPage = ({ match, history }) => {
  const productId = match.params.productId;
  const [Product, setProduct] = useState({});
  const { number } = useSelector(state => state.seller);
  const { isLoggedIn, me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${API_ADDRESS}/product/products_by_id?id=${productId}&type=single`)
      .then(response => {
        setProduct(response.data.productInfo[0]);
      })
      .catch(err => alert(err));
  }, []);

  const clickHandler = () => {
    if (!isLoggedIn) {
      history.push('/signin');
    }
  
    const body = {
      email: me.email,
      productId: productId,
    };
    dispatch(addToCart(body));
    let result = window.confirm(ALERT_MSG.successAddCart);
    if (result) {
      history.push('/cart');
    } else {
      history.push('/');
    }
  };

  const onClickNavImage = () => {
    document.getElementById('image').hidden = false;
    document.getElementById('review').hidden = true;
    document.getElementById('qna').hidden = true;
  };

  const onClickNavReview = () => {
    document.getElementById('image').hidden = true;
    document.getElementById('review').hidden = false;
    document.getElementById('qna').hidden = true;
  };

  const onClickNavQna = () => {
    document.getElementById('image').hidden = true;
    document.getElementById('review').hidden = true;
    document.getElementById('qna').hidden = false;
  };

  const navStyle = useMemo(() => ({
    margin: '20px 0 20px 0',
    textAlign: 'center',
  }), []);

  const navButtonStyle = useMemo(() => ({
    display: 'inline-block',
    margin: '0 10% 0 10%',
    cursor: 'pointer',
  }), []);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <Logo width="200px" />
        <h1>{Product.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/*기본 설명(상품명, 가격, 재고, 총 평점) */}
          <ProductInfo detail={Product} />
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/*카트 버튼 */}
        {Product.stock ? <Button onClick={clickHandler}>Add to Cart</Button>
        : <Button>품절</Button>}

        {/*수정/삭제 버튼 */}
        {
          number === Product.writer && (
            <Button onClick={() => history.push(`/uploads/${productId}`)}>수정</Button>,
            <Button value={productId} onClick={onClickDeleteProductButton}>삭제</Button>
          )}
      </div>

      <div style={navStyle}>
        <b style={navButtonStyle} onClick={onClickNavImage}>상세 이미지</b>
        <b style={navButtonStyle} onClick={onClickNavReview}>리뷰 게시판</b>
        <b style={navButtonStyle} onClick={onClickNavQna}>Q&A 게시판</b>
      </div>

      <center id='image'>
        <Row lg={12} sm={24}>
          {/*이미지 */}
          <ProductImage detail={Product} />
        </Row>
      </center>

      {/*리뷰게시판*/}
      <center id='review' hidden>
        <ReviewTablePage productId={productId} />
      </center>

      {/*QnA 게시판 = 판매자 문의 정보란 */}
      <center id='qna' hidden>
        <QnAPage history={history} productId={productId} />
      </center>
    </div>
  );
};

export default DetailPage;
