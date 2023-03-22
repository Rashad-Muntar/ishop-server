const { Aisle } = require("../../../sequelize/models");

const ProductCategory = {
  Mutation: {
    async createProductCategory(_, { storeId, title, image }) {
      try {
        const newCategory = await Aisle.create({
          storeId,
          title,
          image
        });
        return newCategory;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async updateProductCategory(_, { id, title, image }) {
      try {
        const aisle = await Aisle.findByPk(id);
        const updateAisle = await aisle.update({
          title,
          image,
        });
        return updateAisle;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async deleteProductCategory(_, { id }) {
      try {
        await Aisle.destroy({
          where: { id: id },
        });
        return {
          message: "Product category deleted",
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

module.exports = ProductCategory;
