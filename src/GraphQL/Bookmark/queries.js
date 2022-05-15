import { gql } from "@apollo/client";


const FindBookmarkRecipe = gql`
    query MyQuery($key: String!, $user_id: uuid!) {
        bookmark(where: {key: {_eq: $key}, user_id: {_eq: $user_id}}) {
            id
            key
            user_id
        }
    }
`;

const AddBookMark = gql`
    mutation AddBookmark($key: String!, $thumb: String!, $added_at: String!, $title: String!, $user_id: uuid!) {
        insert_bookmark(objects: {key: $key, thumb: $thumb, added_at: $added_at, title: $title, user_id: $user_id}) {
            returning {
                id
            }
        }
    }
`;

const DeleteBookMark = gql`
    mutation DeleteBookMark($key: String!, $user_id: uuid!) {
        delete_bookmark(where: {key: {_eq: $key}, user_id: {_eq: $user_id}}) {
            returning {
                id
                key
                user_id
            }
        }
    } 
`

const UpdateBookmark = gql`
    mutation UpdateBookmark($key: String!, $new_key: String!) {
        update_bookmark(where: {key: {_eq: $key}}, _set: {key: $new_key}) {
            returning {
                id
            }
        }
    }  
`

const GetAllBookmark = gql`
    query GetAllBookmark($user_id: uuid!) {
        bookmark(where: {user_id: {_eq: $user_id}}) {
            id
            added_at
            key
            thumb
            title
        }
    }  
`


export { FindBookmarkRecipe , AddBookMark , DeleteBookMark, UpdateBookmark, GetAllBookmark }