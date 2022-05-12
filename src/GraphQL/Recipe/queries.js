import { gql } from "@apollo/client";

const AddRecipe = gql`
    mutation CreateRecipe($author: jsonb!, $desc: String!, $dificulty: String!, $ingredient: jsonb!, $key: String!, $servings: String!, $thumb: String!, $times: String!, $title: String!, $user_id: uuid!) {
        insert_resep(objects: {author: $author, desc: $desc, dificulty: $dificulty, ingredient: $ingredient, key: $key, servings: $servings, thumb: $thumb, times: $times, title: $title, user_id: $user_id}) {
            returning {
            id
            user_id
            title
            }
        }
    }  
`;

const SearchUserRecipe = gql`
    query FindRecipe($_like: String!) {
        resep(where: {key: {_like: $_like}}) {
        title
        thumb
        key
        times
        servings
        }
    }  
`;

const FindUserRecipeByKey = gql`
    query FindUserRecipeByKey($key: String!) {
        resep(where: {key: {_eq: $key}}) {
        author
        desc
        dificulty
        ingredient
        servings
        thumb
        times
        title
        }
    }  
`;


export { AddRecipe, SearchUserRecipe, FindUserRecipeByKey };
