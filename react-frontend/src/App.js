import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// [공통]
import PrivateRoute from './modules/common/routes/PrivateRoute';

// [사용자]
import UserLayout from './modules/common/layout/user/UserLayout';
import MainPage from './modules/main/MainPage';
import SignUp from './modules/userInfo/user/SignUp';
import Login from './modules/login/user/Login';
import EditProfile from './modules/userInfo/user/EditProfile';

// [관리자]
import AdminLayout from './modules/common/layout/admin/AdminLayout';
import AdminLogin from './modules/login/admin/AdminLogin';
import UserList from './modules/userInfo/admin/UserList';
import UserDetail from './modules/userInfo/admin/UserDetail';
import ConfirmPassword from './modules/userInfo/user/ConfirmPassword';

const AdminDashboard = () => <div className="content-header"><h1>대시보드</h1></div>;

function App() {
  return (
    <div className="App">
      <Routes>
        
        {/* 일반 사용자 페이지 --- */}
        <Route path="/" element={<UserLayout />}>

          {/* 메인페이지 */}
          <Route index element={<MainPage />} />

          {/* 회원가입 페이지 */}
          <Route path="/signUp" element={<SignUp />} />

          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />

          {/* 공통 라우트 [토큰 확인이 필요한 부분에서만 사용] */}
          <Route element={<PrivateRoute />}>
            {/* 비밀번호 확인 페이지 */}
            <Route path="/confirmPassword" element={<ConfirmPassword />} />

            {/* 회원정보수정 페이지 */}
            <Route path="/editProfile" element={<EditProfile />} />
          </Route>
        </Route>

        {/* 관리자 로그인 페이지 [토큰 확인이 필요하지 않아 밖에 작성] */}
        <Route path="/mngr/login" element={<AdminLogin />} />
        
        {/* 공통 라우트 [토큰 확인이 필요한 부분에서만 사용] */}
          <Route element={<PrivateRoute />}>
            {/* --- 2. 관리자 페이지 (레이아웃 적용) --- */}
            <Route path="/mngr" element={<AdminLayout />}>
              
              {/* /mngr/userList 경로에 UserList '내용'을 렌더링 */}
              <Route path="userList" element={<UserList />} /> 

              {/* /mngr/userDetail 경로에 단일 User 데이터를 렌더링 */}
              <Route path="userDetail/:userId" element={<UserDetail />} />
              
              {/* /mngr/dashboard 경로에 대시보드 '내용'을 렌더링 */}
              <Route path="dashboard" element={<AdminDashboard />} />

              {/* (게시판 관리 페이지) */}
              {/* <Route path="boards" element={<AdminBoardPage />} /> */}
            </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;