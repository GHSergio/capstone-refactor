import Player from "./Player";
import { Box, Divider, Typography } from "@mui/material";
import BookmarkIcon from "../BookmarkIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { addFavorite, removeFavorite } from "../../slice/userSlice";
const Footer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentPlayer } = useSelector((state: RootState) => state.podcast);
  const { userFavorites } = useSelector((state: RootState) => state.user);

  // console.log("currentPlayer:", currentPlayer);

  const isFavorite = userFavorites?.some(
    (favEpisode) => favEpisode.id === currentPlayer?.id
  );

  // 處理onClick書籤 根據是否已收藏來添加或移除收藏
  const handleToggleFavorite = () => {
    if (!currentPlayer) {
      return null;
    }

    if (isFavorite) {
      dispatch(removeFavorite(currentPlayer.id));
    } else {
      dispatch(addFavorite(currentPlayer.id));
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "lightGray",
          position: "relative",
        }}
      >
        {/* content */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginX: "auto",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            marginTop: "0.5rem",
          }}
        >
          {/* bookmark */}
          <Box sx={{ position: "absolute", right: 0, top: 0 }}>
            <BookmarkIcon
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          </Box>

          {/* header */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "1.25rem", padding: " 0 0.5rem" }}
            >
              正在播放
            </Typography>
          </Box>

          <Divider sx={{ my: "0.5rem" }}></Divider>

          {/* title & description */}
          {/* <Box>
            <Typography
              variant="h6"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "1rem",
              }}
            >
              {currentPlayer?.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                margin: "0.5rem 0",
                fontSize: "0.85rem",
              }}
            >
              {currentPlayer?.description}
            </Typography>
          </Box> */}

          {/* <Player /> */}
          <Box
            sx={{
              width: { xs: "100%" },
              height: { xs: "15vw", sm: "16vw", md: "18vw", xl: "18vw" },
              marginTop: "0.5rem",
              "@media (max-width: 321px)": {
                height: "30vw",
              },
              "@media (min-width: 321px) and (max-width: 376px)": {
                height: "30vw",
              },
              "@media (min-width: 376px) and (max-width: 600px)": {
                height: "23vw",
              },
              "@media (min-width:1600px)": {
                height: "20vw",
              },
            }}
          >
            <Player />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
