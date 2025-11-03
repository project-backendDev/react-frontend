import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import MainPage from './modules/main/MainPage';
// [사용자]
import SignUpForm from './modules/userInfo/components/user/SignUpForm';

// [관리자]
import UserList from './modules/userInfo/components/admin/UserList';
import AdminLayout from './modules/common/layout/admin/AdminLayout';

const AdminDashboard = () => <div className="content-header"><h1>대시보드</h1></div>;

function App() {
  return (
    <div className="App">
      <Routes>
        
        {/* --- 1. 일반 사용자 페이지 (레이아웃 없음) --- */}
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        
        {/* --- 2. 관리자 페이지 (레이아웃 적용) --- */}
        <Route path="/mngr" element={<AdminLayout />}>
          
          {/* /admin/users 경로에 UserListPage '내용'을 렌더링 */}
          <Route path="userList" element={<UserList />} /> 
          
          {/* /admin/dashboard 경로에 대시보드 '내용'을 렌더링 */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* (게시판 관리 페이지) */}
          {/* <Route path="boards" element={<AdminBoardPage />} /> */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;