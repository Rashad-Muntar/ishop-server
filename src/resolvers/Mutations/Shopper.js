const bcrypt = require("bcrypt");
const validator = require("validator");
const processUpload = require("../../../utils/upload");
const models = require("../../../sequelize/models");
const jwt = require("jsonwebtoken");
// const config = require("../../config");

const { AuthenticationError, ForbiddenError } = require("apollo-server-lambda");

const Shopper = {
  Mutation: {
    async shopperDetailSubmit(
      _,
      {
        firstName,
        lastName,
        email,
        phone,
        location,
        vehicleType,
        idCard,
        driverLicense,
        vehicleLicense,
      }
    ) {
      try {
        const id = await processUpload(idCard);
        const driver = await processUpload(driverLicense);
        const vehicle = await processUpload(vehicleLicense);

        await models.OnbordShopper.create({
          firstName,
          lastName,
          email,
          location,
          phone,
          vehicleType,
          idCard: id.Location,
          driverLicense: driver.Location,
          vehicleLicense: vehicle.Location,
        });
        return {
          success: true,
          message: "shopper details successfully submitted",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async shopperSignup(_, { firstName, lastName, email, password, phone }) {
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
          firstName,
          lastName,
          email,
          password: hashedPassword,
          phone,
        });
        return Shopper;
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
        const shopper = await models.Shopper.findOne({ where: { email: email } });
        if (!shopper) {
          throw new AuthenticationError("User with this email is not found");
        }
        const valid = await bcrypt.compare(password, shopper.password);
        if (!valid) {
          throw new AuthenticationError("Password does not match");
        }
        return {...shopper, token: await jwt.sign({ id: shopper._id }, process.env.JWT_SECRET)}
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },

  Query: {},
};

module.exports = Shopper;
