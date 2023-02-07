const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type Client {
    id: ID!
    name: String
    email: String
    password: String
    phone: String!
    token: String
    location: String
  }

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

  type Message {
    success: Boolean
    message: String
  }

  type Query {
    users: [Client!]
    me: Client!
    products: [Product!]
  }

  type Mutation {

    phoneVerification(phoneNumber: String!): Message!
    codeVerification(phoneNumber: String!, code: Int!): Client!

    createProduct(image: String!, title: String!): Product
  }
`;

module.exports = typeDefs;
