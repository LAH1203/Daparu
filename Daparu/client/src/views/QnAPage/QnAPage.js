import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { Card, Button, Modal, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { ALERT_MSG, API_ADDRESS } from '../../utils/constants';

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

        axios.post(API_ADDRESS + '/qna', body)
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
        const { wrongQna, failWriteQna } = ALERT_MSG;
        if (!writingTitle || !writingContent) {
            return alert(wrongQna);
        }

        const body = {
            productId: productId,
            email: me.email,
            title: writingTitle,
            content: writingContent,
            date: new Date(),
        };

        axios.post(API_ADDRESS + '/qna/writing', body)
            .then(res => {
                if (res.data.success) {
                    setWritingTitle("");
                    setWritingContent("");
                } else {
                    return alert(failWriteQna);
                }
            });

        setIsModalVisible(false);
        getQnA();
    };

    const handleCancle = () => {
        setIsModalVisible(false);
    };

    const onChangeWritingTitle = e => {
        setWritingTitle(e.target.value);
    };

    const onChangeWritingContent = e => {
        setWritingContent(e.target.value);
    };

    const onClickWritingButton = () => {
        if (!me) {
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