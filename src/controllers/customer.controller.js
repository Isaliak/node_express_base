const Customer = require('../models').customers
const User = require('../models').users
const Role = require('../models').roles

const { responses, validationControllers, serverErrorResponse } = require('../helpers/controllers')

Customer.hasOne(User, { foreignKey: 'customer_id' })
User.belongsTo(Role, { foreignKey: 'rol_id' })

const controller = {}

controller.get = async (req, res) => {
    try {
        const customer = await responses.get(Customer)
        validationControllers(customer, res)
    } catch (error) {
        serverErrorResponse(error, res)
    }
}
controller.getById = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await responses.getOne(Customer, { deleted: false, id })
        validationControllers(customer, res)
    } catch (error) {
        serverErrorResponse(error, res)
    }
}
controller.create = async (req, res) => {
    try {
        const customer = await responses.create(Customer, req.body)
        validationControllers(customer, res, 'No se pudo crear el registro')
    } catch (error) {
        serverErrorResponse(error, res)
    }
}
controller.update = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await responses.update(Customer, req.body, { deleted: false, id: id })
        validationControllers(customer, res, 'No se pudo actualizar el registro')
    } catch (error) {
        serverErrorResponse(error, res)
    }
}
controller.delete = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await responses.delete(Customer, { deleted: false, id })
        validationControllers(customer, res, 'No se pudo eliminar el registro')
    } catch (error) {
        serverErrorResponse(error, res)
    }

}


module.exports = { controller }