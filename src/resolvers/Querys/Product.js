const models = require("../../../sequelize/models");

const Product = {
  Query: {
    async products(_, {}) {
      try {
        const products = await models.Product.findAll();
        return products;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = Product;
