const Product = require("./Product");
const Shopper = require("./Shopper")
const Mutation = {
  Query: {
    ...Product.Query,
    ...Shopper.Query
  },
};

module.exports = Mutation;
