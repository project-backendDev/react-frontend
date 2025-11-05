import React from 'react'
import { Link } from 'react-router-dom';

function main() {
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

export default main;