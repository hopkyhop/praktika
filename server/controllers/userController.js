const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt"); //кэширование паролей
const jwt = require("jsonwebtoken");
const { User, Favorites } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже зарегестрирован")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const favorites = await Favorites.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
  }
  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({ where: { email}})
    if (!user) {
      return next(
        ApiError.internal("Пользователь с таким email не зарегестрирован")
      );
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(
        ApiError.internal("Пароль неверен. Попробуйте еще раз.")
      );
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController();
