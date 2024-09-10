import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import FavoritePage from "./pages/FavoritePage";
import Layout from "./components/Layout";
import CallbackPage from "./pages/CallbackPage";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function AppRouter() {
  const currentListId = useSelector(
    (state: RootState) => state.podcast.currentListId
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 獲取當前路徑
    const currentPath = location.pathname;
    // 排除不應進行重定向的路徑
    const isExemptPath =
      currentPath === "/login" || currentPath === "/callback";

    if (!isExemptPath) {
      // 只在當前路徑不是 list 或 favorite 並且不在豁免路徑時才進行導航
      if (currentListId === "favorites" && currentPath !== "/favorite") {
        navigate("/favorite");
      } else if (currentListId !== "favorites" && currentPath !== "/list") {
        navigate("/list");
      }
    }
  }, [currentListId, navigate, location]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/main/" element={<Layout />}>
        <Route path="list" element={<ListPage />} />
        <Route path="favorite" element={<FavoritePage />} />
        <Route index element={<Navigate to="/main/list" replace />} />
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
