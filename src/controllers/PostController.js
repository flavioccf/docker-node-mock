const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Post = require('../models/Post');
const User = require('../models/User');

//INDEX
router.get("/", (req, res) => res.send('POST ROUTES'));

// FIND ONE
router.get("/findOne/:id", async (req, res) => {
  const id = (req.params.id ? req.params.id : null);
  try {
    const findOne = await Post.findByPk(id, {
      include: [{
        model: User, as: "UserRef"
      }]
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
    const findAll = await Post.findAll({
      include: [{
        model: User, as: "UserRef"
      }],
      where: {
        title: {
          [Op.like]: `%${(filter !== null ? filter: "")}%`
        }
      }
    });
    res.json(findAll);
  } catch (error) {
    res.status(404).send(error);
  }
});

// CREATE
router.post("/", async (req, res) => {
  const newPost = req.body;
  try {
    const addPost = await Post.create(newPost);
    res.json(addPost);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;