const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello Noor Mohammed.Welcome to graphql server",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// Run the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
