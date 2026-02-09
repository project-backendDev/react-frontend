import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../common/api/AxiosConfig'
import '../../../assets/css/login/admin/AdminLogin.css';

function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ userId: '', userPw: '' });
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const handleChange = (e) => {
        // e.target: 이벤트가 발생한 DOM 요소 (여기서는 <input>)
        const { name, value } = e.target;
        // setFormData 함수로 formData state를 업데이트
        // 'prev'는 이전의 formData 값 (예: { userId: '123', userPw: '' })
        // '...' (스프레드 연산자): 이전 데이터를 그대로 복사
        // [name] (계산된 속성명): 'name' 변수의 값(예: "userId")을 key로 사용하여 'value'를 덮어씀
        setFormData(prev => ({ ...prev, [name]: value }));
    };

	const handleSubmit = (e) => {
	    // e.preventDefault(): 폼 제출 시 브라우저가 기본적으로 수행하는 "새로고침" 동작을 막습니다.
      e.preventDefault();
	    // 기존 메시지를 초기화
      setMessage({ type: '', text: '' });

      if (formData.userId.trim() === '') {
          setMessage({ type : 'error', text : '아이디를 입력해주세요.'});
          return;
      }
	
      if (formData.userPw.trim() === '') {
          setMessage({ type : 'error', text : '비밀번호를 입력해주세요.'});
          return;
      }

    api.post('/api/user/login', formData)
    .then(response => {
        // response의 data를 가져온다
        const { accessToken } = response.data;

        // jwt-decode로 accessToken을 해독
        const decodeToken = jwtDecode(accessToken);

        // 해독한 accessToken에서 권한정보를 꺼냄
        const roles = decodeToken.auth;

        // 권한이 있는지 && 관리자가 맞는지 체크
        if (!roles || !roles.includes('ROLE_ADMIN')) {
            alert('접근 권한이 없습니다.');
            return;
        }

        // 관리자가 맞으면 localStorage에 'token'이라는 이름으로 accessToken을 저장
        localStorage.setItem('token', accessToken);

        // 페이지 이동
        navigate('/mngr/userList');
    })
    .catch(error => {
        console.log("ERROR...   " + error);
        if (error.response) {
            setMessage({ type : 'error', text : error.response.data });
        } else {
            setMessage({ type : 'error', text : '네트워크 오류가 발생했습니다.'});
        }
    });
}

return (
    <div className="admin-login-container">
        <div className="admin-login-box"> 
            <h2 className="admin-login-title">ADMINISTRATOR</h2>
            <p className="admin-login-subtitle">관리자 페이지 접속</p>

            { message.text && <div className={`admin-message ${message.type === 'error' ? 'error' : 'success'}`}> {message.text} </div> }

            <form onSubmit={handleSubmit}>
            <div className="admin-input-group">
                <label htmlFor="userId" className="admin-label">아이디</label>
                <input type="text" id="userId" name="userId" className="admin-input" value={formData.userId} onChange={handleChange} placeholder="아이디" />
            </div>

            <div className="admin-input-group">
                <label htmlFor="userPw" className="admin-label">비밀번호</label>
                <input type="password" id="userPw" name="userPw" className="admin-input" value={formData.userPw} onChange={handleChange} placeholder="비밀번호" />
            </div>

            <button type="submit" className="admin-login-btn">
                접속하기
            </button>
            </form>
        </div>
    </div>
  );
}

export default AdminLogin;