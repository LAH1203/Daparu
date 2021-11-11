import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { Card, Button, Modal, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const QnAPage = ({ history, match }) => {
    const productId = match.params.productId;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [writingTitle, setWritingTitle] = useState("");
    const [writingContent, setWritingContent] = useState("");
    const [data, setData] = useState([]);
    const { me } = useSelector(state => state.user);

    useEffect(() => {
        getQnA();
    }, []);

    const getQnA = () => {
        const body = {
            productId: productId,
        };

        axios.post('http://localhost:5000/api/qna', body)
            .then(res => {
                if (res.data.success) {
                    if (res.data.qnas) {
                        setData(res.data.qnas);
                    }
                }
            });
    };

    const renderQnA = data.map((qna, idx) => {
        return (
            <>
                <Card title={qna.title} key={idx}>
                    <div>{qna.content}</div>
                    {qna.sellerAnswer &&
                        <div className="speech-bubble"><ArrowRightOutlined />{qna.sellerAnswer}</div>
                    }
                    <div>{qna.date}</div>
                </Card>
                <br />
            </>
        );
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!writingTitle || !writingContent) {
            return alert('제목과 내용을 모두 입력해주세요');
        }

        const body = {
            productId: productId,
            email: me.email,
            title: writingTitle,
            content: writingContent,
            date: new Date(),
        };

        // 백엔드로 작성된 내용 보내기
        axios.post('http://localhost:5000/api/qna/writing', body)
            .then(res => {
                if (res.data.success) {
                    console.log('작성 성공');
                    setWritingTitle("");
                    setWritingContent("");
                } else {
                    return alert('작성 실패');
                }
            });

        setIsModalVisible(false);
        getQnA();
    };

    const handleCancle = () => {
        setIsModalVisible(false);
    };

    const onChangeWritingTitle = (e) => {
        setWritingTitle(e.target.value);
    };

    const onChangeWritingContent = (e) => {
        setWritingContent(e.target.value);
    };

    const onClickWritingButton = () => {
        if (!me) {
            alert('로그인부터 하셔야 합니다');
            history.push('/signin');
        } else {
            showModal();
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Q&A 게시판</h1>
            <Button onClick={onClickWritingButton}>작성</Button>
            <Modal title="Q&A 작성" visible={isModalVisible} onOk={handleOk} onCancel={handleCancle}>
                <Input placeholder="제목" value={writingTitle} onChange={onChangeWritingTitle} />
                <br />
                <br />
                <TextArea placeholder="내용" value={writingContent} onChange={onChangeWritingContent} />
            </Modal>
            {renderQnA}
        </>
    );
};

export default QnAPage;