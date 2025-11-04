import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function AdminHeader({ onToggleSidebar }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirm = window.confirm('로그아웃 하시겠습니까?');

    if (isConfirm) {
      // localStorage에서 token 삭제
      localStorage.removeItem('token');
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white">
      {/* 1. 왼쪽 네비게이션 */}
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* 햄버거 버튼: 클릭 시 onToggleSidebar 실행 */}
          <span 
            className="nav-link" 
            data-widget="pushmenu" 
            role="button"
            onClick={onToggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </span>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
      </ul>

      {/* 2. 오른쪽 네비게이션 */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <span className="nav-link" role="button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" style={{marginRight: '5px'}}></i>
            Logout
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default AdminHeader;