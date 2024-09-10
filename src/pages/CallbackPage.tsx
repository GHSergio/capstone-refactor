import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../api/Author.js";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    // 檢查 localStorage 中是否存在 access_token
    if (accessToken) {
      // 使用 access_token 調用 Spotify API 獲取用戶數據
      getUserData().then((userData) => {
        console.log("獲取到的使用者數據：", userData);
        // 在獲取完用戶數據後，可以進行重定向或其他操作
        navigate("/list"); // 完成後重定向到主要頁面
      });
    } else {
      // 如果沒有 token，則重新進行授權流程或顯示錯誤
      console.error("未找到 access_token，請重新登入。");
      navigate("/login");
    }
  }, [navigate]);

  return <div>處理授權中...</div>;
};

export default CallbackPage;
