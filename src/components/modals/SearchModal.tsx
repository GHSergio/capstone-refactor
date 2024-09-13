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
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  setIsSearchModalOpen,
  toggleSelectShow,
  clearSelectedShows,
  clearSearchResults,
  searchShows,
} from "../../slice/podcastSlice";
import { addShowToCategory } from "../../slice/userSlice";
import { Show } from "../../slice/types";
const SearchModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isSearchModalOpen, selectedShows, searchResults } = useSelector(
    (state: RootState) => state.podcast
  );
  const { currentCategoryId, userCategories } = useSelector(
    (state: RootState) => state.user
  );

  const [searchTerm, setSearchTerm] = useState("");

  // console.log("searchResults:", searchResults);
  console.log("當前分類: ", currentCategoryId);
  console.log("被選中的shows: ", selectedShows);

  // 清空 搜尋結果 & 挑中的shows
  const handleSearchModalClose = () => {
    dispatch(setIsSearchModalOpen(false));
    dispatch(clearSelectedShows());
    dispatch(clearSearchResults());
  };

  // 將選中的 shows 添加到當前 category
  // const handleConfirmAdd = () => {
  //   if (currentCategoryId) {
  //     const category = userCategories?.find(
  //       (cat) => cat.id === currentCategoryId
  //     );

  //     if (category) {
  //       // 過濾掉已經存在於該分類的 shows
  //       const newShows = selectedShows.filter(
  //         (show) =>
  //           !category.savedShows.some((savedShow) => savedShow.id === show.id)
  //       );

  //       // 如果有新節目，才發送請求
  //       if (newShows.length > 0) {
  //         const newShowIds = newShows.map((show) => show.id);
  //         dispatch(
  //           addShowToCategory({
  //             categoryId: currentCategoryId,
  //             showIds: newShowIds, // 傳送過濾後的新節目
  //           })
  //         );
  //         console.log("Selected shows:", newShows);
  //         console.log("Show IDs to add:", newShowIds);
  //       }
  //     }
  //   }
  //   dispatch(setIsSearchModalOpen(false));
  //   dispatch(clearSelectedShows());
  //   dispatch(clearSearchResults());
  // };
  const handleConfirmAdd = async () => {
    if (currentCategoryId && selectedShows.length > 0) {
      const failedShows: string[] = []; // 用來保存失敗的 showId

      for (let show of selectedShows) {
        try {
          const result = await dispatch(
            addShowToCategory({
              categoryId: currentCategoryId,
              showId: show.id,
            })
          ).unwrap();

          if (!result.success) {
            failedShows.push(show.id);
            console.error(`Failed to add show ${show.id}:`, result.message);
          }
        } catch (error) {
          failedShows.push(show.id);
          console.error(`Error adding show ${show.id}:`, error);
        }
      }

      if (failedShows.length > 0) {
        console.log("The following shows failed to be added:", failedShows);
        // 這裡你可以考慮顯示一個 Snackbar 或 Alert，通知用戶失敗的節目
      } else {
        // 全部成功後關閉 modal 並清除已選中的 shows
        dispatch(setIsSearchModalOpen(false));
        dispatch(clearSelectedShows());
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    // 調用 searchShows 進行 API 搜索
    if (keyword.length > 0) {
      dispatch(searchShows(keyword)); // 發送 API 搜索請求
    }
  };

  const handleShowSelect = (show: Show) => {
    // 選擇匹配的 show 並添加到 selectedShows
    dispatch(toggleSelectShow(show));
  };

  const isSelected = (show: Show) =>
    selectedShows.some((selectedShow) => selectedShow.id === show.id);

  const overFlowStyled = {
    WebkitLineClamp: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

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
            flexWrap: "wrap",
            p: 2,
            overflowY: "auto",
          }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((show) => (
              <Grid
                m={1}
                key={show.id}
                sx={{
                  width: "170px",
                  height: "240px",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 0px 2px 2px #C7C7C73D",
                  padding: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: isSelected(show) ? "5px solid #FF7F50" : "none",
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
                      image={show?.images?.[0].url}
                      alt={show.name}
                      sx={{ borderRadius: "0.5rem" }}
                    />
                    <CardContent
                      sx={{
                        padding: "0.1rem 0",
                      }}
                    >
                      {/* Podcast頻道名稱 */}
                      <Tooltip title={show.name} arrow>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontSize: "0.9rem",
                            ...overFlowStyled,
                          }}
                        >
                          {show.name}
                        </Typography>
                      </Tooltip>

                      {/* Podcast頻道作者 */}
                      <Tooltip title={show.publisher} arrow>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.75rem",
                            ...overFlowStyled,
                          }}
                        >
                          {show.publisher}
                        </Typography>
                      </Tooltip>
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
