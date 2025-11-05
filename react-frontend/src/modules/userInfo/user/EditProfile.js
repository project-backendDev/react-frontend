import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../assets/css/userInfo/user/EditProfile.css';

function EditProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId : '',
        userNm : '',
        userEmail : ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type : '', text : '' });

    useEffect(() => {
        // LocalStorage에서 토큰 정보 가져옴
        const token = localStorage.getItem('token');

        if (!token) {
            alert("로그인 후 이용이 가능합니다.");
            navigate("/login");
            return;
        }

        axios.get('/api/user/me', {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("TRUE!!!");
            const { userId, userNm, userEmail } = response.data;
            setFormData({ userId, userNm, userEmail });
            setLoading(false);
        })
        .catch(error => {
            console.error("정보 조회 실패:", error);
            setMessage({ type: 'error', text: '정보를 불러오는데 실패했습니다.' });
            setLoading(false);

            // (토큰 만료 등으로 401/403 에러 시 로그인 페이지로 튕겨내기)
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        })
    }, [navigate]); // navigate 함수가 변경될 때만 실행

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type : '', text : '' });

        // LocalStorage에서 토큰 정보 가져옴
        const token = localStorage.getItem('token');

        if (!token) {
            alert("로그인 후 이용이 가능합니다.");
            navigate("/login");
            return;
        }

        const requestData = {
            userNm: formData.userNm,
            userEmail: formData.userEmail
        };

        axios.put('/api/user/me', requestData, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => {
            setMessage({ type: 'success', text: response.data });
            alert('회원정보가 성공적으로 수정되었습니다.');
        })
        .catch(error => {
            if (error.response) { // 백엔드가 보낸 에러 (예: 이메일 중복, @Valid 실패)
                setMessage({ type: 'error', text: error.response.data });
            } else {
                setMessage({ type: 'error', text: '네트워크 오류가 발생했습니다.' });
      }
        });
    }

return (
    <div className="profile-form-container">
      <h2 className="profile-form-title">회원정보 수정</h2>

      {message.text && (
        <div className={`profile-form-message ${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form-body">
        
        {/* 아이디는 수정 불가(disabled)로 표시 */}
        <div className="profile-input-group">
          <label htmlFor="userId">아이디 (수정 불가)</label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="profile-form-input"
            value={formData.userId} // 👈 state 값
            disabled // 👈 수정 불가
          />
        </div>

        <div className="profile-input-group">
          <label htmlFor="userNm">이름</label>
          <input
            type="text"
            id="userNm"
            name="userNm"
            className="profile-form-input"
            value={formData.userNm} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="profile-input-group">
          <label htmlFor="userEmail">이메일</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className="profile-form-input"
            value={formData.userEmail}
            onChange={handleChange} 
            required
          />
        </div>

        <button type="submit" className="profile-form-button">
          정보 수정
        </button>
      </form>
    </div>
  );
}

export default EditProfile;