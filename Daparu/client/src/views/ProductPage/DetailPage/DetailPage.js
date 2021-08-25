import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReviewTablePage from '../../ReviewPage/ReviewTablePage';

//상품 id에 따른 기본적인 설명 레이아웃 만들기
//sections에서 상세 설명 만들고 불러오기(상품 이미지, 상품 설명)
//별점은 평균값을 상품 기본 설명에 추가할 것
function DetailPage(props) {

  
  return (
    <div>
      DetailPage
      {/*썸네일 이미지 */}
      {/*기본 설명(상품명, 가격, 재고?) */}
      {/*구매 버튼 */}

      {/*리뷰게시판 확인용 */}
      <br />
      <br />
      <label>리뷰 게시판</label>
      <ReviewTablePage/>
    </div>
  )
}

export default DetailPage
