const { gql } = require("apollo-server-lambda");

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

  type phoneUser {
  token: String
  phoneNumber: String
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
    token: String
  }

  type Product {
    id: ID!
    aisleId: String
    title: String!
    detail: String!
    brand: String!
    price: String!
    image: String
  }

  type ProductCategory {
    id: ID!
    storeId: String!
    title: String!
    image: String!
    products: [Product!]
  }

  type Store {
    id: ID!
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
    aisles: [ProductCategory!]
  }

  type Category {
    id: ID!
    title: String!
    image: String
    stores: [Store]
  }

  type Message {
    success: Boolean
    message: String
  }

  type Query {
    users: [Client!]
    me: Client!
    NoneVerifiedShoppers: [Shopper!]

    shoppers: [Ishopper!]
    shopper(shopperId: ID!): Shopper!

    category(categoryID: ID!): Category!
    categories: [Category!]
    stores: [Store!]
    store(storeId: ID!): Store!

    ProductCategory(categoryId: ID!): ProductCategory!
    ProductCategories: [ProductCategory!]

    products: [Product!]
  }

  type newShoperPayload {
  id: ID!
  avatar: String
  email: String
  password: String
  firstName: String
  lastName: String
  deliveryOption: String
  location: String
  latitude: Float
  longitude: Float
  phone: String!
}

  type newShopper {
  shopper: newShoperPayload
  token: String
  success: Boolean
  message: String
}


  type Mutation {
    phoneVerification(phoneNumber: String!): Message!
    codeVerification(phoneNumber: String!, code: Int!): phoneUser!
    SocialLogin(accessToken: String!, service: String!): Client!

    shopperSignup(
      avatar: String
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      phone: String!
      location: String
    ): Ishopper!
    shopperLogin(email: String!, password: String!): newShopper!

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
      headerImg: Upload!
      logo: Upload!
      verified: Boolean!
    ): Store!
    storeLogin(email: String!, password: String!): Store!

    updateCategory(id: ID!, title: String!, image: Upload!): Category!
    deleteCategory(id: ID!): Message!
    createCategory(title: String!, image: Upload!): Category!

    createProductCategory(
      storeId: String!
      title: String!
      image: Upload!
    ): ProductCategory!

    createProduct(
      aisleId: String!
      title: String!
      detail: String!
      brand: String!
      price: String!
      image: Upload!
    ): Product!
    updateProduct(
      id: ID!
      aisleId: String!
      title: String!
      detail: String!
      brand: String!
      price: String!
      image: Upload!
    ): Product!
    deleteProduct(id: ID!): Message!
  }
`;

module.exports = typeDefs;
