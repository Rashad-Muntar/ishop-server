const Product = require("./Product");

const Mutation = {
  Query: {
    ...Product.Query,
  },
};

module.exports = Mutation;
