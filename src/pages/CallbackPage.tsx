import { useEffect, useState } from "react";
import { Box, LinearProgress, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchUserProfile,
  fetchUserPlaylists,
  fetchUserFavorites,
  setAccessToken,
} from "../slice/userSlice";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // 進度狀態
  const [error, setError] = useState<string | null>(null); // 錯誤狀態
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const updateProgress = (value: number) => {
    setProgress((prev) => Math.min(prev + value, 100));
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");

      // // 如果 accessToken 不存在，重試數次直到獲取到 token
      // let retries = 5;
      // while (!accessToken && retries > 0) {
      //   await new Promise((resolve) => setTimeout(resolve, 500)); // 等待 500ms
      //   retries--;
      // }

      if (accessToken) {
        dispatch(setAccessToken(accessToken));
        updateProgress(10);

        try {
          await dispatch(fetchUserProfile()).unwrap();
          updateProgress(30);

          await dispatch(fetchUserPlaylists()).unwrap();
          updateProgress(30);

          await dispatch(fetchUserFavorites()).unwrap();
          updateProgress(30);

          setTimeout(() => {
            navigate("/main");
          }, 2000);
        } catch (err) {
          setError("獲取資料失敗，請重新嘗試。");
          console.error("API 請求失敗: ", err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("未找到 access token，請重新登入。");
        console.error("Access token 未找到");
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleLoginAgain = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {loading ? (
        <>
          {/* 進度條容器 */}
          <Box sx={{ width: "80%", mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
            獲取初始數據中, 請耐心等待...目前進度: {progress}%
          </Typography>
        </>
      ) : error ? (
        <>
          <Typography variant="h6" sx={{ color: "red", mb: 2 }}>
            發生錯誤: {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginAgain}
          >
            重新登入
          </Button>
        </>
      ) : (
        <Typography variant="h6" sx={{ color: "#fff" }}>
          數據獲取完成，即將前往主頁...
        </Typography>
      )}
    </Box>
  );
};

export default CallbackPage;
