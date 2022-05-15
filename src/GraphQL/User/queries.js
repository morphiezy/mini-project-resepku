import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($objects: [user_insert_input!]!) {
    insert_user(objects: $objects) {
      returning {
        id
        username
      }
    }
  }
`;

const GET_USER = gql`
  query GetUser($username: String = "", $password: String = "") {
    user(where: {username: {_eq: $username}, password: {_eq: $password}}) {
      id
      username
      fullname
    }
  }
`;

const FIND_BY_USERNAME = gql`
  query FindByUsername($username: String!) {
    user(where: {username: {_eq: $username}}) {
      username
    }
  }
`


export { REGISTER_USER , GET_USER , FIND_BY_USERNAME };
