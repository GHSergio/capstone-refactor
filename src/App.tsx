import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CallbackPage from "./pages/CallbackPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./pages/PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      {/* 根路徑 `/` 重定向到 `/login` */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/callback" element={<CallbackPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/main" element={<MainPage />} />
      </Route>

      {/* 404 Route, 導向回 /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
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
