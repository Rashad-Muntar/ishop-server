const Mutation = require("./Mutations");
const Query = require("./Querys");
// const Subscription = require("./Subscriptions")
const { GraphQLUpload } = require("graphql-upload");
const { GraphQLDateTime } = require('graphql-iso-date');

const resolvers = {
  Upload: GraphQLUpload,
  ...Query,
  ...Mutation,
  // ...Subscription,
  DateTime: GraphQLDateTime
};

module.exports = resolvers;
