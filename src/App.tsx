import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider, Center, Spinner } from '@chakra-ui/react';
import Dashboard from './Dashboard';


const createApolloClient = (token: string | null) => {
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
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
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const initializeClient = async () => {
      if (isLoading) return; 

      if (isAuthenticated) {
       
        try {
          const token = await getAccessTokenSilently();
          setClient(createApolloClient(token));
        } catch (error) {
          console.error('Error getting token:', error);
  
          setClient(createApolloClient(null));
        }
      } else {
   
        setClient(createApolloClient(null));
      }
    };
    
    initializeClient();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (isLoading || !client) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" color="teal.500" thickness="4px" />
        </Center>
      </ChakraProvider>
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