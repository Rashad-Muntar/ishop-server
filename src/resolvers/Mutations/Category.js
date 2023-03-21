const processUpload = require("../../../utils/upload");
const models = require("../../../sequelize/models");

const Category = {
  Mutation: {
    async createCategory(_, { title, image }) {
      try {
        const img = await processUpload(image);
        console.log(img)
          const newCategory = await models.Category.create({
            title,
            image: img.Location,
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
        const img = await processUpload(image);
        const category = await models.Category.findByPk(id);
        const updateCat = await category.update({
          title,
          image: img.Location,
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
