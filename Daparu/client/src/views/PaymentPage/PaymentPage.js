import React, { useCallback, useState, useMemo } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from 'antd';

import PopupAddress from '../../utils/Address/PopupAddress';
import PopupDom from '../../utils/Address/PopupDom';
import Paypal from '../../utils/Paypal';
import Kakao from '../../utils/Kakao/Kakao';
import { ALERT_MSG, API_ADDRESS } from '../../utils/constants';

// 페이팔 아이디 : sb-offjw6957667@personal.example.com
// 비밀번호 : 123456789
function PaymentPage({ total, cartDetail, history }) {

  //결제api 사용하여 테스트 결제 진행
  //결제 내역 갱신
  //상품 재고 빼기

  const [PopOpen, setPopOpen] = useState(false);  // 팝업창 열고 닫기
  const [Name, setName] = useState(''); // 수령인 이름
  const [Address, setAddress] = useState(''); // 주소
  const [DetailAddress, setDetailAddress] = useState(''); // 상세주소
  const [Zonecode, setZonecode] = useState(''); // 우편번호
  const [Number, setNumber] = useState(''); // 전화번호

  const { me, isLoggedIn } = useSelector(state => state.user);

  const onChangeName = useCallback(e => {
    setName(e.target.value);
  }, []);

  const onChangeNumber = useCallback(e => {
    setNumber(e.target.value);
  }, []);

  const onChangeDetailAddress = useCallback(e => {
    setDetailAddress(e.target.value);
  }, []);

  // 주소 팝업창 열기
  const openPop = () => {
    setPopOpen(true);
  };

  // 주소 팝업창 닫기
  const closePop = () => {
    setPopOpen(false);
  };

  const getAddress = address => {
    setAddress(address);
  };

  const getZonecode = zonecode => {
    setZonecode(zonecode);
  };

  const submitHandler = e => {
    e.preventDefault();

    // 빠진 값이 있을 경우
    if (!Name || !Number || !Address || !DetailAddress || !Zonecode) {
      return alert(ALERT_MSG.needEveryValue);
    }

    // Product에 들어갈 바디
    const body = {
      user: me.email,
      data: {
        name: Name,
        number: Number,
        address: Address + " " + DetailAddress,
        zonecode: Zonecode,
      },
      product: {
        productInfo : cartDetail,
        price : total,
      },
    };

    axios.post(API_ADDRESS + '/payment/successBuy', body)
      .then(response => {
        const { successBuy, failBuy } = ALERT_MSG;
        if (response.data.success) {
          alert(successBuy);
          history.push('/mypage')
        } else {
          alert(failBuy);
          history.push('/')
        }
      });
  };

  const formStyle = useMemo(() => ({
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }), []);

  const inputStyle = useMemo(() => ({
    width: 200,
  }), []);
  
  const addressStyle = useMemo(() => ({
    width: 350,
  }), []);

  return (
    <div>
      <div>
        <h2>결제 정보 입력</h2>
      </div>

      <form style={formStyle} onSubmit={submitHandler}>
        {/*썸네일 이미지 선택*/}
        <br />
        <label>수령인: <Input onChange={onChangeName} style={inputStyle} placeholder="이름" value={Name} /></label>
        <br />
        <label>전화번호: <Input onChange={onChangeNumber} type="tel" style={inputStyle} placeholder="전화번호" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" value={Number} /></label>
        <br />
        <label>우편번호: <Input value={Zonecode} style={inputStyle} placeholder="우편번호" />
          <Button type='button' onClick={openPop}>주소 검색</Button></label>
        <br />
        <label>주소: <Input value={Address} style={addressStyle} placeholder="주소" /></label>
        <br />
        <label>상세주소: <Input onChange={onChangeDetailAddress} style={addressStyle} placeholder="상세주소" value={DetailAddress} /></label>

        <div id='popupDom'>
          {PopOpen && (
            <PopupDom>
              <PopupAddress addressfunction={getAddress} zoneCodefunction={getZonecode} onClose={closePop} />
            </PopupDom>
          )}
        </div>
        <br />

        
        <Button htmlType="submit" >
          구매
        </Button>
      </form>
    </div>
  )
}
//카카오 결제와 페이팔 : 안 예뻐서 따로 빼둠
//<Kakao total={total} />
  //      {Boolean(total) && <Paypal
    //      total={total}
      //  />}
export default PaymentPage;
