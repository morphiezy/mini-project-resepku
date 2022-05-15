import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../apollo-client";
import { FindUserRecipeByKey } from "../../GraphQL/Recipe/queries";



const fetchDetailRecipe = createAsyncThunk('recipe/detailByKey' , async (key) => {
    
    const fetchByGraphQL = await client.query({
        query: FindUserRecipeByKey,
        variables: {key},
        notifyOnNetworkStatusChange: true,
    });

    if(fetchByGraphQL.data.resep.length > 0) return fetchByGraphQL.data.resep[0]
    else{
        const fetchUsingAPI = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/recipe/${key}`);
        const detailRecipe = await fetchUsingAPI.json();
        return detailRecipe.results;
    }
})

export { fetchDetailRecipe }