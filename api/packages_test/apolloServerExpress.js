const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getAll: String
    getWorld: String
  }
`;

const query1 = {
  getAll: () => 'xxxxxxxx',
};
const query2 = {
  getWorld: () => 'test',
};

// Provide resolver functions for your schema fields
const resolvers = [
  {
    Query: query1,
  },
  {
    Query: query2,
  },
];

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
