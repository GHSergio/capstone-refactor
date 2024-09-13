// import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  // useNavigate,
  // useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import ListPage from "./pages/ListPage";
// import FavoritePage from "./pages/FavoritePage";
// import Layout from "./components/Layout";
import CallbackPage from "./pages/CallbackPage";
// import { useSelector } from "react-redux";
// import { RootState } from "./store/store";
import MainPage from "./pages/MainPage";

function AppRouter() {
  // const { currentListId } = useSelector((state: RootState) => state.user);

  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   // 獲取當前路徑
  //   const currentPath = location.pathname;
  //   // 排除不應進行重定向的路徑
  //   const isExemptPath =
  //     currentPath === "/login" || currentPath === "/callback";

  //   if (!isExemptPath) {
  //     // 根據 currentListId 來導航，只在需要導航時才執行
  //     if (currentListId === "favorites" && currentPath !== "/main/favorite") {
  //       navigate("/main/favorite");
  //     } else if (
  //       currentListId !== "favorites" &&
  //       currentPath !== "/main/list"
  //     ) {
  //       navigate("/main/list");
  //     }
  //   }
  // }, [currentListId, navigate, location.pathname]);

  return (
    <Routes>
      {/* 根路徑 `/` 重定向到 `/login` */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/main/" element={<MainPage />}>
        {/* <Route path="list" element={<ListPage />} />
        <Route path="favorite" element={<FavoritePage />} />
        <Route index element={<Navigate to="/main/list" replace />} /> */}
      </Route>

      {/* 訪問其他都會被導向/ */}
      <Route path="*" element={<Navigate to="/main/list" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
