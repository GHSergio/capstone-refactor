import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  IconButton,
  useTheme,
  Tooltip,
} from "@mui/material";
import closeIcon from "../../assets/closeIcon.png";
import EpisodeList from "./../EpisodeList";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  setActiveEpisode,
  setIsMoreModalOpen,
  setCurrentShow,
} from "../../slice/podcastSlice";
import { removeShowFromCategory } from "../../slice/userSlice";
import { Episode } from "../../slice/types";

const MoreModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isMoreModalOpen = useSelector(
    (state: RootState) => state.podcast.isMoreModalOpen
  );
  const currentShow = useSelector(
    (state: RootState) => state.podcast.currentShow
  );
  const activeEpisodeId = useSelector(
    (state: RootState) => state.podcast.activeEpisodeId
  );
  const currentCategoryId = useSelector(
    (state: RootState) => state.user.currentCategoryId
  );
  const theme = useTheme();

  // console.log("當前的Show: ", currentShow);

  const handleMoreClose = () => {
    dispatch(setIsMoreModalOpen(false));
    dispatch(setCurrentShow(null));
  };

  const handleSetActive = (episodeId: string) => {
    dispatch(setActiveEpisode(episodeId));
  };

  const handleDelete = () => {
    if (currentCategoryId && currentShow) {
      dispatch(
        removeShowFromCategory({
          categoryId: currentCategoryId,
          showId: currentShow.id,
        })
      );
      handleMoreClose();
    } else {
      console.error("currentListId 或 currentShowId 為 null，無法刪除");
    }
  };

  return (
    <Modal
      open={isMoreModalOpen}
      onClose={handleMoreClose}
      aria-labelledby="modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          minHeight: "60vh",
          maxHeight: "85vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          maxWidth: "1000px",
          "@media (max-width: 320px)": {
            width: "90%",
          },
        }}
      >
        {/* 關閉icon */}
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <IconButton onClick={handleMoreClose}>
            <Box
              component="img"
              src={closeIcon}
              alt="close"
              sx={{
                width: {
                  xs: "0.6rem",
                  sm: "0.7rem",
                  md: "1rem",
                  lg: "1.5rem",
                  xl: "2rem",
                },
              }}
            />
          </IconButton>
        </Box>

        {/* Header 部分 */}
        <Grid
          container
          spacing={2}
          sx={{
            flexWrap: "nowrap",
            p: { xs: 1, sm: 1, md: 2, lg: 2, xl: 3 },
            position: "relative",
            width: "100%",
            height: {
              xs: "90px",
              sm: "140px",
              md: "170px",
              lg: "200px",
              xl: "220px",
            },
            // 獨立處理媒體查詢
            "@media (max-width: 321px)": {},
            "@media (min-width: 321px) and (max-width: 376px)": {},
            "@media (min-width: 376px) and (max-width: 599px)": {},
          }}
        >
          {/* 頻道封面 */}
          <Grid
            item
            xs={3}
            sx={{
              minWidth: {
                xs: "100px",
                sm: "140px",
                md: "160px",
                lg: "180px",
                xl: "190px",
              },
              maxWidth: {
                xs: "100px",
                sm: "140px",
                md: "160px",
                lg: "180px",
                xl: "190px",
              },
              height: {
                xs: "100px",
                sm: "140px",
                md: "160px",
                lg: "180px",
                xl: "190px",
              },
              textAlign: "center",
              marginLeft: {
                xs: 1,
                sm: 1,
                md: 0,
                lg: 0,
                xl: 0,
              },
              // 獨立處理媒體查詢的 maxWidth
              "@media (max-width: 321px)": {
                minWidth: "90px",
                maxWidth: "90px",
                height: "90px",
              },
              "@media (min-width: 321px) and (max-width: 376px)": {
                minWidth: "90px",
                maxWidth: "90px",
                height: "90px",
              },
              "@media (min-width: 376px) and (max-width: 599px)": {
                minWidth: "90px",
                maxWidth: "90px",
                height: "90px",
              },
            }}
          >
            <Box
              // component="img"
              // src={currentShow?.images?.[0]?.url}
              // alt={currentShow?.name}
              sx={{
                width: "100%",
                height: "0", // 使用 padding-top 來維持比例
                paddingTop: "100%", // 1:1 比例，根據需要可以調整
                backgroundImage: `url(${currentShow?.images?.[0]?.url})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)",
                borderRadius: 2,
                objectFit: "cover", // 圖片保持比例
              }}
            />
          </Grid>

          {/* 頻道內容 */}
          <Grid
            item
            xs={9}
            sx={{
              "@media (max-width: 321px)": {},
              "@media(min-width: 321px)and (max-width: 376px)": {},
              "@media (min-width: 376px) and (max-width: 599px)": {},
            }}
          >
            {/* Podcast頻道名稱 */}
            <Tooltip
              title={
                <Typography sx={{ fontSize: "1rem" }}>
                  {currentShow?.name}
                </Typography>
              }
              arrow
              placement="top"
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "0.5rem",
                    sm: "0.8rem",
                    md: "1rem",
                    lg: "1.25rem",
                    xl: "1.5rem",
                  },
                  width: "90%",
                  margin: 0,
                  "@media (max-width: 321px)": {
                    fontSize: "0.5rem",
                  },
                  "@media(min-width: 321px)and (max-width: 376px)": {
                    fontSize: "0.5rem",
                  },
                  "@media (min-width: 376px) and (max-width: 599px)": {
                    fontSize: "0.5rem",
                  },

                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  WebkitLineClamp: 1,
                }}
              >
                {currentShow?.name}
              </Typography>
            </Tooltip>

            {/* Podcast作者名稱 */}

            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.6rem",
                  md: "0.8rem",
                  lg: "0.9rem",
                  xl: "1.2rem",
                },
                "@media (max-width: 321px)": {
                  fontSize: "0.4rem",
                },
                "@media(min-width: 321px)and (max-width: 376px)": {
                  fontSize: "0.4rem",
                },
                "@media (min-width: 376px) and (max-width: 599px)": {
                  fontSize: "0.4rem",
                },

                width: "90%",
                marginY: { xs: 0.2, sm: 0.3, md: 0.9, lg: 0.5, xl: 0.3 },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                WebkitLineClamp: 1,
              }}
            >
              {currentShow?.publisher}
            </Typography>

            {/* Podcast 頻道介紹 */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: "center",
                width: {
                  xs: "95%",
                  sm: "90%",
                  md: "95%",
                  lg: "95%",
                  xl: "95%",
                },
                height: {
                  xs: "45px",
                  sm: "75px",
                  md: "75px",
                  lg: "90px",
                  xl: "85px",
                },
                overflowY: "auto",
                overflowX: "hidden",
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.5rem",
                  md: "0.7rem",
                  lg: "0.8rem",
                  xl: "1rem",
                },
                "@media (max-width: 321px)": {
                  width: "70%",
                  fontSize: "0.4rem",
                },
                "@media(min-width: 321px)and (max-width: 376px)": {
                  width: "70%",
                  fontSize: "0.4rem",
                },
                "@media (min-width: 376px) and (max-width: 599px)": {
                  width: "85%",
                  fontSize: "0.4rem",
                },

                boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
                borderRadius: "0.3rem",
                padding: "0.1rem",
                "&::-webkit-scrollbar": {
                  width: {
                    xs: "0.3rem",
                    sm: "0.3rem",
                    md: "0.5rem",
                    lg: "0.5rem",
                    xl: "0.5rem",
                  },
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
              {currentShow?.description}
            </Typography>

            {/* 刪除按鈕 */}
            <Button
              variant="outlined"
              sx={{
                minWidth: "0",
                color: "#FF5050",
                borderColor: "#FF5050",
                position: "absolute",
                bottom: 0,
                right: 0,
                padding: "0.05rem 0.2rem",
                borderRadius: "0.5rem",
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.6rem",
                  md: "0.7rem",
                  lg: "0.8rem",
                  xl: "1.2rem",
                },
                fontFamily: "Noto Sans TC",
                "@media (max-width: 321px)": {
                  bottom: "-10%",
                  right: "-2%",
                },
                "@media (min-width: 321px) and (max-width: 376px)": {
                  bottom: "-10%",
                  right: "-2%",
                },
                "@media (min-width: 376px) and (max-width: 599px)": {
                  bottom: "-10%",
                  right: "-1%",
                },
              }}
              onClick={handleDelete}
            >
              刪除
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2, border: "2px solid rgba(0,0,0,0.3)" }} />

        {/* Episodes 列表區 */}
        <Box
          sx={{
            maxHeight: {
              xs: "50vh",
              sm: "50vh",
              md: "50vh",
              xl: "55vh",
            },
            "@media (max-width: 321px)": {
              maxHeight: "50vh",
            },
            "@media(min-width: 321px)and (max-width: 376px)": {
              maxHeight: "50vh",
            },
            "@media (min-width: 376px) and (max-width: 599px)": {
              maxHeight: "50vh",
            },
            "@media (max-width:1440px)": {
              maxHeight: "55vh",
            },
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: {
                xs: "0.3rem",
                sm: "0.3rem",
                md: "0.5rem",
                lg: "0.5rem",
                xl: "0.5rem",
              },
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
            p: { xs: 1, md: 2, lg: 3 },
          }}
        >
          {currentShow?.episodes?.items?.map((episode: Episode) => {
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
                  },
                  "@media(min-width:1440px)": {
                    height: "220px",
                  },
                  mb: { xs: 1, sm: 1, md: 2, lg: 2 },
                  p: { xs: 0.5, sm: 1, md: 1, lg: 2 },
                  borderRadius: 2,
                  position: "relative",
                  border: isActive
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid rgba(0,0,0,0.2)",
                  cursor: "pointer",
                }}
                onClick={() => handleSetActive(episode.id)}
              >
                {/* List */}
                <EpisodeList episode={episode} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default MoreModal;
