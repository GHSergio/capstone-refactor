import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ListPage from "../pages/ListPage";
import FavoritePage from "../pages/FavoritePage";
// import User from "./footer/User";
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
        {/* 動態內容區域 */}
        <Box
          sx={{
            width: "100%",
            // height: { xs: "70vh", sm: "60vh" },
            height: { xs: "95%", sm: "90%", md: "95%" },
            padding: "1rem",
            margin: {
              // xs: "35vw auto 0 auto",
              sm: "0vw auto 0 auto",
              md: "0vw auto 0 auto",
              xl: "0vw auto 0 auto",
            },
            "@media (max-width:321px)": {
              margin: "35vw auto 0 auto",
              height: "95%",
            },
            "@media (min-width:321px) and (max-width:376px)": {
              margin: "30vw auto 0 auto",
              height: "95%",
            },
            "@media (min-width:376px) and (max-width:600px)": {
              margin: "25vw auto 0 auto",
              height: "95%",
            },
            "@media (min-width:1600px)": {
              margin: "0vw auto 0 auto",
              height: "95%",
            },
          }}
        >
          {currentCategoryId === "favorites" ? <FavoritePage /> : <ListPage />}
        </Box>
      </Box>
    </>
  );
};

export default MainContent;
