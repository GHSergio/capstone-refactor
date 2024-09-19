// import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import CallbackPage from "./pages/CallbackPage";

import MainPage from "./pages/MainPage";

function AppRouter() {
  return (
    <Routes>
      {/* 根路徑 `/` 重定向到 `/login` */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/main/" element={<MainPage />}></Route>

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
