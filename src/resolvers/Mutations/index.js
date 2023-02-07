const ProductMutation = require("./Product");
const Client = require("./Client")
const Shopper = require("./Shopper")
const Mutation = {
  Mutation: {
    ...ProductMutation.Mutation,
    ...Client.Mutation,
    ...Shopper.Mutation
  },
};

module.exports = Mutation;


