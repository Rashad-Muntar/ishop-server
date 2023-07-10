const { Store } = require("../../../sequelize/models");
const { Aisle } = require("../../../sequelize/models");
const StoreQuery = {
  Query: {
    async stores(_, {}) {
      try {
        const stores = await Store.findAll({
          include: [
            {
              model: Aisle,
              as: "aisles",
            },
          ],
        });
        return stores;
      } catch (error) {
        return "no data found";
      }
    },
    store: async (_, { storeId }) => {
      try {
        const foundStore = await Store.findOne({
          where: { id: storeId },
          include: [
            {
              model: Aisle,
              as: "aisles",
            },
          ],
        });
        return foundStore;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = StoreQuery;
