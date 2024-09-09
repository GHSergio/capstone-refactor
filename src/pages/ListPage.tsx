import React, { useState } from "react";
import { Grid, Box, Typography, CardMedia, Button } from "@mui/material";
import listNull from "../assets/listNull.png";
import CardComponent from "../components/CardComponent";
import MoreModal from "../components/modals/MoreModal";
import SearchModal from "../components/modals/SearchModal";
import ActionModal from "../components/modals/ActionModal";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setIsSearchModalOpen, setCurrentShow } from "../slice/podcastSlice";

const ListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentListId } = useSelector((state: RootState) => state.podcast);

  const currentList = useSelector((state: RootState) =>
    state.podcast.lists.find((list) => list.id === currentListId)
  );

  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  // 控制 MoreModal 的狀態
  const handleMoreClick = (showId: string) => {
    dispatch(setCurrentShow(showId));
    setIsMoreModalOpen(true);
  };

  const handleMoreClose = () => {
    setIsMoreModalOpen(false);
    dispatch(setCurrentShow(null));
  };

  if (!currentList) {
    return <div>請選擇一個清單。</div>;
  }

  const handleClickSearch = () => {
    dispatch(setIsSearchModalOpen(true));
  };

  return (
    <>
      <>
        <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            margin: "0 auto",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
            alignContent: "flex-start",
          }}
        >
          {/* 顯示卡片 */}
          {currentList.shows.length > 0 ? (
            currentList.shows.map((show) => (
              <Grid
                item
                key={show.id}
                sx={{
                  width: "178px",
                  height: "266px",
                  borderRadius: "0.5rem",
                  boxShadow: "16px 16px 40px 20px #C7C7C73D",
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                <CardComponent
                  image={show.image || listNull}
                  name={show.name}
                  publish={show.publish}
                  onMoreClick={() => handleMoreClick(show.id)}
                />
              </Grid>
            ))
          ) : (
            <Grid
              container
              sx={{
                width: "100%",
                height: "100%",
                margin: "0 auto",
                // gap: 2,
                // gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
                justifyContent: "center",
                alignContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={listNull}
                  sx={{ width: "3.5rem", margin: "0 auto" }}
                />
                <Typography
                  sx={{ color: "#718096", fontSize: "1rem", margin: "1rem 0" }}
                >
                  您尚未加入任何 Podcast，可以點擊按鈕新增！
                </Typography>
                <Button
                  sx={{
                    backgroundColor: "#FF7F50",
                    borderRadius: "8px",
                    padding: "0.7rem 3rem",
                  }}
                  onClick={handleClickSearch}
                >
                  <Typography sx={{ fontSize: "1rem", color: "#FFFFFF" }}>
                    新增 Podcast
                  </Typography>
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </>
      {/* 顯示 MoreModal */}
      {isMoreModalOpen && (
        <MoreModal isOpen={isMoreModalOpen} onClose={handleMoreClose} />
      )}
      <SearchModal />
      <ActionModal />
    </>
  );
};

export default ListPage;
