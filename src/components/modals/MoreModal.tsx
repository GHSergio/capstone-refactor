import React from "react";
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
import { setActiveEpisode } from "../../slice/podcastSlice";
import { removeShowFromCategory } from "../../slice/userSlice";
import { Episode } from "../../slice/types";
interface MoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoreModal: React.FC<MoreModalProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const { currentShow, activeEpisodeId } = useSelector(
    (state: RootState) => state.podcast
  );
  const { currentCategoryId } = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  // console.log("當前的Show: ", currentShow);

  // console.log(currentShow);

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
      onClose();
    } else {
      console.error("currentListId 或 currentShowId 為 null，無法刪除");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "85%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
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
          <IconButton onClick={onClose}>
            <Box
              component="img"
              src={closeIcon}
              alt="close"
              sx={{
                width: {
                  xs: "0.5rem",
                  sm: "0.7rem",
                  md: "1rem",
                  lg: "1.5rem",
                  xl: "2rem",
                },
                "@media (min-width: 1600px)": {
                  width: "2.5rem",
                },
              }}
            />
          </IconButton>
        </Box>

        {/* Header 部分 */}
        <Grid
          container
          sx={{
            p: { xs: 0.5, sm: 1, md: 2, lg: 2, xl: 3 },
            position: "relative",
            height: { xs: "25%", sm: "26%", md: "23%", lg: "26%", xl: "26%" },
          }}
        >
          {/* 頻道封面 */}
          <Grid
            item
            xs={5}
            sm={3}
            sx={{
              p: 0.5,
              maxWidth: {
                xs: "35%",
                sm: "22%",
                md: "20%",
                lg: "19%",
                xl: "18%",
              },
              textAlign: "center",
              marginRight: {
                xs: 0.75,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
              },
              // 獨立處理媒體查詢的 maxWidth
              "@media (max-width: 320px)": {
                maxWidth: "40%",
              },
              "@media (min-width: 321px) and(max-width: 375px)": {
                maxWidth: "35%",
              },
              "@media (min-width: 376px) and (max-width: 600px)": {
                maxWidth: "30%",
              },
              "@media(min-width:1600px)": {
                maxWidth: "18%",
                marginRight: 3,
              },
            }}
          >
            <Box
              // component="img"
              // src={currentShow?.images?.[0]?.url}
              // alt={currentShow?.name}
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)",
                height: "0", // 使用 padding-top 來維持比例
                paddingTop: "100%", // 1:1 比例，根據需要可以調整
                backgroundImage: `url(${currentShow?.images?.[0]?.url})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Grid>

          <Grid
            item
            xs={5}
            sm={9}
            sx={{
              "@media (max-width: 321px)": {
                maxWidth: "40%",
              },
              "@media(min-width: 321px)and (max-width: 376px)": {
                maxWidth: "50%",
              },
              "@media (min-width: 376px) and (max-width: 600px)": {
                maxWidth: "45%",
              },
            }}
          >
            {/* Podcast頻道名稱 */}
            <Tooltip title={currentShow?.name} arrow>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "0.5rem",
                    sm: "0.7rem",
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
                  "@media (min-width: 376px) and (max-width: 600px)": {
                    fontSize: "0.5rem",
                  },
                  "@media (min-width: 1600px)": {
                    fontSize: "2rem",
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
            <Tooltip title={currentShow?.publisher} arrow>
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "0.4rem",
                    sm: "0.5rem",
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
                  "@media (min-width: 376px) and (max-width: 600px)": {
                    fontSize: "0.4rem",
                  },
                  "@media (min-width: 1600px)": {
                    fontSize: "1.5rem",
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
            </Tooltip>

            {/* Podcast頻道介紹 */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                width: {
                  xs: "130%",
                  sm: "90%",
                  md: "95%",
                  lg: "100%",
                  xl: "100%",
                },
                height: {
                  xs: "60px",
                  sm: "85px",
                  md: "85px",
                  lg: "120px",
                  xl: "105px",
                },
                overflowY: "auto",
                overflowX: "hidden",
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.5rem",
                  md: "0.7rem",
                  lg: "0.8rem",
                  xl: "1.2rem",
                },
                "@media (max-width: 321px)": {
                  maxWidth: "100%",
                  height: "65px",
                  fontSize: "0.4rem",
                },
                "@media(min-width: 321px)and (max-width: 376px)": {
                  maxWidth: "100%",
                  height: "65px",
                  fontSize: "0.4rem",
                },
                "@media (min-width: 376px) and (max-width: 600px)": {
                  maxWidth: "150%",
                  height: "65px",
                  fontSize: "0.4rem",
                },
                "@media (min-width: 1600px)": {
                  fontSize: "1.5rem",
                  height: "240px",
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
                bottom: "0px",
                right: "10px",
                padding: "0.05rem 0.2rem",
                borderRadius: "0.5rem",
                fontSize: {
                  xs: "0.3rem",
                  sm: "0.6rem",
                  md: "0.7rem",
                  lg: "0.8rem",
                  xl: "1.2rem",
                },
                "@media (min-width: 1600px)": {
                  fontSize: "2rem",
                },
                fontFamily: "Noto Sans TC",
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
              xs: "65%",
              sm: "65%",
              md: "70%",
              lg: "70%",
              xl: "70%",
            },
            "@media(min-width:1600px)": {
              maxHeight: "70%",
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
                    xs: "90px",
                    sm: "120px",
                    md: "150px",
                    lg: "170px",
                    xl: "200px",
                    "@media(min-width:1600px)": {
                      height: "280px",
                    },
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
