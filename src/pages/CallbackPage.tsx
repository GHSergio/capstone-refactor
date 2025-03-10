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
import { keyframes } from "@mui/system"; // 引入 MUI 的 keyframes
import axios from "axios";

const CallbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // 進度狀態
  const [error, setError] = useState<string | null>(null);
  const [animationEnded, setAnimationEnded] = useState(false); // 監控動畫是否結束
  const [dataLoaded, setDataLoaded] = useState(false); // 監控 fetchData 是否完成

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const updateProgress = (value: number) => {
    setProgress((prev) => Math.min(prev + value, 100));
  };

  // 初始token尚未設置 重複檢查幾次 -> 避免因延遲 只檢查一次 就判定為reject
  const waitForToken = async (retries = 6): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const checkToken = (attempts: number) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          resolve(token);
        } else if (attempts > 0) {
          // 每500毫秒重試一次，最多重試 `retries` 次
          setTimeout(() => checkToken(attempts - 1), 500);
        } else {
          reject("未找到 access token，請重新登入。");
        }
      };
      checkToken(retries);
    });
  };

  useEffect(() => {
    // throw new Error("測試錯誤：故意引發錯誤以測試 ErrorBoundary");

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

          // fetchData 完成後設置 dataLoaded 為 true
          setDataLoaded(true);
        }
      } catch (err: unknown) {
        let errorMessage: string;
        if (axios.isAxiosError(err) && err.response) {
          console.log("Axios: ", axios.isAxiosError(err) && err.response);
          errorMessage = err.response.data || err.message;
        } else {
          errorMessage = "發生未知錯誤，請稍後再試";
        }

        // setError(err as string);
        setError(errorMessage);
        setLoading(false);
        console.error("API 請求失敗: ", err);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleLoginAgain = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // 將字串拆分為字母Array
  const textToDisplay = "ALPHA Cast".split("");

  // 定義動畫
  const bounceAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-200px); /* 初始在上方 */
    }
    20% {
      opacity: 1;
      transform: translateY(0); /* 落到正常位置 */
    }
    40% {
      transform: translateY(-30px); /* 第一次彈跳到上方 30px */
    }
    60% {
      transform: translateY(0); /* 回到正常位置 */
    }
    80% {
      transform: translateY(-15px); /* 第二次彈跳到上方 15px */
    }
    100% {
      transform: translateY(0); /* 最後回到正常位置 */
      opacity: 1;
    }
  `;

  // 定義一個函數來生成 textShadow 字串
  const generateTextShadow = (
    offsetX: number,
    offsetY: number,
    blurRadius: number,
    color: string
  ) => {
    return `${offsetX}px ${offsetY}px ${blurRadius}px ${color}, ${-offsetX}px ${-offsetY}px ${blurRadius}px ${color}`;
  };

  // 監控動畫結束的事件
  const handleAnimationEnd = () => {
    setAnimationEnded(true);
  };

  // 當數據加載和動畫都完成時，導航到主頁
  useEffect(() => {
    if (dataLoaded && animationEnded) {
      setTimeout(() => {
        navigate("/main");
      }, 2000); // 等待2秒後導航
    }
  }, [dataLoaded, animationEnded, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        maxWidth: "1440px",
        maxHeight: "996px",
      }}
    >
      {loading ? (
        <>
          {/* 使用 MUI 的 Typography */}
          <Box>
            {textToDisplay.map((text, index) => (
              <Typography
                key={index}
                variant="h1"
                onAnimationEnd={
                  index === textToDisplay.length - 1
                    ? handleAnimationEnd
                    : undefined
                } // 在最後一個字母的動畫結束時觸發
                sx={{
                  opacity: 0,
                  fontFamily: "'Henny Penny', cursive",
                  color: "white",
                  textShadow: {
                    xs: generateTextShadow(1.5, 1.5, 1.5, "black"), // 使用函數生成陰影
                    sm: generateTextShadow(2, 2, 2, "black"),
                    md: generateTextShadow(3, 3, 3, "black"),
                    lg: generateTextShadow(4, 4, 4, "black"),
                  },
                  "@media (min-width:1600px)": {
                    textShadow: generateTextShadow(8, 8, 5, "black"),
                  },
                  animation: `${bounceAnimation} 1.5s ease-in-out forwards`,
                  animationDelay: `${index * 0.3}s`,
                  display: "inline-block",
                  margin: {
                    sm: "0.6rem",
                    md: "0.8rem",
                    lg: "1rem",
                  },
                  fontSize: {
                    sm: "3.5rem",
                    md: "4.5rem",
                    lg: "6rem",
                  },
                  "@media (max-width:320px)": {
                    fontSize: "1.15rem",
                    margin: "0.35rem",
                  },
                  "@media (min-width:321px) and (max-width:376px)": {
                    fontSize: "1.5rem",
                    margin: "0.35rem",
                  },
                  "@media(min-width:376px) and (max-width:600px)": {
                    fontSize: "1.8rem",
                    margin: "0.35rem",
                  },
                  "@media(min-width:1600px)": {
                    fontSize: "12rem",
                    margin: "1.8rem",
                  },
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>

          {/* 進度條容器 */}
          <Box
            sx={{
              width: "80%",
              my: {
                sm: "1rem",
                md: "1.2rem",
                lg: "2rem",
              },
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                borderRadius: 5,
                height: {
                  sm: "0.8rem",
                  md: "1.2rem",
                  lg: "1.5rem",
                },
                "@media (max-width:320px)": {
                  height: "0.4rem",
                },
                "@media (min-width:321px) and (max-width:376px)": {
                  height: "0.5rem",
                },
                "@media(min-width:376px) and (max-width:600px)": {
                  height: "0.6rem",
                },
                "@media(min-width:1600px)": {
                  height: "3rem",
                },
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              mt: 1,
              fontSize: {
                sm: "1rem",
                md: "1.5rem",
                lg: "2rem",
              },
              "@media (max-width:320px)": {
                fontSize: "0.6rem",
              },
              "@media (min-width:321px) and (max-width:376px)": {
                fontSize: "0.7rem",
              },
              "@media(min-width:376px) and (max-width:600px)": {
                fontSize: "0.8rem",
              },
              "@media(min-width:1600px)": {
                fontSize: "4rem",
              },
            }}
          >
            {/* 根據動畫是否結束顯示不同的文字 */}
            {dataLoaded && animationEnded
              ? "數據獲取完成，即將前往主頁..."
              : `獲取初始數據中, 請耐心等待...目前進度: ${progress}%`}
          </Typography>
        </>
      ) : error ? (
        <>
          <Typography variant="h6" sx={{ color: "red", mb: 2 }}>
            {error}
            {/* 發生錯誤: 可嘗試F5重整頁面， */}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginAgain}
          >
            重新登入
          </Button>
        </>
      ) : null}
    </Box>
  );
};

export default CallbackPage;
