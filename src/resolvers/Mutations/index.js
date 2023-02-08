const ProductMutation = require("./Product");
const Client = require("./Client")
const Shopper = require("./Shopper")
const Vendor = require("./Vendor")
const Store = require("./Store")
const Category = require("./Category")

const Mutation = {
  Mutation: {
    ...ProductMutation.Mutation,
    ...Client.Mutation,
    ...Shopper.Mutation,
    ...Vendor.Mutation,
    ...Store.Mutation,
    ...Category.Mutation
  },
};

module.exports = Mutation;


