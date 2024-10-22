import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ListPage from "../pages/ListPage";
import FavoritePage from "../pages/FavoritePage";
import User from "./footer/User";
import ActionModal from "./modals/ActionModal";

const MainContent = () => {
  const { currentCategoryId } = useSelector((state: RootState) => state.user);

  return (
    <>
      <ActionModal />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "fixed",
            right: "0px",
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
            width: "75%",
            backgroundColor: "#F6F7F8",
            height: { sm: "11vw", md: "9vw" },
            "@media (min-width:1600px)": {
              height: "4.5vw",
            },
            zIndex: 2,
            // border: "1px solid blue",
          }}
        >
          {/* User */}
          <Box
            sx={{
              marginRight: "1rem",
            }}
          >
            <User />
          </Box>
        </Box>

        {/* 動態內容區域 */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "70vh", sm: "60vh" },
            padding: "1rem",
            margin: {
              xs: "35vw auto 0 auto",
              sm: "10vw auto 0 auto",
              md: "10vw auto 0 auto",
              xl: "10vw auto 0 auto",
            },
            "@media (max-width:321px)": {
              margin: "35vw auto 0 auto",
              height: "90vw",
            },
            "@media (min-width:321px) and (max-width:376px)": {
              margin: "30vw auto 0 auto",
              height: "90vw",
            },
            "@media (min-width:376px) and (max-width:600px)": {
              margin: "25vw auto 0 auto",
              height: "78vh",
            },
            "@media (min-width:1600px)": {
              margin: "7.5vh auto 0 auto",
              height: "78vh",
            },
          }}
        >
          {currentCategoryId === "favorites" ? <FavoritePage /> : <ListPage />}
        </Box>
      </Box>
      {/* <Box
        sx={{
          position: "absolute",
          top: "40px",
          right: "60px",
          display: { xs: "none", sm: "block" },
        }}
      >
        <User />
      </Box> */}
    </>
  );
};

export default MainContent;
