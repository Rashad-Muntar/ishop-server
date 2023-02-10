const Product = require("./Product");
const Shopper = require("./Shopper");
const Category = require("./Category");
const Store = require("./Store");
const ProductCategory = require("./ProductCategory")



const Mutation = {
  Query: {
    ...Product.Query,
    ...Shopper.Query,
    ...Category.Query,
    ...Store.Query,
    ...ProductCategory.Query
  },
};

module.exports = Mutation;
