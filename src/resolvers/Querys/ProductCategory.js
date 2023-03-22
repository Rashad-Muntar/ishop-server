const { Aisle } = require("../../../sequelize/models");
const { Product } = require("../../../sequelize/models");

const ProductCategory = {
  Query: {
    async ProductCategories(_, {}) {
      try {
        const categories = await Aisle.findAll({
          include: [
            {
              model: Product,
              as: "products",
            },
          ],
        });
        return categories;
      } catch (error) {
        return "no data found";
      }
    },
    ProductCategory: async (_, { categoryId }) => {
      try {
        const foundCategory = await Aisle.findOne({
          where: { id: categoryId },
          include: [
            {
              model: Product,
              as: "products",
            },
          ],
        });
        return foundCategory;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = ProductCategory;
