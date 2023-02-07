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
      // if (email) {
      //   email = email.trim().toLowerCase(email);
      // }
      // const validateEmail = validator.isEmail(email);
      // if (!validateEmail) {
      //   throw new AuthenticationError("Please enter a valid email");
      // }
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

    async shopperSignup(
      _,
      {
        firstName,
        lastName,
        email,
        password,
        phone
      }
    ) {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      if (email) {
        email = email.trim().toLowerCase(email);
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      try {
      
        await models.OnbordShopper.create({
          firstName,
          lastName,
          email: validateEmail,
          password: hashedPassword,
          phone
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

    // ----------SHOPPER LOGIN ------------------
    // async shopperLogin(_, { email, password }) {
    //   if (email) {
    //     // normalize email address
    //     email = email.trim().toLowerCase();
    //   }
    //   const validateEmail = validator.isEmail(email);
    //   if (!validateEmail) {
    //     throw new AuthenticationError("Please enter a valid email");
    //   }
    //   try {
    //     const user = await models.Shopper.findOne({ where: { email: email } });
    //     if (!user) {
    //       throw new AuthenticationError("User with this email is not found");
    //     }
    //     const valid = await bcrypt.compare(password, user.password);
    //     if (!valid) {
    //       throw new AuthenticationError("Password does not match");
    //     }
    //     return {
    //       token: jwt.sign({ id: user.id }, config.JWT_SECRET),
    //       success: true,
    //       message: "Login succesfuly made",
    //     };
    //   } catch (error) {
    //     return {
    //       success: false,
    //       message: error.message,
    //     };
    //   }
    // },
  },

  Query: {},
};

module.exports = Shopper;
