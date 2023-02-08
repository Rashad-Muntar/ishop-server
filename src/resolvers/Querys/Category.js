const { Category } = require("../../../sequelize/models");

const CategoryQuery = {
  Query: {
    async categories(_, {}) {
      try {
        const categories = await Category.findAll();
        return categories;
      } catch (error) {
        return "no data found";
      }
    },
    category: async (_, { categoryID }) => {
      try {
        const foundCategory = await Category.findOne({
          where: { id: categoryID },
        });
        return foundCategory;
      } catch (error) {
        return error.message;
      }
      //   const category = await Category.findAll({
      //     include: [
      //       {
      //         model: models.Vendor,
      //         where: { id: categoryId },
      //       },
      //     ],
      //   });
      //   return category;
    },
  },
};

module.exports = CategoryQuery;
