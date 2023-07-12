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

export default customAxios;
