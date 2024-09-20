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
// import idle_episode from "../assets/idle_episode.png";
// import active_episode from "../assets/active_episode.png";
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

const EpisodeList: React.FC<EpisodeListProps> = ({
  episode,
  // imageWidth,
  // descriptionHeight,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { userFavorites } = useSelector((state: RootState) => state.user);
  const { currentPlayer } = useSelector((state: RootState) => state.podcast);
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
      <BookmarkIcon
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* List */}
      <Grid container p={0} spacing={0} sx={{ width: "100%" }}>
        {/* 單集封面 */}
        <Grid
          item
          xs={4}
          sx={{
            p: 0.5,
            maxWidth: {
              xs: "30%",
              sm: "16%",
              md: "16%",
              lg: "16%",
              xl: "16%",
            },
            textAlign: "center",
            marginRight: {
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            // 獨立處理媒體查詢的 maxWidth
            "@media (max-width: 321px)": {
              maxWidth: "35%",
            },
            "@media (min-width: 321px) and(max-width: 376px)": {
              maxWidth: "40%",
            },
            "@media (min-width: 376px) and (max-width: 600px)": {
              maxWidth: "25%",
            },
            "@media (min-width: 1600px) ": {
              maxWidth: "8%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
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
        <Grid item xs={7} sx={{ width: "100%" }}>
          {/* 單集標題 */}
          <Tooltip title={episode.name} arrow>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "0.5rem",
                  sm: "0.7rem",
                  md: "0.9rem",
                  lg: "1rem",
                  xl: "1.15rem",
                  "@media (max-width: 321px)": {},
                  "@media(min-width: 321px)and (max-width: 376px)": {},
                  "@media (min-width: 376px) and (max-width: 600px)": {},
                  "@media(min-width:1600px)": {},
                },
                fontFamily: "Noto Sans TC",
                fontWeight: "500",
                width: "80%",
                WebkitLineClamp: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: { xs: "15px", sm: "20px", md: "30px" },
              }}
            >
              {episode.name}
            </Typography>
          </Tooltip>
          {/* 單集介紹 */}
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "115%",
                md: "120%",
                lg: "120%",
                xl: "120%",
              },
              height: {
                xs: "35px",
                sm: "40px",
                md: "50px",
                lg: "60px",
                xl: "80px",
              },
              overflowY: "auto",
              margin: {
                xs: "0.3rem 0rem",
                sm: "0.3rem 0rem",
                md: "0.2rem 0rem",
                xl: "0.5rem 0rem",
              },
              "@media (max-width: 321px)": { width: "80%" },
              "@media(min-width: 321px)and (max-width: 376px)": {
                width: "90%",
              },
              "@media (min-width: 376px) and (max-width: 600px)": {},
              "@media(min-width:1600px)": {},
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
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflowY: "auto",
                fontSize: {
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
                  lg: "0.5rem",
                  xl: "0.2rem",
                },
                bgcolor: theme.palette.primary.main,
                marginRight: { xs: 0.5, md: 1 },
              }}
            >
              {currentPlayer?.id === episode.id ? (
                <PauseIcon
                  sx={{
                    fontSize: {
                      xs: "0.4rem",
                      sm: "0.9rem",
                      md: "1.15rem",
                      lg: "1rem",
                      xl: "1.35rem",
                    },
                  }}
                />
              ) : (
                <PlayArrowIcon
                  sx={{
                    fontSize: {
                      xs: "0.5rem",
                      sm: "0.9rem",
                      md: "1.15rem",
                      lg: "1rem",
                      xl: "1.35rem",
                    },
                  }}
                />
              )}
            </IconButton>
            <Typography
              variant="caption"
              color="#93989A"
              sx={{
                fontSize: {
                  xs: "0.3rem",
                  sm: "0.45rem",
                  md: "0.6rem",
                  lg: "0.8rem",
                  xl: "0.8rem",
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
