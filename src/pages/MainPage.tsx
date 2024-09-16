import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import MainContent from "../components/MainContent";
import {
  setUserData,
  setUserCategories,
  setUserFavorites,
} from "../slice/userSlice";

const MainPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userProfile = localStorage.getItem("user_profile");
    const userCategories = localStorage.getItem("user_categories");
    const userFavorites = localStorage.getItem("user_favorites");

    // 如果 localStorage 有資料，則更新到 Redux state，並確保值是有效的 JSON 字符串
    if (userProfile && userProfile !== "undefined") {
      try {
        const parsedUserProfile = JSON.parse(userProfile);
        dispatch(setUserData(parsedUserProfile));
        console.log("更新後的使用者資訊: ", parsedUserProfile);
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
    <Grid
      container
      width="100vw"
      height="100vh"
      sx={{ display: "flex", alignItems: "center" }}
    >
      {/* SideBar */}
      <Grid
        item
        xs={2}
        width={260}
        height="100%"
        sx={{ boxShadow: "0px 0px 2px 2px #C7C7C73D" }}
      >
        <SideBar />
      </Grid>

      {/* MainContent */}
      <Grid item xs={7} height="100%">
        <MainContent />
      </Grid>

      {/* Footer */}
      <Grid item xs={3} width={372} height="100%">
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainPage;