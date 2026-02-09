import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// 모든 요청에 토큰 자동 포함
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 토큰 만료(401 오류, 403 오류) 시 자동 로그아웃 처리 및 만료된 토큰 삭제
api.interceptors.response.use(
    (response) => {
        return response; 
    },
    (error) => {
        // 요청한 주소(error.config.url에 API주소가 들어가 있음) '/login'이 아닐 때에만 로그아웃 실행
        if ((error.response.status === 401 || error.response.status === 403) && !error.config.url.includes('/login')) {
            
            // 토큰 삭제
            localStorage.removeItem('token');

            alert('세션이 만료되었거나 권한이 없습니다.\n다시 로그인 해주세요.');

            // 페이지 강제 이동
            window.location.href = '/login'; 
        }
        
        return Promise.reject(error);
    }
);

export default api;