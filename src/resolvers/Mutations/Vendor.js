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
        await models.Product.destroy({
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

    // ------  STORE LOGIN ----------
    // async storeLogin(_, { email, password }) {
    //   if (email) {
    //     email = email.trim().toLowerCase();
    //   }
    //   const validateEmail = validator.isEmail(email);
    //   if (!validateEmail) {
    //     throw new AuthenticationError("Please enter a valid email");
    //   }
    //   try {
    //     const store = await models.Store.findOne({ where: { email: email } });
    //     if (!store) {
    //       throw new AuthenticationError("User with this email is not found");
    //     }
    //     const valid = await bcrypt.compare(password, store.password);
    //     if (!valid) {
    //       throw new AuthenticationError("Password does not match");
    //     }

    //     return {
    //       token: jwt.sign({ id: store.id }, process.env.JWT_SECRET),
    //       success: true,
    //       message: "Login succesfuly made",
    //     };
    //   } catch (error) {
    //     console.log(error);
    //     return {
    //       success: false,
    //       message: error.message,
    //     };
    //   }
    // },

    // ------STORE SIGN UP -------------
    // async createStore(_, { input }) {
    //   const hashedPassword = await bcrypt.hash(input.password, 10);
    //   if (input.email) {
    //     input.email = input.email.trim().toLowerCase();
    //   }
    //   const validateEmail = validator.isEmail(input.email);
    //   if (!validateEmail) {
    //     throw new AuthenticationError("Please enter a valid email");
    //   }
    //   try {
    //     const image = await processUpload(input.image);
    //     const store = {
    //       email: input.email,
    //       password: hashedPassword,
    //       storeName: input.storeName,
    //       address: input.address,
    //       phone: input.phone,
    //       outletType: input.outletType,
    //       branches: input.branches,
    //       image: image.Location,
    //       verified: input.verified
    //     };
    //     await models.Store.create(store);
    //     return {
    //       success: true,
    //       message: "Store successfully created",
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

module.exports = Vendor;
