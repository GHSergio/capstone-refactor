import React from "react";
import { Grid, Box, Typography, CardMedia, Button } from "@mui/material";
import listNull from "../assets/listNull.png";
import PodcastCard from "../components/CardComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ListPage: React.FC = () => {
  const currentListId = useSelector(
    (state: RootState) => state.podcast.currentListId
  );
  const currentList = useSelector((state: RootState) =>
    state.podcast.lists.find((list) => list.id === currentListId)
  );

  const handleMoreClick = () => {
    console.log("更多按鈕被點擊");
  };

  if (!currentList) {
    return <div>請選擇一個清單。</div>;
  }

  return (
    <>
      {/* 卡片區 */}
      <Grid
        container
        sx={{
          margin: "6rem 1rem 0 1rem ",
          width: "100%",
          height: "100%",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
        }}
      >
        {/* 個別卡片 */}
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
                overflow: "hidden", // 確保內部內容遵從圓角效果
              }}
            >
              <PodcastCard
                image={show.image || listNull}
                name={show.name}
                publish={show.publish}
                onMoreClick={handleMoreClick}
              />
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
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
              sx={{
                color: "#718096",
                fontSize: "1rem",
                fontFamily: "Noto Sans TC",
                margin: "1rem 0",
              }}
            >
              您尚未加入任何 Podcast，可以點擊按鈕新增！
            </Typography>
            <Button
              sx={{
                backgroundColor: "#FF7F50",
                borderRadius: "8px",
                padding: "0.7rem 3rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Noto Sans TC",
                  color: "#FFFFFF",
                }}
              >
                新增 Podcast
              </Typography>
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default ListPage;
