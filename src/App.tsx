import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import FavoritePage from "./pages/FavoritePage";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function AppRouter() {
  const currentListId = useSelector(
    (state: RootState) => state.podcast.currentListId
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (currentListId === "favorites") {
      navigate("/favorite");
    } else {
      navigate("/list");
    }
  }, [currentListId, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="list" element={<ListPage />} />
        <Route path="favorite" element={<FavoritePage />} />
        <Route index element={<Navigate to="/list" replace />} />
      </Route>

      {/* 訪問其他都會被導向/ */}
      <Route path="*" element={<Navigate to="/list" replace />} />
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
