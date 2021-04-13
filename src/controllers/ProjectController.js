const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Project = require('../models/Project');

//INDEX
router.get("/", (req, res) => res.send('PROJECT ROUTES'));

// FIND ONE
router.get("/findOne/:id", async (req, res) => {
  const id = (req.params.id ? req.params.id : null);
  try {
    const findOne = await Project.findByPk(id,{
      include: [{
        // model: Post, as: "UserPosts"
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
    const findAll = await Project.findAll({
      where: {
        name: {
          // [Op.like]: `%${(filter !== null ? filter: "")}%`
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
  const newProject = req.body.project;
  const projectUsers = req.body.users;
  try {
    const addProject = await Project.create(newProject);
    if (projectUsers.length > 0) {
      addProject.setUsers(projectUsers);
    }
    res.json(addProject);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  const id = (req.params.id ? req.params.id : null);
  const newData = req.body;
  try {
    const updated = await Project.update(newData,{
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
    const deleteProject = await Project.destroy({where: {id: id}});
    res.json(deleteProject);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;