const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const users = await User.findAll()
    return res.json(users)
});

const create = catchError(async(req, res) => {
    const user = req.body
    const createUser = await User.create(user)
    return res.status(201).json(createUser)
})

const getOne = catchError(async (req, res) => {
    const { id } = req.params
    const result = await User.findByPk(id)
    if (!result) return res.sendStatus(404)
    return res.json(result)
  })
  
  const destroy = catchError(async (req, res) => {
    const { id } = req.params
    const result = await User.destroy({ where: { id: id } })
    if (result === 0) res.sendStatus(404)
    return res.sendStatus(204)
  })
  
  const update = catchError(async (req, res) => {
    const { id } = req.params
    const user = req.body
    const userUpdate = await User.update(user, { where: {id}, returning: true})
    return res.json(userUpdate)

    //const result = await User.update(
    //  req.body,
    //  { where: { id }, returning: true }
    //)

   // if (result[0] == 0) return res.sendStatus(404)
    //return res.json(result[1][0])
  })
  


module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}