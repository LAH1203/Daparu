import React from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";

const MainPage = ({ history }) => {
    const { isLoggedIn, me } = useSelector(state => state.user);

    return (
        <>
            <Logo width="400px" />
            <div>MainPage</div>
            {!isLoggedIn && <button onClick={() => {history.push('/signin')}}>로그인</button>}
            {isLoggedIn && <button onClick={() => {history.push('/mypage')}}>마이페이지</button>}
        </>
    );
};

export default MainPage;