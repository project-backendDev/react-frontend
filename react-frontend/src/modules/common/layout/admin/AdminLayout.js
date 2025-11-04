import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
// import '../../../../assets/css/userInfo/admin/layout.css'; 
import '../../../../assets/css/userInfo/admin/admin.css'; 

function AdminLayout() {
  // 사이드바 열림/닫힘 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 햄버거 버튼이 호출할 "토글" 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 닫기 전용 함수
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }

  return (
    <div className={`admin-layout-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}> 
      <AdminHeader onToggleSidebar={toggleSidebar} />
      <AdminSidebar />
        <div className="admin-content-wrapper">
          <Outlet /> 
        </div>
      <AdminFooter />

      {/* 사이드바 뒤의 어두운 배경(Backdrop) 추가
          모바일/태블릿에서만 영역표출
          - 클릭 시 닫기 전용 함수(closeSidebar)를 호출
      */}
      <div 
        className="sidebar-backdrop" 
        onClick={closeSidebar}
      ></div>
    </div>
  );
}

export default AdminLayout;