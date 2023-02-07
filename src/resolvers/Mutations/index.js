const ProductMutation = require("./Product");
const Client = require("./Client")
const Mutation = {
  Mutation: {
    ...ProductMutation.Mutation,
    ...Client.Mutation
  },
};

module.exports = Mutation;


