const { Product } = require("../../../sequelize/models");
const { AuthenticationError, ForbiddenError } = require("apollo-server-lambda");

const ProductMutation = {
  Mutation: {
    async createProduct(_, { image, title }) {
      try {
        // image = await processUpload(input.image);

        const newProduct = await Product.create({
          image,
          title
        });
        return newProduct;
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
};

module.exports = ProductMutation;
