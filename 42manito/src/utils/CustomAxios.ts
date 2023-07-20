import axios from "axios";
// 401에러만 처리하기 위한 인터셉터 axios

const URL = process.env.NEXT_PUBLIC_MOC_URL;

const customAxios = axios.create({
  baseURL: `${URL}`,
  timeout: 10000, // 타임아웃 설정, 10초 내에 응답이 없으면 에러 처리
});

customAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      alert("로그인이 되어있지 않습니다.");
      location.href = "/Home";
    }

    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use((response) => {
  // 서버로부터 응답을 수신한 경우 토큰 발급에 대한 특정 조건별로 아래 로직을 추가
  const accessToken = response.data.accessToken;
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  // 응답을 그대로 반환
  return response;
});

export default customAxios;
