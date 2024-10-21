import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

const PrivateRoute = () => {
  // const [tokenChecked, setTokenChecked] = useState(false);
  // const [hasToken, setHasToken] = useState(false);

  // // 避免還沒讀取到access_token 就 檢查
  // useEffect(() => {
  //   setTimeout(() => {
  //     const acToken = localStorage.getItem("access_token");
  //     setHasToken(!!acToken); // 如果有 token，則設為 true
  //     setTokenChecked(true); // token 檢查完成
  //   }, 1000); // 延遲 1000ms 後檢查 token
  // }, []);

  // if (!tokenChecked) {
  //   return <div>Loading...</div>; // 等待 token 檢查完成
  // }

  // return hasToken ? <Outlet /> : <Navigate to="/login" replace />;
  const [hasToken, setHasToken] = useState<boolean | null>(null); // null 表示檢查中

  // 檢查 localStorage 是否有 token
  useEffect(() => {
    const acToken = localStorage.getItem("access_token");
    setHasToken(!!acToken); // 設置是否有 token
  }, []);

  // 檢查 token 結果未定，顯示 Loading（僅在首次渲染時可能短暫顯示）
  if (hasToken === null) {
    return null; // 返回 null，避免顯示 "Loading..."，讓頁面保持靜默狀態
  }

  // 如果有 token，顯示內部頁面，否則跳轉到 /login
  return hasToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
