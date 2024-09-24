import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import CallbackPage from "./pages/CallbackPage";

import MainPage from "./pages/MainPage";

const basename = import.meta.env.VITE_APP_BASENAME;
console.log("basename:", basename);

function App() {
  return (
    // <BrowserRouter basename={basename}>
    <Routes>
      {/* 根路徑 `/` 重定向到 `/login` */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/main/" element={<MainPage />}></Route>
    </Routes>
    // </BrowserRouter>
  );
}

export default App;
