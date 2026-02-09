import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import api from '../../common/api/AxiosConfig';

/**
 * 일반 사용자용 헤더
 * - 로고, 홈, 로그인, 회원가입 링크를 포함
 */
function UserHeader() {
  const navigate = useNavigate();

// Tablet, Mobile 열림, 닫힘 상태관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 로그인 상태 확인 (localStorage에 'token'이 있는지)
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  let isAdmin = false;

  if (isLoggedIn) {
    try {
      const decodeToken = jwtDecode(token);

      if (decodeToken.auth && decodeToken.auth.includes('ROLE_ADMIN')) {
        isAdmin = true;
      }
    } catch (e) {
      console.error("오류발생   ::  " + e);
    }
  }

  // 로그아웃 핸들러
  const handleLogout = () => {
    const isConfirm = window.confirm('로그아웃 하시겠습니까?');

    if (isConfirm) {
        // localStorage에서 token 삭제
        localStorage.removeItem('token');
        alert('로그아웃 되었습니다.');
        setIsMenuOpen(false);
        navigate('/');
    }
  };

    // 햄버거 버튼 클릭 시 메뉴 토글
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  // 메뉴 항목 클릭 시 메뉴 닫기 (페이지 이동 시)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    // isMenuOpen 상태에 따라 'menu-open' 클래스 추가
    <header className={`user-header ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="user-header-container">
        
        <Link to="/" className="logo" onClick={handleLinkClick}>
            MyProject
        </Link>
        
        {/* 햄버거 버튼 (Tablet, Mobile에서만 노출) */}
        <button className="hamburger-toggle" onClick={toggleMenu}>
          {/* Font Awesome 아이콘 (public/index.html에 CDN 필요) */}
          <i className="fas fa-bars"></i>
        </button>

        {/* 네비게이션 링크 (PC에서는 항상 노출, Tablet / Mobile에선 토글됨) */}
        <nav className="nav-links">
          { isLoggedIn ? (
            <>
              { isAdmin ? <Link to="/mngr/userList" onClick={handleLinkClick}>관리자페이지로 이동</Link> : <Link to="/confirmPassword" onClick={handleLinkClick}>회원정보수정</Link> }
              <a href="#!" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                로그아웃
              </a>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLinkClick}>로그인</Link>
              <Link to="/signup" onClick={handleLinkClick}>회원가입</Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}

export default UserHeader;