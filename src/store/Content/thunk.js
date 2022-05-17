import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../apollo-client";
import { SearchUserRecipe } from "../../GraphQL/Recipe/queries";


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

    const fetchUserRecipe = await client.query({
        query: SearchUserRecipe,
        variables: {_ilike:`%${value.trim()}%`},
        notifyOnNetworkStatusChange: true,
    });

    return {
        apollo: fetchUserRecipe.data.resep,
        api: data.results
    }
})


export { fetchFilterContent , searchRecipe }