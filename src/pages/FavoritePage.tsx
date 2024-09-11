import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Box, Typography, CardMedia, useTheme } from "@mui/material";
import { setActiveEpisode } from "../slice/podcastSlice";
import listNull from "../assets/listNull.png";
import EpisodeList from "../components/EpisodeList";
const FavoritePage: React.FC = () => {
  const userFavorites = useSelector((state: RootState) => state.user);
  const activeEpisodeId = useSelector(
    (state: RootState) => state.podcast.activeEpisodeId
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSetActive = (episodeId: string) => {
    dispatch(setActiveEpisode(episodeId));
  };

  return (
    <>
      <Box
        p={1}
        sx={{
          maxHeight: "100%",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.5rem",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#C1C9D3",
            borderRadius: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
            cursor: "pointer",
          },
        }}
      >
        {userFavorites.length > 0 ? (
          userFavorites.map((episode) => {
            const isActive = activeEpisodeId === episode.id;
            return (
              <Box
                key={episode.id}
                sx={{
                  width: "100%",
                  height: "170px",
                  mb: 3,
                  p: 3,
                  borderRadius: 2,
                  border: isActive
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid rgba(0,0,0,0.2)",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleSetActive(episode.id)}
              >
                {/* List*/}
                <EpisodeList
                  episode={episode}
                  imageWidth="100%"
                  descriptionHeight="35px"
                />
              </Box>
            );
          })
        ) : (
          <Box
            gap={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              src={listNull}
              alt="listNull"
              sx={{ width: "3.5rem" }}
            />
            <Typography
              sx={{
                color: "#718096",
                fontSize: "1.1rem",
                fontFamily: "Noto Sans TC",
              }}
            >
              您尚未收藏任何單集
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default FavoritePage;
