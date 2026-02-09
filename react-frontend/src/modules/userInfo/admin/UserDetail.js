import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import api from '../../common/api/AxiosConfig'

function UserDetail() {
    const { userId } = useParams(); // URL 파라미터에서 userId 추출
    const [user, setUser] = useState([]); // 단일 회원 정보 데이터 상태
    const [editForm, setEditForm] = useState({}); // 수정 화면 임시 데이터 
    const [isEdit, setIsEdit] = useState(false);  // true면 수정가능, false면 수정불가
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const Navigate = useNavigate();

    // 회원 데이터 조회하는 API
    useEffect(() => {

        api.get(`/api/mngr/user/${userId}`)
        .then(response => {
            setUser(response.data);
            console.log("data");
            console.log(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError("회원 정보를 불러오는데 실패했습니다.");
            setLoading(false);

            // 권한 체크 또는 토큰 만료 처리
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                alert("관리자만 접근이 가능합니다.")
            }
        })
    }, [userId, Navigate]);

    // 데이터 수정모드 변경
    const startEdit = () => {
        setEditForm({ ...user }); // 현재 화면의 데이터를 수정 폼으로 복사
        setIsEdit(true); // 수정모드 true (수정가능)
    };

    // 데이터 수정모드 취소
    const cancelEdit = () => {
        if (window.confirm("수정을 취소하시겠습니까?")) {
            setIsEdit(false); // 수정모드 false (수정불가)
            setEditForm({}); // 데이터 초기화
        }
    }

    // 입력값 변경
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name] : value
        });
    };

    // 수정한 데이터 저장 API
    const handleSave = () => {
        if (!window.confirm("수정된 데이터를 저장하시겠습니까?")) { return; }

        api.put(`/api/mngr/user/${userId}`, editForm)
        .then(response => {
            alert(response.data);
            setUser(editForm);
            setIsEdit(false);
        })
        .catch(error => {
            console.log(error);
            alert("저장 중 오류가 발생했습니다.\n지속적인 오류가 발생할 경우 관리자에게 문의하세요.");
        })
    }

    if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>데이터 로딩 중...</div>;
    if (error) return <div style={{textAlign:'center', marginTop:'50px', color:'red'}}>{error}</div>;
    if (!user) return null;

return (
        <div className="profile-form-container" style={{ margin: '75px auto' }}>
            <h2 className="profile-form-title">
                { isEdit ? "회원 정보 수정" : "회원 상세 정보 (관리자)" }
            </h2>
            
            <div className="profile-form-body">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <colgroup>
                        <col style={{ width: '30%', background: '#f8f9fa' }} />
                        <col style={{ width: '70%' }} />
                    </colgroup>
                    <tbody>
                        {/* <tr>
                            <th style={thStyle}>회원 번호</th>
                            <td style={tdStyle}>{user.userSeq}</td>
                        </tr> */}
                        <tr>
                            <th style={thStyle}>아이디</th>
                            <td style={tdStyle}>{user.userId}</td>
                        </tr>
                        <tr>
                            <th style={thStyle}>이름</th>
                            <td style={tdStyle}>
                                {isEdit ? (
                                    <input 
                                        type="text" 
                                        name="userNm" 
                                        value={editForm.userNm} 
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                ) : (
                                    user.userNm
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th style={thStyle}>이메일</th>
                            <td style={tdStyle}>
                                { isEdit ? 
                                    <input type="text" name="userEmail" value={editForm.userEmail} onChange={handleChange} style={inputStyle} />  
                                    :  
                                    user.userEmail  
                                }
                            </td>
                        </tr>
                        <tr>
                            <th style={thStyle}>권한</th>
                            <td style={tdStyle}>
                                { isEdit ? 
                                    (   <select name="role" value={editForm.role} onChange={handleChange} style={inputStyle}>
                                            <option value="ROLE_USER">일반 사용자</option>
                                            <option value="ROLE_ADMIN">관리자</option>
                                        </select>
                                    ) 
                                    : 
                                    (
                                        user.role === "ROLE_USER" ? "일반 사용자" : "관리자"
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <th style={thStyle}>로그인 타입</th>
                            <td style={tdStyle}>{user.loginType}</td>
                        </tr>
                        <tr>
                            <th style={thStyle}>계정 상태</th>
                            <td style={tdStyle}>
                                { isEdit ? 
                                    (    <select name="status" value={editForm.status} onChange={handleChange} style={inputStyle}>
                                            <option value="Y">활성</option>
                                            <option value="N">정지/탈퇴</option>
                                        </select>
                                    ) : 
                                    (
                                        user.status === 'Y' ? <span style={{color:'green', fontWeight:'bold'}}>활성</span> : <span style={{color:'red', fontWeight:'bold'}}>탈퇴/정지</span>
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <th style={thStyle}>
                                가입일
                            </th>
                            <td style={tdStyle}>
                                { user.regDate && new Date(user.regDate).toLocaleDateString('ko-KR') }
                            </td>
                        </tr>
                        <tr>
                            <th style={thStyle}>
                                수정일
                            </th>
                            <td style={tdStyle}>
                                { user.regDate && new Date(user.regDate).toLocaleDateString('ko-KR') }
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="profile-button-group" style={{justifyContent: 'center', gap: '10px'}}>
                    { isEdit ? (
                        <>
                            {/* 수정 모드일 때: 저장 / 취소 */}
                            <button onClick={handleSave} className="profile-form-button" style={{backgroundColor: '#007bff'}}>저장</button>
                            <button onClick={cancelEdit} className="profile-form-button" style={{backgroundColor: '#6c757d'}}>취소</button>
                        </>
                    ) : (
                        <>
                            {/* 조회 모드일 때: 목록으로 / 수정하기 */}
                            <button onClick={startEdit} className="profile-form-button" style={{backgroundColor: '#17a2b8'}}>수정하기</button>
                            <button onClick={() => Navigate('/mngr/userList')} className="profile-form-button">목록으로</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// 간단한 인라인 스타일 (필요시 CSS 파일로 이동)
const thStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333'
};

const tdStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    color: '#555'
};

const inputStyle = { 
    width: '95%', 
    padding: '5px',
    boxSizing: 'border-box' 
};

export default UserDetail;