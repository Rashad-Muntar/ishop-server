const models = require("../../../sequelize/models");
const { PubSub } = require('graphql-subscriptions');
const { withFilter } = require('graphql-subscriptions');

const pubsub = new PubSub();

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
        return {
          order: newOrder,
          success: true,
          message: "Order succesfully created",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async updateOrder(_, { id, isCancel, isComplete, onGoing, shopperId }) {
      try {
        const order = await models.Order.findByPk(id);
        const updatedOrder = await order.update({
          isCancel,
          isComplete,
          onGoing,
          shopperId,
        });
        const orderResponse = {
          order: updatedOrder,
          success: true,
          message: "Order succesfully updated",
        };
        pubsub.publish("ORDER_UPDATED", {
          onUpdateOrder: orderResponse,
          shopperId: shopperId, // <-- add shopperId argument
        });
        return orderResponse;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async deleteOrder(_, { id }) {
      try {
        await models.Order.destroy({
          where: { id: id },
        });
        return {
          message: "Order deleted",
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
  Subscription: {
    onUpdateOrder: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("ORDER_UPDATED"),
        (payload, args) => {
          // console.log(payload.onUpdateOrder.order.dataValues.shopperId)
          return payload.onUpdateOrder.order.dataValues.shopperId === args.shopperId;
        }
      ),
    },
  }
};

module.exports = OrderMutation;
