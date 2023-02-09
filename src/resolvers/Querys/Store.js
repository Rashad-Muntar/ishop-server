const { Store } = require("../../../sequelize/models");

const StoreQuery = {
  Query: {
    async stores(_, {}) {
      try {
        const stores = await Store.findAll();
        return stores;
      } catch (error) {
        return "no data found";
      }
    },
    // category: async (_, { categoryID }) => {
    //   try {
    //     const foundCategory = await Category.findOne({
    //       where: { id: categoryID },
    //     });
    //     return foundCategory;
    //   } catch (error) {
    //     return error.message;
    //   }
    // },
  },
};

module.exports = StoreQuery;
