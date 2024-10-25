import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  // 檢查 localStorage 是否有 token
  useEffect(() => {
    setTimeout(() => {
      const acToken = localStorage.getItem("access_token");
      setHasToken(!!acToken); // 使用 !! 將 非布林值 轉換為布林值
      // console.log("檢查到acToken?");
    }, 100);
  }, []);

  // return null -> 回傳null 靜默狀態(沒畫面), 並且return 不再繼續往下執行code; 直到 setTimeout 將acToken結果 轉換成非null 打破這個 return null 的狀態 -> 觸發重新渲染 但這次不為null 所以不會卡在 hasToken === null 會繼續跑完 return hasToken ? 條件式
  if (hasToken === null) {
    // console.log("搜尋acToken...");
    return null;
  }

  // 如果有 token，顯示內部頁面，否則跳轉到 /login
  return hasToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
