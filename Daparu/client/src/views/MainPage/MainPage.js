import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Input, Button, Row, Col, Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Meta from "antd/lib/card/Meta";

import ImageSlider from '../../utils/ImageSlider';
import { ALERT_MSG, API_ADDRESS, BANNER_IMAGES, CATEGORIES } from "../../utils/constants";

const { Search } = Input;

const MainPage = ({ history }) => {
    const [searchText, setSearchText] = useState('');
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState('');

    const { isLoggedIn } = useSelector(state => state.user);

    const search = () => {
        let body = {
            searchText: searchText,
            category: category,
        };
        getProducts(body);
    };

    // 검색 필터 X (초기 상태)
    useEffect(() => {
        search();
    }, []);

    // 검색 필터 O
    // 필터가 설정될 때마다 실행
    useEffect(() => {
        search();
    }, [searchText, category]);

    const getProducts = body => {
        axios.post(API_ADDRESS + '/product/products', body)
            .then(res => {
                if (res.data.success) {
                    setProduct(res.data.productInfo);
                } else {
                    alert(ALERT_MSG.failLoadProducts);
                }
            });
    };

    const onClickLogo = () => {
        setSearchText('');
        setCategory('');

        search();
    };

    const onChangeSearch = e => {
        setSearchText(e.target.value);
    };

    const selectCategory = e => {
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

    const cartButtonStyle = useMemo(() => ({
        marginTop: '20px',
        marginLeft: 'auto',
    }), []);

    const userButtonStyle = useMemo(() => ({
        float: 'right',
        marginTop: '20px',
        marginRight: '5%',
    }), []);

    const logoStyle = useMemo(() => ({
        cursor: 'pointer',
        marginLeft: '10px',
        marginRight: '10px',
    }), []);

    const searchArea = useMemo(() => ({
        display: 'flex',
        width: '80%',
    }), []);

    const searchStyle = useMemo(() => ({
        marginBottom: '10px',
        flex: '1',
    }), []);

    const categoryArea = useMemo(() => ({
        display: 'flex',
        width: '80%',
        marginTop: '20px',
        marginBottom: '20px',
    }), []);

    const categoryStyle = useMemo(() => ({
        flex: '1',
        cursor: 'pointer',
    }), []);

    return (
        <>
            {!isLoggedIn && 
                <Button 
                    style={userButtonStyle} 
                    onClick={() => { history.push('/signin') }}
                >로그인</Button>
            }
            {isLoggedIn && 
                <div style={{ display: 'flex' }}>
                    <Button 
                        style={cartButtonStyle}
                        onClick={() => { history.push('/cart') }}
                    >
                        <ShoppingCartOutlined />
                    </Button>
                    <Button
                        style={userButtonStyle} 
                        onClick={() => { history.push('/mypage') }}
                    >마이페이지</Button>
                </div>
            }

            <br />

            <center>
                <div style={searchArea}>
                    <h2 style={logoStyle} onClick={onClickLogo}>Daparu</h2>
                    <Search value={searchText} onChange={onChangeSearch} placeholder="검색어를 입력하세요" onSearch={search} style={searchStyle} enterButton></Search>
                </div>
                <ImageSlider images={BANNER_IMAGES} />
                <div style={categoryArea}>
                    {CATEGORIES.map((nowCategory, idx) => (
                        <div key={idx} style={categoryStyle} onClick={selectCategory}><b>{nowCategory}</b></div>
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