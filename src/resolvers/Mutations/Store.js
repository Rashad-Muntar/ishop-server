const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Store } = require("../../../sequelize/models");


const { AuthenticationError, ForbiddenError } = require("apollo-server-lambda");

const StoreMutation = {
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
        const store = await Store.findOne({ where: { email: email } });
        if (!store) {
          throw new AuthenticationError("User with this email is not found");
        }
        const valid = await bcrypt.compare(password, store.password);
        if (!valid) {
          throw new AuthenticationError("Password does not match");
        }
        let token = jwt.sign({ id: store._id }, process.env.JWT_SECRET);
        return {
          Store: store,
          token,
          success: true,
          message: "Store succesfully logged in"
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async createStore(
      _,
      {
        categoryId,
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
        const store = {
          categoryId,
          email,
          password: hashedPassword,
          storeName,
          address,
          phone,
          outletType,
          branches,
          headerImg,
          logo,
          verified,
        };
        const newStore = await Store.create(store);
        let token = jwt.sign({ id: newStore._id }, process.env.JWT_SECRET);
        return {
          Store: newStore,
          token,
          success: true,
          message: "Store succesfully created"
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async updateStore(
      _,
      {
        id,
        email,
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
      if (email) {
        email = email.trim().toLowerCase();
      }
      const validateEmail = validator.isEmail(email);
      if (!validateEmail) {
        throw new AuthenticationError("Please enter a valid email");
      }
      try {
        const foundStore = await Store.findByPk(id);
        const newStore = await foundStore.update({
          email,
          storeName,
          address,
          phone,
          outletType,
          branches,
          headerImg,
          logo,
          verified,
        });
        return {
          Store: newStore,
          success: true,
          message: "Store succesfully updated"
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async deleteStore(_, { id }) {
      try {
        await Store.destroy({
          where: { id: id },
        });
        return {
          message: "Store deleted",
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
};

module.exports = StoreMutation;
