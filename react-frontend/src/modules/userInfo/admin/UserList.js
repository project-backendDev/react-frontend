import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserListPage() {
  const [userList, setUserList] = useState([]); // 회원 목록 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    axios.get('/api/mngr/userList')
        .then(response => {
            setUserList(response.data);
            console.log("TRUE!!!");
        })
        .catch(error => {
            setError("회원 목록을 불러오는데 실패했습니다.");
            console.log("FALSE...")
        });
  }, []);

    return (
    <>
      <div className="content-header">
        <h1>회원 목록</h1>
      </div>

      {/* 메인 컨텐츠 (카드) */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">등록된 회원</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th><input type="checkbox" name="allCheck" /></th>
                  <th>번호</th>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>가입일</th>
                  <th>기타</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 ? (
                  userList.map((user) => (
                    <tr key={user.userNo}>
                      {/* 체크박스 */}
                      <td><input type="checkbox" name="check" /></td>
                      {/* 번호 */}
                      <td>{user.userSeq}</td>
                      {/* 아이디 */}
                      <td>{user.userId}</td>
                      {/* 이름 */}
                      <td>{user.userNm}</td>
                      {/* 이메일 */}
                      <td>{user.userEmail}</td>
                      {/* 생성일 */}
                      <td>{new Date(user.regDt).toLocaleString('ko-KR')}</td>
                      <td>
                        <button className="btn btn-info btn-sm" style={{marginRight: '5px'}}>수정</button>
                        <button className="btn btn-danger btn-sm">삭제</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                      등록된 회원이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserListPage;