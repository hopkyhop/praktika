const { Town } = require("../models/models")
const ApiError = require('../error/ApiError')

class TownController {
  async create(req, res) {
    const {name} = req.body
    const town = await Town.create({name})
    return res.json(town)
  }
  async getAll(req, res) {
    const towns = await Town.findAll()
    return res.json(towns)
  }
}

module.exports = new TownController()