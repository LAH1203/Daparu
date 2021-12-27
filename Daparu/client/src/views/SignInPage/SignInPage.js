import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import Logo from '../Logo';
import { useDispatch } from 'react-redux';

import { Input, Button } from 'antd';
import { YuqueOutlined, LockOutlined } from '@ant-design/icons';
import { loginAction } from '../../reducers/user';
import { registerSellerAction } from '../../reducers/seller';
import { ALERT_MSG, API_ADDRESS, USER } from '../../utils/constants';

const SignInPage = ({ history }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false);

    // onChangeFunctions
    const onChangeEmail = useCallback(e => {
        setEmail(e.target.value);

        // @ 여부로 이메일 형식 판단
        if (!e.target.value.includes('@')) {
            setEmailCheck(true);
        } else {
            setEmailCheck(false);
        }
    }, []);

    const onChangePassword = useCallback(e => {
        setPassword(e.target.value);

        // 비밀번호 길이 검사
        if (e.target.value.length < USER.passwordLengthMax) {
            setPasswordCheck(true);
        } else {
            setPasswordCheck(false);
        }
    }, []);

    const successLogin = data => {
        const name = data.user.name;
        dispatch(loginAction({ email, password, name }));

        // 로그인한 사람이 판매자로 등록되어 있을 경우
        if (data.seller) {
            const { number, name } = data.sellerInfo;
            const product = data.product;
            dispatch(registerSellerAction({ number, name, product }));
        }
        history.push('/');
    };

    // submitFunction
    const onSubmitForm = e => {
        e.preventDefault();

        // 값이 제대로 입력되지 않았을 경우
        const { wrongEmail, wrongPassword } = ALERT_MSG;
        if (!email || emailCheck) {
            return alert(wrongEmail);
        } else if (!password || passwordCheck) {
            return alert(wrongPassword);
        }

        const body = {
            email: email,
            password: password,
        };

        axios.post(API_ADDRESS + '/user/signin', body)
            .then(res => {
                const { success, message } = res.data;
                if (success) {
                    successLogin(res.data);
                } else {
                    return alert(message);
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
        width: 400,
    }), []);

    const alertStyle = useMemo(() => ({
        color: 'red',
        width: 400,
        textAlign: 'left'
    }), []);

    const buttonStyle = useMemo(() => ({
        width: 300,
        marginBottom: '10px'
    }), []);

    return (
        <>
            <Logo width="300px" />
            {/* 정보 입력 폼 */}
            <form onSubmit={onSubmitForm} style={formStyle}>
                <Input style={inputStyle} value={email} onChange={onChangeEmail} placeholder="Email" prefix={<YuqueOutlined />} allowClear />
                {
                    emailCheck &&
                    <p style={alertStyle}>
                        {ALERT_MSG.wrongEmailSmall}
                    </p>
                }
                {!emailCheck && <br />}
                <Input.Password style={inputStyle} value={password} onChange={onChangePassword} placeholder="Password" prefix={<LockOutlined />} />
                {
                    passwordCheck &&
                    <p style={alertStyle}>
                        {ALERT_MSG.wrongPasswordSmall}
                    </p>
                }
                {!passwordCheck && <br />}
                <Button type="primary" htmlType="submit" style={buttonStyle}>로그인</Button>
                <Button style={buttonStyle} onClick={() => history.push('/signup')}>회원가입</Button>
            </form>
        </>
    );
};

export default SignInPage;
