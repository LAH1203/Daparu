import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from 'antd';

import { registerSellerAction } from '../../reducers/seller';
import { ALERT_MSG, API_ADDRESS } from '../../utils/constants';

const RegisterSellerPage = ({ history }) => {
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [name, setName] = useState('');

    const onChangeNumber1 = useCallback(e => {
        setNumber1(e.target.value);
    }, []);

    const onChangeNumber2 = useCallback(e => {
        setNumber2(e.target.value);
    }, []);

    const onChangeNumber3 = useCallback(e => {
        setNumber3(e.target.value);
    }, []);

    const onChangeName = useCallback(e => {
        setName(e.target.value);
    }, []);

    const onSubmitForm = e => {
        e.preventDefault();
        const { wrongSellerNumber, wrongSellerName } = ALERT_MSG;

        // 사업자 등록 번호가 제대로 입력되지 않았을 경우
        if (number1.length < 3 || number2.length < 2 || number3.length < 5) {
            return alert(wrongSellerNumber);
        }
        // 상호명이 입력되지 않았을 경우
        else if (!name) {
            return alert(wrongSellerName);
        }

        const number = number1 + '-' + number2 + '-' + number3;

        const body = {
            number: number,
            name: name,
            email: me.email,
        };
        
        axios.post(API_ADDRESS + '/seller/register', body)
            .then(res => {
                if (res.data.success) {
                    const product = [];
                    dispatch(registerSellerAction({ number, name, product }));
                    history.push('/mypage');
                } else {
                    alert(res.data.msg);
                    return;
                }
            });
    };

    return (
        <center>
            <form onSubmit={onSubmitForm}>
                <label>사업자 등록 번호</label>
                <Input.Group compact>
                    <Input type="number" value={number1} onChange={onChangeNumber1} style={{ width: '9%', marginRight: '10px' }} maxLength={3} />
                    -
                    <Input type="number" value={number2} onChange={onChangeNumber2} style={{ width: '6%', marginLeft: '10px', marginRight: '10px' }} maxLength={2} />
                    -
                    <Input type="number" value={number3} onChange={onChangeNumber3} style={{ width: '15%', marginLeft: '10px' }} maxLength={5} />
                </Input.Group>
                <br />
                <label>상호명</label>
                <Input value={name} onChange={onChangeName} style={{ width: '50%', marginLeft: '10px' }} />
                <br />
                <br />
                <Button type="primary" htmlType="submit">등록</Button>
            </form>
        </center>
    );
};

export default RegisterSellerPage;