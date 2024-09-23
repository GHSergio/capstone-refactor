import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/footer/Footer";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import {
  setUserData,
  setUserCategories,
  setUserFavorites,
} from "../slice/userSlice";

const MainPage: React.FC = () => {
  const dispatch = useDispatch();

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
        console.log("更新後的使用者分類資訊: ", parsedCategories);
      } catch (error) {
        console.error("解析使用者分類失敗: ", error);
      }
    }

    if (userFavorites && userFavorites !== "undefined") {
      try {
        const parsedFavorites = JSON.parse(userFavorites);
        dispatch(setUserFavorites(parsedFavorites));
        console.log("更新後的使用者收藏資訊: ", parsedFavorites);
      } catch (error) {
        console.error("解析使用者收藏失敗: ", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Grid
          container
          width="100vw"
          // height="100vh"
          sx={{
            height: { xs: "", sm: "100vh" },
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
              height: "100%",
              display: { xs: "block", sm: "none" },
            }}
          >
            <Navbar />
          </Grid>

          {/* 大螢幕顯示 Sidebar */}
          <Grid
            item
            // xs={12}
            sm={3}
            sx={{
              boxShadow: "0px 0px 2px 2px #C7C7C73D",
              height: "100%",
              display: { xs: "none", sm: "block" },
            }}
          >
            <SideBar />
          </Grid>

          {/* MainContent */}
          <Grid item xs={12} sm={9} sx={{ height: "100%", overflowY: "auto" }}>
            <MainContent />
          </Grid>
        </Grid>
        {/* Footer */}
        <Box
          sx={{
            position: { xs: "absolute", sm: "relative" },
            width: "100%",
            "@media(min-width:476px)": {
              bottom: 0,
            },
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
