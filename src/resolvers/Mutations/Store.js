const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../../../sequelize/models");
const processUpload = require("../../../utils/upload");

const { AuthenticationError, ForbiddenError } = require("apollo-server-lambda");

const Store = {
  Mutation: {
    async storeLogin(_, { email, password }) {
      if (email) {
        email = email.trim().toLowerCase();
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      try {
        const store = await models.Store.findOne({ where: { email: email } });
        if (!store) {
          throw new AuthenticationError("User with this email is not found");
        }
        const valid = await bcrypt.compare(password, store.password);
        if (!valid) {
          throw new AuthenticationError("Password does not match");
        }
        return store
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async createStore(
      _,
      {
        email,
        password,
        storeName,
        address,
        phone,
        outletType,
        branches,
        headerImg,
        logo,
        verified,
      }
    ) {
      const hashedPassword = await bcrypt.hash(password, 10);
      if (email) {
        email = email.trim().toLowerCase();
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      try {
        const headerimage = await processUpload(headerImg);
        const logoImg = await processUpload(logo);
        const store = {
          email,
          password: hashedPassword,
          storeName,
          address,
          phone,
          outletType,
          branches,
          headerImg: headerimage.Location,
          logo: logoImg.Location,
          verified,
        };
        const newVendor = await models.Store.create(store);
        return newVendor;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
};

module.exports = Store;
