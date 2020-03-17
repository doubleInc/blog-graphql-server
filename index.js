import { ApolloServer, gql } from "apollo-server";
import mapKeys from "lodash/mapKeys";
import { BlogAPI } from "./datasource";

const typeDefs = gql`
  type Post {
    id: Int!
    title: String!
    content: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    post(id: Int!): Post
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    post: async (root, { id }, { dataSources }) => {
      const post = await dataSources.blogApi.getPost(id);
      return mapKeys(post, (value, key) => {
        return key;
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    blogApi: new BlogAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});