import React, { useState } from 'react'
import '../../../assets/css/userInfo/user/ConfirmPassword.css';
import { useNavigate } from 'react-router-dom';
import api from '../../common/api/AxiosConfig';

function ConfirmPassword() {
    const navigate = useNavigate();

    // 비밀번호 폼 입력값 상태
    const [ password, setPassword ] = useState('');

    // 서버 응답 메시지 상태
    const [message, setMessage] = useState({ type: '', text: '' });

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type : '', text : '' });

        const requestData = { userPw: password };

        api.post('/api/user/confirm-password', requestData)
        .then(response => {
            // 탭을 닫으면 사라지는 sessionStorage 사용
            sessionStorage.setItem('isPwdConfirm', 'true');

            // 회원정보수정 페이지로 이동
            navigate('/editProfile');
        })
        .catch(error => {
            if (error.response) {
                setMessage({ type : 'error', text : error.response.data.message });
            } else {
                setMessage({ type : 'error', text : '네트워크 오류가 발생했습니다.' });
            }
        });
}

return (
    <div className="confirm-form-container">
      <h2 className="confirm-form-title">비밀번호 확인</h2>
      <p className="confirm-form-text">
        회원님의 정보를 안전하게 보호하기 위해<br/>
        비밀번호를 다시 한번 확인해주세요.
      </p>

      { message.text && <div className={`confirm-form-message ${message.type === 'error' ? 'error' : 'success'}`}> {message.text} </div> }

      <form onSubmit={handleSubmit} className="confirm-form-body">
        <div className="confirm-input-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="userPw" name="userPw" className="confirm-form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="confirm-form-button">
          확인
        </button>
      </form>
    </div>
  );
}

export default ConfirmPassword;
