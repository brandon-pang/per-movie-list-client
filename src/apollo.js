import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
    cache,
    link,
    resolvers: {
      Movie: {
        isLiked: () => false
      },
      Mutation:{
        toggleLikeMovie: (_, {id, isLiked}, {cache}) => {
          cache.writeData({id: `Movie:${id}`, data:{isLiked:!isLiked}});
        }
      }
    }
  });
export default client;
