import { Grid, Box, Typography, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setCurrentPlayer } from "../slice/podcastSlice";
import player from "../assets/player.png";
import BookmarkIcon from "./BookmarkIcon";
import { Episode } from "../slice/types";
import { addFavorite, removeFavorite } from "../slice/userSlice";

interface EpisodeListProps {
  episode: Episode;
  imageWidth: string;
  descriptionHeight: string;
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
  imageWidth,
  descriptionHeight,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { userFavorites } = useSelector((state: RootState) => state.user);

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
  const handleOnClickPlayer = () => {
    dispatch(setCurrentPlayer(episode));
  };

  return (
    <>
      {/* bookmark */}
      <Box sx={{ position: "absolute", top: 10, right: 0 }}>
        <BookmarkIcon
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </Box>

      {/* List */}
      <Grid container spacing={0}>
        {/* 單集封面 */}
        <Grid item xs={2}>
          <Box
            component="img"
            src={episode.images?.[0]?.url}
            alt={episode.name}
            sx={{
              width: imageWidth,
              borderRadius: 2,
              boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)",
            }}
          />
        </Grid>
        {/* 單集內容 */}
        <Grid item xs={9.5} sx={{ marginLeft: "0.5rem" }}>
          {/* 單集標題 */}
          {/* <Box> */}
          <Tooltip title={episode.name} arrow>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontFamily: "Noto Sans TC",
                fontWeight: "500",
                width: "80%",
                WebkitLineClamp: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "30px",
              }}
            >
              {episode.name}
            </Typography>
          </Tooltip>
          {/* </Box> */}
          {/* 單集介紹 */}
          <Box
            sx={{
              width: "100%",
              height: descriptionHeight,
              overflowY: "auto",
              margin: "0.3rem 0rem",
              boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
              borderRadius: "0.3rem",
              padding: "0.1rem",
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
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflowY: "auto",
                fontSize: "0.8rem",
              }}
            >
              {episode.description}
            </Typography>
          </Box>
          {/* 播放 */}
          <Box>
            <IconButton onClick={handleOnClickPlayer}>
              <Box
                component="img"
                src={player}
                alt="player"
                sx={{ width: "2rem" }}
              ></Box>
            </IconButton>
            <Typography variant="caption" color="#93989A">
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
