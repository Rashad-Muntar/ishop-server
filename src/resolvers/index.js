const Mutation = require("./Mutations");
const Query = require("./Querys");
const { GraphQLUpload } = require("graphql-upload");
const { GraphQLDateTime } = require('graphql-iso-date');

const resolvers = {
  Upload: GraphQLUpload,
  ...Query,
  ...Mutation,
  DateTime: GraphQLDateTime
};

module.exports = resolvers;
