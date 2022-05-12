import { gql } from "@apollo/client";


const FindBookmarkRecipe = gql`
    query MyQuery($key: String = "", $user_id: uuid!) {
        bookmark(where: {key: {_eq: $key}, user_id: {_eq: $user_id}}) {
            id
            key
            user_id
        }
    }
`;

const AddBookMark = gql`
    mutation AddBookMark($user_id: uuid!, $key: String!) {
        insert_bookmark(objects: {user_id: $user_id, key: $key}) {
            returning {
                key
                user_id
            }
        }
    }
`;

const DeleteBookMark = gql`
    mutation DeleteBookMark($key: String!, $user_id: uuid!) {
        delete_bookmark(where: {id: {}, key: {_eq: $key}, user_id: {_eq: $user_id}}) {
            returning {
                id
                key
                user_id
            }
        }
    } 
`



export { FindBookmarkRecipe , AddBookMark , DeleteBookMark }