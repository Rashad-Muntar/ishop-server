const bcrypt = require("bcrypt");
const validator = require("validator");

const models = require("../../../sequelize/models");
const jwt = require("jsonwebtoken");
// const config = require("../../config");

const { AuthenticationError, ForbiddenError } = require("apollo-server-lambda");

const Shopper = {
  Mutation: {
    async shopperSignup(
      _,
      {
        avatar,
        email,
        password,
        firstName,
        lastName,
        deliveryOption,
        location,
        phone
      }
    ) {
      if (email) {
        email = email.trim().toLowerCase(email);
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const Shopper = await models.Shopper.create({
          avatar,
          email,
          password: hashedPassword,
          firstName,
          lastName,
          deliveryOption,
          location,
          latitude: 0.0,
          longitude: 0.0,
          phone
        });
        let token = jwt.sign({ id: Shopper._id }, process.env.JWT_SECRET);
        return {
          shopper: Shopper,
          token,
          success: true,
          message: "Signup was successful",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    // ----------SHOPPER LOGIN ------------------
    async shopperLogin(_, { email, password }) {
      if (email) {
        // normalize email address
        email = email.trim().toLowerCase();
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      try {
        const Shopper = await models.Shopper.findOne({
          where: { email: email },
        });
        if (!Shopper) {
          throw new AuthenticationError("User with this email is not found");
        }
        const valid = await bcrypt.compare(password, Shopper.password);
        if (!valid) {
          throw new AuthenticationError("Password does not match");
        }
        let token = jwt.sign({ id: Shopper._id }, process.env.JWT_SECRET);
        return {
          shopper: Shopper,
          token,
          success: true,
          message: "Login was successful",
        };
      } catch (error) {
        return {
          success: false,
          message: error,
        };
      }
    },
  },

  Query: {},
};

module.exports = Shopper;
