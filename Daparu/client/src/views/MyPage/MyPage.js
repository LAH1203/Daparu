import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { logoutAction } from '../../reducers/user';
import { registerSellerAction, logoutSellerAction } from '../../reducers/seller';
import { ALERT_MSG, API_ADDRESS } from '../../utils/constants';
import Logo from '../Logo';
import '../../utils/table.css';

const MyPage = ({ history }) => {
    const dispatch = useDispatch();
    let { number, name, product } = useSelector(state => state.seller);
    const { isLoggedIn, me } = useSelector(state => state.user);

    const onClickLogoutButton = useCallback(() => {
        if (window.confirm('로그아웃하시겠습니까?')) {
            dispatch(logoutAction());
            dispatch(logoutSellerAction());
            history.push('/');
        }
    }, []);

    const onClickRemoveUserButton = useCallback(() => {
        if (window.confirm('탈퇴하시겠습니까?')) {
            const body = {
                email: me.email
            };

            axios.post(API_ADDRESS + '/user/remove', body)
                .then(res => {
                    if (res.data.success) {
                        dispatch(logoutAction());
                        dispatch(logoutSellerAction());
                        history.push('/');
                    } else {
                        alert(ALERT_MSG.failDeleteUser);
                    }
                });
        }
    }, []);

    const onClickRemoveSellerButton = useCallback(() => {
        if (window.confirm('판매자 정보를 삭제하시겠습니까?')) {
            const body = {
                email: me.email,
                number: number,
            };

            axios.post(API_ADDRESS + '/seller/remove', body)
                .then(res => {
                    if (res.data.success) {
                        dispatch(logoutSellerAction());
                        history.push('/mypage');
                    } else {
                        alert(ALERT_MSG.failDeleteSeller);
                    }
                });
        }
    }, []);

    const onClickDeleteProductButton = useCallback(e => {
        if (window.confirm('상품을 삭제하시겠습니까?')) {
            // 상품 삭제 function 구현
            const body = {
                id: e.currentTarget.getAttribute('value'),
                number: number,
            };

            axios.post(API_ADDRESS + '/product/remove', body)
                .then(res => {
                    if (res.data.success) {
                        product = res.data.product;
                        dispatch(registerSellerAction({ number, name, product }));
                        history.push('/mypage');
                    } else {
                        alert(ALERT_MSG.failDeleteProduct);
                    }
                })
        }
    }, []);

    const infoStyle = useMemo(() => ({
        marginRight: '5px',
    }), []);

    return (
        <center>
            <Logo width="200px" />
            {/* 내 정보 */}
            {isLoggedIn && 
                <div>
                    <h2>내 정보</h2>
                    <div><b style={infoStyle}>이메일</b>|| {me.email}</div>
                    <div><b style={infoStyle}>이름</b>|| {me.name}</div>
                    <Button onClick={onClickLogoutButton}>로그아웃</Button>
                    <Button type="primary" danger onClick={onClickRemoveUserButton}>탈퇴</Button>
                    <br />
                    <br />
                    <hr />
                </div>        
            }
            
            {/* 판매자 등록 -> 아직 판매자로 등록되어 있지 않은 경우 */}
            {
                !number &&
                <Button onClick={() => history.push('/registerSeller')}>
                    판매자 등록
                </Button>
            }
            
            {/* 판매자 정보 -> 판매자로 등록되어 있을 경우 */}
            {number && 
                <div>
                    <h2>판매자 정보</h2>
                    <div><b style={infoStyle}>사업자 등록 번호</b>|| {number}</div>
                    <div><b style={infoStyle}>상호명</b>|| {name}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>가격(원)</th>
                                <th>재고량(개)</th>
                                <th>판매량(개)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((p, i) => {
                                return (
                                    <tr>
                                        <td>{p.title}</td>
                                        <td>{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.sold}</td>
                                        <td>
                                            <Button onClick={() => history.push(`/uploads/${p._id}`)}>수정</Button>
                                            <Button value={p._id} onClick={onClickDeleteProductButton}>삭제</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Button onClick={() => history.push('/uploads')}>판매 물품 등록</Button>
                    <Button type="primary" danger onClick={onClickRemoveSellerButton}>판매자 해지</Button>
                </div>
            }
            
            {/* 구매/결제 내역 */}

            {/* 내가 적은 후기 모아보기 */}
            
        </center>
    );
};

export default MyPage;