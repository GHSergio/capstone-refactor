import React from "react";
import { IconButton, useTheme } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface BookmarkButtonProps {
  isFavorite: boolean;
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
        sx={{ position: "absolute", top: 10, right: 0 }}
        onClick={onToggleFavorite}
      >
        {isFavorite ? (
          <BookmarkIcon sx={{ color: theme.palette.primary.main }} />
        ) : (
          <BookmarkBorderIcon sx={{ color: theme.palette.primary.main }} />
        )}
      </IconButton>
    </>
  );
};

export default BookmarkButton;
