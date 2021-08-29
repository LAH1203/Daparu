import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Logo from '../Logo';

import FileUpload from '../../utils/FileUpload';
import { Input, Button,} from 'antd';

const { TextArea } = Input;

const UploadPage = ({ history }) => {
  const { number } = useSelector(state => state.seller);
  const [Title, setTitle] = useState(''); //상품명
  const [Images, setImages] = useState([]); //상품이미지
  const [Description, setDescription] = useState('')//상품 설명
  const [Price, setPrice] = useState(0)//가격
  const [Stock, setStock] = useState(0)//재고
  const [SellerInfo, setSellerInfo] = useState('')//옾카링크/전번

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const onChangePrice = useCallback((e) => {
    setPrice(e.target.value);
  }, []);

  const onChangeStock = useCallback((e) => {
    setStock(e.target.value);
  }, [])

  const onChangeSellerInfo = useCallback((e)=>{
    setSellerInfo(e.target.value);
  })

  const updateImages = (newImages) => {
    setImages(newImages)
  }

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('submit')

    //빠진 값이 있을 경우
    if (!Title || !Description || !Price || !Stock || Images.length === 0) {//이미지 길이 추가 해야 함
      return alert("모든 값을 넣어주셔야 합니다.")
    }

    //Product에 들어갈 바디
    const body = {
      writer: number,
      images: Images,
      title: Title,
      description: Description,
      price: Price,
      stock: Stock,
      sellerInfo: SellerInfo,
    }

    console.log(body);

    axios.post("http://localhost:5000/api/product/uploads", body)
      .then(response => {
        if (response.data.success) {
          alert('상품 업로드에 성공 했습니다.')
          history.push('/mypage')
        } else {
          alert('상품 업로드에 실패 했습니다.')
        }
      })

  };


  //썸네일 이미지 공란일 때 디자인 뭐하지

  return (
    /*판매자 정보 */

    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Logo width="200px" />
        <h2>상품 업로드</h2>
      </div>

      <form onSubmit={submitHandler}>
        {/*썸네일 이미지 선택*/}
        <label>썸네일 이미지</label>
        <br />
        <img style={{ width: '100px', height: '100px' }}
          src={`http://localhost:5000/${Images[0]}`} />
        <br />
        <label>이름</label>
        <Input onChange={onChangeTitle} value={Title} />
        <br />
        <br />
        {/*상품 이미지 업로드 */}
        <label>상품 이미지 첨부</label>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={onChangeDescription} value={Description} />
        <br />
        <br />
        <label>가격</label>
        <Input type="number" onChange={onChangePrice} value={Price} />
        <br />
        <br />
        <label>재고</label>
        <Input type="number" onChange={onChangeStock} value={Stock} />
        <br />
        <br />
        <label>판매자 문의 링크/전화번호</label>
        <Input onChange={onChangeSellerInfo} value={SellerInfo} />
        <Button htmlType="submit">
          확인
        </Button>
      </form>
    </div>
  )

};

export default UploadPage;