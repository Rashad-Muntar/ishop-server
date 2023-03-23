const ProductMutation = require("./Product");
const Client = require("./Client");
const Shopper = require("./Shopper");
const Vendor = require("./Vendor");
const Store = require("./Store");
const Category = require("./Category");
const ProductCategory = require("./ProductCategory");
const PaymentIntention = require("./PaymentIntent");
const OrderMutation = require("./Order");
const OrderSubscription = require("./Order")
const VideoMutation  = require("./VideoToken") 

const Mutation = {
  Mutation: {
    ...ProductMutation.Mutation,
    ...Client.Mutation,
    ...Shopper.Mutation,
    ...Vendor.Mutation,
    ...Store.Mutation,
    ...Category.Mutation,
    ...ProductCategory.Mutation,
    ...PaymentIntention.Mutation,
    ...OrderMutation.Mutation,
    ...VideoMutation.Mutation
  },
  Subscription: {
    ...OrderSubscription.Subscription
  }
};

module.exports = Mutation;
