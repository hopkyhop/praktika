const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Favorites = sequelize.define("favorites", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const FavoritesCourse = sequelize.define("favorites_course", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Course = sequelize.define("course", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  code: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Type = sequelize.define("type", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Form = sequelize.define("form", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Town = sequelize.define("town", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const CourseInfo = sequelize.define("course_info", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
});

const TypeForm = sequelize.define("type_form", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const TypeTown = sequelize.define("type_town", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const TownForm = sequelize.define("town_form", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

User.hasOne(Favorites)
Favorites.belongsTo(User)

Favorites.hasMany(FavoritesCourse)
FavoritesCourse.belongsTo(Favorites)

Type.hasMany(Course)
Course.belongsTo(Type)

Form.hasMany(Course)
Course.belongsTo(Form)

Town.hasMany(Course)
Course.belongsTo(Town)

Course.hasMany(FavoritesCourse)
FavoritesCourse.belongsTo(Course)

Course.hasMany(CourseInfo, {as: 'info'})
CourseInfo.belongsTo(Course)

Type.belongsToMany(Form, {through: TypeForm})
Form.belongsToMany(Type, {through: TypeForm})

Type.belongsToMany(Town, {through: TypeTown})
Town.belongsToMany(Type, {through: TypeTown})

Town.belongsToMany(Form, {through: TownForm})
Form.belongsToMany(Town, {through: TownForm})

module.exports = {
  User,
  Favorites,
  FavoritesCourse,
  Course,
  Type,
  Town,
  Form,
  TypeTown,
  TypeForm,
  TownForm,
  CourseInfo,
}