import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books { id, name, description }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($name: String!, $description: String!) {
    createBook(createBookInput: { name: $name, description: $description }) { id }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $name: String!, $description: String!) {
    updateBook(updateBookInput: { id: $id, name: $name, description: $description }) { id }
  }
`;

export const DELETE_BOOK = gql`
  mutation RemoveBook($id: ID!) {
    removeBook(id: $id) { id }
  }
`;