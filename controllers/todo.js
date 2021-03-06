const Todo = require('../models').todo;


module.exports = {

  list(req, res) {
    return Todo
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((todos) => {
        res.status(200).json({
        message:'Semua Data todos',
        todos,
       })
     })
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Data Todo Not Found',
          });
        }
    return Todo
      .findByPk(req.params.id,{
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then(() => {
        res.status(200).json({
        message:'Data todos anda',
        todo,
       })
     })
      .catch((error) => { res.status(400).send(error); });
       
    })
  },

  add(req, res) {
    var data = req.body;
      return Todo
      .create({
        title: data.title,
        iduser: data.iduser,
      })
      .then((data) => {
        res.status(200).json({
          message:'Data Todo Berhasil Disimpan',
          data
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findByPk(req.params.id)      
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
            iduser: req.body.iduser || todo.iduser,
          })
          .then(() => {
           res.status(200).json({
            message:'Data Berhasil Diedit',
            todo,
           })
         })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Data Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => {
           res.status(200).json({
            message:'Data Berhasil Dihapus',
           })
         })
      })
      .catch((error) => res.status(400).send(error));
  },
};