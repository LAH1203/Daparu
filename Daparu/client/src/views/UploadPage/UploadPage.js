import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { Input, Button, } from 'antd';

import Logo from '../Logo';
import FileUpload from '../../utils/FileUpload';
import { ALERT_MSG, API_ADDRESS, CATEGORIES } from '../../utils/constants';

const { TextArea } = Input;

const UploadPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { number } = useSelector(state => state.seller);
  const productId = match.params.productId;
  const [Title, setTitle] = useState(''); // 상품명
  const [Images, setImages] = useState([]); // 상품이미지
  const [Description, setDescription] = useState(''); // 상품 설명
  const [Category, setCategory] = useState(CATEGORIES[0]);
  const [Price, setPrice] = useState(0);  // 가격
  const [Stock, setStock] = useState(0);  // 재고
  const [SellerInfo, setSellerInfo] = useState(''); // 옾카링크/전번

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeDescription = useCallback(e => {
    setDescription(e.target.value);
  }, []);

  const onChangePrice = useCallback(e => {
    setPrice(e.target.value);
  }, []);

  const onChangeCategory = useCallback(e => {
    setCategory(e.target.value);
  }, []);

  const onChangeStock = useCallback(e => {
    setStock(e.target.value);
  }, [])

  const onChangeSellerInfo = useCallback(e => {
    setSellerInfo(e.target.value);
  }, [])

  const updateImages = newImages => {
    setImages(newImages);
  };

  useEffect(() => {
    if (productId) {
      axios.get(`${API_ADDRESS}/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
          const product = response.data.productInfo[0];

          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setStock(product.stock);
          setSellerInfo(product.sellerInfo);
          setImages(product.images);
        })
        .catch(err => alert(err));
    }
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    const { needEveryValue, failProductUpload } = ALERT_MSG;

    // 빠진 값이 있을 경우
    if (!Title || !Description || !Category || !Price || !Stock || Images.length === 0) {
      return alert(needEveryValue);
    }

    const body = {
      writer: number,
      images: Images,
      title: Title,
      description: Description,
      category: Category,
      price: Price,
      stock: Stock,
      sellerInfo: SellerInfo,
    };

    axios.post(API_ADDRESS + '/product/uploads', body)
      .then(response => {
        if (response.data.success) {
          history.push('/mypage');
        } else {
          alert(failProductUpload);
        }
      });
  };

  const updateHandler = e => {
    e.preventDefault();
    const { needEveryValue, failProductUpdate } = ALERT_MSG;

    // 빠진 값이 있을 경우
    if (!Title || !Description || !Category || !Price || !Stock || Images.length === 0) {
      return alert(needEveryValue);
    }

    const body = {
      productId: productId,
      writer: number,
      images: Images,
      title: Title,
      description: Description,
      category: Category,
      price: Price,
      stock: Stock,
      sellerInfo: SellerInfo,
    };

    axios.post(API_ADDRESS + '/product/update', body)
      .then(response => {
        if (response.data.success) {
          history.push('/mypage');
        } else {
          alert(failProductUpdate);
        }
      });
  };
  
  return (
    /*판매자 정보 */

    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Logo width="200px" />
        <h2>{productId
          ? '상품 수정'
          : '상품 등록'}</h2>
      </div>

      <form onSubmit={
        productId
          ? updateHandler
          : submitHandler}>
        {/*썸네일 이미지 선택*/}
        <label>썸네일 이미지</label>
        <br />
        <img style={{ width: '100px', height: '100px' }}
          src={`data:image/png;base64,${Images[0]}`} />
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
        <label>카테고리</label>
        <br />
        <select onChange={onChangeCategory} value={Category} >
          {CATEGORIES.map(item => (
            <option>{item}</option>
          ))}
        </select>
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
