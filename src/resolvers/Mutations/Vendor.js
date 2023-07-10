const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../../../sequelize/models");
const processUpload = require("../../../utils/upload");

const { AuthenticationError, ForbiddenError } = require("apollo-server-lambda");

const Vendor = {
  Mutation: {
    async createVendor(
      _,
      {
        firstName,
        lastName,
        email,
        address,
        phone,
        outletType,
        branches,
        storeName,
      }
    ) {
      if (email) {
        email = email.trim().toLowerCase();
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      try {
        await models.Vendor.create({
          firstName,
          lastName,
          email,
          phone,
          outletType,
          branches,
          storeName,
          address,
        });
        return {
          success: true,
          message: "Vendor documents is succesfully submitted",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async updateVendor(
      _,
      {
        id,
        firstName,
        lastName,
        email,
        phone,
        outletType,
        branches,
        storeName,
        address,
      }
    ) {
      if (email) {
        email = input.email.trim().toLowerCase();
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      try {
        await models.Vendor.update(
          {
            firstName,
            lastName,
            email,
            phone,
            outletType,
            branches,
            storeName,
            address,
          },
          {
            where: { id: id },
          }
        );
        return {
          success: true,
          message: "Vendor documents is succesfully updated",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async deleteVendor(_, { id }) {
      try {
        await models.Vendor.destroy({
          where: { id: id },
        });
        return {
          success: true,
          message: "Vendor documents is succesfully deleted",
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
};

module.exports = Vendor;
