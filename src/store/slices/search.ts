import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearch: (_, { payload }: PayloadAction<string>) => payload,
    resetSearch: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const search = searchSlice.reducer;

export const { changeSearch, resetSearch } = searchSlice.actions;
