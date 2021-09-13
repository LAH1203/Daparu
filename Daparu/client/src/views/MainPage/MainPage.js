import React, { useState, useMemo, useEffect } from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";

import ImageSlider from '../../utils/ImageSlider';

import { Input, Button, Row, Col, Card } from 'antd';
import Meta from "antd/lib/card/Meta";
import axios from "axios";
const { Search } = Input;

const MainPage = ({ history }) => {
    const [searchText, setSearchText] = useState('');
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState('');

    const { isLoggedIn } = useSelector(state => state.user);

    // 임시 이미지
    const images = [
        "upload/1629864100536_루루애오.jfif",
        "upload/1629864075511_logo_title.png"
    ];
    const categories = [
        '의류',
        '뷰티',
        '식품',
        '생활',
        '반려동물',
        '홈인테리어',
        '가전/디지털',
        '취미',
        '문구/오피스'
    ];

    useEffect(() => {
        let body = {
            searchText: '',
            category: '',
        };

        getProducts(body);
    }, []);

    useEffect(() => {
        let body = {
            searchText: searchText,
            category: category,
        };

        getProducts(body);
    }, [searchText, category]);

    const getProducts = (body) => {
        console.log('getProducts 실행');

        axios.post('http://localhost:5000/api/product/products', body)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    //setProduct([...product, ...res.data.productInfo]);
                    setProduct(res.data.productInfo);
                } else {
                    alert('상품 정보를 가져오는데 실패하였습니다.');
                }
            });
    };

    const onClickLogo = () => {
        setSearchText('');
        setCategory('');

        const body = {
            searchText: '',
            category: '',
        };
        getProducts(body);

        history.push('/');
    };

    const onChangeSearch = (e) => {
        setSearchText(e.target.value);
    };

    const onSearch = () => {
        const body = {
            searchText: searchText,
            category: category
        };

        getProducts(body);
    };

    const selectCategory = (e) => {
        setCategory(e.target.innerText);
    };

    const renderCards = product.map((item, idx) => {
        return (
            <Col lg={6} md={8} xs={24} key={idx}>
                <Card  onClick={() => { history.push(`/product/${item._id}`) }} >
                    <Meta title={item.title} description={`${item.price}원`} />
                </Card>
            </Col>
        );
    });

    const userButtonStyle = useMemo(() => ({
        float: 'right',
        marginTop: '20px',
        marginRight: '5%'
    }), []);
    const searchStyle = useMemo(() => ({
        marginBottom: '10px',
        flex: '1'
    }), []);

    return (
        <>
            {!isLoggedIn && <Button style={userButtonStyle} onClick={() => { history.push('/signin') }}>로그인</Button>}
            {isLoggedIn && <Button style={userButtonStyle} onClick={() => { history.push('/mypage') }}>마이페이지</Button>}

            <br />
            <br />
            <br />

            <center>
                <div style={{ display: 'flex', width: '80%' }}>
                    <h2 style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '10px' }} onClick={onClickLogo}>Daparu</h2>
                    <Search value={searchText} onChange={onChangeSearch} placeholder="검색어를 입력하세요" onSearch={onSearch} style={searchStyle} enterButton></Search>
                </div>
                <ImageSlider images={images} />
                <div style={{ display: 'flex', width: '80%', marginTop: '20px', marginBottom: '20px' }}>
                    {categories.map((cate, idx) => (
                        <div key={idx} style={{ flex: '1', cursor: 'pointer' }} onClick={selectCategory}><b>{cate}</b></div>
                    ))}
                </div>

                {/* Cards */}
                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>
            </center>

        </>
    );
};

export default MainPage;