require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");

// Define your schema and resolvers
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello noor mohammed.Welcome to the first graphql server",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: false, // Disable unbounded persisted queries as recommended
});

// Use the environment PORT or default to 4000 for local development
const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
