const Mutation = require("./Mutations");
const Query = require("./Querys");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  Upload: GraphQLUpload,
  ...Query,
  ...Mutation,
};

module.exports = resolvers;
