const models = require("../../../sequelize/models");

const OrderMutation = {
  Mutation: {
    async createOrder(_, { storeId, clientId }) {
      const randomSixDigitNumber = Math.floor(10000 + Math.random() * 90000);
      try {
        const newOrder = await models.Order.create({
          code: randomSixDigitNumber,
          storeId,
          clientId,
        });
        console.log(newOrder)
        return {
            order: newOrder,
            success: true,
            message: "Order succesfully created"
          };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    // async updateOrder(
    //   _,
    //   { id, isCancel, isComplete, onGoing, shopperId, storeId, clientId }
    // ) {
    //   try {
        // const order = await models.Order.findByPk(id);
        // const updatedOrder = await order.update({
        //   isCancel,
        //   isComplete,
        //   onGoing,
        //   shopperId,
        //   storeId,
        //   clientId,
        // });
        // return updatedOrder;
    //   } catch (error) {
    //     return {
    //       success: false,
    //       message: error.message,
    //     };
    //   }
    // },
    // async deleteOrder(_, { id }) {
    //   try {
    //     // await models.Order.destroy({
    //     //   where: { id: id },
    //     // });
    //     return {
    //       message: "Order deleted",
    //       success: true,
    //     };
    //   } catch (error) {
    //     return {
    //       success: false,
    //       message: error.message,
    //     };
    //   }
    // },
  },
};

module.exports = OrderMutation;
