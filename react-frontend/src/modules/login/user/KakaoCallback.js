import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function KakaoCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // url에서 code 부분만 가져오기
        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
            axios.post(`/api/user/oauth2/kakao`, { code : code })
                .then(response => {
                    // 백엔드에서 처리된 토큰
                    const { accessToken, loginType } = response.data;
                    // localStorage에 'token'이라는 이름으로 accessToken을 저장
                    localStorage.setItem('token', accessToken);
                    // SNS 로그인은 개인정보수정을 이용할 필요가 없기에 차단하기 위해 'loginType'이라는 이름으로 저장
                    localStorage.setItem('loginType', loginType);

                    // 권한 확인 후 페이지 이동
                    const decodeToken = jwtDecode(accessToken);
                    const roles = decodeToken.auth;

                    if (roles && roles.includes('ROLE_ADMIN')) {    
                        navigate('/mngr/userList');
                    } else {    
                        navigate('/');  
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert(`처리 중 오류가 발생했습니다.\n관리자에게 문의해주세요.`);
                    navigate(`/login`);
                });
        }
    }, [navigate])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>카카오 로그인 처리 중입니다...</h2>
        </div>
    );
}

export default KakaoCallback;