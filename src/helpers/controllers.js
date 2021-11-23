
const responses = {}

responses.get = async (model, conditions = { deleted: false }, includes = []) => {
    // console.log(includes.length == 0)
    try {
        const resp = await model.findAll(
            {
                where: conditions,
                include: includes
            }
        )
        return resp
    } catch (error) {
        console.log(error)
        return error
    }
}
responses.getOne = async (model, conditions = { deleted: false }, includes = []) => {
    try {
        const resp = await model.findOne(
            {
                where: conditions,
                include: includes
            }
        )
        return resp
    } catch (error) {
        console.log(error)
        return error
    }
}
responses.create = async (model, params = {}) => {
    try {
        const resp = await model.create(params)
        return resp
    } catch (error) {
        console.log(error)
        return error
    }
}
responses.update = async (model, params = {}, conditions = { deleted: false }) => {
    try {
        const resp = await model.update(params, { where: conditions })
        return resp
    } catch (error) {
        console.log(error)
        return error
    }
}
responses.delete = async (model, conditions = { deleted: false }) => {
    try {
        const resp = await model.update({ deleted: true }, { where: conditions })
        return resp
    } catch (error) {
        console.log(error)
        return error
    }
}
const validationControllers = (resp, res, msg = 'No se encuentran datos') => {
    if (Array.isArray(resp)) {
        resp.length != 0
            ? res.status(200).json({ ok: true, data: resp })
            : res.status(200).json({ ok: false, respuesta: msg, data: resp })
    }
    resp != null
        ? res.status(200).json({ ok: true, data: resp })
        : res.status(200).json({ ok: false, respuesta: msg, data: resp })
}
const serverErrorResponse = (error, res) => {
    console.log(error)
    res.status(500).json({ ok: false, respuesta: 'Error en el servidor' })
}

module.exports = { responses, validationControllers, serverErrorResponse }