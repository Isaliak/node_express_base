const Customer = require('../models').customers
const User = require('../models').users
const Role = require('../models').roles

const controller = {}

Customer.hasOne(User, { foreignKey: 'customer_id' })
User.belongsTo(Role, { foreignKey: 'rol_id' })

controller.get = async (req, res) => {
    try {
        const customer = await Customer.findAll({ where: { deleted: false } })
        customer.length != 0
            ? res.json({ ok: true }, customer)
            : res.json({ ok: false, respuesta: 'No se encuentran datos', customer })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, respuesta: 'Error en el servidor' })
    }
}
controller.getById = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await Customer.findOne({ where: { deleted: false, id } })
        customer != null
            ? res.json({ ok: true }, customer)
            : res.json({ ok: false, respuesta: 'No se encuentran datos', customer })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, respuesta: 'Error en el servidor' })
    }
}
controller.create = async (req, res) => {
    try {
        const customer = await Customer.create(req.body)
        customer != null || customer.length != 0
            ? res.json({ ok: true }, customer)
            : res.json({ ok: false, respuesta: 'No se pudo crear el registro', customer })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, respuesta: 'Error en el servidor' })
    }
}
controller.update = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await Customer.update(req.body, { where: id })
        customer != null || customer.length != 0
            ? res.json({ ok: true }, customer)
            : res.json({ ok: false, respuesta: 'No se pudo actualizar el registro', customer })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, respuesta: 'Error en el servidor' })
    }
}
controller.delete = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await Customer.update({ deleted: true }, { where: id })
        customer != null || customer.length != 0
            ? res.json({ ok: true }, customer)
            : res.json({ ok: false, respuesta: 'No se pudo eliminar el registro', customer })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, respuesta: 'Error en el servidor' })
    }

}


module.exports = { controller }