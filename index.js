import { ApolloServer, gql } from "apollo-server";
import mapKeys from "lodash/mapKeys";
import { BlogAPI } from "./datasource";

// store auth token
let jwt_token = "";

const typeDefs = gql`
  type Post {
    id: Int
    title: String!
    content: String!
    created_at: String
    updated_at: String
  }

  type User {
    id: Int!
    email: String!
    password_digest: String!
  }

  type LoginResponse {
    auth_token: String
    user: User
  }

  type Query {
    post(id: Int!): Post
    posts: [Post]
    login(email: String!, password: String!): LoginResponse!
  }

  type Mutation {
    post(title: String!, content: String!): Post!
  }
`;

const resolvers = {
  Query: {
    post: async (root, { id, token = jwt_token }, { dataSources }) => {
      const post = await dataSources.blogApi.getPost(id, token);
      return mapKeys(post, (value, key) => {
        // map over the post's keys
        return key;
      });
    },
    login: async (root, { email, password }, { dataSources }) => {
      const user = await dataSources.blogApi.getUser(email, password);
      return mapKeys(user, (value, key) => {
        if (key === "auth_token") {
          //store jwt token
          jwt_token = user["auth_token"];
          return key;
        }
      });
    },
    posts: async (root, { token = jwt_token }, { dataSources }) => {
      const posts = await dataSources.blogApi.getAllPosts(token);
      // return an array with each post
      return posts.map(post => ({ ...post }));
    }
  },

  Mutation: {
    // create a new post
    post: async (
      root,
      { title, content, token = jwt_token },
      { dataSources }
    ) => {
      const post = await dataSources.blogApi.createPost(title, content, token);
      return post;
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
