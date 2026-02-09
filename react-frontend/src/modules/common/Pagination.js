import React from 'react';
import '../../assets/css/common/Pagination.css'; 

const Pagination = ({ page, totalPage, setPage }) => {
  // 페이지가 1개 이하일 때 페이징 버튼 숨김
  if (totalPage <= 1) { return null };

  // 한 번에 보여줄 페이지 번호 개수
  const limit = 5; 
  
  // 현재 페이지
  const currentPage = Math.ceil(page / limit);
  
  // 현재 그룹의 시작과 끝 번호 계산
  let startPage = (currentPage - 1) * limit + 1;
  let endPage = startPage + limit - 1;

  // 끝 번호가 전체 페이지보다 크면 전체 페이지로 제한
  if (endPage > totalPage) {
    endPage = totalPage;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* 1. 맨 처음으로 (<<) */}
      <button 
        onClick={() => setPage(1)} 
        disabled={page === 1}
      >
        &lt;&lt;
      </button>

      {/* 2. 이전 그룹으로 (<) */}
      <button 
        onClick={() => setPage(page - 1)} 
        disabled={page === 1}
      >
        &lt;
      </button>

      {/* 3. 페이지 번호들 (1, 2, 3...) */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={page === num ? "active" : ""} // 현재 페이지 강조
        >
          {num}
        </button>
      ))}

      {/* 4. 다음 페이지로 (>) */}
      <button 
        onClick={() => setPage(page + 1)} 
        disabled={page === totalPage}
      >
        &gt;
      </button>

      {/* 5. 맨 끝으로 (>>) */}
      <button 
        onClick={() => setPage(totalPage)} 
        disabled={page === totalPage}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;