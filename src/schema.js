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

  input ShopperInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    location: String!
    vehicleType: String!
    idCard: Upload!
    driverLicense: Upload!
    vehicleLicense: Upload!
  }

  type Shopper {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    location: String!
    vehicleType: String!
    idCard: String!
    driverLicense: String!
    vehicleLicense: String!
  }

  type Ishopper {
    id: ID!
    avatar: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    location: String
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
    NoneVerifiedShoppers: [Shopper!]
    shoppers: [Ishopper!]
  }

  type Mutation {
    phoneVerification(phoneNumber: String!): Message!
    codeVerification(phoneNumber: String!, code: Int!): Client!
    SocialLogin(accessToken: String!, service: String!): Client!

    shopperDetailSubmit(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      location: String!
      vehicleType: String!
      idCard: Upload!
      driverLicense: Upload!
      vehicleLicense: Upload!
    ): Message!
    shopperSignup(
      avatar: Upload
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      phone: String!
      location: String
    ): Ishopper!
    shopperLogin(email: String!, password: String!): Ishopper!

    createProduct(image: String!, title: String!): Product
  }
`;

module.exports = typeDefs;
