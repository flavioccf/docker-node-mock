const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require('../models/User');
const Post = require('../models/Post');
const _USERS = require('../seeds/users.json');
const Project = require('../models/Project');

//INDEX
router.get("/", (req, res) => res.send('USERS ROUTES'));

// FIND ONE
router.get("/findOne/:id", async (req, res) => {
  const id = (req.params.id ? req.params.id : null);
  try {
    const findOne = await User.findByPk(id,{
      include: [{
        model: Post, as: "UserPosts"
      },{
        model: Project, as: "Projects", attributes: ["title"]
      }],
    });
    res.json(findOne);
  } catch (error) {
    res.status(404).send(error);
  }
});

// FIND ALL
router.get("/findAll/:filter?", async (req, res) => {
  const filter = (req.params.filter ? req.params.filter : null);
  try {
    const findAll = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${(filter !== null ? filter: "")}%`
        }
      },
      include: [{
        model: Post, as: "UserPosts"
      },{
        model: Project, as: "Projects", attributes: ["title"]
      }]
    });
    res.json(findAll);
  } catch (error) {
    res.status(404).send(error);
  }
});

// CREATE
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const addUser = await User.create(newUser);
    res.json(addUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  const id = (req.params.id ? req.params.id : null);
  const newData = req.body;
  try {
    const updated = await User.update(newData,{
      where: { id: id }
    });
    res.json(updated);
  } catch (error) {
    res.status(404).send(error);
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  const id = (req.params.id ? req.params.id : null);
  try {
    const deleteUser = await User.destroy({where: {id: id}});
    res.json(deleteUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

// SEED BULK
router.post("/seedBulk", async (req, res) => {
  try {
    const bulkCreate = await User.bulkCreate(_USERS);
    res.json(bulkCreate);
  } catch (error) {
    console.error("Error creating bulk data:", error);
  }
});

module.exports = router;