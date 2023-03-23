const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  scalar Upload
  scalar DateTime

  type clientPaylod {
    id: ID!
    username: String
    email: String
    password: String
    phone: String!
    location: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Client {
    client: clientPaylod
    token: String
    success: Boolean
    message: String
  }
  type phoneUser {
    token: String
    phoneNumber: String
  }

  input ProductInput {
    image: Upload!
    title: String!
  }

  type newOrderPayload {
    id: ID!
    code: Int!
    isCancel: Boolean
    isComplete: Boolean
    onGoing: Boolean
    shopperId: String
    storeId: String!
    clientId: String!
    products: [Product]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Order {
   order: newOrderPayload
   success: String
   message: String

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
    createdAt: DateTime!
    updatedAt: DateTime!
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
    price: Float!
    image: String
    orders: [Order]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ProductCategory {
    id: ID!
    storeId: String!
    title: String!
    image: String!
    products: [Product!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type newStorePayload {
    id: ID!
    email: String!
    password: String
    storeName: String
    address: String!
    phone: String!
    outletType: String!
    branches: String!
    headerImg: String
    logo: String
    verified: Boolean!
    aisles: [ProductCategory!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Store {
    Store: newStorePayload
    token: String
    success: Boolean
    message: String
  }

  type PaymentIntention {
    paymentIntent: String!
    ephemeralKey: String!
    customer: String!
    publishableKey: String!
  }

  type Category {
    id: ID!
    title: String!
    image: String
    stores: [Store]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Message {
    success: Boolean
    message: String
  }

  type Query {
    users: [Client!]
    me: Client!
    NoneVerifiedShoppers: [Shopper!]

    shoppers: [newShoperPayload!]
    shopper(shopperId: ID!): Shopper!

    category(categoryId: ID!): Category!
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
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type newShopper {
    shopper: newShoperPayload
    token: String
    success: Boolean
    message: String
  }

  type Mutation {
    phoneVerification(phoneNumber: String!): Message!
    codeVerification(phoneNumber: String!, code: Int!): Client!
    SocialLogin(accessToken: String!, service: String!): Client!

    createPaymentIntent(amount: Float!): PaymentIntention!

    shopperSignup(
      avatar: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      deliveryOption: String!
      location: String!
      latitude: Float
      longitude: Float
      phone: String!
    ): newShopper!
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
      headerImg: String!
      logo: String!
      verified: Boolean!
    ): Store!
    updateStore(
      id: ID!
      email: String!
      storeName: String!
      address: String!
      phone: String!
      outletType: String!
      branches: String!
      headerImg: String!
      logo: String!
      verified: Boolean!
    ): Store!
    deleteStore(id: ID!): Message!
    storeLogin(email: String!, password: String!): Store!

    updateCategory(id: ID!, title: String!, image: String!): Category!
    deleteCategory(id: ID!): Message!
    createCategory(title: String!, image: String!): Category!

    createProductCategory(
      storeId: String!
      title: String!
      image: String!
    ): ProductCategory!
    updateProductCategory(
      id: String!
      title: String!
      image: String!
    ): ProductCategory!
    deleteProductCategory(id: String!): Message!

    createProduct(
      aisleId: String!
      title: String!
      detail: String!
      brand: String!
      price: Float!
      image: String!
    ): Product!
    updateProduct(
      id: ID!
      aisleId: String!
      title: String!
      detail: String!
      brand: String!
      price: Float!
      image: String!
    ): Product!
    deleteProduct(id: ID!): Message!

    createOrder(
      storeId: String!
      clientId: String!
      # isCancel: Boolean
      # isComplete: Boolean
      # onGoing: Boolean
    ): Order!
    # updateOrder(
    #   id: ID!
    #   isCancel: Boolean!
    #   isComplete: Boolean!
    #   onGoing: Boolean!
    #   shopperId: String
    #   storeId: String!
    #   clientId: String!
    # ): Order!
    # deleteOrder(
    #   id: ID!
    # ): Message!
  }
`;

module.exports = typeDefs;