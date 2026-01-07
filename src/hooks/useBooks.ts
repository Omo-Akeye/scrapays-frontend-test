import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { GET_BOOKS, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK } from '../graphql/queries';
import type { Book } from '../types';

export const useBooks = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  const { loading, error, data, refetch } = useQuery(GET_BOOKS);


  const [createBook, { loading: creating }] = useMutation(CREATE_BOOK);
  const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK);
  const [deleteBook, { loading: deleting }] = useMutation(DELETE_BOOK);


  const handleCreate = async (name: string, description: string) => {
    try {
      await createBook({ variables: { name, description } });
      toast({ title: 'Book added!', status: 'success', duration: 3000, isClosable: true });
      refetch();
      return true; 
    } catch (err: any) {
      toast({ title: 'Error adding book', description: err.message, status: 'error', duration: 4000 });
      return false; 
    }
  };

  const handleUpdate = async (id: string, name: string, description: string) => {
    try {
      await updateBook({ variables: { id, name, description } });
      toast({ title: 'Book updated!', status: 'success', duration: 3000, isClosable: true });
      refetch();
      return true;
    } catch (err: any) {
      toast({ title: 'Error updating book', description: err.message, status: 'error', duration: 4000 });
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook({ variables: { id } });
      toast({ title: 'Book deleted', status: 'info', duration: 3000, isClosable: true });
      refetch();
      return true;
    } catch (err: any) {
      toast({ title: 'Error deleting book', description: err.message, status: 'error', duration: 4000 });
      return false;
    }
  };

const allBooks: Book[] = data?.books || [];
  const filteredBooks = allBooks.filter((book: any) => 
    book.name.toLowerCase().includes(search.toLowerCase()) || 
    book.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    loading,
    error,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    currentBooks,
    handleCreate,
    handleUpdate,
    handleDelete,
    creating, 
    updating,
    deleting  
  };
};