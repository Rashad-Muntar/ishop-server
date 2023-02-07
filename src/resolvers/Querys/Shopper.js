const models = require("../../../sequelize/models");

const Shopper = {
  Query: {
    // async shopper(_, { shopper }) {
    //   const returShopper = await models.Shopper.findOne({
    //     where: { id: shopper.id },
    //   });
    //   if (user) {
    //     return { returShopper };
    //   }
    // },

    async NoneVerifiedShoppers(_, {}) {
      try {
        const vShopper = await models.OnbordShopper.findAll();
        return vShopper;
      } catch (error) {
        return error.message;
      }
    },
    async shoppers(_, {}) {
      
      try {
        const shopper = await models.Shopper.findAll();
        return shopper;
      } catch (error) {
        return error.message;
      }
    },
    // async NoneVerifiedShoppers(_, {}) {
    //   try {
    //     const allShoppers = await models.OnbordShopper.findAll();
    //     console.log(allShoppers)
    //     return allShoppers;
    //   } catch (error) {
    //     return error.message;
    //   }
    // },
  },
};

module.exports = Shopper;
