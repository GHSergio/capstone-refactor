export interface Episode {
  id: string;
  name?: string;
  images?: { url: string }[];
  description?: string;
  publisher?: string;
  release_date?: string;
  duration_ms?: number;
}

export interface Show {
  id: string;
  name?: string;
  publisher?: string;
  images?: { url: string }[];
  description?: string;
  episodes?: {
    items: Episode[];
  };
}

export interface Track {
  id: string;
  name: string;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  artists: Array<{
    id: string;
    name: string;
  }>;
  duration_ms: number;
  href: string;
  preview_url: string;
  uri: string;
}

export interface TrackItem {
  track: Track;
}

// // 獲取使用者的播放列表
// export const fetchUserPlaylists = createAsyncThunk(
//   "spotify/fetchUserPlaylists",
//   async () => {
//     const token = localStorage.getItem("access_token");

//     const url = `${baseUrl}/v1/me/playlists`;
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = response.data.items;
//     console.log("使用者清單列表: ", data);

//     return data;
//   }
// );

// // 獲取使用者播放列表
// export const fetchPlaylistTracks = createAsyncThunk(
//   "spotify/fetchPlaylistTracks",
//   async (playlistId: string) => {
//     const token = localStorage.getItem("access_token");

//     const url = `${baseUrl}/v1/playlists/${playlistId}/tracks`;
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return { playlistId, tracks: response.data.items }; // 返回曲目列表
//   }
// );

// // 獲取使用者的收藏節目
// export const fetchUserFavorites = createAsyncThunk(
//   "user/fetchUserFavorites",
//   async () => {
//     const token = localStorage.getItem("access_token");

//     const url = `${baseUrl}/v1/me/episodes`;
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = response.data.items;
//     console.log("使用者收藏: ", response);

//     return data;
//   }
// );

// // 獲取使用者列表內的曲目
// export const fetchUserPlaylistTracks = createAsyncThunk(
//   "spotify/fetchPlaylistTracks",
//   async (playlistId: string, { getState }) => {
//     const state = getState() as { user: UserState };
//     const token = state.user.accessToken;

//     if (!token) throw new Error("Access token not found");

//     // 找到 playlist 的 tracks.href
//     const playlist = state.user.userPlaylists?.find(
//       (pl) => pl.id === playlistId
//     );
//     if (!playlist) throw new Error("Playlist not found");

//     const url = playlist.tracks.href; // 使用 tracks.href 來請求曲目數據
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return { playlistId, tracks: response.data.items }; // 返回曲目數據
//   }
// );

// // 新增播放清單
// export const createUserPlaylist = createAsyncThunk(
//   "user/createUserPlaylist",
//   async (playlistName: string, { getState }) => {
//     // const token = getSpotifyAccessToken();
//     const state = getState() as { user: UserState };
//     const token = state.user.accessToken; // 從 Redux 狀態中獲取

//     if (!token) throw new Error("Access token not found");

//     const url = `${baseUrl}/v1/users/me/playlists`;
//     const response = await axios.post(
//       url,
//       { name: playlistName },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data; // 回傳新增的播放清單
//   }
// );

// // 編輯播放清單名稱
// export const editUserPlaylistName = createAsyncThunk(
//   "user/editUserPlaylistName",
//   async (
//     { playlistId, newName }: { playlistId: string; newName: string },
//     { getState }
//   ) => {
//     const state = getState() as { user: UserState };
//     const token = state.user.accessToken; // 從 Redux 狀態中獲取

//     if (!token) throw new Error("Access token not found");

//     const url = `${baseUrl}/v1/playlists/${playlistId}`;
//     await axios.put(
//       url,
//       { name: newName }, // 發送新的名稱
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return { playlistId, newName }; // 返回修改結果
//   }
// );

// // 刪除播放清單
// export const deleteUserPlaylist = createAsyncThunk(
//   "user/deleteUserPlaylist",
//   async (playlistId: string) => {
//     const token = localStorage.getItem("access_token");
//     await axios.delete(`${baseUrl}/v1/playlists/${playlistId}/followers`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return playlistId;
//   }
// );

// // 追蹤 Podcast（使用者追蹤特定 Podcast）
// export const followPodcast = createAsyncThunk(
//   "spotify/followPodcast",
//   async (showId: string) => {
//     const token = localStorage.getItem("access_token");

//     const url = `${baseUrl}/v1/me/shows?ids=${showId}`;
//     await axios.put(
//       url,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return showId;
//   }
// );

// // 取消追蹤 Podcast
// export const unfollowPodcast = createAsyncThunk(
//   "spotify/unfollowPodcast",
//   async (showId: string) => {
//     const token = localStorage.getItem("access_token");

//     const url = `${baseUrl}/v1/me/shows?ids=${showId}`;
//     await axios.delete(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return showId;
//   }
// );
