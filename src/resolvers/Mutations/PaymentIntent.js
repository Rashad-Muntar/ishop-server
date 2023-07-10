const stripe = require("stripe")(
  "sk_test_51MfPWZI4CD8H90K2ZMiQ8qsB9kdloOWyLpFUg2L730XgzVRB0dY8XesndT72H1wr53QbOxk7IN2a1rWfdUtaL2MN00E9qYxj8O"
);

const PaymentIntention = {
  Mutation: {
    async createPaymentIntent(_, { amount }) {
      if (!amount) {
        throw new Error("Amount argument is required");
      }
      const customer = await stripe.customers.create();
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2022-11-15" }
      );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: 'pk_test_51MfPWZI4CD8H90K2zYRQSG2YB9dkFR6GwKChMF8b9VfIhLA6VzXwi2hcleBjOrNPaGcmraabqk0Vo7SxmendxV2U00PkpseKEc'
      };
    },
  },
};

module.exports = PaymentIntention
