
const responses = {}

responses.get = async (model, conditions = { deleted: false }, includes = []) => {
    const resp = await model.findAll(
        {
            where: conditions,
            include: includes
        }
    )
    return resp
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
    const resp = await model.create(params)
    return resp
}
responses.update = async (model, params = {}, conditions = { deleted: false }) => {
    const resp = await model.update(params, { where: conditions })
    return resp
}
responses.delete = async (model, conditions = { deleted: false }) => {
    const resp = await model.update({ deleted: true }, { where: conditions })
    return resp
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