const processUpload = require("../../../utils/upload");
const { Aisle } = require("../../../sequelize/models");

const ProductCategory = {
  Mutation: {
    async createProductCategory(_, { storeId, title, image }) {
      try {
        const img = await processUpload(image);
        const newCategory = await Aisle.create({
          storeId,
          title,
          image: img.Location,
        });
        return newCategory;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
};

module.exports = ProductCategory;
