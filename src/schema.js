const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  input ProductInput {
    image: Upload!
    title: String!
  }

  type Product {
    image: String!
    title: String!
  }

  type Category {
    id: ID!
    title: String!
    image: String!
  }

  type Query {
    products: [Product!]
  }

  type Mutation {
    createProduct(image: String!, title: String!): Product
  }
`;

module.exports = typeDefs;
