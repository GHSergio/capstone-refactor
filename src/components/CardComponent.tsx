import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Show } from "../slice/types";

interface CardComponentProps {
  show: Show;
  onMoreClick?: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ show, onMoreClick }) => {
  return (
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
            }}
          >
            {show.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.75rem",
            }}
          >
            {show.publisher}
          </Typography>
        </CardContent>

        <Button
          variant="contained"
          color="secondary"
          onClick={onMoreClick}
          sx={{
            padding: "0.1rem ",
            borderRadius: "0.25rem",
            marginTop: "0.25rem",
          }}
        >
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "0.8rem",
              lineHeight: "1rem",
            }}
          >
            更多
          </Typography>
        </Button>
      </Card>
    </Box>
  );
};

export default CardComponent;
