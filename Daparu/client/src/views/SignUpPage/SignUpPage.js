import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import Logo from '../Logo';

import { Input, Button } from 'antd';
import { YuqueOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const SignUpPage = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false);

    // onChangeFunctions
    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
        // @ 여부로 이메일 형식 판단
        if (!e.target.value.includes('@')) {
            setEmailCheck(true);
        } else {
            setEmailCheck(false);
        }
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        // 비밀번호 길이는 8자 이상
        if (e.target.value.length < 8) {
            setPasswordCheck(true);
        } else {
            setPasswordCheck(false);
        }
    }, []);
    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);

    // submitFunction
    const onSubmitForm = (e) => {
        e.preventDefault();

        // 값이 제대로 입력되지 않았을 경우
        if (!email || emailCheck) {
            return alert('이메일을 제대로 입력해주세요.');
        } else if (!password || passwordCheck) {
            return alert('비밀번호를 제대로 입력해주세요.');
        } else if (!name) {
            return alert('이름을 입력해주세요.');
        }

        const body = {
            email: email,
            password: password,
            name: name,
        };

        axios.post('http://localhost:5000/api/user/signup', body)
            .then(res => {
                if (res.data.success) {
                    alert('회원가입 성공');
                    history.push('/signin');
                } else {
                    alert('회원가입 실패');
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
                {emailCheck && <p style={alertStyle}>이메일 형식에 맞지 않습니다.</p>}
                {!emailCheck && <br />}
                <Input.Password style={inputStyle} value={password} onChange={onChangePassword} placeholder="Password" prefix={<LockOutlined />} />
                {passwordCheck && <p style={alertStyle}>비밀번호는 8자 이상이어야 합니다.</p>}
                {!passwordCheck && <br />}
                <Input style={inputStyle} value={name} onChange={onChangeName} placeholder="Name" prefix={<UserOutlined />} allowClear />
                <br />
                <Button type="primary" htmlType="submit" style={buttonStyle}>회원가입</Button>
            </form>
        </>
    );
};

export default SignUpPage;