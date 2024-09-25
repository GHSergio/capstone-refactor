import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

const PrivateRoute = () => {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  // 避免還沒讀取到access_token 就 檢查
  useEffect(() => {
    setTimeout(() => {
      const acToken = localStorage.getItem("access_token");
      setHasToken(!!acToken); // 如果有 token，則設為 true
      setTokenChecked(true); // token 檢查完成
    }, 1000); // 延遲 1000ms 後檢查 token
  }, []);

  if (!tokenChecked) {
    return <div>Loading...</div>; // 等待 token 檢查完成
  }

  return hasToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
