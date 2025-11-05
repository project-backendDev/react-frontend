import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import '../../../../assets/css/common/user/layout.css';
import '../../../../assets/css/common/user/header.css';
import '../../../../assets/css/common/user/footer.css';

/**
 * 일반 사용자 페이지의 "틀"
 * - Header, Footer를 렌더링
 * - <Outlet /> 자리에 자식 라우트(HomePage, LoginPage 등)가 렌더링
 */
function UserLayout() {
  return (
    <div className="user-layout-wrapper">
      <UserHeader />

      {/* 👇 2. 이 div가 실제 내용이 표시될 영역 */}
      <main className="user-content-wrapper">
        {/* App.js의 자식 라우트(HomePage 등)가 이 <Outlet/> 자리에 렌더링됨 */}
        <Outlet />
      </main>

      <UserFooter />
    </div>
  );
}

export default UserLayout;