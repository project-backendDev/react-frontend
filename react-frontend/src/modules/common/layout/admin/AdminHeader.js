import React from 'react';
import { Link } from 'react-router-dom';

function AdminHeader({ onToggleSidebar }) {
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
            onClick={onToggleSidebar} // 👈 토글 함수 연결
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
          <span className="nav-link" role="button">
            <i className="fas fa-sign-out-alt" style={{marginRight: '5px'}}></i>
            Logout
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default AdminHeader;