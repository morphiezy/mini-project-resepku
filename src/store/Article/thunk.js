import { createAsyncThunk } from "@reduxjs/toolkit";


const fetchArticleDetail = createAsyncThunk('article/GET_DETAIL' , async (tag_key)=> {
    const response = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/article/${tag_key}`);
    const article = await response.json();

    return article.results;
});

export { fetchArticleDetail };