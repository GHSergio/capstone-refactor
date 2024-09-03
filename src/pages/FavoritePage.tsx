import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeEpisodeFromFavorite } from "../slice/podcastSlice";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import listNull from "../assets/listNull.png";
const FavoritePage: React.FC = () => {
  const dispatch = useDispatch();
  const favoriteEpisodes = useSelector(
    (state: RootState) => state.podcast.favoriteEpisodes
  );

  const handleRemoveEpisode = (episodeId: string) => {
    dispatch(removeEpisodeFromFavorite(episodeId));
  };

  return (
    <>
      <Box sx={{ padding: "1rem" }}>
        {favoriteEpisodes.length > 0 ? (
          favoriteEpisodes.map((episode) => (
            <Box key={episode.id} sx={{ marginBottom: "1rem" }}>
              <Typography variant="h6">{episode.name}</Typography>
              <Typography variant="body2">{episode.description}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveEpisode(episode.id)}
              >
                移除收藏
              </Button>
            </Box>
          ))
        ) : (
          <Box
            gap={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "6rem",
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
