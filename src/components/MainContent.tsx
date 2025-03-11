import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ListPage from "../pages/ListPage";
import FavoritePage from "../pages/FavoritePage";
import ActionModal from "./modals/ActionModal";

const MainContent = () => {
  const currentCategoryId = useSelector(
    (state: RootState) => state.user.currentCategoryId
  );

  return (
    <>
      <ActionModal />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(88, 216, 203, 0.2)",
        }}
      >
        {/* 動態內容區域 */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "95%", sm: "90%", md: "90%" },
            padding: "1rem",
            margin: {
              xs: "0 auto",
            },
            "@media (max-width:321px)": {
              margin: "30% auto 0 auto",
              height: "95%",
              padding: "0.2rem",
            },
            "@media (min-width:321px) and (max-width:376px)": {
              margin: "30% auto 0 auto",
              height: "95%",
              padding: "0.2rem",
            },
            "@media (min-width:376px) and (max-width:599px)": {
              margin: "25% auto 0 auto",
              height: "95%",
              padding: "0.2rem",
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
