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
  const [error, setError] = useState<string | null>(null); // 錯誤狀態
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const updateProgress = (value: number) => {
    setProgress((prev) => Math.min(prev + value, 100));
  };

  // useEffect(() => {
  //   // 先獲取access_token
  //   const accessToken = localStorage.getItem("access_token");

  //   const fetchData = async () => {
  //     // 第一步：設定 access token
  //     updateProgress(20);
  //     try {
  //       // 第二步：初始化帳戶並獲取 acToken
  //       await dispatch(initializeAccount()).unwrap();
  //       updateProgress(20);

  //       // 第三步：獲取使用者資料
  //       await dispatch(fetchUserProfile()).unwrap();
  //       updateProgress(20);

  //       // 第四步：獲取分類清單
  //       await dispatch(fetchCategories()).unwrap();
  //       updateProgress(20);

  //       // 第五步：獲取收藏節目
  //       await dispatch(fetchUserFavorites()).unwrap();
  //       updateProgress(20);

  //       setTimeout(() => {
  //         navigate("/main");
  //       }, 2000);
  //     } catch (err) {
  //       setError("獲取資料失敗，請重新嘗試。");
  //       console.error("API 請求失敗: ", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (accessToken) {
  //     fetchData();
  //   } else {
  //     setError("未找到 access token，請重新登入。");
  //     console.error("Access token 未找到");
  //     setLoading(false);
  //   }
  // }, [dispatch, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      let accessToken = localStorage.getItem("access_token");

      // 持續檢查是否有token，直到它被設置
      if (!accessToken) {
        const waitForToken = async () => {
          return new Promise((resolve) => {
            const interval = setInterval(() => {
              accessToken = localStorage.getItem("access_token");
              if (accessToken) {
                clearInterval(interval);
                resolve(accessToken);
              }
            }, 100); // 每100ms檢查一次
          });
        };
        await waitForToken(); // 等待 token 被設置
      }

      try {
        if (accessToken) {
          // 此時token已經存在，開始執行fetch等操作
          updateProgress(20);

          await dispatch(initializeAccount()).unwrap();
          updateProgress(20);

          await dispatch(fetchUserProfile()).unwrap();
          updateProgress(20);

          await dispatch(fetchCategories()).unwrap();
          updateProgress(20);

          await dispatch(fetchUserFavorites()).unwrap();
          updateProgress(20);

          setTimeout(() => {
            navigate("/main");
          }, 2000);
        } else {
          setError("未找到 access token，請重新登入。");
          console.error("Access token 未找到");
          setLoading(false);
        }
      } catch (err) {
        setError("獲取資料失敗，請重新嘗試。");
        console.error("API 請求失敗: ", err);
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
            發生錯誤: {error}，可嘗試F5重整頁面
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
