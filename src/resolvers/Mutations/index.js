const ProductMutation = require("./Product");
const Client = require("./Client");
const Shopper = require("./Shopper");
const Vendor = require("./Vendor");
const Store = require("./Store");
const Category = require("./Category");
const ProductCategory = require("./ProductCategory")
const PaymentIntention =  require("./PaymentIntent");

const Mutation = {
  Mutation: {
    ...ProductMutation.Mutation,
    ...Client.Mutation,
    ...Shopper.Mutation,
    ...Vendor.Mutation,
    ...Store.Mutation,
    ...Category.Mutation,
    ...ProductCategory.Mutation,
    ...PaymentIntention.Mutation
  },
};

module.exports = Mutation;
