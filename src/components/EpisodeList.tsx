import { Grid, Box, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavorite, Episode } from "../slice/podcastSlice";
import player from "../assets/player.png";
import BookmarkIcon from "./BookmarkIcon";

interface EpisodeListProps {
  episode: Episode;
  imageWidth: string;
  descriptionHeight: string;
  // isActive: boolean;
  // onSetActive: () => void;
}

// 毫秒轉換時數
const formatDuration = (duration_ms: number) => {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = Math.floor((duration_ms % 60000) / 1000);
  return `${minutes}分${seconds}秒`;
};

const EpisodeList: React.FC<EpisodeListProps> = ({
  episode,
  imageWidth,
  descriptionHeight,
  // isActive,
  // onSetActive,
}) => {
  const dispatch = useDispatch();
  const favoriteEpisodes = useSelector(
    (state: RootState) => state.podcast.favoriteEpisodes
  );
  // const theme = useTheme();

  // 檢查當前單集是否已收藏
  const isFavorite = favoriteEpisodes.some(
    (favEpisode) => favEpisode.id === episode.id
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(episode));
  };
  return (
    <>
      {/* bookmark */}

      <BookmarkIcon
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* List */}
      <Grid container spacing={0}>
        {/* 單集封面 */}
        <Grid item xs={2}>
          <Box
            component="img"
            src={episode.image}
            alt={episode.name}
            sx={{ width: imageWidth, borderRadius: 2 }}
          />
        </Grid>
        {/* 單集內容 */}
        <Grid item xs={9.5} sx={{ marginLeft: "0.5rem" }}>
          {/* 單集標題 */}
          {/* <Box> */}
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
          {/* </Box> */}
          {/* 單集介紹 */}
          <Box
            sx={{
              width: "100%",
              height: descriptionHeight,
              overflowY: "auto",
              margin: "0.5rem 0rem",
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
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                fontFamily: "Noto Sans TC",
                fontWeight: "400",
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
            <IconButton>
              <Box
                component="img"
                src={player}
                alt="player"
                sx={{ width: "2rem" }}
              ></Box>
            </IconButton>
            <Typography variant="caption" color="#93989A">
              {episode.release_date} · {formatDuration(episode.duration_ms)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EpisodeList;
