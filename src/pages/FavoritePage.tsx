import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  Box,
  Typography,
  CardMedia,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { setActiveEpisode } from "../slice/podcastSlice";
import { Favorite, fetchEpisodeDetail } from "../slice/userSlice";
import listNull from "../assets/listNull.png";
import EpisodeList from "../components/EpisodeList";
import AlertComponent from "../components/AlertComponent";
import ActionModal from "../components/modals/ActionModal";
const FavoritePage: React.FC = () => {
  const { userFavorites, episodeDetail, loading } = useSelector(
    (state: RootState) => state.user
  );
  const { activeEpisodeId } = useSelector((state: RootState) => state.podcast);
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

  // 根據收藏的episodeId獲取每個收藏的節目詳細資料
  useEffect(() => {
    if (userFavorites && userFavorites.length > 0) {
      // console.log("準備開始獲取Episode Detail");
      userFavorites.forEach((favorite: Favorite) => {
        dispatch(fetchEpisodeDetail(favorite.id)).unwrap();
      });
    }
  }, [dispatch, userFavorites]);

  const handleSetActive = (episodeId: string) => {
    dispatch(setActiveEpisode(episodeId));
  };

  if (loading) {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ ml: 2 }}>
            載入中...
          </Typography>
          <CircularProgress color="inherit" />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        p={1}
        sx={{
          maxHeight: "100%",
          overflowY: "auto",
          marginTop: { xs: "2rem", sm: "0rem" },
          "&::-webkit-scrollbar": {
            width: { xs: "0.2rem", sm: "0.3rem", md: "0.4rem", xl: "0.5rem" },
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
                  height: {
                    xs: "100px",
                    sm: "140px",
                    md: "150px",
                    lg: "170px",
                    xl: "200px",
                    // 獨立處理媒體查詢的 maxWidth
                    "@media (max-width: 321px)": {
                      height: "95px",
                    },
                    "@media (min-width: 321px) and(max-width: 376px)": {
                      height: "120px",
                    },
                    "@media (min-width: 376px) and (max-width: 600px)": {
                      height: "100px",
                    },
                    "@media(min-width:1600px)": {
                      height: "250px",
                    },
                  },
                  mb: { xs: 1, sm: 1, md: 2, lg: 2 },
                  p: { xs: 0.5, sm: 1, md: 1, lg: 2 },
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
                <EpisodeList episode={episode} />
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
              sx={{
                width: { xs: "4rem", sm: "5rem", md: "6rem", lg: "7rem" },
                "@media(min-width:1600px)": {
                  fontSize: "3rem",
                  width: "8rem",
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "#718096",
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
