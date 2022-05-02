import { createSlice } from "@reduxjs/toolkit";
import { fetchFilterContent, searchRecipe } from "./thunk";



const initialState = {
    recipes : {
        filter: [],
        list:[],
        currentFilter:""
    },
    article : {
        filter:[],
        list:[],
        currentFilter:""
    },
    search : {
        results : []
    }
}


const contentSlice = createSlice({
    name:'content',
    initialState,
    reducers : {
        changeFilter : (state, {payload}) =>{
            const {type,value} = payload;
            state[type].currentFilter = value;
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(fetchFilterContent.fulfilled , (state, {payload}) => {
            const { contentType, initialFetch, temporaryData } = payload;
            
            if(initialFetch){
                state[contentType].currentFilter =temporaryData.filter[0].key;
                state[contentType].filter = temporaryData.filter;
                state[contentType].list = temporaryData.content;
            }
            else state[contentType].list = temporaryData.content;
        })
        .addCase(searchRecipe.fulfilled, (state,{ payload }) => {
            state.search.results = payload;
        })
    }
})


const { changeFilter } = contentSlice.actions;


export default contentSlice.reducer
export { changeFilter }

