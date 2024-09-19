import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Box, Typography, CardMedia, useTheme } from "@mui/material";
import { setActiveEpisode } from "../slice/podcastSlice";
import { Favorite, fetchEpisodeDetail } from "../slice/userSlice";
import listNull from "../assets/listNull.png";
import EpisodeList from "../components/EpisodeList";
import AlertComponent from "../components/AlertComponent";
import ActionModal from "../components/modals/ActionModal";
const FavoritePage: React.FC = () => {
  const { userFavorites, episodeDetail } = useSelector(
    (state: RootState) => state.user
  );
  const { activeEpisodeId } = useSelector((state: RootState) => state.podcast);
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

  // 根據收藏的episodeId獲取每個收藏的節目詳細資料
  useEffect(() => {
    if (userFavorites && userFavorites.length > 0) {
      console.log("準備開始獲取Episode Detail");
      userFavorites.forEach((favorite: Favorite) => {
        dispatch(fetchEpisodeDetail(favorite.id)).unwrap();
      });
    }
  }, [dispatch, userFavorites]);

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
        {userFavorites && episodeDetail && episodeDetail.length > 0 ? (
          episodeDetail.map((episode) => {
            const isActive = activeEpisodeId === episode.id;
            return (
              <Box
                key={episode.id}
                sx={{
                  width: "100%",
                  height: "170px",
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  border: isActive
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid rgba(0,0,0,0.2)",
                  position: "relative",
                  cursor: "pointer",
                  boxShadow: "0 0 5px 3px rgba(0,0,0,0.2)",
                }}
                onClick={() => handleSetActive(episode.id)}
              >
                {/* List*/}
                <EpisodeList
                  episode={episode}
                  imageWidth="100%"
                  descriptionHeight="2.5rem"
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
      {/* MUI Alert 提示 */}
      <AlertComponent />
      <ActionModal />
    </>
  );
};

export default FavoritePage;
