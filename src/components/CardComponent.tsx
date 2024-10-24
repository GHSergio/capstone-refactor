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
        p: 0,
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
                fontSize: "0.9rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
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
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "0.75rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
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
              minWidth: 0,
              padding: "0.2rem 0.2rem ",
              borderRadius: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: "0.8rem",
                lineHeight: { xs: "1rem", lg: "2rem" },
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
