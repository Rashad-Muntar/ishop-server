const models = require("../../../sequelize/models");

const Category = {
  Mutation: {
    async createCategory(_, { title, image }) {
      try {
        const newCategory = await models.Category.create({
          title,
          image,
        });
        return newCategory;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },

    async updateCategory(_, { id, title, image }) {
      try {
        const category = await models.Category.findByPk(id);
        const updateCat = await category.update({
          title,
          image,
        });
        return updateCat;
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    async deleteCategory(_, { id }) {
      try {
        await models.Category.destroy({
          where: { id: id },
        });
        return {
          message: "Category deleted",
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

module.exports = Category;
