import Player from "./Player";
import { Box, Divider, Typography } from "@mui/material";
import BookmarkIcon from "./BookmarkIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavorite } from "../slice/podcastSlice";
const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const { favoriteEpisodes, currentPlayer } = useSelector(
    (state: RootState) => state.podcast
  );

  console.log("currentPlayer:", currentPlayer);
  const isFavorite = favoriteEpisodes?.some(
    (favEpisode) => favEpisode.id === currentPlayer?.id
  );

  const handleToggleFavorite = () => {
    if (currentPlayer !== null) dispatch(toggleFavorite(currentPlayer));
  };

  return (
    <>
      <Box
        width={312}
        height={596}
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "16px 16px 40px 0px #C7C7C73D",
          borderRadius: "1rem",
          marginTop: "5rem",
          position: "relative",
        }}
      >
        {/* content */}
        <Box
          sx={{
            width: "80%",
            marginX: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* bookmark */}
          <Box sx={{ position: "absolute", right: 20, top: 0 }}>
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
            <Typography variant="h6" sx={{ fontSize: "1.25rem" }}>
              正在播放
            </Typography>
          </Box>

          <Divider sx={{ my: "0.5rem" }}></Divider>

          {/* title & description */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
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
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                margin: "0.5rem 0",
                fontSize: "0.85rem",
              }}
            >
              {currentPlayer?.description}
            </Typography>
          </Box>
          {/* Player */}
          <Box sx={{ width: "248px", height: "348px", margin: "2rem auto" }}>
            <Player />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
