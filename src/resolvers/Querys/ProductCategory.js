const { Aisle } = require("../../../sequelize/models");

const ProductCategory = {
  Query: {
    async ProductCategories(_, {}) {
      try {
        const categories = await Aisle.findAll();
        return categories;
      } catch (error) {
        return "no data found";
      }
    },
    // category: async (_, { categoryID }) => {
    //   try {
    //     const foundCategory = await Category.findOne({
    //       where: { id: categoryID },
    //       include: [
    //         {
    //           model: Store,
    //           as: "stores",
    //         },
    //       ],
    //     });
    //     return foundCategory;
    //   } catch (error) {
    //     return error.message;
    //   }
    // },
  },
};

module.exports = ProductCategory;
