import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider, Button, Spinner, Center, Box, Text, Heading, VStack } from '@chakra-ui/react';
import Dashboard from './Dashboard';
import { FaBookOpen } from 'react-icons/fa';

const createApolloClient = (token: string) => {
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'apollo-require-preflight': 'true',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
  const [client, setClient] = useState<any>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    const initializeClient = async () => {
      if (isAuthenticated && !client) {
        setTokenLoading(true);
        try {
          const token = await getAccessTokenSilently();
          setClient(createApolloClient(token));
        } catch (error) {
          console.error('Error getting token:', error);
        } finally {
          setTokenLoading(false);
        }
      }
    };
    
    initializeClient();
  }, [isAuthenticated, getAccessTokenSilently, client]);


  if (isLoading || (isAuthenticated && tokenLoading)) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    );
  }


  if (!isAuthenticated) {
    return (
      <ChakraProvider>
        <Center h="100vh" bg="gray.50">
          <Box bg="white" p={10} rounded="2xl" shadow="xl" textAlign="center" maxW="sm" w="full" borderWidth="1px">
            <VStack spacing={6}>
              <Box bg="teal.50" p={4} rounded="full">
                <FaBookOpen size={40} color="#319795" /> 
              </Box>
              <Box>
                <Heading size="lg" mb={2}>BookStore</Heading>
                <Text color="gray.500">Manage your inventory with ease.</Text>
              </Box>
              
             
              <Button
                colorScheme="teal"
                size="lg"
                width="full"
                onClick={() => loginWithRedirect()}
                shadow="md"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              >
                Log In to Dashboard
              </Button>
            </VStack>
          </Box>
        </Center>
      </ChakraProvider>
    );
  }

  if (!client) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Dashboard user={user} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;