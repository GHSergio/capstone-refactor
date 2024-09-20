import React from "react";
import { IconButton, useTheme } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface BookmarkButtonProps {
  isFavorite: boolean | undefined;
  onToggleFavorite: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  const theme = useTheme();
  return (
    <>
      <IconButton
        onClick={onToggleFavorite}
        sx={{ position: "absolute", top: 0, right: 0, padding: 1 }}
      >
        {isFavorite ? (
          <BookmarkIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: {
                xs: "0.6rem",
                sm: "1rem",
                md: "1rem",
                lg: "1.5rem",
                xl: "2rem",
              },
            }}
          />
        ) : (
          <BookmarkBorderIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: {
                xs: "0.6rem",
                sm: "1rem",
                md: "1rem",
                lg: "1.5rem",
                xl: "2rem",
              },
            }}
          />
        )}
      </IconButton>
    </>
  );
};

export default BookmarkButton;
