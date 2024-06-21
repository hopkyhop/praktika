const {Form} = require('../models/models')
const ApiError = require('../error/ApiError')

class FormController {
  async create(req, res) {
    const {name} = req.body
    const form = await Form.create({name})
    return res.json(form)
  }
  async getAll(req, res) {
    const forms = await Form.findAll()
    return res.json(forms)
  }
}

module.exports = new FormController()