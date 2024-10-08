import { useEffect, useState } from "react";
import { Box, LinearProgress, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchUserProfile,
  initializeAccount,
  fetchUserFavorites,
  fetchCategories,
} from "../slice/userSlice";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // 進度狀態
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const updateProgress = (value: number) => {
    setProgress((prev) => Math.min(prev + value, 100));
  };

  // 等待 token 被設置
  const waitForToken = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        resolve(token);
      } else {
        reject("未找到 access token，請重新登入。");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await waitForToken();
        if (accessToken) {
          updateProgress(20);

          // 開始執行相關的資料請求
          await dispatch(initializeAccount()).unwrap();
          updateProgress(20);

          await dispatch(fetchUserProfile()).unwrap();
          updateProgress(20);

          await dispatch(fetchCategories()).unwrap();
          updateProgress(20);

          await dispatch(fetchUserFavorites()).unwrap();
          updateProgress(20);

          // 等待一段時間後導航到主頁
          setTimeout(() => {
            navigate("/main");
          }, 2000);
        }
      } catch (err) {
        setError(err as string);
        setLoading(false);
        console.error("API 請求失敗: ", err);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let accessToken = localStorage.getItem("access_token");

  //     // 持續檢查是否有token，直到它被設置
  //     if (!accessToken) {
  //       const waitForToken = async () => {
  //         return new Promise((resolve) => {
  //           const interval = setInterval(() => {
  //             accessToken = localStorage.getItem("access_token");
  //             if (accessToken) {
  //               clearInterval(interval);
  //               resolve(accessToken); // 將 token 傳遞給 Promise 的 resolve，表示完成
  //             }
  //           }, 100); // 每100ms檢查一次
  //         });
  //       };
  //       await waitForToken(); // 等待 Promise 完成，直到 accessToken 被設置
  //     }

  //     try {
  //       if (accessToken) {
  //         // 此時token已經存在，開始執行fetch等操作
  //         updateProgress(20);

  //         await dispatch(initializeAccount()).unwrap();
  //         updateProgress(20);

  //         await dispatch(fetchUserProfile()).unwrap();
  //         updateProgress(20);

  //         await dispatch(fetchCategories()).unwrap();
  //         updateProgress(20);

  //         await dispatch(fetchUserFavorites()).unwrap();
  //         updateProgress(20);

  //         setTimeout(() => {
  //           navigate("/main");
  //         }, 2000);
  //       } else {
  //         setError("未找到 access token，請重新登入。");
  //         console.error("Access token 未找到");
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       setError("獲取資料失敗，請重新嘗試。");
  //       console.error("API 請求失敗: ", err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, navigate]);

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
            發生錯誤: 可嘗試F5重整頁面，{error}
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
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontSize: {
              xs: "0.5rem",
              sm: "0.6rem",
              md: "0.7rem",
              lg: "0.8rem",
              xl: "1rem",
            },
          }}
        >
          數據獲取完成，即將前往主頁...
        </Typography>
      )}
    </Box>
  );
};

export default CallbackPage;
