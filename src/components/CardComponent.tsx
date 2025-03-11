import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
} from "@mui/material";

interface CardComponentProps {
  image?: string;
  name?: string;
  publisher?: string;
  onMoreClick?: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  image,
  name,
  publisher,
  onMoreClick,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "0px 0px 2px 5px rgba(27, 29, 13, 0.24)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          margin: "0 auto",
          backgroundColor: "rgba(120, 170, 40, 0.2)",
          padding: {
            xs: "16px",
          },
          "@media (max-width: 321px)": {
            fontSize: "1rem",
            padding: "12px",
          },
          "@media(min-width: 321px)and (max-width: 376px)": {
            fontSize: "1.25rem",
            padding: "12px",
          },
          "@media (min-width: 376px) and (max-width: 599px)": {
            fontSize: "1.25rem",
            padding: "12px",
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            borderRadius: "0.5rem",
            boxShadow: "0 0 5px 3px rgba(0,0,0,0.5)",
            marginBottom: "0.1rem",
            objectFit: "center",
            objectPosition: "center",
          }}
        />

        <CardContent
          sx={{
            padding: 0,
            marginTop: 1,
          }}
        >
          {/* Podcast名稱 */}
          <Tooltip
            title={<Typography sx={{ fontSize: "1rem" }}>{name}</Typography>}
            arrow
            placement="top"
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "1.15rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                "@media (max-width: 321px)": {
                  fontSize: "0.9rem",
                },
                "@media(min-width: 321px)and (max-width: 376px)": {
                  fontSize: "0.9rem",
                },
                "@media (min-width: 376px) and (max-width: 599px)": {
                  fontSize: "0.9rem",
                },
              }}
            >
              {name}
            </Typography>
          </Tooltip>

          {/* 創作者名稱 */}
          <Tooltip
            title={
              <Typography sx={{ fontSize: "1rem" }}>{publisher}</Typography>
            }
            arrow
            placement="top"
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontSize: "0.8rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                "@media (max-width: 321px)": {
                  fontSize: "0.7rem",
                },
                "@media(min-width: 321px)and (max-width: 376px)": {
                  fontSize: "0.7rem",
                },
                "@media (min-width: 376px) and (max-width: 599px)": {
                  fontSize: "0.7rem",
                },
              }}
            >
              {publisher}
            </Typography>
          </Tooltip>
        </CardContent>

        <Tooltip
          title={
            <Typography sx={{ fontSize: "1rem" }}>頻道詳細介紹</Typography>
          }
          arrow
          placement="top"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={onMoreClick}
            sx={{
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              marginTop: "0.25rem",
              "@media (max-width: 321px)": {
                fontSize: "0.8rem",
              },
              "@media(min-width: 321px)and (max-width: 376px)": {
                fontSize: "0.8rem",
              },
              "@media (min-width: 376px) and (max-width: 599px)": {
                fontSize: "0.8rem",
              },
            }}
          >
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: "1rem",
                "@media (max-width: 321px)": {
                  fontSize: "0.8rem",
                },
                "@media(min-width: 321px)and (max-width: 376px)": {
                  fontSize: "0.8rem",
                },
                "@media (min-width: 376px) and (max-width: 599px)": {
                  fontSize: "0.8rem",
                },
              }}
            >
              更多
            </Typography>
          </Button>
        </Tooltip>
      </Card>
    </Box>
  );
};

export default CardComponent;
