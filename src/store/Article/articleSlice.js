import { createSlice } from "@reduxjs/toolkit";
import { fetchArticleDetail } from "./thunk";


const initialState = {
    title:"",
    thumb:"",
    author:"",
    date_published:"",
    description:""
}

const articleSlice = createSlice({
    name:"article",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchArticleDetail.fulfilled , (state , {payload}) => {
            return {...payload}
        })
    }
})


export default articleSlice.reducer
