const { Store } = require("../../../sequelize/models");
const { Aisle } = require("../../../sequelize/models");
const StoreQuery = {
  Query: {
    async stores(_, {}) {
      try {
        const stores = await Store.findAll({
          // include: [
          //   {
          //     model: Aisle,
          //     as: "aisles",
          //   },
          // ],
        });
        console.log(stores)
        return stores
      } catch (error) {
        return "no data found";
      }
    },
    store: async (_, { storeId }) => {
      try {
        const foundStore = await Store.findOne({
          where: { id: storeId },
          // include: [
          //   {
          //     model: Aisle,
          //     as: "aisles",
          //   },
          // ],
        });
        return {
          Store: foundStore,
          success: true,
          message: "Store found",
        };
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = StoreQuery;
