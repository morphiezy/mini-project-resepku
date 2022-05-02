import { createAsyncThunk } from "@reduxjs/toolkit";


const fetchFilterContent = createAsyncThunk('content/GET', async (arg,{ getState }) => {

    const {initialFetch , contentType} = arg;
    const { currentFilter } = getState()?.content?.[contentType];

    const temporaryData = {
        filter:[],
        content:[]
    };


    let initialFilter = "";


    if(initialFetch){
        const fetchFilter = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/categorys/${contentType}`);
        const filter = await fetchFilter.json();
        initialFilter = filter.results[0].key;
        temporaryData.filter = filter.results;
    }
    
    const fetchContent = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/categorys/${contentType}/${initialFetch ? initialFilter : currentFilter}`);
    const content = await fetchContent.json();
    temporaryData.content = content.results;

    return { contentType , initialFetch , temporaryData }
})


const searchRecipe = createAsyncThunk('content/search' , async (value) =>{
    const fetchData = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/search?q=${value}`);
    const data = await fetchData.json();
    return data.results;
})


export { fetchFilterContent , searchRecipe }