import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import ListPage from "./ListPage";
import FavoritePage from "./FavoritePage";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  setUserData,
  setUserPlaylists,
  setUserFavorites,
} from "../slice/userSlice";

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentListId } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const userProfile = localStorage.getItem("user_profile");
    const playlists = localStorage.getItem("user_playlists");
    const userFavorites = localStorage.getItem("user_favorites");

    // 如果 localStorage 有資料，則更新到 Redux state
    if (userProfile) {
      dispatch(setUserData(JSON.parse(userProfile)));
    }
    if (playlists) {
      dispatch(setUserPlaylists(JSON.parse(playlists)));
    }
    if (userFavorites) {
      dispatch(setUserFavorites(JSON.parse(userFavorites)));
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

      {/* MainContent，根據 currentListId 顯示對應內容 */}
      <Grid item xs={7} height="100%">
        {currentListId === "favorites" ? <FavoritePage /> : <ListPage />}
      </Grid>

      {/* Footer */}
      <Grid item xs={3} width={372} height="100%">
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainPage;
