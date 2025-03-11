import {
  Grid,
  Box,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setCurrentPlayer } from "../slice/podcastSlice";
import BookmarkIcon from "./BookmarkIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Episode } from "../slice/types";
import { addFavorite, removeFavorite } from "../slice/userSlice";

interface EpisodeListProps {
  episode: Episode;
  imageWidth?: string;
  descriptionHeight?: string;
}

// 毫秒轉換時數
const formatDuration = (duration_ms: number) => {
  const hours = Math.floor(duration_ms / 3600000); // 每小時有 3600000 毫秒
  const minutes = Math.floor((duration_ms % 3600000) / 60000); // 每分鐘有 60000 毫秒
  const seconds = Math.floor((duration_ms % 60000) / 1000); // 每秒有 1000 毫秒
  // 根據時數的存在情況，動態顯示
  return hours > 0
    ? `${hours}時${minutes}分${seconds}秒`
    : `${minutes}分${seconds}秒`;
};

const EpisodeList: React.FC<EpisodeListProps> = ({ episode }) => {
  const dispatch: AppDispatch = useDispatch();
  const userFavorites = useSelector(
    (state: RootState) => state.user.userFavorites
  );
  const currentPlayer = useSelector(
    (state: RootState) => state.podcast.currentPlayer
  );
  const isMoreModalOpen = useSelector(
    (state: RootState) => state.podcast.isMoreModalOpen
  );

  const theme = useTheme();

  // 檢查當前單集是否已收藏
  const isFavorite = userFavorites?.some(
    (favEpisode) => favEpisode.id === episode.id
  );

  // 處理onClick書籤 根據是否已收藏來添加或移除收藏
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(episode.id));
    } else {
      dispatch(addFavorite(episode.id));
    }
  };

  // 播放器處理
  const handleOnClickPlayer = async () => {
    // 保存當前播放的節目
    dispatch(setCurrentPlayer(episode));
  };

  return (
    <>
      {/* bookmark */}
      <Box>
        <BookmarkIcon
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </Box>

      {/* List */}
      <Grid
        container
        p={0}
        spacing={2}
        sx={{
          flexWrap: "nowrap",
          alignItems: "center",
          width: isMoreModalOpen
            ? {
                xs: "100%",
                sm: "95%",
                md: "100%",
                lg: "100%",
                xl: "100%",
              }
            : {
                xs: "100%",
                sm: "95%",
                md: "100%",
                lg: "100%",
                xl: "100%",
              },
          "@media (max-width: 320px)": { width: "95%" },
          "@media (min-width: 321px) and (max-width: 376px)": {},
          "@media (min-width: 376px) and (max-width: 599px)": {},
        }}
      >
        {/* 單集封面 */}
        <Grid
          item
          xs={3}
          sm={3}
          sx={{
            minWidth: isMoreModalOpen
              ? {
                  xs: "100px",
                  sm: "100px",
                  md: "130px",
                  lg: "140px",
                  xl: "150px",
                }
              : {
                  xs: "90px",
                  sm: "120px",
                  md: "130px",
                  lg: "140px",
                  xl: "165px",
                },
            maxWidth: isMoreModalOpen
              ? {
                  xs: "100px",
                  sm: "100px",
                  md: "130px",
                  lg: "140px",
                  xl: "150px",
                }
              : {
                  xs: "90px",
                  sm: "120px",
                  md: "130px",
                  lg: "140px",
                  xl: "165px",
                },
            height: isMoreModalOpen
              ? {
                  xs: "100px",
                  sm: "100px",
                  md: "130px",
                  lg: "140px",
                  xl: "150px",
                }
              : {
                  xs: "90px",
                  sm: "120px",
                  md: "130px",
                  lg: "140px",
                  xl: "165px",
                },
            marginLeft: isMoreModalOpen
              ? {
                  xs: "0.5rem",
                  sm: "0.3rem",
                  md: "0.2rem",
                  lg: "0rem",
                  xl: "0rem",
                }
              : {
                  xs: "0.5rem",
                  sm: "0.3rem",
                  md: "0.2rem",
                  lg: "0rem",
                  xl: "0rem",
                },
            textAlign: "center",
            // 獨立處理媒體查詢的 maxWidth
            "@media (max-width: 320px)": {
              minWidth: isMoreModalOpen ? "75px" : "80px",
              maxWidth: isMoreModalOpen ? "75px" : "80px",
              height: isMoreModalOpen ? "75px" : "80px",
            },
            "@media (min-width: 321px) and (max-width: 376px)": {
              minWidth: isMoreModalOpen ? "75px" : "80px",
              maxWidth: isMoreModalOpen ? "75px" : "80px",
              height: isMoreModalOpen ? "75px" : "80px",
            },
            "@media (min-width: 376px) and (max-width: 599px)": {
              minWidth: isMoreModalOpen ? "75px" : "80px",
              maxWidth: isMoreModalOpen ? "75px" : "80px",
              height: isMoreModalOpen ? "75px" : "80px",
            },
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)",
              height: "0",
              paddingTop: "100%",
              backgroundImage: `url(${episode?.images?.[0]?.url})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Grid>

        {/* 單集內容 */}
        <Grid
          item
          xs={9}
          sm={9}
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 單集標題 */}
          <Tooltip
            title={
              <Typography sx={{ fontSize: "1rem" }}>{episode.name}</Typography>
            }
            arrow
            placement="top"
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                marginBottom: "0",
                width: "90%",
                fontSize: isMoreModalOpen
                  ? {
                      xs: "0.45rem",
                      sm: "0.7rem",
                      md: "0.9rem",
                      lg: "1.15rem",
                      xl: "1.25rem",
                    }
                  : {
                      xs: "0.5rem",
                      sm: "0.7rem",
                      md: "0.9rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                // maxWidth: isMoreModalOpen
                //   ? {
                //       xs: "100%",
                //       sm: "90%",
                //       md: "95%",
                //       lg: "100%",
                //       xl: "100%",
                //     }
                //   : {
                //       xs: "90%",
                //       sm: "80%",
                //       md: "85%",
                //       lg: "95%",
                //       xl: "95%",
                //     },
                // lineHeight: {
                //   xs: "10px",
                //   sm: "15px",
                //   md: "25px",
                //   lg: "25px",
                //   xl: "25px",
                // },
                fontWeight: "500",
                WebkitLineClamp: 1,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflowX: "hidden",

                "@media (max-width: 321px)": {},
                "@media(min-width: 321px)and (max-width: 376px)": {},
                "@media (min-width: 376px) and (max-width: 599px)": {},
              }}
            >
              {episode.name}
            </Typography>
          </Tooltip>
          {/* 單集介紹 */}
          <Box
            sx={{
              width: "100%",
              height: isMoreModalOpen
                ? {
                    xs: "45px",
                    sm: "60px",
                    md: "60px",
                    lg: "60px",
                    xl: "90px",
                  }
                : {
                    xs: "45px",
                    sm: "55px",
                    md: "55px",
                    lg: "60px",
                    xl: "75px",
                  },
              overflowY: "auto",
              overflowX: "hidden",
              margin: {
                xs: "0.25rem 0rem",
                sm: "0.3rem 0rem",
                md: "0.4rem 0rem",
                lg: "0.5rem 0rem",
                xl: "0.5rem 0rem",
              },
              "@media (max-width: 321px)": {
                height: isMoreModalOpen ? "40px" : "40px",
              },
              "@media(min-width: 321px)and (max-width: 376px)": {
                height: "45px",
                width: "90%",
              },
              "@media (min-width: 376px) and (max-width: 599px)": {},

              boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
              borderRadius: "0.3rem",
              padding: "0.15rem",
              textAlign: "center",
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
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{
                fontSize: isMoreModalOpen
                  ? {
                      xs: "0.4rem",
                      sm: "0.6rem",
                      md: "0.75rem",
                      lg: "0.8rem",
                      xl: "1rem",
                    }
                  : {
                      xs: "0.4rem",
                      sm: "0.6rem",
                      md: "0.75rem",
                      lg: "0.8rem",
                      xl: "1rem",
                    },
              }}
            >
              {episode.description}
            </Typography>
          </Box>

          {/* 播放 */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleOnClickPlayer}
              sx={{
                padding: {
                  xs: "0.05rem",
                  sm: "0.1rem",
                  md: "0.1rem",
                  lg: "0.1rem",
                  xl: "0.1rem",
                },
                bgcolor: theme.palette.primary.main,
                marginRight: { xs: 0.5, md: 1 },
              }}
            >
              {currentPlayer?.id === episode.id ? (
                <PauseIcon
                  sx={{
                    fontSize: isMoreModalOpen
                      ? {
                          xs: "0.4rem",
                          sm: "0.9rem",
                          md: "1.15rem",
                          lg: "1rem",
                          xl: "1.35rem",
                        }
                      : {
                          xs: "0.4rem",
                          sm: "1rem",
                          md: "1rem",
                          lg: "1rem",
                          xl: "1.25rem",
                        },
                  }}
                />
              ) : (
                <PlayArrowIcon
                  sx={{
                    fontSize: isMoreModalOpen
                      ? {
                          xs: "0.5rem",
                          sm: "1rem",
                          md: "1rem",
                          lg: "1rem",
                          xl: "1.25rem",
                        }
                      : {
                          xs: "0.5rem",
                          sm: "1rem",
                          md: "1rem",
                          lg: "1rem",
                          xl: "1.25rem",
                        },
                  }}
                />
              )}
            </IconButton>
            <Typography
              variant="caption"
              color="#93989A"
              sx={{
                fontSize: isMoreModalOpen
                  ? {
                      xs: "0.5rem",
                      sm: "0.6rem",
                      md: "0.7rem",
                      lg: "0.8rem",
                      xl: "0.8rem",
                    }
                  : {
                      xs: "0.5rem",
                      sm: "0.6rem",
                      md: "0.7rem",
                      lg: "0.8rem",
                      xl: "0.8rem",
                    },
                "@media (max-width: 321px)": {
                  fontSize: isMoreModalOpen ? "0.5rem" : "0.5rem",
                },
                "@media(min-width: 321px)and (max-width: 376px)": {
                  fontSize: isMoreModalOpen ? "0.5rem" : "0.5rem",
                },
                "@media (min-width: 376px) and (max-width: 599px)": {
                  fontSize: isMoreModalOpen ? "0.5rem" : "0.5rem",
                },
              }}
            >
              {episode.release_date} ·{" "}
              {formatDuration(Number(episode?.duration_ms))}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EpisodeList;
