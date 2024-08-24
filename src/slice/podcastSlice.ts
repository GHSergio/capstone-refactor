import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface PodcastState {
  value: string;
}

const initialState: PodcastState = {
  value: "",
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    setState: (state) => {
      state.value = "";
    },
  },
});

export const { setState } = podcastSlice.actions;

export default podcastSlice.reducer;
