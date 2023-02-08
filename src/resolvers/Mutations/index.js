const ProductMutation = require("./Product");
const Client = require("./Client")
const Shopper = require("./Shopper")
const Vendor = require("./Vendor")
const Store = require("./Store")


const Mutation = {
  Mutation: {
    ...ProductMutation.Mutation,
    ...Client.Mutation,
    ...Shopper.Mutation,
    ...Vendor.Mutation,
    ...Store.Mutation
  },
};

module.exports = Mutation;


