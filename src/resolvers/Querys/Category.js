const { Category } = require("../../../sequelize/models");
const { Store } = require("../../../sequelize/models");

const CategoryQuery = {
  Query: {
    async categories(_, {}) {
      try {
        const categories = await Category.findAll({
          include: [
            {
              model: Store,
              as: "stores",
            },
          ],
        });
        return categories;
      } catch (error) {
        return "no data found";
      }
    },
    category: async (_, { categoryId }) => {
      try {
        const foundCategory = await Category.findOne({
          where: { id: categoryId },
          include: [
            {
              model: Store,
              as: "stores",
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

module.exports = CategoryQuery;
