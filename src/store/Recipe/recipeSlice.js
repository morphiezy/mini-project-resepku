import { createSlice } from "@reduxjs/toolkit";
import { fetchDetailRecipe } from "./thunk";

const initialState = {
  title: "",
  thumb: "",
  author: {
    user: "",
    datePublished: "",
  },
  category: {
    servings: "",
    times: "",
    dificulty: "",
  },
  ingredient: [],
  step: [],
  desc: "",
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDetailRecipe.fulfilled, (state, { payload }) => {

      const {
        title,
        thumb,
        servings,
        times,
        author,
        dificulty,
        ingredient,
        step,
        desc,
      } = payload;

      return {
        title,
        thumb,
        author,
        category: { times, servings, dificulty },
        ingredient,
        step,
        desc,
      };

    });
  },
});

export default recipeSlice.reducer;
