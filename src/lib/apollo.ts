import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4q9icmz3hfg01xsfy6bdij5/master',
  cache: new InMemoryCache(),
});
