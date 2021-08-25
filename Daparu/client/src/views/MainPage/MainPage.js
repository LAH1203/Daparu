import React from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";

const MainPage = ({ history }) => {
    const { isLoggedIn, me } = useSelector(state => state.user);
    const { number, name, product } = useSelector(state => state.seller);

    return (
        <>
            <Logo width="400px" />
            <div>MainPage</div>
            {!isLoggedIn && <button onClick={() => {history.push('/signin')}}>로그인</button>}
            {isLoggedIn && <button onClick={() => {history.push('/mypage')}}>마이페이지</button>}
            {isLoggedIn && number && <button onClick={() => {history.push('/uploads')}}>업로드</button>}
            <button onClick={() => {history.push('/detail')}}>상품 상세</button>
        </>
    );
};

export default MainPage;