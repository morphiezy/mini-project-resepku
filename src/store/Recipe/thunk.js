import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchDetailRecipe = createAsyncThunk('recipe/detailByKey' , async (key) => {
    const response = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/recipe/${key}`);
    const detailRecipe = await response.json();
    return detailRecipe.results;
})

export { fetchDetailRecipe }