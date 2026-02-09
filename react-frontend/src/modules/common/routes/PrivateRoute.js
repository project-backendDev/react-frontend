import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    let isAuth = false;

    if (token) {
        try {
            // 토큰 복호화
            const decodeToken = jwtDecode(token);
            // 현재시간
            const currentTime = Date.now();
            // 토큰 만료시간
            const expTime = decodeToken.exp * 1000;

            // 서버 시간 느리거나 빠를수 있기 때문에 30초 미리 만료처리
            if (expTime - currentTime < 30000) {
                localStorage.removeItem('token');
                alert('세션이 만료되었거나 권한이 없습니다.\n다시 로그인 해주세요.');
                isAuth = false;
            } else {
                isAuth = true;
            }
        } catch (e) {
            console.error("Token Error!!!");
            localStorage.removeItem('token');
            isAuth = false;
        }
    } 

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default PrivateRoute;