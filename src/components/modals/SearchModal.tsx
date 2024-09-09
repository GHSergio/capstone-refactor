import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setIsSearchModalOpen,
  filterShowsByKeyword,
  toggleSelectShow,
  clearSelectedShows,
  addShowToList,
  Show,
  // setSelectedShows,
} from "../../slice/podcastSlice";

const SearchModal = () => {
  const dispatch = useDispatch();
  const { isSearchModalOpen, filteredShows, selectedShows, currentListId } =
    useSelector((state: RootState) => state.podcast);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchModalClose = () => {
    dispatch(setIsSearchModalOpen(false));
    dispatch(clearSelectedShows());
  };

  // 將選中的 shows 添加到當前 list
  const handleConfirmAdd = () => {
    if (currentListId) {
      dispatch(addShowToList({ listId: currentListId, shows: selectedShows }));
    }
    dispatch(setIsSearchModalOpen(false));
    dispatch(clearSelectedShows());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    dispatch(filterShowsByKeyword(keyword));
  };

  const handleShowSelect = (show: Show) => {
    // 選擇匹配的 show 並添加到 selectedShows
    dispatch(toggleSelectShow(show));
  };

  const isSelected = (show: Show) =>
    selectedShows.some((selectedShow) => selectedShow.id === show.id);

  return (
    <Modal open={isSearchModalOpen} onClose={handleSearchModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "75%",
          bgcolor: "#FFFFFF",
          boxShadow: "0px -10px 20px 0px #0000001F",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "100%",
              fontSize: "1.2rem",
            }}
          >
            新增 Podcast
          </Typography>
          <IconButton
            onClick={handleSearchModalClose}
            sx={{ position: "absolute", right: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ marginBottom: "0.5rem" }} />

        {/* SearchBar */}
        <Box
          sx={{
            p: 2,
            display: "flex",
          }}
        >
          <TextField
            fullWidth
            placeholder="輸入關鍵字..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#ACADB9" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Main */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            p: 2,
            overflowY: "auto",
          }}
        >
          {filteredShows.length > 0 ? (
            filteredShows.map((show) => (
              <Grid
                m={1}
                key={show.id}
                sx={{
                  width: "178px",
                  height: "240px",
                  borderRadius: "0.5rem",
                  boxShadow: "16px 16px 40px 20px #C7C7C73D",
                  padding: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: isSelected(show) ? "3px solid #FF7F50" : "none",
                }}
                onClick={() => handleShowSelect?.(show)}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#FFFFFF",
                    padding: "1rem",
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      margin: "0 auto",
                      boxShadow: "none",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={show.image}
                      alt={show.name}
                      sx={{ borderRadius: "0.5rem" }}
                    />
                    <CardContent
                      sx={{
                        padding: "0.1rem 0",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontSize: "0.9rem",
                          fontFamily: "Noto Sans TC",
                          fontWeight: "700",
                        }}
                      >
                        {show.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.75rem",
                          fontFamily: "Noto Sans TC",
                          fontWeight: "400",
                        }}
                      >
                        {show.publish}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography>沒有匹配的結果</Typography>
          )}
        </Box>

        <Divider />

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            bgcolor: "#F6F7F8",
            display: "flex",
            justifyContent: "flex-end",
            boxShadow: "0px -10px 20px 0px #0000001F",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleSearchModalClose}
            sx={{ mr: 2 }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAdd}
            disabled={selectedShows.length === 0}
          >
            確認新增
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchModal;
