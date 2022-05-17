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


const getTitle = (key) => key.split("-").join(" ")


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
        builder
        .addCase(fetchFilterContent.fulfilled , (state, {payload}) => {

            const { contentType, initialFetch, temporaryData } = payload;

            const content = temporaryData.content.map(content => ({...content, title : getTitle(content.key)}))
            
            if(initialFetch){
                state[contentType].currentFilter =temporaryData.filter[0].key;
                state[contentType].filter = temporaryData.filter;
                state[contentType].list = content;
            }
            else state[contentType].list = content;
        })
        .addCase(searchRecipe.fulfilled, (state,{ payload }) => {

            const {apollo , api} = payload;

            const userRecipe = apollo.map(resep => ({...resep , serving : resep.servings}));
            const endpoint = api.map(resep => ({...resep, title : getTitle(resep.key)}))

            state.search.results = [...userRecipe, ...endpoint]
        })
    }
})


const { changeFilter } = contentSlice.actions;


export default contentSlice.reducer
export { changeFilter }

