const jwt = require("jsonwebtoken");
const Twilio = require("twilio");
const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const Client = {
  Mutation: {
    async phoneVerification(_, { phoneNumber }) {
      console.log(phoneNumber);
      try {
        await client.verify
          .services(process.env.SERVICE_SID)
          .verifications.create({
            to: phoneNumber,
            channel: "sms",
          });

        return {
          success: true,
          message: "Verification code sent",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async codeVerification(_, { phoneNumber, code }) {
      try {
        await client.verify.services(process.env.SERVICE_SID).verificationChecks.create({
          to: `+${phoneNumber}`,
          code: code,
        });

        return {
          token: jwt.sign({ id: phoneNumber }, process.env.JWT_SECRET),
          phone: phoneNumber
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async SocialLogin(root, { accessToken, service }, { req }){
        return new Promise((resolve, reject) => {
          passport.authenticate(service, { accessToken }, (err, user) => {
            if (err || !user) {
              return reject(err);
            }
            req.login(user, error => {
              if (error) {
                reject(error);
              }
              resolve(user);
            });
          })(req);
        });
      },
  },
};

module.exports = Client;
