const Product = require("./Product");
const Shopper = require("./Shopper");
const Category = require("./Category");
const Store = require("./Store");



const Mutation = {
  Query: {
    ...Product.Query,
    ...Shopper.Query,
    ...Category.Query,
    ...Store.Query,
  },
};

module.exports = Mutation;
