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

  console.log(currentShow);

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
          height: "75%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        {/* 關閉icon */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <IconButton onClick={onClose}>
            <Box component="img" src={closeIcon} alt="close" />
          </IconButton>
        </Box>

        {/* Header 部分 */}
        <Grid
          container
          spacing={0}
          height={200}
          p={3}
          sx={{ position: "relative" }}
        >
          <Grid item xs={2}>
            <Box
              component="img"
              src={currentShow?.images?.[0]?.url}
              alt={currentShow?.name}
              sx={{
                width: "95%",
                borderRadius: 2,
                boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)",
              }}
            />
          </Grid>
          <Grid item xs={10}>
            {/* Podcast頻道名稱 */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "1.1rem", width: "90%", margin: 0 }}
            >
              {currentShow?.name}
            </Typography>

            {/* Podcast作者名稱 */}
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "0.9rem", width: "90%", margin: 0 }}
            >
              {currentShow?.publisher}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                width: "95%",
                height: "90px",
                overflowY: "auto",
                // margin: "0.5rem 0rem",
                fontSize: "0.8rem",
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
                bottom: "0.5rem",
                right: "0.5rem",
                padding: "0.05rem 0.2rem",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Noto Sans TC",
              }}
              onClick={handleDelete}
            >
              刪除
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Episodes 列表區 */}
        <Box
          p={3}
          sx={{
            maxHeight: "65%",
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
          {currentShow?.episodes?.items?.map((episode: Episode) => {
            const isActive = activeEpisodeId === episode.id;
            return (
              <Box
                key={episode.id}
                sx={{
                  width: "100%",
                  height: "200px",
                  mb: 3,
                  p: 3,
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
                <EpisodeList
                  episode={episode}
                  imageWidth="90%"
                  descriptionHeight="70px"
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default MoreModal;
