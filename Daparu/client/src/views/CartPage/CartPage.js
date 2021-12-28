import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Checkbox } from "antd";
import { CloseOutlined } from '@ant-design/icons';

import PaymentPage from "../PaymentPage/PaymentPage";
import { ALERT_MSG, API_ADDRESS } from "../../utils/constants";
import Logo from '../Logo';
import './cartTable.css';

const CartPage = ({ history }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [ShowPay, setShowPay] = useState(false);
    const [checkedItems, setcheckedItems] = useState([]);

    const { me } = useSelector(state => state.user);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = () => {
        const body = {
            email: me.email,
        };

        axios.post(API_ADDRESS + '/cart', body)
            .then(res => {
                if (res.data.success) {
                    setCartItems(res.data.cart);
                    setcheckedItems(res.data.cart);
                    let newTotal = 0;
                    for (let i = 0; i < res.data.cart.length; i++) {
                        const price = res.data.cart[i].productInfo.price * res.data.cart[i].quantity;
                        newTotal += price;
                    }
                    setTotal(newTotal);
                } else {
                    alert(ALERT_MSG.failGetCart);
                }
            });
    }

    const deleteItemFunction = e => {
        if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
            const body = {
                id: e.target.value,
                email: me.email,
            };

            axios.post(API_ADDRESS + '/cart/delete', body)
                .then(res => {
                    if (res.data.success) {
                        getCart();
                    } else {
                        alert(ALERT_MSG.failDeleteCartProduct);
                    }
                });
        }
    };

    const onChangeFunction = e => {
        const product = e.target.value;
        const price = product.productInfo.price * product.quantity;

        if (e.target.checked) {
            setTotal(total + price);
            setcheckedItems([...checkedItems, product]);
        } else {
            setTotal(total - price);
            setcheckedItems(checkedItems.filter(items => items.id !== product.productInfo._id));
        }


    };

    const onClickPaymentButton = () => {
        if (total <= 0) {
            return alert(ALERT_MSG.wrongPurchaseItems);
        } else {
            setShowPay(true);
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
                                <td><Checkbox defaultChecked value={p} onChange={onChangeFunction} /></td>
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

            {ShowPay ? <PaymentPage total={total} cartDetail={checkedItems}/>
            : <Button onClick={onClickPaymentButton}>결제하기</Button>}
        </center>
    );
};

export default CartPage;
