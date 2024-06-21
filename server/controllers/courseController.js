const ApiError = require("../error/ApiError");
const { Course, CourseInfo } = require("../models/models");
class CourseController {
  async create(req, res, next) {
    try {
      let { name, code, typeId, formId, townId, info } = req.body;
      const course = await Course.create({
        name,
        code,
        typeId,
        formId,
        townId,
      });
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          CourseInfo.create({
            title: i.title,
            description: i.description,
            courseId: course.id,
          })
        );
      }
      return res.json(course);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res) {
    let { typeId, formId, townId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 100;
    let offset = page * limit - limit;
    let courses;
    if (!typeId && !formId && !townId) {
      courses = await Course.findAndCountAll({ limit, offset });
    }
    if (!typeId && formId && townId) {
      courses = await Course.findAndCountAll({
        where: { formId, townId },
        limit,
        offset,
      });
    }
    if (!typeId && !formId && townId) {
      courses = await Course.findAndCountAll({
        where: { townId },
        limit,
        offset,
      });
    }
    if (!typeId && formId && !townId) {
      courses = await Course.findAndCountAll({
        where: { formId },
        limit,
        offset,
      });
    }
    if (typeId && !formId && townId) {
      courses = await Course.findAndCountAll({
        where: { typeId, townId },
        limit,
        offset,
      });
    }
    if (typeId && !formId && !townId) {
      courses = await Course.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (typeId && formId && !townId) {
      courses = await Course.findAndCountAll({
        where: { typeId, formId },
        limit,
        offset,
      });
    }
    if (typeId && formId && townId) {
      courses = await Course.findAndCountAll({
        where: { typeId, formId, townId },
        limit,
        offset,
      });
    }
    return res.json(courses);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const course = await Course.findOne({
      where: { id },
      include: [{ model: CourseInfo, as: "info" }],
    });
    return res.json(course);
  }
}

module.exports = new CourseController();
