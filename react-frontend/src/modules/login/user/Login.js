import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../../../assets/css/login/user/Login.css';

function Login() {
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

    axios.post('/api/user/login', formData)
        .then(response => {
            // response의 data를 가져온다
            const { accessToken } = response.data;

            // localStorage에 'token'이라는 이름으로 accessToken을 저장
            localStorage.setItem('token', accessToken);

            // jwt-decode로 accessToken을 해독
            const decodeToken = jwtDecode(accessToken);

            // 해독한 accessToken에서 권한정보를 꺼냄
            const roles = decodeToken.auth;

            // 권한에 따라 페이지 이동 분기
            if (roles && roles.includes('ROLE_ADMIN')) {    // 관리자일 때
                navigate('/mngr/userList');
            } else {    // 일반 사용자일 때
                navigate('/');  
            }
        })
        .catch(error => {
            if (error.response) {
                setMessage({ type : 'error', text : error.response.data });
            } else {
                setMessage({ type : 'error', text : '네트워크 오류가 발생했습니다.'});
            }
        });
}

return (
    <div className="login-form-container">
      <h2 className="login-form-title">로그인</h2>

      {/* message.text에 내용이 있을 때만 메시지 박스를 렌더링 */}
      {message.text && (
        <div className={`login-form-message ${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}

      {/* 폼 태그. submit 이벤트가 발생하면 handleSubmit 함수를 호출 */}
      <form onSubmit={handleSubmit} className="login-form-body">
        
        <div className="login-input-group">
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            name="userId" // handleChange가 이 'name'을 인식
            className="login-form-input"
            value={formData.userId} // state의 값을 input에 표시
            onChange={handleChange} // 키보드를 칠 때마다 handleChange 호출
          />
        </div>

        <div className="login-input-group">
          <label htmlFor="userPw">비밀번호</label>
          <input
            type="password"
            id="userPw"
            name="userPw" // handleChange가 이 'name'을 인식
            className="login-form-input"
            value={formData.userPw} // state의 값을 input에 표시
            onChange={handleChange} // state 변경 함수 연결
          />
        </div>

        <button type="submit" className="login-form-button">
          로그인
        </button>
      </form>

      {/* 7-3. 회원가입 페이지로 이동하는 링크(<Link>) */}
      <div className="login-toggle-link-container">
        <Link to="/signup" className="login-toggle-link">
          아직 회원이 아니신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;