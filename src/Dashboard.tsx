import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaPlus, FaSearch, FaUserCircle, FaChevronLeft, FaChevronRight, FaBook, FaPen, FaTrash, FaEye } from 'react-icons/fa';
import { 
  useDisclosure, 
  Button, 
  IconButton, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Box, 
  Flex, 
  Text, 
  Heading, 
  SimpleGrid,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  HStack,
  Skeleton 
} from '@chakra-ui/react';
import { useBooks } from './hooks/useBooks';
import BookFormModal from './components/BookFormModal';
import BookViewModal from './components/BookViewModal';
import DeleteAlert from './components/DeleteAlert';
import type { Book } from './types';

export default function Dashboard({ user }: { user: any }) {
  const { logout } = useAuth0();
  
  const { 
    loading, error, search, setSearch, currentPage, setCurrentPage, 
    totalPages, currentBooks, handleCreate, handleUpdate, handleDelete,
    creating, updating
  } = useBooks();

  const formModal = useDisclosure();   
  const viewModal = useDisclosure();   
  const deleteAlert = useDisclosure(); 

  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const openAdd = () => { setSelectedBook(null); formModal.onOpen(); };
  const openEdit = (book: any) => { setSelectedBook(book); formModal.onOpen(); };
  const openView = (book: any) => { setSelectedBook(book); viewModal.onOpen(); };
  const openDelete = (book: any) => { setSelectedBook(book); deleteAlert.onOpen(); };

  return (
    <Box minH="100vh" bg="gray.50">
      <Box as="nav" bg="white" borderBottomWidth="1px" px={8} py={4} position="sticky" top={0} zIndex={10}>
        <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
          <HStack spacing={2}>
            <FaBook size={24} color="#319795" />
            <Heading size="md" color="gray.800">BookStore</Heading>
          </HStack>
          
          <HStack spacing={4}>
            <Text fontSize="sm" fontWeight="medium" display={{ base: 'none', sm: 'block' }}>{user?.name}</Text>
            <Menu>
              <MenuButton as={IconButton} icon={user?.picture ? <Avatar size="sm" src={user.picture} /> : <FaUserCircle size={28} />} variant="ghost" rounded="full" />
              <MenuList>
                <MenuItem onClick={() => logout()} color="red.500">Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      <Container maxW="7xl" py={8}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ md: 'center' }} mb={8} gap={4}>
          <Heading size="lg" color="gray.800">Inventory</Heading>
          
          <HStack spacing={3} w={{ base: 'full', md: 'auto' }}>
            <InputGroup maxW={{ md: '300px' }} w="full">
              <InputLeftElement pointerEvents='none'>
                <FaSearch color='gray.300' />
              </InputLeftElement>
              <Input 
                placeholder='Search books...' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                bg="white"
              />
            </InputGroup>

            <Button 
              leftIcon={<FaPlus size={14} />} 
              colorScheme="teal" 
              px={8}
              onClick={openAdd}
              shadow="sm"
            >
              Add Book
            </Button>
          </HStack>
        </Flex>

        {error ? (
          <Box 
            p={8} 
            textAlign="center" 
            bg="red.50" 
            borderWidth="1px" 
            borderColor="red.200" 
            rounded="xl" 
            color="red.600"
          >
            <Heading size="md" mb={2}>Unable to load books</Heading>
            <Text>{error.message}</Text>
            <Button mt={4} size="sm" colorScheme="red" variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Box>
        ) : loading ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
             {[...Array(8)].map((_, i) => (
               <Box key={i} p={6} bg="white" rounded="xl" borderWidth="1px" h="280px">
                 <Skeleton height="20px" width="70%" mb={4} />
                 <Skeleton height="15px" width="100%" mb={2} />
                 <Skeleton height="15px" width="100%" mb={2} />
                 <Skeleton height="15px" width="80%" mb={6} />
                 <HStack justify="flex-end" mt={10} spacing={2}>
                    <Skeleton height="30px" width="30px" rounded="md" />
                    <Skeleton height="30px" width="30px" rounded="md" />
                    <Skeleton height="30px" width="30px" rounded="md" />
                 </HStack>
               </Box>
             ))}
          </SimpleGrid>
        ) : currentBooks.length === 0 ? (
          <Box textAlign="center" py={20} bg="white" rounded="xl" borderWidth="1px" borderStyle="dashed">
            <Text color="gray.500" fontSize="lg">No books found.</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
            {currentBooks.map((book: any) => (
              <Flex key={book.id} direction="column" justify="space-between" bg="white" p={6} rounded="xl" borderWidth="1px" shadow="sm" _hover={{ shadow: 'md' }} h="230px">
                <Box>
                  <Heading size="sm" mb={2} noOfLines={2}>{book.name}</Heading>
                  <Text fontSize="sm" color="gray.500" noOfLines={5}>{book.description}</Text>
                </Box>
                
                <HStack justify="flex-end" pt={4} spacing={2}>
                  <IconButton aria-label="View" icon={<FaEye />} size="sm" variant="ghost" colorScheme="teal" onClick={() => openView(book)} />
                  <IconButton aria-label="Edit" icon={<FaPen />} size="sm" variant="ghost" colorScheme="blue" onClick={() => openEdit(book)} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} size="sm" variant="ghost" colorScheme="red" onClick={() => openDelete(book)} />
                </HStack>
              </Flex>
            ))}
          </SimpleGrid>
        )}

        {!loading && !error && totalPages > 1 && (
          <Flex justify="center" align="center" mt={12} gap={2}>
            <Button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} isDisabled={currentPage === 1} size="sm" variant="outline"><FaChevronLeft /></Button>
            <Text fontSize="sm" color="gray.600" px={2}>Page {currentPage} of {totalPages}</Text>
            <Button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} isDisabled={currentPage === totalPages} size="sm" variant="outline"><FaChevronRight /></Button>
          </Flex>
        )}

        <BookFormModal 
          isOpen={formModal.isOpen} 
          onClose={formModal.onClose} 
          initialData={selectedBook}
          isLoading={selectedBook ? updating : creating}
          onSubmit={async (name, desc) => {
            let success = false;
            if (selectedBook) {
              success = await handleUpdate(selectedBook.id, name, desc);
            } else {
              success = await handleCreate(name, desc);
            }
            if (success) formModal.onClose(); 
          }} 
        />
        
        <BookViewModal isOpen={viewModal.isOpen} onClose={viewModal.onClose} book={selectedBook} />
        
        <DeleteAlert 
          isOpen={deleteAlert.isOpen} 
          onClose={deleteAlert.onClose} 
          onConfirm={() => selectedBook && handleDelete(selectedBook.id)} 
        />

      </Container>
    </Box>
  );
}