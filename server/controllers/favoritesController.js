const { Favorites, FavoritesCourse } = require("../models/models");
const ApiError = require("../error/ApiError");
const { where } = require("sequelize");

class FavoritesController {
  async create(req, res, next) {
    try {
      const { userId, courseId } = req.body;
      const favorites = await Favorites.findOne({ where: { userId } });
      const favoriteId = favorites.id;
      const favoritesCourses = await FavoritesCourse.create({
        favoriteId,
        courseId,
      });
      return res.json(favoritesCourses);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async destroy(req, res, next) {
    try {
      const { userId, courseId } = req.body;
      const favorites = await Favorites.findOne({ where: { userId } });
      const favoriteId = favorites.id;
      const favoritesCourses = await FavoritesCourse.destroy({
        where: {
          favoriteId,
          courseId,
        },
      });
      return res.json(favoritesCourses);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const { userId } = req.query;
      const favorites = await Favorites.findOne({ where: { userId } });
      const favoriteId = favorites.id;
      const favoritesCourses = await FavoritesCourse.findAll({
        where: { favoriteId },
      });
      return res.json(favoritesCourses);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new FavoritesController();
