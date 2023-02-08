const Product = require("./Product");
const Shopper = require("./Shopper")
const Category = require("./Category")
const Mutation = {
  Query: {
    ...Product.Query,
    ...Shopper.Query,
    ...Category.Query
  },
};

module.exports = Mutation;
