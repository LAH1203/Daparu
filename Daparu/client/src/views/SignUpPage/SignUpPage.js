import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import Logo from '../Logo';

import { Input, Button } from 'antd';
import { YuqueOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { ALERT_MSG, API_ADDRESS, USER } from '../../utils/constants';

const SignUpPage = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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

    const onChangeName = useCallback(e => {
        setName(e.target.value);
    }, []);

    // submitFunction
    const onSubmitForm = (e) => {
        e.preventDefault();

        // 값이 제대로 입력되지 않았을 경우
        const { wrongEmail, wrongPassword, wrongName } = ALERT_MSG;
        if (!email || emailCheck) {
            return alert(wrongEmail);
        } else if (!password || passwordCheck) {
            return alert(wrongPassword);
        } else if (!name) {
            return alert(wrongName);
        }

        const body = {
            email: email,
            password: password,
            name: name,
        };

        axios.post(API_ADDRESS + '/user/signup', body)
            .then(res => {
                if (res.data.success) {
                    history.push('/signin');
                } else {
                    alert(ALERT_MSG.failSignUp);
                }
            })
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
                <Input style={inputStyle} value={name} onChange={onChangeName} placeholder="Name" prefix={<UserOutlined />} allowClear />
                <br />
                <Button type="primary" htmlType="submit" style={buttonStyle}>회원가입</Button>
            </form>
        </>
    );
};

export default SignUpPage;