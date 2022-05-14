import { gql } from "@apollo/client";

const GetMyRecipe = gql`
    query GetMyRecipe($user_id: uuid!) {
        resep(where: {user_id: {_eq: $user_id}}) {
            id
            key
            thumb
            title
            author
        }
    }
`

export { GetMyRecipe }