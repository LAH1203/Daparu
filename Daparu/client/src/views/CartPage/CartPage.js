import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Button, Checkbox } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import Logo from '../Logo';
import './cartTable.css';
import PaymentPage from "../PaymentPage/PaymentPage";

const CartPage = ({ history }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [ShowPay, setShowPay] = useState(false)

    const { me } = useSelector(state => state.user);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = () => {
        const body = {
            email: me.email,
        };

        axios.post('http://localhost:5000/api/cart', body)
            .then(res => {
                if (res.data.success) {
                    setCartItems(res.data.cart);
                    console.log(res.data.cart);
                    let newTotal = 0;
                    for (let i = 0; i < res.data.cart.length; i++) {
                        const price = res.data.cart[i].productInfo.price * res.data.cart[i].quantity;
                        newTotal += price;
                    }
                    setTotal(newTotal);
                } else {
                    alert('장바구니 정보를 가져오는데 실패하였습니다.');
                }
            });
    }

    const deleteItemFunction = (e) => {
        if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
            console.log(e.target.value);
            const body = {
                id: e.target.value,
                email: me.email,
            };

            axios.post('http://localhost:5000/api/cart/delete', body)
                .then(res => {
                    if (res.data.success) {
                        alert('삭제 성공');
                        getCart();
                    } else {
                        alert('삭제 실패');
                    }
                });
        }
    };

    const onChangeFunction = (e) => {
        if (e.target.checked) {
            setTotal(total + e.target.value);
        } else {
            setTotal(total - e.target.value);
        }
    };

    const onClickPaymentButton = () => {
        if (total <= 0) {
            return alert('구매할 상품을 선택해주세요!');
        }

        else {
            setShowPay(true)
        }

  
    };

    return (
        <center>
            <Logo width='300px' />
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><h3>상품</h3></th>
                        <th><h3>담은 개수</h3></th>
                        <th><h3>가격</h3></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((p, i) => {
                        return (
                            <tr>
                                <td><Checkbox defaultChecked value={p.productInfo.price * p.quantity} onChange={onChangeFunction} /></td>
                                <td onClick={() => { history.push(`/product/${p.productInfo._id}`) }}><b style={{ cursor: 'pointer' }}>{p.productInfo.title}</b></td>
                                <td><h3>{p.quantity}</h3></td>
                                <td><h3>{p.productInfo.price * p.quantity}</h3></td>
                                <td><Button value={p.id} style={{ borderColor: 'transparent', border: 'none' }} onClick={deleteItemFunction}><CloseOutlined /></Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <br />

            <h2>총 {total} 원</h2>

            <br />

            {ShowPay ? <PaymentPage total={total} cartDetail={cartItems}/>
            : <Button onClick={onClickPaymentButton}>결제하기</Button>}
        </center>
    );
};

export default CartPage;