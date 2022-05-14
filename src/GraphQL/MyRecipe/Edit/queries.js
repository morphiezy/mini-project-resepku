import { gql } from "@apollo/client";


const GET_RECIPE_DETAIL = gql`
    query DETAIL_RECIPE($user_id: uuid!, $key: String!) {
        resep(where: {user_id: {_eq: $user_id}, key: {_eq: $key}}) {
            key
            thumb
            title
            author
            desc
            dificulty
            ingredient
            servings
            times
        }
    }
`

const UPDATE_RECIPE = gql`
    mutation UpdateRecipe($user_id: uuid!, $key: String!, $update: resep_set_input) {
        update_resep(where: {user_id: {_eq: $user_id}, key: {_eq: $key}}, _set: $update) {
            returning {
            id
            user_id
            key
            }
        }
    }  
`



export { GET_RECIPE_DETAIL, UPDATE_RECIPE }