const { Product } = require("../../../sequelize/models");
const processUpload = require("../../../utils/upload");

const ProductMutation = {
  Mutation: {
    async createProduct(_, { aisleId, title, detail, brand, price, image }) {
      try {
        const img = await processUpload(image);
        const newProduct = await Product.create({
          aisleId,
          title,
          detail,
          brand,
          price,
          image: img.Location,
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
    async updateProduct(_, {id, aisleId, title, detail, brand, price, image }) {
      try {
        const img = await processUpload(image);
        const product = await Product.findByPk(id);
        const updateProd = await product.update({
          aisleId,
          title,
          detail,
          brand,
          price,
          image: img.Location,
        });
        return updateProd;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async deleteProduct(_, { id }) {
      try {
        await Product.destroy({
          where: { id: id },
        });
        return {
          message: "Product deleted",
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
};

module.exports = ProductMutation;
