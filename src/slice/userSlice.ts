import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Episode, Show } from "./types";
import axios from "axios";
import { refreshToken } from "../api/Author";

export interface Category {
  id: string;
  name: string;
  savedShows: Show[];
}

export interface UserData {
  id: string;
  display_name: string;
  images: { url: string }[];
  email: string;
}

export interface Favorite {
  id: string;
}

export interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export interface UserState {
  acToken: string | null;
  userProfile: UserData | undefined;
  userCategories: Category[] | undefined;
  userFavorites: Favorite[] | undefined;
  currentCategoryId: string | null;
  showsDetail: Show[]; // 向API獲取分類內的savedShows的Detail
  episodeDetail: Episode[]; // 向API獲取收藏內EpisodeId的Detail
  error: string | null | undefined;
  loading: boolean;
  alert: AlertState;
}

// 初始狀態
const initialState: UserState = {
  userProfile: undefined,
  acToken: null,
  userCategories: [],
  userFavorites: [],
  currentCategoryId: "1",
  showsDetail: [],
  episodeDetail: [],
  error: null,
  loading: false,
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
};

// Spotify API 基本 URL
const spotifyBaseUrl = import.meta.env.VITE_SPOTIFY_API_BASE_URI;
const AcBaseUri = import.meta.env.VITE_AC_API_BASE_URI;

// 刷新token
export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshToken();
      console.log("API回傳: ", response);
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 獲取使用者資訊
export const fetchUserProfile = createAsyncThunk(
  // typePrefix -> 用來生成三種 action types（pending, fulfilled, rejected）
  "spotify/fetchUserProfile",
  // payloadCreator -> 處理邏輯並返回 fulfilled 或 rejected action 的 payload
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    const userProfileEndpoint = spotifyBaseUrl + "/v1/me";
    try {
      const response = await axios.get(userProfileEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      // 回傳回應的 data 給 fulfilled action，作為其 payload
      return data;
    } catch (error: unknown) {
      // 檢查錯誤是否為 Axios 錯誤並確保有 response
      if (axios.isAxiosError(error) && error.response) {
        // 回傳錯誤 response 給 rejected action，作為其 payload
        return rejectWithValue(error.response);
      }
    }
  }
);

// Spotify API 授權後創建 AC API 帳戶
export const initializeAccount = createAsyncThunk(
  "user/initializeAccount",
  async (_, { rejectWithValue }) => {
    const spotifyToken = localStorage.getItem("access_token");
    const url = `${AcBaseUri}/api/users`;
    const bodyParameters = { spotifyToken };
    try {
      const response = await axios.post(url, bodyParameters);
      const token = response.data.token;
      // localStorage.setItem("acToken", token);
      // console.log("創建帳戶response: ", response, token);
      return token;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 獲取收藏節目
export const fetchUserFavorites = createAsyncThunk(
  "user/fetchUserFavorites",
  async (_, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/me`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      // console.log("收藏: ", response);
      return response.data.favoriteEpisodeIds;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 獲取分類清單
export const fetchCategories = createAsyncThunk(
  "user/fetchCategories",
  async (_, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/categories`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      // console.log("獲取分類清單: ", response);
      return response.data.categories;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // return rejectWithValue(error.response);
        console.log("error.response: ", error.response);
        const { status, data } = error.response; // 只取所需數據
        return rejectWithValue({ status, data });
      }
    }
  }
);

// 獲取指定的 Show 資訊
export const fetchShow = createAsyncThunk(
  "spotify/fetchShowWithEpisodes",
  async (showId: string, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    const url = `${spotifyBaseUrl}/v1/shows/${showId}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 獲取指定Episode 資訊
export const fetchEpisodeDetail = createAsyncThunk(
  "podcast/fetchEpisodeDetail",
  async (episodeId: string, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    const url = `${spotifyBaseUrl}/v1/episodes/${episodeId}`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 添加episode到收藏
export const addFavorite = createAsyncThunk(
  "user/addFavorite",
  async (episodeId: string, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/episodes`;
    const bodyParam = { episodeId };
    try {
      await axios.post(url, bodyParam, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      // console.log("添加episode到收藏: ", response);
      return { id: episodeId }; // 回傳一個包含id的物件
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 從收藏移除episode
export const removeFavorite = createAsyncThunk(
  "user/removeFavorite",
  async (episodeId: string, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/episodes/${episodeId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      // console.log("被刪除的episodeId: ", episodeId);
      return episodeId;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 添加新的分類
export const createCategory = createAsyncThunk(
  "user/createCategory",
  async (newTitle: string, { rejectWithValue }) => {
    const url = `${AcBaseUri}/api/categories`;
    const bodyParameters = { name: newTitle };
    // console.log("分類名稱:", bodyParameters);
    try {
      const response = await axios.post(url, bodyParameters, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      // console.log("新分類清單: ", response);
      if (response.data.success) {
        // // 返回新分類的資料，假設 API 會回傳新分類的ID或相關資料
        // return {
        //   name: newTitle,
        //   id: response.data.categoryId || "",
        // };

        // 新增分類成功後，無需返回任何數據，稍後會重新獲取最新的分類
        return true;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response);
        return rejectWithValue(error.response);
      }
    }
  }
);

// 刪除分類
export const deleteCategory = createAsyncThunk(
  "user/deleteCategory",
  async (categoryId: string, { rejectWithValue }) => {
    const url = `${AcBaseUri}/api/categories/${categoryId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      return categoryId;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 修改分類名稱
export const updateCategory = createAsyncThunk(
  "user/updateCategory",
  async (
    { categoryId, newName }: { categoryId: string; newName: string },
    { rejectWithValue }
  ) => {
    const url = `${AcBaseUri}/api/categories/${categoryId}`;
    const bodyParameters = { name: newName };
    try {
      await axios.put(url, bodyParameters, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      return { categoryId, newName };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 添加show到分類(通常會選擇多個show 但一次只能傳遞一個)
export const addShowToCategory = createAsyncThunk(
  "user/addShowToCategory",
  async (
    { categoryId, showId }: { categoryId: string; showId: string },
    { rejectWithValue }
  ) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/categories/${categoryId}/shows`;
    const bodyParam = { showId };

    try {
      await axios.post(url, bodyParam, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      return { success: true, showId, categoryId };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 從分類中移除show
export const removeShowFromCategory = createAsyncThunk(
  "user/removeShowFromCategory",
  async (
    { categoryId, showId }: { categoryId: string; showId: string },
    { rejectWithValue }
  ) => {
    const url = `${AcBaseUri}/api/categories/${categoryId}/shows/${showId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      return { categoryId, showId };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 共用的錯誤處理函式
const handleAuthError = (state: UserState, action: any) => {
  // 從 action.payload（即 error.response）中提取 HTTP 狀態碼
  // console.log("rejectWithValue", action.payload);

  const { status, data } = action.payload as {
    status: number;
    data?: { message?: string };
  };
  // 優先使用 API 返回的錯誤信息（即 action.payload.data）-> 從 catch return，
  // 如果沒有具體的 API 錯誤信息，則使用 Axios 自動捕捉的錯誤（action.error.message）-> 不用在catch return也有

  let message = data?.message || "發生未知錯誤"; // 默認的錯誤提示

  // 根據 HTTP 狀態碼設置具體的錯誤訊息
  if (status === 401) {
    message = "驗證已過期，請重新登入";
  } else if (status === 403) {
    message = "您沒有權限執行此操作";
  } else if (status === 404) {
    message = "找不到請求的資源，請稍後再試或聯繫支援";
  } else if (status === 409) {
    message = "資料衝突，該項目可能已經存在";
  } else if (status >= 500) {
    message = "伺服器發生錯誤，請稍後再試";
  }
  state.alert = {
    open: true,
    message: message,
    severity: "error",
  };
};

// userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Card 渲染
    setShowsDetail(state, action: PayloadAction<Show[]>) {
      state.showsDetail = action.payload;
    },
    setAlert(state, action: PayloadAction<AlertState>) {
      state.alert = action.payload;
    },
    clearAlert(state) {
      state.alert = {
        open: false,
        message: "",
        severity: "info",
      };
    },
    setCurrentCategoryId: (state, action: PayloadAction<string>) => {
      state.currentCategoryId = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userProfile = action.payload;
    },
    setUserCategories: (state, action: PayloadAction<Category[]>) => {
      state.userCategories = action.payload;
    },
    setUserFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.userFavorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    // refresh token
    builder
      .addCase(refreshAccessToken.fulfilled, (_, action) => {
        if (action.payload) {
          console.log("刷新成功獲取: ", action.payload);
          const { access_token, refresh_token, expires_in } = action.payload;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("expires_in", expires_in.toString());
          // 計算過期時間並轉換成ISO格式 保存localStorage
          const expirationTime = new Date(Date.now() + expires_in * 1000);
          localStorage.setItem("expires", expirationTime.toISOString());
        }
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        handleAuthError(state, action);
      });
    builder
      // 處理 fetchUserProfile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const responseData = action.payload;
        // 將使用者資料存入 localStorage
        localStorage.setItem("user_profile", JSON.stringify(responseData));
        // 更新全局狀態
        state.userProfile = responseData;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        handleAuthError(state, action);
      });
    // initializeAccount
    builder
      .addCase(initializeAccount.fulfilled, (_, action) => {
        localStorage.setItem("acToken", action.payload);
      })
      .addCase(initializeAccount.rejected, (state, action) => {
        handleAuthError(state, action);
      });

    // fetchUserFavorites
    builder
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        const newFavorites = action.payload;
        // 檢查是否有變更
        if (
          JSON.stringify(newFavorites) !== JSON.stringify(state.userFavorites)
        ) {
          // 只有當 favorites 有變化時才更新狀態與 localStorage
          state.userFavorites = newFavorites;

          // 保存到 localStorage
          localStorage.setItem(
            "user_favorites",
            JSON.stringify(newFavorites || [])
          );
        }
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        handleAuthError(state, action);
      });

    // fetchCategories
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const newCategories = action.payload;

        if (
          JSON.stringify(newCategories) !== JSON.stringify(state.userFavorites)
        ) {
          state.userCategories = newCategories;

          localStorage.setItem(
            "user_categories",
            JSON.stringify(newCategories || [])
          );
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        handleAuthError(state, action);
      });

    builder
      // 處理 fetchShow
      .addCase(fetchShow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShow.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchShow.rejected, (state, action) => {
        state.loading = false;
        handleAuthError(state, action);
      });

    builder
      // 處理 fetchEpisodeDetail
      .addCase(fetchEpisodeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodeDetail.fulfilled, (state, action) => {
        state.loading = false;
        // 檢查 episode 是否已經存在
        const episodeExists = state.episodeDetail?.some(
          (episode) => episode.id === action.payload.id
        );
        // 如果不存在才推入
        if (!episodeExists) {
          state.episodeDetail.push(action.payload);
        }
      })
      .addCase(fetchEpisodeDetail.rejected, (state, action) => {
        state.loading = false;
        handleAuthError(state, action);
      });

    // addFavorite
    builder
      .addCase(addFavorite.fulfilled, (state, action) => {
        const favorite = action.payload as Favorite; // 傳回來的是 Favorite 物件

        const isAlreadyFavorite = state.userFavorites?.some(
          (fav) => fav.id === favorite.id
        );

        // 只有當 favorite 不存在時才添加
        if (!isAlreadyFavorite) {
          state.userFavorites?.push(favorite);

          // 更新 localStorage
          localStorage.setItem(
            "user_favorites",
            JSON.stringify(state.userFavorites)
          );
          state.alert = {
            open: true,
            message: "添加收藏成功！",
            severity: "success",
          };
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        // state.alert = {
        //   open: true,
        //   message: "添加收藏失敗！",
        //   severity: "error",
        // };
        handleAuthError(state, action);
      });

    // removeFavorite
    builder
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const episodeId = action.payload;

        // 根據 id 過濾移除收藏的節目
        const newFavorites = state.userFavorites?.filter(
          (favorite) => favorite.id !== episodeId
        );

        // 檢查是否有變更
        if (
          JSON.stringify(newFavorites) !== JSON.stringify(state.userFavorites)
        ) {
          state.userFavorites = newFavorites;

          // 移除對應的 EpisodeDetail
          state.episodeDetail = state.episodeDetail?.filter(
            (episode) => episode.id !== episodeId
          );

          // 更新 localStorage
          localStorage.setItem(
            "user_favorites",
            JSON.stringify(state.userFavorites)
          );
        }
        // // 根據 id 過濾移除收藏的節目
        // state.userFavorites = state.userFavorites?.filter(
        //   (favorite) => favorite.id !== episodeId
        // );

        // state.episodeDetail = state.episodeDetail?.filter(
        //   (episode) => episode.id !== action.payload
        // );

        // // 更新 localStorage
        // localStorage.setItem(
        //   "user_favorites",
        //   JSON.stringify(state.userFavorites)
        // );

        state.alert = {
          open: true,
          message: "移除收藏成功！",
          severity: "success",
        };
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        // state.alert = {
        //   open: true,
        //   message: "移除收藏失敗！",
        //   severity: "error",
        // };
        handleAuthError(state, action);
      });

    // createCategory
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        // 確保 action.payload 存在
        if (action.payload === true) {
          state.alert = {
            open: true,
            message: "新增分類成功！",
            severity: "success",
          };
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        handleAuthError(state, action);
      });

    // updateCategory
    builder
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload) {
          const { categoryId, newName } = action.payload;
          if (state.userCategories) {
            const category = state.userCategories.find(
              (cat) => cat.id === categoryId
            );

            if (category) {
              category.name = newName;

              // 更新 localStorage
              localStorage.setItem(
                "user_categories",
                JSON.stringify(state.userCategories)
              );
            }
          }
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        handleAuthError(state, action);
      });

    // deleteCategory
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.userCategories = state.userCategories?.filter(
          (cat) => cat.id !== action.payload
        );
        localStorage.setItem(
          "user_categories",
          JSON.stringify(state.userCategories)
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        handleAuthError(state, action);
      });

    // addShowToCategory
    builder
      .addCase(addShowToCategory.fulfilled, (state, action) => {
        if (action.payload) {
          const { categoryId, showId } = action.payload;
          const category = state.userCategories?.find(
            (cat) => cat.id === categoryId
          );
          if (category) {
            // 確保節目不會重複添加到分類
            const isAlreadyInCategory = category.savedShows.some(
              (savedShow) => savedShow.id === showId
            );
            if (!isAlreadyInCategory) {
              category.savedShows.push({ id: showId });
            }
            // 更新 localStorage，將整個 userCategories 寫回
            localStorage.setItem(
              "user_categories",
              JSON.stringify(state.userCategories)
            );
            state.alert = {
              open: true,
              message: "節目成功添加至該分類！",
              severity: "success",
            };
          }
        }
      })

      .addCase(addShowToCategory.rejected, (state, action) => {
        // 提取error.response內的status
        const { status } = action.payload as { status: number };
        // status === 409 邏輯 已在SearchModal元件handleConfirmAdd內

        if (status === 401) {
          state.alert = {
            open: true,
            message: "驗證已過期，請重新登入",
            severity: "error",
          };
        } else if (status !== 409) {
          state.alert = {
            open: true,
            message: action.error.message as string,
            severity: "error",
          };
        }
      });

    // removeShowFromCategory
    builder
      .addCase(removeShowFromCategory.fulfilled, (state, action) => {
        if (action.payload) {
          const { categoryId, showId } = action.payload;
          const category = state.userCategories?.find(
            (cat) => cat.id === categoryId
          );
          if (category) {
            category.savedShows = category.savedShows.filter(
              (show) => show.id !== showId
            );
            // 更新 localStorage，將整個 userCategories 寫回
            localStorage.setItem(
              "user_categories",
              JSON.stringify(state.userCategories)
            );
            state.alert = {
              open: true,
              message: "節目成功從該分類移除！",
              severity: "success",
            };
          }
        }
      })
      .addCase(removeShowFromCategory.rejected, (state, action) => {
        handleAuthError(state, action);
      });
  },
});

export const {
  setUserData,
  setUserCategories,
  setUserFavorites,
  setCurrentCategoryId,
  setShowsDetail,

  setAlert,
  clearAlert,
} = userSlice.actions;

export default userSlice.reducer;
