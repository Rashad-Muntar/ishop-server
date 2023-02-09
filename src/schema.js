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

  input VendorInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    outletType: String!
    branches: String!
    storeName: String!
    address: String!
  }

  type Vendor {
    id: ID!
    categoryId: String
    email: String!
    password: String!
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

  type Store {
    id: ID!
    token: String!
    email: String!
    password: String!
    storeName: String
    address: String!
    phone: String!
    outletType: String!
    branches: String!
    headerImg: String
    logo: String
    verified: Boolean!
  }

  type Category {
    id: ID!
    title: String!
    image: String!
    stores: [Store]
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
    shopper(shopperId: ID!): Shopper!
    category(categoryID: ID!): Category!
    categories: [Category!]
    stores: [Vendor!]
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

    createVendor(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      outletType: String!
      branches: String!
      storeName: String!
      address: String!
    ): Message
    updateVendor(id: ID!, input: VendorInput): Message
    deleteVendor(id: ID!): Message

    createStore(
      categoryId: String!
      email: String!
      password: String!
      storeName: String!
      address: String!
      phone: String!
      outletType: String!
      branches: String!
      headerImg: Upload
      logo: Upload
      verified: Boolean!
    ): Store!

    storeLogin(email: String!, password: String!): Store!

    updateCategory(id: ID!, title: String!, image: Upload!): Category!
    deleteCategory(id: ID!): Message!
    createCategory(title: String!, image: Upload!): Category!
  }
`;

module.exports = typeDefs;
