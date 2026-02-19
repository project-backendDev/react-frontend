import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 
import api from '../../common/api/AxiosConfig';
import Pagination from '../../common/Pagination';

function UserList() {
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]); // 회원 목록 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // const [users, setUsers] = useState([]);
  const [checkList, setCheckList] = useState([]); // 체크된 회원 ID 리스트

  // 전체 페이지 수
  const [totalPage, setTotalPage] = useState(0);
  // 현재 페이지
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // 26.02.10 페이징을 추가한 회원정보 조회 API
  const fetchUsers = (pageNumber) => {
    api.get(`/api/mngr/user-list`, {
      params : {
        page : pageNumber,  // 페이지 번호
        size : 5            // 한 페이지에 보여줄 갯수
      }
    })
    .then(response => {
      setUserList(response.data.content);

      if (response.data.page) { // 전체 페이지 수 세팅
        setTotalPage(response.data.page.totalPages);
      } else {  // 데이터가 없으면
        setTotalPage(0);
      }
    })
    .catch(error => {
        setError("회원 목록을 불러오는데 실패했습니다.");
        setLoading(false);

        // 권한 체크 또는 토큰 만료 처리
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert("관리자만 접근이 가능합니다.");
          navigate("/");
        }
    });
  };

  /* 26.02.10 페이징 처리를 추가하기 위해 메소드 주석처리
  // 회원정보 조회 API
  const fetchUsers = () => {

    api.get('/api/mngr/user-list')
    .then(response => {
      console.log(JSON.stringify(response.data));
      setUserList(response.data.content);
    })
    .catch(error => {
        setError("회원 목록을 불러오는데 실패했습니다.");
        setLoading(false);

        // 권한 체크 또는 토큰 만료 처리
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert("관리자만 접근이 가능합니다.");
          navigate("/");
        }
    });
  };
  */

  // 체크박스 선택/해제
  const handleCheck = (checked, id) => {
    if (checked) {
      setCheckList([...checkList, id]); // 체크 시 => 기존 리스트 + 현재 ID
    } else {
      setCheckList(checkList.filter(el => el !== id)); // 해제 시 => 현재 ID를 리스트에서 제거
    }
  };

  // 체크박스 전체 선택/해제
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckList(userList.map(user => user.userId)); // 체크 시 => 전체 ID를 추가
    } else {
      setCheckList([]); // 해제 시 => 배열을 초기화해서 ID를 리스트에서 제거
    }
  }

  // 회원 삭제 API
  const handleDelete = (checkIds) => {
    if (checkIds.length === 0) {
      alert(`삭제할 회원을 선택해주세요.`);
      return;
    }

    if (!window.confirm(`${checkIds.length}명의 회원을 삭제하시겠습니까?`)) {
      return;
    }

    api.delete(`/api/mngr/user`, {
      data : { userIds : checkIds } // 체크한 유저의 데이터
    })
    .then(response => {
      alert(response.data);
      fetchUsers(page); // 삭제 완료 후 회원 리스트를 다시 불러옴

      setCheckList([]); // 체크박스 초기화
    })
    .catch(error => {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.\n오류가 지속적으로 발생하는 경우 관리자에게 문의해주세요.");
    })
  }

    return (
  <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>회원 목록</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="content">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ lineHeight: '30px' }}>등록된 회원</h3>
            <div className="card-tools">
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(checkList)}>
                <i className="fas fa-trash-alt" /> 선택 삭제
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" name="allCheck" onChange={(e) => handleAllCheck(e.target.checked)} checked={userList.length > 0 && checkList.length === userList.length} />
                    </th>
                    <th>
                      번호
                    </th>
                    <th>
                      아이디
                    </th>
                    <th>
                      이름
                    </th>
                    <th>
                      이메일
                    </th>
                    <th>
                      권한
                    </th>
                    <th>
                      상태
                    </th> 
                    <th>
                      가입일
                    </th>
                    <th>
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userList.length > 0 ? (
                    userList.map((user, index) => (
                      <tr key={user.userId}>
                        {/* 체크박스 */}
                        <td>
                          <input type="checkbox" name="check" onChange={(e) => handleCheck(e.target.checked, user.userId)} checked={checkList.includes(user.userId)} />
                        </td>
                        {/* 번호 */}
                        <td>{user.userSeq || index + 1}</td>
                        {/* 아이디 */}
                        <td>{user.userId}</td>
                        {/* 이름 */}
                        <td>{user.userNm}</td>
                        {/* 이메일 */}
                        <td>{user.userEmail}</td>
                        {/* 권한 (ADMIN -> 관리자 / USER -> 일반) */}
                        <td>
                          { user.role == 'ROLE_ADMIN' ? <span className="badge badge-danger">관리자</span> : <span className="badge badge-info">일반</span> }
                        </td>
                        {/* 계정상태 (Y -> 활성 / N -> 정지) */}
                        <td>
                          { user.status === 'Y' ? <span className="badge badge-success">활성</span> : <span className="badge badge-secondary" style={{ color: 'red' }}>정지</span> }
                        </td>
                        {/* 가입일 */}
                        <td>
                          { user.regDate && new Date(user.regDate).toLocaleDateString('ko-KR') }
                        </td>
                        <td>
                          {/* [수정 버튼] */}
                          <NavLink to={`/mngr/userDetail/${user.userId}`} className="btn btn-info btn-sm" style={{ marginRight: '5px' }}>
                            <i className="fas fa-pencil-alt"></i> 수정
                          </NavLink>
                          {/* [단건 삭제 버튼] */}
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete([user.userId])}>
                            <i className="fas fa-trash" /> 삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                        등록된 회원이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* 페이징처리 */}
        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
      </div>
    </div>
  </>
);
}

export default UserList;