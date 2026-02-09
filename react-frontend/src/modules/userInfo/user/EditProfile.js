import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/userInfo/user/EditProfile.css';
import api from '../../common/api/AxiosConfig';


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

        api.get('/api/user/me')
        .then(response => {
            console.log("TRUE!!!");
            const { userId, userNm, userEmail } = response.data;
            setFormData({ userId, userNm, userEmail });
            setLoading(false);
        })
        .catch(error => {
            // console.error("정보 조회 실패:", error);
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

    // 수정버튼 클릭 시
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

        api.put('/api/user/me', requestData)
        .then(response => {
            setMessage({ type: 'success', text: response.data });
            alert('회원정보가 성공적으로 수정되었습니다.');
            navigate("/");
        })
        .catch(error => {
            if (error.response) { // 백엔드가 보낸 에러 (예: 이메일 중복, @Valid 실패)
                setMessage({ type: 'error', text: error.response.data });
            } else {
                setMessage({ type: 'error', text: '네트워크 오류가 발생했습니다.' });
            }
        });
    }

    // 취소 버튼 핸들러
    const handleCancel = () => {
        navigate(-1); // 브라우저 "뒤로 가기"
    };

    // 회원탈퇴 핸들러
    const handleDelete = () => {
        if (!window.confirm('정말로 회원탈퇴를 하시겠습니까?\n탈퇴 후 복구가 불가능합니다.')) {
            return;
        }

        api.delete('/api/user/me')
        .then(response => {
            alert(response.data); // '회원탈퇴가 완료되었습니다' 멘트 표출
            localStorage.removeItem('token'); // 회원탈퇴 후 토큰 삭제
            navigate('/');
        })
        .catch(error => {
            const errorText = (error.response && error.response.data.message) ? error.response.data.message : '탈퇴 처리 중 오류가 발생했습니다.';
            setMessage({ type: 'error', text: errorText });
        })
    }

return (
        <div className="profile-form-container">
            <h2 className="profile-form-title">회원정보 수정</h2>

            { message.text && <div className={`profile-form-message ${message.type === 'error' ? 'error' : 'success'}`}> {message.text} </div> }

            { loading ? 
                <p style={{ textAlign: 'center' }}>데이터를 불러오는 중입니다...</p> 
                : 
                <form onSubmit={handleSubmit} className="profile-form-body">
                    <div className="profile-input-group">
                        <label htmlFor="userId">아이디 (수정 불가)</label>
                        <input type="text" id="userId" name="userId" className="profile-form-input" value={formData.userId} disabled />
                    </div>
                    <div className="profile-input-group">
                        <label htmlFor="userNm">이름</label>
                        <input type="text" id="userNm" name="userNm" className="profile-form-input" value={formData.userNm} onChange={handleChange} required />
                    </div>
                    <div className="profile-input-group">
                        <label htmlFor="userEmail">이메일</label>
                        <input type="email" id="userEmail" name="userEmail" className="profile-form-input" value={formData.userEmail} onChange={handleChange} required />
                    </div>
                    <div className="profile-button-group">
                        <button type="submit" className="profile-form-button">
                            정보 수정
                        </button>
                        <button type="button" className="profile-form-button withdraw-button" onClick={handleDelete} >
                            회원탈퇴
                        </button>
                        <button type="button" className="profile-form-button cancel-button" onClick={handleCancel}>
                            취소
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}

export default EditProfile;