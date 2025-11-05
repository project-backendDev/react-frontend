import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../../assets/css/userInfo/user/SignUp.css'; 

function SignUp() {
  // 페이지 이동 함수를 선언
  const navigate = useNavigate();

  // 폼 입력값 상태
  const [formData, setFormData] = useState({
    userId: '',
    userPw: '',
    pwCheck: '', // 비밀번호 확인용
    userNm: '',
    userEmail: '',
  });

  // 서버 응답 메시지 상태
  const [message, setMessage] = useState({ type: '', text: '' });

  // 입력창 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 (회원가입) 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // --- 아이디 검사 ---
    if (formData.userId.trim() === '') {
      setMessage({ type: 'error', text: '아이디를 입력해주세요' });
      return;
    }
    if (formData.userId.length < 4 || formData.userId.length > 20) {
      setMessage({ type: 'error', text: '아이디는 4자 이상 20자 이하로 입력해주세요.' });
      return;
    }

    // --- 비밀번호 검사 ---
    if (formData.userPw.trim() === '') {
      setMessage({ type: 'error', text: '비밀번호를 입력해주세요' });
      return;
    }
    if (formData.userPw.length < 8) {
      setMessage({ type: 'error', text: '비밀번호는 8자 이상으로 입력해주세요. (영문, 특수문자 포함)' });
      return;
    }
    
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/;
    if (!pwRegex.test(formData.userPw)) {
      setMessage({ type: 'error', text: '비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.' });
      return;
    }
    if (formData.userPw !== formData.pwCheck) {
      setMessage({ type: 'error', text: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    // --- 이름 검사 ---
    if (formData.userNm.trim() === '') {
      setMessage({ type: 'error', text: '이름을 입력해주세요' });
      return;
    }

    // --- 이메일 검사 ---
    if (formData.userEmail.trim() === '') {
      setMessage({ type: 'error', text: '이메일을 입력해주세요' });
      return;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.userEmail)) {
      setMessage({ type: 'error', text: '올바른 이메일 형식이 아닙니다.' });
      return;
    }

    
    let requestData = {
      userId: formData.userId,
      userPw: formData.userPw,
      userNm: formData.userNm,
      userEmail: formData.userEmail
    };

    axios.post('/api/signup', requestData)
      .then(response => {
            // 성공 시
            setMessage({ type: 'success', text: response.data });
            alert(response.data); // '회원가입이 완료되었습니다.' 멘트 표출
            navigate('/'); // 메인페이지로 이동
        })
        .catch(err => {
            // 실패 시
            if (err.response) {
                // Spring Boot가 보낸 에러 메시지
                setMessage({ type: 'error', text: err.response.data });
            } else {
                setMessage({ type: 'error', text: '네트워크 오류: 서버에 연결할 수 없습니다.' });
            }
        });
};

  return (
    <div className="form-container">
      <h2 className="form-title">회원가입</h2>

      {/* 서버 응답 메시지 표시 */}
      {message.text && (
        <div className={`form-message ${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}

      {/* 폼 렌더링 */}
      <form onSubmit={handleSubmit} className="form-body">
        <div className="input-group">
          <label htmlFor="userId">아이디</label>
          <input
            type="text" id="userId" name="userId"
            className="form-input"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="userPw">비밀번호</label>
          <input
            type="password" id="userPw" name="userPw"
            className="form-input"
            value={formData.userPw}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="pwCheck">비밀번호 확인</label>
          <input
            type="password" id="pwCheck" name="pwCheck"
            className="form-input"
            value={formData.pwCheck}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="userNm">이름</label>
          <input
            type="text" id="userNm" name="userNm"
            className="form-input"
            value={formData.userNm}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="userEmail">이메일</label>
          <input
            type="email" id="userEmail" name="userEmail"
            className="form-input"
            value={formData.userEmail}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="form-button signup">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUp;