import React from 'react';
import DaumPostcode from "react-daum-postcode";

const PopupAddress = (props) => {

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data) //데이터
    console.log(fullAddress) //주소
    console.log(data.zonecode) //우편번호

    props.addressfunction(fullAddress)//주소 전달
    props.zoneCodefunction(data.zonecode)//우편번호 전달
    props.onClose()//닫기
  }

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "600px",
    height: "600px",
    padding: "7px",
  };

  const buttonStyle = {
    width: 200,
    marginBottom: '10px'
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      <button type='button' style={buttonStyle} onClick={() => { props.onClose() }} className='postCode_btn'>종료</button>
    </div>
  )
}

export default PopupAddress;