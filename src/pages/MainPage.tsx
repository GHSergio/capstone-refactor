import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/footer/Footer";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  setUserData,
  setUserCategories,
  setUserFavorites,
  refreshAccessToken,
} from "../slice/userSlice";

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // 從 localStorage 提取資訊
  useEffect(() => {
    const userProfile = localStorage.getItem("user_profile");
    const userCategories = localStorage.getItem("user_categories");
    const userFavorites = localStorage.getItem("user_favorites");

    // 如果 localStorage 有資料，則更新到 Redux state，並確保值是有效的 JSON 字符串
    if (userProfile && userProfile !== "undefined") {
      try {
        const parsedUserProfile = JSON.parse(userProfile);
        dispatch(setUserData(parsedUserProfile));
        // console.log("更新後的使用者資訊: ", parsedUserProfile);
      } catch (error) {
        console.error("解析使用者資訊失敗: ", error);
      }
    }

    if (userCategories && userCategories !== "undefined") {
      try {
        const parsedCategories = JSON.parse(userCategories);
        dispatch(setUserCategories(parsedCategories));
        // console.log("更新後的使用者分類資訊: ", parsedCategories);
      } catch (error) {
        console.error("解析使用者分類失敗: ", error);
      }
    }

    if (userFavorites && userFavorites !== "undefined") {
      try {
        const parsedFavorites = JSON.parse(userFavorites);
        dispatch(setUserFavorites(parsedFavorites));
        // console.log("更新後的使用者收藏資訊: ", parsedFavorites);
      } catch (error) {
        console.error("解析使用者收藏失敗: ", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // 在 useEffect 作用域內宣告 timeoutId，初始為 null
    // setTimeout 返回一個 Timeout 物件，而不是純粹的數字，所以在 Node.js 中會使用 NodeJS.Timeout 作為型別。
    let timeoutId: NodeJS.Timeout | null = null;
    console.log(timeoutId);
    // 定期檢查 token 是否即將過期
    const checkTokenExpiration = () => {
      const expiresAt = localStorage.getItem("expires");
      if (expiresAt) {
        const expiresAtTime = new Date(expiresAt).getTime();
        const currentTime = Date.now();
        const timeLeft = expiresAtTime - currentTime;
        console.log("expiresAtTime: ", expiresAtTime);
        console.log("currentTime: ", currentTime);
        console.log("timeLeft: ", timeLeft);

        // 比較當前時間和過期時間
        if (timeLeft <= 5 * 60 * 1000) {
          console.log("Token 即將過期，刷新 Token...");
          dispatch(refreshAccessToken()); // 如果過期，觸發刷新 token
        } else {
          console.log("Token 還有效，剩餘時間:", timeLeft / 1000 / 60, "分鐘");
        }

        // 動態設置下一次檢查的時間間隔
        // 大於10分鐘每5分鐘檢查一次，否則每1分鐘
        const nextCheck =
          timeLeft > 10 * 60 * 1000 ? 5 * 60 * 1000 : 1 * 60 * 1000;

        console.log("下一次檢查的時間間隔: ", nextCheck / 1000 / 60, "分鐘");

        // 設置下一次檢查，並保存 timeout ID
        timeoutId = setTimeout(checkTokenExpiration, nextCheck);
      }
    };
    checkTokenExpiration();

    // 確保清理定時器
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* sidebar & mainContent */}
        <Grid
          container
          sx={{
            height: { xs: "auto", sm: "80vh" },
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {/* 小螢幕顯示 Navbar */}
          <Grid
            item
            xs={12}
            sx={{
              boxShadow: "0px 0px 2px 2px #C7C7C73D",
              // height: "100%",
              display: { xs: "block", sm: "none" },
            }}
          >
            <Navbar />
          </Grid>

          {/* 大螢幕顯示 Sidebar */}
          <Grid
            item
            sm={3}
            sx={{
              boxShadow: "0px 0px 2px 2px #C7C7C73D",
              display: { xs: "none", sm: "block" },
              height: "100%",
            }}
          >
            <SideBar />
          </Grid>

          {/* MainContent */}
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <MainContent />
          </Grid>
        </Grid>

        {/* Footer */}
        <Box
          sx={{
            position: { xs: "absolute", sm: "relative" },
            width: "100%",
            height: "100%",
            "@media(max-width:600px)": {
              top: 0,
              height: "0vh",
            },
            bottom: 0,
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
