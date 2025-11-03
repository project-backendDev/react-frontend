import React from 'react';
// 👇 <a> 태그 대신 NavLink를 사용
import { NavLink, Link } from 'react-router-dom'; 

function AdminSidebar() {
  const adminName = "Admin User"; 

  return (
    <aside className="main-sidebar sidebar-dark-primary">
      <Link to="/admin/users" className="brand-link">
        <span className="brand-text font-weight-light">Admin Panel</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column">
            
            {/* 👇 <p> 태그가 아이콘과 형제 레벨로 있는지 확인 */}
            <li className="nav-item">
              <NavLink to="/admin/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>대시보드</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/users" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>회원 관리</p>
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to="/admin/boards" className="nav-link">
                <i className="nav-icon fas fa-th-list"></i>
                <p>게시판 관리</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default AdminSidebar;