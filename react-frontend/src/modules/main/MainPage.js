import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function MainPage() {

  useEffect(() => {
    const token = localStorage.getItem('token');

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
        }
      } catch(e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div style={{ textAlign : 'center' }}>      
        {/* <h1>메인 페이지</h1>

        <Link to="/signup">
            <button style={homeButtonStyle}>회원가입</button>
        </Link>

        <Link to="/login">
            <button style={homeButtonStyle}>로그인</button>
        </Link> */}
    </div>
  )
}

const homeButtonStyle = {
  padding: '10px 20px',
  fontSize: '1.2rem',
  cursor: 'pointer',
  margin: '0 10px'
};

export default MainPage;