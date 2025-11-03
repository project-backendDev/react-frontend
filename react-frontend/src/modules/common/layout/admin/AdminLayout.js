import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
// import '../../../../assets/css/userInfo/admin/layout.css'; 
import '../../../../assets/css/userInfo/admin/admin.css'; 

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-layout-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}> 
      <AdminHeader onToggleSidebar={toggleSidebar} />
      <AdminSidebar />
      <div className="admin-content-wrapper">
        <Outlet /> 
      </div>
      <AdminFooter />
    </div>
  );
}

export default AdminLayout;